import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gyms'

let repository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    repository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(repository)
  })


  it('should be able to search from gyms', async () => {
    await repository.create({
      title: 'TypeScript Gym',
      description: 'Gym nr 02',
      phone: null,
      latitude: -30.015488,
      longitude: -51.1967232,    
    })

    await repository.create({
      title: 'JavaScript Gym',
      description: 'Gym xxx',
      phone: null,
      latitude: -30.015488,
      longitude: -51.1967232,    
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1
    })

    expect(gyms).toHaveLength(1)

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym'}),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create({
        title: `JavaScript Gym ${i}`,
        description: 'Gym xxx',
        phone: null,
        latitude: -30.015488,
        longitude: -51.1967232,
      })  
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2
    })

    expect(gyms).toHaveLength(2)

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21'}),
      expect.objectContaining({ title: 'JavaScript Gym 22'}),
    ])
  })

})
