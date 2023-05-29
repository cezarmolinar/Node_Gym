import { Gym } from '@prisma/client'
import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface'

interface CreateGymUseCaseRequest {
  title: string,
  description: string | null,
  phone: string | null,
  latitude: number,
  longitude: number,  
}

interface CreateGymUseCaseResponse {
  gym: Gym
}
export class CreateGymUseCase {
  constructor(private repository: GymsRepositoryInterface) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    
    const gym = await this.repository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
      })

    return { gym }
  }
}
