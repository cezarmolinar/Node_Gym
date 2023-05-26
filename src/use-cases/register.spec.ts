import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let repository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register user use-case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(repository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jonn',
      email: 'email@email.com',
      password: '123456',
    })

    await expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Jonn',
      email: 'email@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'Jonn',
      email: 'email@email.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Jonn',
        email: 'email@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
