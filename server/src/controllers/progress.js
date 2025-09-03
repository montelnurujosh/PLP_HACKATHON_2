const data = require('../data')
const Progress = require('../models/Progress')
const Lesson = require('../models/Lesson')
const { asClient } = require('../utils/transform')

async function getAllProgress(req, res) {
  try {
    const items = await Progress.find({ userId: req.user?.id }).lean()
    if (items && items.length) {
      const map = {}
      for (const p of items) map[String(p.courseId)] = p.percentage
      return res.json(map)
    }
  } catch (_) {}
  return res.json(data.progressByCourseId)
}

async function getProgressForCourse(req, res) {
  const { courseId } = req.params
  try {
    const doc = await Progress.findOne({ courseId, userId: req.user?.id }).lean()
    if (doc) return res.json({ courseId: String(doc.courseId), progress: doc.percentage })
  } catch (_) {}
  const value = data.progressByCourseId[courseId]
  if (typeof value === 'number') return res.json({ courseId, progress: value })
  // Fallback: compute from lessons if not preset
  const lessons = data.lessonsByCourseId[courseId] || []
  const pct = Math.floor((lessons.filter((l) => l.completed).length / Math.max(1, lessons.length)) * 100)
  return res.json({ courseId, progress: pct })
}

module.exports = { getAllProgress, getProgressForCourse }
async function setProgressForCourse(req, res) {
  const { courseId } = req.params
  const { progress } = req.body || {}
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })
  const pct = Math.max(0, Math.min(100, Number(progress) || 0))
  try {
    const doc = await Progress.findOneAndUpdate(
      { courseId, userId },
      { $set: { percentage: pct } },
      { new: true, upsert: true }
    ).lean()
    return res.json({ courseId: String(doc.courseId), progress: doc.percentage })
  } catch (e) {
    return res.status(500).json({ error: 'Failed to update progress' })
  }
}

module.exports.setProgressForCourse = setProgressForCourse


