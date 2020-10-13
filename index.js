import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import router from './router.js'
const app = express()

//connect to DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('Connect to DB success')
})

//, () => {
//     console.log('Connect to DB success')
// })

// .then(() => {
//     console.log('Connect to DB success')
// }).catch(err => {
//     console.log('Connect to failed ' + err)
// }))

//middleware
app.use(morgan('dev'))
app.use(express.json())


//routes
app.get('/', (req, res, next) => {
    res.json({
        message: 'success, app listen to port 3000'
    })
})

app.use('/api', router) //http://localhost:3000/api/homeworks

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App listens to port ${PORT}`)
})