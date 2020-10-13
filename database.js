import mongoose from 'mongoose'

const homeWorkSchema = mongoose.Schema({
    course: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Homework = mongoose.model('Homework', homeWorkSchema)

export default Homework