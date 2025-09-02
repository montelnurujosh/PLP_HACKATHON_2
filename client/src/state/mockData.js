export const mockUser = {
  id: 'u1',
  name: 'Amina',
  preferences: { theme: 'system', fontScale: 1 }
}

export const mockTags = ['STEM', 'Literacy', 'Inclusive', 'Beginner', 'Advanced']

export const mockCourses = [
  {
    id: 'c1',
    title: 'Inclusive Math Foundations',
    description: 'Accessible math concepts with multi-modal explanations.',
    tags: ['STEM', 'Inclusive', 'Beginner']
  },
  {
    id: 'c2',
    title: 'Digital Literacy Essentials',
    description: 'Build critical digital skills for learning and life.',
    tags: ['Literacy', 'Beginner']
  },
  {
    id: 'c3',
    title: 'Advanced Problem Solving',
    description: 'Challenge yourself with complex real-world problems.',
    tags: ['STEM', 'Advanced']
  }
]

export const mockLessonsByCourseId = {
  c1: [
    { id: 'l1', title: 'Numbers and Patterns', completed: true, content: 'Explainer content with text and diagrams.' },
    { id: 'l2', title: 'Fractions in Daily Life', completed: false, content: 'Interactive examples and practice.' }
  ],
  c2: [
    { id: 'l1', title: 'Safe Browsing', completed: false, content: 'Safety basics and best practices.' },
    { id: 'l2', title: 'Online Collaboration', completed: false, content: 'Tools and techniques for teamwork.' }
  ],
  c3: [
    { id: 'l1', title: 'Logical Reasoning', completed: false, content: 'Puzzles to train reasoning.' }
  ]
}

export const mockProgressByCourseId = {
  c1: 50,
  c2: 10,
  c3: 0
}

export const mockDiscussions = [
  { id: 'd1', title: 'Welcome to EduConnect', body: 'Introduce yourself and share your goals.' },
  { id: 'd2', title: 'Accessibility tips', body: 'Share helpful tools and practices.' }
]


