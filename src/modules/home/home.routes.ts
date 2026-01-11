import { FastifyInstance } from 'fastify'
import { publicHome, privateHome } from './home.controller'
import { authMiddleware } from '../../shared/plugins/auth'

export async function homeRoutes(app: FastifyInstance) {
    app.get('/public', publicHome)

    app.get(
        '/private',
        { preHandler: authMiddleware },
        privateHome
    )
}