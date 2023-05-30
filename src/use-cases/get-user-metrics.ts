import { CheckIn } from '@prisma/client'
import { CheckInsRepositoryInterface } from '@/repositories/check-ins-repository-interface'

interface GetUserMetricsUseCaseRequest {
  user_id: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInrepository: CheckInsRepositoryInterface) {}

  async execute({
    user_id,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInrepository.countByUserId(user_id)

    return { checkInsCount }
  }
}
