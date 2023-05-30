import { Gym } from '@prisma/client'
import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}
export class FetchNearbyGymsUseCase {
  constructor(private repository: GymsRepositoryInterface) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    
    const gyms = await this.repository.fundManyNearby({
      latitude: userLatitude, longitude:userLongitude })

    return { gyms }
  }
}
