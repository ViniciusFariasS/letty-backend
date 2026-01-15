import Fastify from 'fastify'
import { healthRoutes } from '../modules/health/health.routes'
import { homeRoutes } from '../modules/home/home.routes'
import { userRoutes } from '../modules/user/user.routes'

export function buildApp() {
  const app = Fastify({ logger: true })

  app.register(healthRoutes, { prefix: '/health' })
  app.register(homeRoutes, { prefix: '/home' })
  app.register(userRoutes, { prefix: '/user' })

  return app
}