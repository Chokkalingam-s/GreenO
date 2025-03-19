export const abbreviateDepartmentName = department =>
  department
    .split(' ')
    .map(word => {
      if (word.toLowerCase() === 'and') return ''
      if (word.startsWith('(') && word.endsWith(')')) return word
      return word.charAt(0).toUpperCase()
    })
    .filter(Boolean)
    .join('')
