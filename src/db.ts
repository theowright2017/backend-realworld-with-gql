import * as dotenv from 'dotenv'

dotenv.config()
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    
})

export default prisma;