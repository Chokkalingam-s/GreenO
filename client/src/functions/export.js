import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {toast} from 'react-toastify'

export const exportToPDF = async table => {
  const start = performance.now()
  if (!table) return
  toast.info('PDF is being generated...')
  table.parentElement.classList.remove('hidden')

  const canvas = await html2canvas(table, {
    backgroundColor: '#fff',
    scale: 1
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pdfWidth - 20
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width
  console.log(pdfHeight, imgHeight, imgProps)

  let heightLeft = imgHeight
  let position = 45

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(18)
  pdf.setTextColor(0, 0, 0)
  pdf.text('R.M.K. ENGINEERING COLLEGE', pdfWidth / 2, 20, {
    align: 'center'
  })

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(12)
  pdf.text('(An Autonomous Institution)', pdfWidth / 2, 28, {
    align: 'center'
  })
  pdf.text('R.S.M NAGAR, KAVARAIPETTAI - 601 206', pdfWidth / 2, 36, {
    align: 'center'
  })

  pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
  heightLeft -= pdfHeight - position

  while (heightLeft > 0) {
    position = heightLeft - imgHeight + 45
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight
  }

  pdf.save('One student one plant - Overall Progress.pdf')
  toast.success('PDF generated successfully...')
  table.parentElement.classList.add('hidden')

  console.log(`PDF Generation Time: ${performance.now() - start} ms`)
}
