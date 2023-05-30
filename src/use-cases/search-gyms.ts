import { Gym } from '@prisma/client'
import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}
export class SearchGymUseCase {
  constructor(private repository: GymsRepositoryInterface) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    
    const gyms = await this.repository.searchMany(query, page )

    return { gyms }
  }
}
