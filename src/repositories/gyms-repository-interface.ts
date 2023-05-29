import { Gym, Prisma } from '@prisma/client'

export interface GymsRepositoryInterface {
  create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}

