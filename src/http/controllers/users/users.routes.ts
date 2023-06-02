import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sessions', authenticate)

  /* ROTINAS AUTENTICADAS */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
