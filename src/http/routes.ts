import { FastifyInstance } from 'fastify'
import { register } from './controllers/registerController'
import { authenticate } from './controllers/authenticateController'
import { profile } from './controllers/profileController'
import { verifyJWT } from './middlewares/verify-jwt'


export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sessions', authenticate)

  /* ROTINAS AUTENTICADAS */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
