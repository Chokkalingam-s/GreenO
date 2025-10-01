import DropDownLayout from './DropDownLayout'

export default function College() {
  return (
    <DropDownLayout
      img='https://images.unsplash.com/photo-1755354567507-10dae25beb9a?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      title='Colleges'
      subtitle='Campus for Change'
      content={{
        heroQuote: 'Knowledge + Action = Impact 🎓',
        description: `Colleges are hubs of innovation and social responsibility. Partnering with CG Foundation gives your institution the chance to lead environmental, educational, and social initiatives while fostering student engagement and civic responsibility.`,
        contributions: [
          'Campus Tree Drives: Participate in GreenO projects with geo-tracking and recognition.',
          'Workshops & Awareness Programs: Facilitate education, health, and skill-building events.',
          'Community Engagement: Collaborate on CSR, social projects, and research initiatives.'
        ],
        benefits: [
          'Enhance your institution’s social footprint.',
          'Inspire students to become active changemakers.',
          'Boost campus reputation and student engagement through meaningful action.'
        ],
        cta: 'Empower your campus to lead change—connect with us via the contact form below!'
      }}
    />
  )
}
