import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { GymsRepositoryInterface } from '../gyms-repository-interface'

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  public items: Gym[] = []

  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),      
    }

    this.items.push(gym)

    return gym    
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym  
  }
}
