import DropDownLayout from './DropDownLayout'
import StudentBanner from '/get_involved/studentBanner.png'

export default function Student() {
  return (
    <DropDownLayout
      img={StudentBanner}
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
