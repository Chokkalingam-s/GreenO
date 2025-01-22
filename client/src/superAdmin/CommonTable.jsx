export default function CommonTable({data, tableRef}) {
  return (
    <table ref={tableRef}>
      <thead>
        <tr>
          <th className='text-left'>College Name</th>
          <th className='text-left'>State</th>
          <th className='text-left'>District</th>
          <th>Student Onboard</th>
          <th>Sapling</th>
          <th>Progress %</th>
          <th>Rank</th>
        </tr>
      </thead>
      <tbody>
        {data.map((college, index) => (
          <tr key={index}>
            <td className='text-left'>{college.collegeName}</td>
            <td className='text-left'>{college.state}</td>
            <td className='text-left'>{college.district}</td>
            <td>{college.studentsOnboard}</td>
            <td>{college.saplingCount}</td>
            <td>{college.progress}%</td>
            <td className='font-bold'>{college.rank}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
