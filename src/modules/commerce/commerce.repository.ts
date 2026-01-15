import { db } from "../../shared/database"

export class CommerceRepository {
    async findCommerceById(commerceId: string) {
        const result = await db.query(
            `
          SELECT *
          FROM commerce
          WHERE id = $1
          `,
            [commerceId]
        )

        return result.rows[0] ?? null
    }

    async findCommerceByOwnerId(ownerId: string) {
        const result = await db.query(
            `
          SELECT *
          FROM commerces
          WHERE owner_id = $1
          `,
            [ownerId]
        )

        return result.rows[0] ?? null
    }

    async createCommerce(data: {
        owner_id: string
        name: string
        address: string
        neighborhood: string
        open_hours: string
        active: boolean
    }) {
        const result = await db.query(
            `
          INSERT INTO commerces (owner_id, name, address, neighborhood, open_hours, active) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [
                data.owner_id,
                data.name,
                data.address,
                data.neighborhood,
                data.open_hours,
                data.active,
            ]
        )
        return result.rows[0]

    }
}