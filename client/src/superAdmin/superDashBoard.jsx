import { CountUi } from '../exp_components'

export default function SuperDashboard() {
  return (
    <div className='c_main flex-col space-y-4 py-4 max-w-4xl'>
      <h2 className='head w-full'>Dashboard</h2>
      <CountUi
        data={[0, 0]}
        title={['Overall Students Onboarded', "Overall Spaling's maintained"]}
      />
    </div>
  )
}
