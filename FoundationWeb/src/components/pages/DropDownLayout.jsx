import ContactForm from '../Contact'
import ContentWithImage from '../ContentWithImage'

export default function DropDownLayout({
  title,
  subtitle,
  content,
  img
}) {
  return (
    <main className='mx-auto grid w-11/12 md:gap-x-10 md:grid-cols-[65%_35%] grid-col-1'>
      <aside>
        <ContentWithImage
          title={title}
          subtitle={subtitle}
          content={content}
          img={img}
        />
      </aside>
      <aside className='md:sticky md:top-14'>
        <ContactForm />
      </aside>
    </main>
  )
}
