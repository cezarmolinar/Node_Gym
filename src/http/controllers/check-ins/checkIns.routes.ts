import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'


export async function checkInsRoutes(app: FastifyInstance) {

  /* TODAS AS ROTAS AUTENTICADAS */
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/check-ins/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)

}
