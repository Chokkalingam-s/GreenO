export default function Card({ title, content }) {
  return (
    <div className='border rounded-lg shadow-lg p-6 bg-white'>
      <h3 className='text-xl font-semibold mb-4'>{title}</h3>
      <p className='text-gray-700 mb-4'>{content}</p>
      <button className='text-blue-500 hover:underline'>Learn More</button>
    </div>
  )
}
