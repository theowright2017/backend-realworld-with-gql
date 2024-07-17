import app from './server/server'
import * as dotenv from 'dotenv'

dotenv.config()
const port = 3000

app.listen(port, () => {
    console.log('Connected to pO rt ' + port)
})