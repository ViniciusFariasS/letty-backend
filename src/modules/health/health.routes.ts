import { FastifyInstance } from 'fastify'
import { healthController } from './health.controller'
import { db } from '../../shared/database';

export async function healthRoutes(app: FastifyInstance) {
    app.get('/', healthController),
        app.get("/db", async () => {
            const result = await db.query("SELECT NOW()");
            return { dbTime: result.rows[0] };
        });
}