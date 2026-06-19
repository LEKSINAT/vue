export type Project = {
  id: number
  title: string
  category: string
  summary: string
  description: string
  tools: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Student Tracking Dashboard',
    category: 'Vue App',
    summary: 'A simple dashboard for viewing student progress and attendance.',
    description:
      'This project focuses on organizing student records, showing quick progress summaries, and making classroom tracking easier for teachers.',
    tools: ['Vue', 'TypeScript', 'CSS'],
  },
  {
    id: 2,
    title: 'Sport E-Commerce Concept',
    category: 'UI Design',
    summary: 'A portfolio concept for browsing sports products and categories.',
    description:
      'This concept explores a clean shopping experience with featured products, category cards, and beginner-friendly navigation.',
    tools: ['Vue Router', 'Components', 'Responsive Design'],
  },
  {
    id: 3,
    title: 'Personal Blog Starter',
    category: 'Blog',
    summary: 'A blog-style page structure for writing project notes and updates.',
    description:
      'This starter shows how dynamic routes can load different blog or project content from one reusable detail page.',
    tools: ['Dynamic Routes', 'Route Params', 'SPA Navigation'],
  },
]
