import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileAuthenticateUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let repository: InMemoryUsersRepository
let sut: GetUserProfileAuthenticateUseCase

describe('Profile User use-case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new GetUserProfileAuthenticateUseCase(repository)
  })

  it('should be able to get profile', async () => {
    const createdUser = await repository.create({
      name: 'Jonn',
      email: 'email@email.com',
      password: '123456',
    })

    const { user } = await sut.execute({
      id: createdUser.id,
    })

    expect(user.name).toEqual('Jonn')
  })

  it('should not be able to get profile whith wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'xx',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
