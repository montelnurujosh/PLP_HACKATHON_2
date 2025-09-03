const data = require('../data')
const mongoose = require('mongoose')
const Lesson = require('../models/Lesson')
const Course = require('../models/Course')
const UserLesson = require('../models/UserLesson')
const Progress = require('../models/Progress')
const { asClientArray, asClient } = require('../utils/transform')

async function getLessonsByCourseId(req, res) {
  const { courseId } = req.params
  try {
    let query = {}
    if (mongoose.isValidObjectId(courseId)) {
      query.courseId = courseId
    } else {
      // attempt mapping by legacy key via course title match
      const course = await Course.findOne({ title: new RegExp(courseId, 'i') })
      if (course) query.courseId = course._id
      else query.legacyCourseKey = courseId
    }
    const items = await Lesson.find(query).lean()
    if (items && items.length) return res.json(asClientArray(items))
  } catch (_) {}
  const lessons = data.lessonsByCourseId[courseId] || []
  return res.json(lessons)
}

async function getLessonById(req, res) {
  const { courseId, lessonId } = req.params
  try {
    if (mongoose.isValidObjectId(lessonId)) {
      const doc = await Lesson.findById(lessonId).lean()
      if (doc) return res.json(asClient(doc))
    }
  } catch (_) {}
  const lessons = data.lessonsByCourseId[courseId] || []
  const lesson = lessons.find((l) => l.id === lessonId)
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' })
  return res.json(lesson)
}

module.exports = { getLessonsByCourseId, getLessonById }
async function markLessonComplete(req, res) {
  const { courseId, lessonId } = req.params
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })
  try {
    // upsert completion record
    await UserLesson.findOneAndUpdate(
      { userId, lessonId },
      { $set: { userId, courseId, lessonId, completed: true } },
      { upsert: true, new: true }
    )
    // compute progress: completed / total lessons for course
    const total = await Lesson.countDocuments({ courseId })
    const completed = await UserLesson.countDocuments({ userId, courseId, completed: true })
    const pct = Math.floor((completed / Math.max(1, total)) * 100)
    const prog = await Progress.findOneAndUpdate(
      { userId, courseId },
      { $set: { percentage: pct } },
      { upsert: true, new: true }
    ).lean()
    return res.json({ courseId: String(prog.courseId), progress: prog.percentage })
  } catch (e) {
    return res.status(500).json({ error: 'Failed to update lesson status' })
  }
}

module.exports.markLessonComplete = markLessonComplete


