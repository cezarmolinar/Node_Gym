import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileAuthenticateUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const repository = new PrismaUsersRepository()
  const useCase = new GetUserProfileAuthenticateUseCase(repository)

  return useCase
}
