import DropDownLayout from './DropDownLayout'

export default function Individual() {
  return (
    <DropDownLayout
      img='https://images.unsplash.com/photo-1755354567507-10dae25beb9a?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0'
      title='Individuals'
      subtitle='Be the Change You Wish to See'
      content={{
        heroQuote: 'Change begins with YOU. 💫',
        description: `Every individual has the power to transform lives. By joining CG Foundation, you can actively contribute to education, environment, healthcare, and women empowerment. Even small steps—like sponsoring a tree, mentoring a child, or supporting local initiatives—can create lasting impact.`,
        contributions: [
          'Tree Sponsorship & Donations: Support GreenO and other environment projects.',
          'Mentorship & Volunteering: Guide children, youth, or communities.',
          'Skill Sharing: Use your expertise to train, educate, or inspire.'
        ],
        benefits: [
          'Witness your contributions create tangible, measurable change.',
          'Feel empowered as part of a caring community.',
          'Gain opportunities for networking, personal growth, and social recognition.'
        ],
        cta: 'Start your journey of impact today—fill the contact form to connect with us!'
      }}
    />
  )
}
