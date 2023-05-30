import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/primsma-check-ins-repository'

export function makeFetUserCheckInsHistoryUseCase() {
  const repository = new PrismaCheckInsRepository
  const useCase = new FetchUserCheckInsHistoryUseCase(repository)

  return useCase
}
