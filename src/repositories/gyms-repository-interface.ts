import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepositoryInterface {
  create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  fundManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
}

