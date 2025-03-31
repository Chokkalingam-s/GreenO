export default function PaginationSelector({itemPerPage, handleItemPerPage}) {
  return (
    <select onChange={e => handleItemPerPage(Number(e.target.value))} value={itemPerPage}>
      <option value={25}>Items per page</option>
      {[25, 50, 75, 100].map(num => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  )
}
