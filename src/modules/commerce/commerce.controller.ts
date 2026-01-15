import { FastifyReply, FastifyRequest } from "fastify"
import { CreateCommerceService, FindCommercesService } from "./commerce.service"
import { ICreateCommerceBody } from "./commerce.types"
import { UserRepository } from "../user/user.repository"

export class CommerceController {
    constructor(private createCommerceService: CreateCommerceService,
        private findCommercesService: FindCommercesService,
        private userRepository: UserRepository) { }

    async create(
        request: FastifyRequest<{ Body: ICreateCommerceBody }>,
        reply: FastifyReply) {
        const firebaseUser = request.user


        if (!firebaseUser) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }

        const user = await this.userRepository.findByFirebaseUid(firebaseUser.uid)

        const commerce = await this.createCommerceService.execute({
            owner_id: user.id,
            name: request.body.name,
            address: request.body.address,
            neighborhood: request.body.neighborhood,
            open_hours: request.body.open_hours,
            active: request.body.active
        })

        return reply.send(commerce)
    }


    async list(
        request: FastifyRequest,
        reply: FastifyReply) {
        const firebaseUser = request.user
        if (!firebaseUser) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }
        const user = await this.userRepository.findByFirebaseUid(firebaseUser.uid)

        const commerces = await this.findCommercesService.execute({ ownerId: user.id })

        return reply.send(commerces)
    }

}