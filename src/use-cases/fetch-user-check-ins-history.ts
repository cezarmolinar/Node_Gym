import { CheckIn } from '@prisma/client'
import { CheckInsRepositoryInterface } from '@/repositories/check-ins-repository-interface'

interface FetchUserCheckInsHistoryUseCaseRequest {
  user_id: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInrepository: CheckInsRepositoryInterface) {}

  async execute({
    user_id,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInrepository.findManyByUserId(user_id, page)

    return { checkIns }
  }
}
