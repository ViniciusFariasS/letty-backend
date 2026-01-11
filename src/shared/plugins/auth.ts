import { FastifyRequest, FastifyReply } from 'fastify'
import { admin } from './firebase'

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return reply.status(401).send({ message: 'Token não informado' })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const decoded = await admin.auth().verifyIdToken(token)

    request.user = {
      uid: decoded.uid,
      email: decoded.email
    }
  } catch {
    return reply.status(401).send({ message: 'Token inválido' })
  }
}
