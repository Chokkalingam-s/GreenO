export const toggleSortDirection = (
  field,
  setSortDirection,
  setSortField,
  sortData
) => {
  setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
  setSortField(field)
  sortData(field)
}
