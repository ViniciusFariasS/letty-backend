import { buildApp } from './shared/app'

const app = buildApp()

app.listen({ port: 3000 }, () => {
    console.log('🚀 Server running on port 3000')
})