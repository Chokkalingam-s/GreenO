import ContactForm from '../Contact'
import ContentWithImage from '../ContentWithImage'

export default function DropDownLayout({
  title,
  content,
  img
}) {
  return (
    <main className='mx-auto grid max-h-screen w-11/12 grid-cols-1 justify-between gap-x-6 py-14 md:grid-cols-[65%_35%]'>
      <aside>
        <ContentWithImage
          title={title}
          content={content}
          img={img}
        />
      </aside>
      <aside>
        <ContactForm />
      </aside>
    </main>
  )
}
