import { useState } from 'react'

export default function FilterComponent({ data, onFilter }) {
  const [order, setOrder] = useState('asc')

  const handleToggle = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc'
    setOrder(newOrder)
    const sortedData = [...data].sort((a, b) =>
      newOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    )
    onFilter(sortedData)
  }
  return (
    <div>
      <button onClick={handleToggle}>
        Sort: {order === 'asc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  )
}
