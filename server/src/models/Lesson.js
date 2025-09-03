const mongoose = require('mongoose')

const LessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  legacyCourseKey: { type: String } // supports seeding from mock IDs like 'c1'
}, { timestamps: true })

module.exports = mongoose.model('Lesson', LessonSchema)




