import { CommerceRepository } from "./commerce.repository"

export class CreateCommerceService {
    constructor(private commerceRepository: CommerceRepository) { }

    async execute(data: {
        owner_id: string
        name: string
        address: string
        neighborhood: string
        open_hours: string
        active: boolean
    }) {
        return this.commerceRepository.createCommerce(data)
    }
}

export class FindCommercesService {
    constructor(private commerceRepository: CommerceRepository) { }

    async execute({ ownerId }: { ownerId: string }) {

        if (!ownerId) {
            return null
        }

        return this.commerceRepository.findCommerceByOwnerId(ownerId)
    }
}