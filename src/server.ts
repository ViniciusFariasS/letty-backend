import 'dotenv/config'
import { buildApp } from './shared/app'

const app = buildApp()

app.listen({
    port: 3000,
    host: '0.0.0.0'
})