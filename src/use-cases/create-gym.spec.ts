import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'

let repository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym  Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(repository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Gym-02',
      description: 'Gym nr 02',
      phone: null,
      latitude: -30.015488,
      longitude: -51.1967232,
    })

    await expect(gym.id).toEqual(expect.any(String))
  })


})
