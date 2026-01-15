import { FastifyInstance } from "fastify";
import { CommerceController } from "./commerce.controller";
import { authMiddleware } from "../../shared/plugins/auth";
import { CreateCommerceService, FindCommercesService } from "./commerce.service";
import { CommerceRepository } from "./commerce.repository";
import { UserRepository } from "../user/user.repository";
import { ICreateCommerceBody } from "./commerce.types";

export async function commerceRoutes(app: FastifyInstance) {
    const commerceRepository = new CommerceRepository()
    const createCommerceService = new CreateCommerceService(commerceRepository)
    const findCommercesService = new FindCommercesService(commerceRepository)
    const userRepository = new UserRepository()

    const commerceController = new CommerceController(createCommerceService, findCommercesService, userRepository)

    app.post<{ Body: ICreateCommerceBody }>(
        '/create',
        { preHandler: [authMiddleware] },
        (request, reply) => commerceController.create(request, reply)
    )

    app.get(
        '/list',
        { preHandler: [authMiddleware] },
        (request, reply) => commerceController.list(request, reply)
    )
}