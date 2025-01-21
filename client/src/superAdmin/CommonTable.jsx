export default function CommonTable({data}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Sno</th>
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
            <td>{college.sno}</td>
            <td className='text-left'>{college.collegeName}</td>
            <td className='text-left'>{college.state}</td>
            <td className='text-left'>{college.district}</td>
            <td>{college.studentOnboard}</td>
            <td>{college.sapling}</td>
            <td>{college.progress}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
