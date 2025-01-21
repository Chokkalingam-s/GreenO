import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const exportToPDF = table => {
  if (!table) return
  table.parentElement.classList.remove('hidden')
  html2canvas(table, { backgroundColor: '#fff', scale: 2 })
    .then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('portrait', 'mm', 'a4')

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(18)
      pdf.setTextColor(0, 0, 0)
      pdf.text(
        'R.M.K. ENGINEERING COLLEGE',
        pdf.internal.pageSize.getWidth() / 2,
        20,
        { align: 'center' }
      )

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(12)
      pdf.text(
        '(An Autonomous Institution)',
        pdf.internal.pageSize.getWidth() / 2,
        28,
        { align: 'center' }
      )
      pdf.text(
        'R.S.M NAGAR, KAVARAIPETTAI - 601 206',
        pdf.internal.pageSize.getWidth() / 2,
        36,
        { align: 'center' }
      )

      pdf.addImage(imgData, 'PNG', 10, 45, 190, 0)
      pdf.save('One student one plant - Overall Progress.pdf')
    })
    .finally(() => {
      table.parentElement.classList.add('hidden')
    })
}
