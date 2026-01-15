import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../shared/plugins/auth";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { EnsureUserService, UpdateUserInfoService } from "./user.service";

export async function userRoutes(app: FastifyInstance) {
    const userRepository = new UserRepository();
    const ensureUserService = new EnsureUserService(userRepository)
    const updateUserInfoService = new UpdateUserInfoService(userRepository)

    const userController = new UserController(ensureUserService, updateUserInfoService)

    app.get(
        '/me',
        { preHandler: [authMiddleware] },
        (request, reply) => userController.me(request, reply)
    )

    app.put(
        '/info',
        { preHandler: [authMiddleware] },
        (request, reply) => userController.updateInfo(request, reply)
    )
}

