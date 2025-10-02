import DropDownLayout from './DropDownLayout'
import collegeBanner from '/get_involved/collegeBanner.png'

export default function College() {
  return (
    <DropDownLayout
      img={collegeBanner}
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
