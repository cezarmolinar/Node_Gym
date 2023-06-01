import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDatabaseURL(databaseName: string) {
  const url = new URL( process.env.DATABASE_URL )

  url.pathname = `/${databaseName}`

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    if (!process.env.DATABASE_URL || !process.env.TEST_DATABASE_NAME) {
      throw new Error('Please provide a DATABASE_URL and TEST_DATABASE_NAME environment variables.')
    }
  
    const databaseName = `${process.env.TEST_DATABASE_NAME}_${randomUUID().replace(/-/g, '')}`

    const databaseURL = generateDatabaseURL(databaseName)    

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP DATABASE IF EXISTS ${databaseName};`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
