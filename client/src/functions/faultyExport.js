import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {toast} from 'react-toastify'

export const exportToPDF = async table => {
  if (!table) return
  toast.info('PDF is being generated...')
  table.parentElement.classList.remove('hidden')

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()
  const margin = 10 // 10mm margin
  const contentHeight = pdfHeight - 40 // 40mm reserved for header/footer
  const tableHeader = table.querySelector('thead')

  const renderTableHeader = async () => {
    const tempHeaderTable = document.createElement('table')
    tempHeaderTable.appendChild(tableHeader.cloneNode(true))
    document.body.appendChild(tempHeaderTable) // Temporarily attach to DOM
    const canvas = await html2canvas(tempHeaderTable, {
      backgroundColor: '#fff',
      scale: 2
    })
    document.body.removeChild(tempHeaderTable) // Cleanup
    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', margin, 10, pdfWidth - 2 * margin, 15) // Fixed header height
  }

  const renderTableContent = async pageRows => {
    const tempTable = document.createElement('table')
    tempTable.appendChild(tableHeader.cloneNode(true))

    const tbody = document.createElement('tbody')
    pageRows.forEach(row => tbody.appendChild(row.cloneNode(true)))
    tempTable.appendChild(tbody)

    document.body.appendChild(tempTable) // Temporarily attach to DOM
    const canvas = await html2canvas(tempTable, {
      backgroundColor: '#fff',
      scale: 2
    })
    document.body.removeChild(tempTable) // Cleanup
    const imgData = canvas.toDataURL('image/png')
    const imgHeight =
      (canvas.height * (pdfWidth - 2 * margin)) / canvas.width
    pdf.addImage(
      imgData,
      'PNG',
      margin,
      25,
      pdfWidth - 2 * margin,
      Math.min(imgHeight, contentHeight)
    )
  }

  const rows = Array.from(table.querySelectorAll('tbody tr'))
  let pageRows = []
  let currentHeight = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const rowHeight = row.offsetHeight || 15 // Estimate if no height available
    if (currentHeight + rowHeight > contentHeight) {
      if (pageRows.length > 0) {
        await renderTableHeader()
        await renderTableContent(pageRows)
        pdf.addPage()
      }
      pageRows = []
      currentHeight = 0 // Reset for next page
    }
    pageRows.push(row)
    currentHeight += rowHeight
  }

  if (pageRows.length > 0) {
    await renderTableHeader()
    await renderTableContent(pageRows)
  }

  pdf.save('One student one plant - Overall Progress.pdf')
  toast.success('PDF generated successfully...')
  table.parentElement.classList.add('hidden')
}
