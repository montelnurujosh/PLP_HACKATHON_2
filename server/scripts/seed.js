/* Seed MongoDB with initial data from src/data */
require('dotenv').config()
const { connectToDatabase } = require('../src/db/mongoose')
const data = require('../src/data')
const Course = require('../src/models/Course')
const Lesson = require('../src/models/Lesson')
const User = require('../src/models/User')
const Discussion = require('../src/models/Discussion')
const Progress = require('../src/models/Progress')

async function run() {
  await connectToDatabase()

  const existingCourses = await Course.countDocuments()
  if (existingCourses === 0) {
    const createdCourses = await Course.insertMany(data.courses.map((c) => ({
      _id: undefined,
      title: c.title,
      description: c.description,
      tags: c.tags
    })))

    const titleToId = new Map()
    createdCourses.forEach((c) => titleToId.set(c.title, c._id))

    const lessonDocs = []
    for (const [legacyCourseKey, lessons] of Object.entries(data.lessonsByCourseId)) {
      for (const l of lessons) {
        // Find by matching title from seed
        let courseId = null
        if (legacyCourseKey === 'c1') courseId = titleToId.get('Inclusive Math Foundations')
        if (legacyCourseKey === 'c2') courseId = titleToId.get('Digital Literacy Essentials')
        if (legacyCourseKey === 'c3') courseId = titleToId.get('Advanced Problem Solving')
        lessonDocs.push({
          courseId,
          title: l.title,
          content: l.content,
          completed: Boolean(l.completed),
          legacyCourseKey
        })
      }
    }
    if (lessonDocs.length) await Lesson.insertMany(lessonDocs)
  }

  const existingUser = await User.countDocuments()
  if (existingUser === 0) {
    await User.create(data.user)
  }

  const existingDiscussions = await Discussion.countDocuments()
  if (existingDiscussions === 0) {
    await Discussion.insertMany(data.discussions)
  }

  const existingProgress = await Progress.countDocuments()
  if (existingProgress === 0) {
    // No user linkage yet; create anonymous progress per course
    const user = await User.findOne()
    const courses = await Course.find()
    const docs = courses.map((c, idx) => ({
      courseId: c._id,
      userId: user._id,
      percentage: [50, 10, 0][idx] ?? 0
    }))
    if (docs.length) await Progress.insertMany(docs)
  }

  console.log('Seed completed.')
  process.exit(0)
}

run().catch((e) => {
  console.error('Seed failed', e)
  process.exit(1)
})




