const mongoose = require('mongoose')

const UserLessonSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true })

UserLessonSchema.index({ userId: 1, lessonId: 1 }, { unique: true })

module.exports = mongoose.model('UserLesson', UserLessonSchema)




