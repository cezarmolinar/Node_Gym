import { ValidateCheckInUseCase } from '../validate-check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/primsma-check-ins-repository'

export function makeValidateCheckInUseCase() {
  const repository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(repository)

  return useCase
}
