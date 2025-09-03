const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

function getToken() {
  try {
    return localStorage.getItem('edu_token') || ''
  } catch {
    return ''
  }
}

export async function fetchJson(path, options = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {})
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const api = {
  getHealth: () => fetchJson('/health'),
  getUser: () => fetchJson('/users/me'),
  getCourses: () => fetchJson('/courses'),
  getCourse: (courseId) => fetchJson(`/courses/${courseId}`),
  getLessonsByCourse: (courseId) => fetchJson(`/lessons/course/${courseId}`),
  getLesson: (courseId, lessonId) => fetchJson(`/lessons/${courseId}/${lessonId}`),
  completeLesson: (courseId, lessonId) => fetchJson(`/lessons/${courseId}/${lessonId}/complete`, { method: 'POST' }),
  getDiscussions: () => fetchJson('/community/discussions'),
  getProgressAll: () => fetchJson('/progress'),
  getProgressForCourse: (courseId) => fetchJson(`/progress/${courseId}`),
  setProgressForCourse: (courseId, progress) => fetchJson(`/progress/${courseId}`, { method: 'PATCH', body: JSON.stringify({ progress }) }),
  signup: (body) => fetchJson('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => fetchJson('/auth/login', { method: 'POST', body: JSON.stringify(body) })
}


