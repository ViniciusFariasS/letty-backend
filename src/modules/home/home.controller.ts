export async function publicHome() {
    return {
        message: 'Conteúdo público'
    }
}

export async function privateHome(request: any) {
    return {
        message: `Bem-vindo ${request.user.email}`
    }
}