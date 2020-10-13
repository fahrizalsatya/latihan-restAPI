import express from 'express'
import Homework from './database.js'

const router = express.Router()

/**
 * desc Create new homework
 * router POST/api/homework
 */
router.post('/homeworks', async(req, res, next) => {
    try {
        const { course, title, due_date, status } = req.body
        const homework = new Homework({
            course,
            title,
            due_date,
            status
        })
        const createdHomework = await homework.save({})

        res.status(201).json(createdHomework)

    } catch (err) {
        res.status(500).json({ error: 'Database creation failed' })
        throw err
    }
})

/**
 * desc GET all homeworks
 * route GET /api/homeworks
 * 
 */

router.get('/homeworks', async(req, res, next) => {
    const homeworks = await Homework.findById(req.params.Id)
    if (homeworks) {
        res.json(homeworks)
    } else {
        res.status(404).json({
            message: "Homework not found"
        })
    }

})

router.put('/homeworks/:id', async(req, res) => {
    const { course, title, due_date, status } = req.body
    const homeworks = await Homework.findById(req.params.Id)
})

export default router