// DropDownLayout.jsx
import ContactForm from '../Contact'
import ContentWithImage from '../ContentWithImage'

export default function DropDownLayout({
  title,
  subtitle,
  content,
  img
}) {
  return (
    <main className='mx-auto w-11/12 grid md:grid-cols-[65%_35%] gap-x-10 grid-cols-1'>
      <aside className='pr-4 mt-10'>
        <ContentWithImage
          title={title}
          subtitle={subtitle}
          content={content}
          img={img}
        />
      </aside>
      <aside className='sticky top-10 self-start'>
        <ContactForm />
      </aside>
    </main>
  )
}
