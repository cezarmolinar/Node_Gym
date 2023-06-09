import { Prisma, User } from '@prisma/client'
import { UsersRepositoryInterface } from '../users-repository-interface'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public itens: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.itens.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.itens.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.itens.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
