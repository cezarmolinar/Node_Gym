import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { env } from '@/env'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let repository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use-case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(repository)
  })

  it('should be able to authenticate', async () => {
    await repository.create({
      name: 'Jonn',
      email: 'email@email.com',
      password: await hash('123456', env.HASH_STEPS),
    })

    const { user } = await sut.execute({
      email: 'email@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'xxxx@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await repository.create({
      name: 'Jonn',
      email: 'email@email.com',
      password: await hash('123456', env.HASH_STEPS),
    })

    await expect(() =>
      sut.execute({
        email: 'email@email.com',
        password: 'XXXXXXX',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
