import { UserRepository } from "./user.repository"
import { EUserRole } from "./user.types"

export class EnsureUserService {
    constructor(private userRepository: UserRepository) { }

    async execute(firebaseUser: {
        uid: string
        name?: string
        email?: string
    }) {
        const existingUser: any = await this.userRepository.findByFirebaseUid(
            firebaseUser.uid
        )

        if (existingUser) {
            return existingUser
        }

        return this.userRepository.create({
            firebaseUid: firebaseUser.uid,
            name: firebaseUser.name ?? 'Usuário',
            email: firebaseUser.email ?? ''
        })
    }
}

export class UpdateUserInfoService {
    constructor(private userRepository: UserRepository) { }

    async execute(firebaseUser: {
        uid: string
        name?: string
        email?: string
        role?: EUserRole
    }) {
        const existingUser: any = await this.userRepository.findByFirebaseUid(
            firebaseUser.uid
        )

        if (!existingUser) {
            return false
        }

        const updateInfo = {
            name: firebaseUser.name ?? existingUser.name,
            email: firebaseUser.email ?? existingUser.email,
            role: firebaseUser.role ?? existingUser.role
        }

        return await this.userRepository.updateByFirebaseUid({
            firebaseUid: firebaseUser.uid,
            ...updateInfo
        })
    }
}