import {CountUi} from '../exp_components'

export default function SuperDashboard() {
  return (
    <div className='c_main flex-col'>
      <CountUi
        data={[0, 0]}
        head='Dashboard'
        title={[
          'Students Onboarded',
          "Sapling's Maintained"
        ]}
      />
    </div>
  )
}
