import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/api/register').send({
    name: 'John Doe',
    email: 'johndoe@exemple.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/api/sessions').send({
    email: 'johndoe@exemple.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
