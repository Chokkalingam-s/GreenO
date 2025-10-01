import DropDownLayout from './DropDownLayout'

export default function Corp() {
  return (
    <DropDownLayout
      img='https://images.unsplash.com/photo-1755354567507-10dae25beb9a?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      title='Corporate CSR & NGOs'
      subtitle='Partner for a Better Tomorrow'
      content={{
        heroQuote: 'Together, we multiply our impact. 🤝',
        description: `Corporates and NGOs play a pivotal role in driving sustainable, scalable social change. By partnering with CG Foundation, you can channel resources, expertise, and manpower into programs that truly make a difference—like GreenO and community welfare initiatives.`,
        contributions: [
          'CSR Collaborations: Fund or co-create programs in education, environment, women empowerment, and healthcare.',
          'Employee Volunteering Programs: Engage employees in meaningful activities and campaigns.',
          'Joint Initiatives with NGOs: Scale outreach, innovation, and social impact together.'
        ],
        benefits: [
          'Demonstrate corporate social responsibility with measurable results.',
          'Strengthen brand goodwill while empowering communities.',
          'Achieve long-term sustainable change across sectors.'
        ],
        cta: 'Join hands with us to create a ripple of transformation. Fill the contact form below to start your partnership!'
      }}
    />
  )
}
