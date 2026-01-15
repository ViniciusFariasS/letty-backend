import { db } from '../../shared/database'
import { EUserRole } from './user.types'

export class UserRepository {
    async findByFirebaseUid(firebaseUid: string) {
        const result = await db.query(
            `
      SELECT *
      FROM users
      WHERE firebase_uid = $1
      `,
            [firebaseUid]
        )

        return result.rows[0] ?? null
    }

    async create(data: {
        firebaseUid: string
        name?: string
        email?: string
    }) {
        const result = await db.query(
            `
      INSERT INTO users (firebase_uid, name, email)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
            [data.firebaseUid, data.name ?? null, data.email ?? null]
        )

        return result.rows[0]
    }

    async updateByFirebaseUid(data: {
        firebaseUid: string
        name?: string
        email?: string
        role?: EUserRole
    }) {
        const result = await db.query(
            `
        UPDATE users 
        SET name = $2, email = $3, role = $4
        WHERE firebase_uid = $1
        RETURNING *
            `,
            [data.firebaseUid, data.name ?? null, data.email ?? null, data.role]
        )

        return result.rows[0]
    }
}