import { fastify } from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/gyms.routes'
import { usersRoutes } from './http/controllers/users/users.routes'
import { checkInsRoutes } from './http/controllers/check-ins/checkIns.routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes, { prefix: 'api' })
app.register(gymsRoutes, { prefix: 'api' })
app.register(checkInsRoutes, { prefix: 'api' })


app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Jogar para ferramente de log (DataDog, NewRelc, Sentry)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
