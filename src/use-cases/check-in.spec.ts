import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in use-case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia de teste',
      description: '',
      phone: '',
      latitude: -30.015488,
      longitude: -51.1967232,      
    })
  
    // Data ficticia para teste
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: -30.015488,
      userLongitude: -51.1967232,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same date', async () => {
    //Data ficticia para teste
    // ano, mes (começa em zero), dia, hora, min, seg
    vi.setSystemTime(new Date(2023, 13, 23, 8, 20, 45))

    await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: -30.015488,
      userLongitude: -51.1967232,
    })

    await expect (() => sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: -30.015488,
      userLongitude: -51.1967232,
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    //Data ficticia para teste
    // ano, mes (começa em zero), dia, hora, min, seg
    vi.setSystemTime(new Date(2023, 13, 23, 8, 20, 45))

    await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: -30.015488,
      userLongitude: -51.1967232,
    })

    vi.setSystemTime(new Date(2023, 13, 21, 8, 20, 45))

    const { checkIn }  = await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: -30.015488,
      userLongitude: -51.1967232,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    
    await expect(() =>
      sut.execute({
        gym_id: 'gym-01',
        user_id: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
