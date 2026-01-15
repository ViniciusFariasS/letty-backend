import { FastifyReply, FastifyRequest } from "fastify"
import { EnsureUserService, UpdateUserInfoService } from "./user.service"
import { EUserRole } from "./user.types"

export class UserController {
    constructor(private ensureUserService: EnsureUserService,
        private updateUserInfoService: UpdateUserInfoService) { }

    async me(
        request: FastifyRequest,
        reply: FastifyReply) {
        const firebaseUser = request.user

        if (!firebaseUser) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }

        const user = await this.ensureUserService.execute({
            uid: firebaseUser.uid,
            email: firebaseUser.email
        })

        return reply.send(user)
    }

    async updateInfo(
        request: FastifyRequest,
        reply: FastifyReply) {
        const firebaseUser = request.user

        if (!firebaseUser) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }        

        if (!request.body) {
            return reply.status(400).send({ message: 'Request body is required.' })
        }

        const body = request.body as {
            name?: string
            email?: string
            role?: EUserRole
        }

        if (!body.name && !body.email && !body.role) {
            return reply.status(400).send({ message: 'At least one field (name, email, role) must be provided to update.' })
        }

        const updatedUser = await this.updateUserInfoService.execute({
            uid: firebaseUser.uid,
            name: body.name,
            email: body.email,
            role: body.role
        })

        return reply.send(updatedUser)
    }
}
