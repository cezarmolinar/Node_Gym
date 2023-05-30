import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let repository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    repository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(repository)
      })


  it('should be able to fetch nearby gyms', async () => {
    await repository.create({
      title: 'Near Gym',
      description: 'Gym nr 02',
      phone: null,
      latitude: -30.015488,
      longitude: -51.1967232,
    })

    await repository.create({
      title: 'Far Gym',
      description: 'Gym xxx',
      phone: null,
      latitude: -27.065488,
      longitude: -49.0967232,
    })

    const { gyms } = await sut.execute({
      userLatitude: -30.015488,
      userLongitude: -51.1967232,
    })

    expect(gyms).toHaveLength(1)

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym'}),
    ])
  })
})
