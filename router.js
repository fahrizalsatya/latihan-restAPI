import express from 'express'
import Homework from './database.js'

const router = express.Router()

//@desc Create new homeworks
//@route POST /api/homeworks
router.post('/homeworks', async(req, res) => {
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
    }
})

//@desc Get all homeworks
//@route GET /api/homeworks

router.get('/homeworks', async(req, res) => {
    const homeworks = await Homework.find({})
    if (homeworks) {
        res.json(homeworks)
    } else {
        res.status(404).json({
            message: "Homework not found"
        })
    }
})

//@desc Get a homeworks
//@route GET /api/homeworks/:id
router.get('/homeworks', async(req, res) => {
    const homeworks = await Homework.findById(req.params.Id)
    if (homeworks) {
        res.json(homeworks)
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
    const homeworks = await Homework.findById(req.params.Id)

    if (homeworks) {
        homeworks.course = course
        homeworks.title = title
        homeworks.due_date = due_date
        homeworks.status = status
        const updateHomework = await homeworks.save()
        res.json(updateHomework)
    } else {
        res.status(404).json({
            message: 'homework not found'
        })
    }
})

export default router