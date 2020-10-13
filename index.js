import express from 'express'
import morgan from 'morgan'

const app = express()

//middleware
app.use(morgan('dev'))

//routes
app.get('/', (req, res, next) => {
    res.json({
        message: 'success'
    })
})

app.listen('3000', () => {
    console.log('App listens to port 3000')
})