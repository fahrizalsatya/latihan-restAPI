import express from 'express'
import Homework from './database.js'

const router = express.Router()

//@desc Create new homeworks
//@route POST /api/homeworks
router.post('/homeworks', async(req, res) => {
    try {
        const {
            course,
            title,
            due_date,
            status,
        } = req.body

        const homework = new Homework({
            course,
            title,
            due_date,
            status,
        })
        const createdHomework = await homework.save()

        res.status(201).json(createdHomework)

    } catch (err) {
        res.status(500).json({ error: 'Database creation failed' })
        throw err
    }
})

//@desc Get all homeworks
//@route GET /api/homeworks

router.get('/homeworks', async(req, res) => {
    const homework = await Homework.find({})
    if (homework) {
        res.json(homework)
    } else {
        res.status(404).json({
            message: "Homework not found"
        })
    }
})

//@desc Get a homeworks
//@route GET /api/homeworks/:id
router.get('/homeworks', async(req, res) => {
    const homework = await Homework.findById(req.params.Id)
    if (homework) {
        res.json(homework)
    } else {
        res.status(404).json({
            message: "Homework not found"
        })
    }
})


//@desc Update a homework
//@route PUT /api/homeworks/:id

router.put('/homeworks/:id', async(req, res) => {
    const { course, title, due_date, status } = req.body
    const homework = await Homework.findById(req.params.Id)

    if (homework) {
        homework.course = course
        homework.title = title
        homework.due_date = due_date
        homework.status = status
        const updateHomework = await homework.save()
        res.json(updateHomework)
    } else {
        res.status(404).json({
            message: 'homework not found'
        })
    }
})

//@desc Delete a homework
//@route DELETE /api/homeworks/:id
router.delete('/homeworks/:id', async(req, res) => {
    const homework = await Homework.findById(req.params.id)

    if (homework) {
        await homework.remove()
        res.json({
            message: 'homework removed'
        })
    } else {
        res.status(404).json({
            message: 'homework not found'
        })
    }
})

//@Desc Delete all homeworks
//@route DELETE /api/homeworks
router.delete('/homeworks', async(req, res) => {
    const homework = await Homework.find({})
    if (homework) {
        await homework.remove()
        res.json({
            message: 'all homework removed'
        })
    } else {
        res.status(404).json({
            message: "Homework not found"
        })
    }
})

export default router