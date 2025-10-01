import DropDownLayout from './DropDownLayout'

export default function Student() {
  return (
    <DropDownLayout
      img='https://images.unsplash.com/photo-1755354567507-10dae25beb9a?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      title='Students'
      subtitle='Join the Green Revolution'
      content={{
        heroQuote:
          'Your small hands can make a giant change. 🌱',
        description: `Students are the future changemakers! At CG Foundation, your energy, creativity, and dedication can make a tangible difference. Whether it’s planting a tree through GreenO, conducting awareness drives, or participating in skill-building workshops—you can spark ripples of transformation in your community.`,
        contributions: [
          'GreenO Tree Planting: Plant, nurture, and track saplings with geo-verified and AI-supported validation.',
          'Volunteering Programs: Join campaigns in education, health awareness, and community services.',
          'Innovative Ideas: Share projects that solve local problems.'
        ],
        benefits: [
          'Enhance your leadership and organizational skills.',
          'Earn recognition, certificates, and awards for your contribution.',
          'Be part of a nationwide movement of conscious students.'
        ],
        cta: 'Ready to make an impact? Fill out the contact form below to get started!'
      }}
    />
  )
}
