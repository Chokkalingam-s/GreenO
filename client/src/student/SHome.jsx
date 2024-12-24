export default function SHome() {
  return (
    <main className='container center mb-16'>
      <article className='md:max-w-[75ch] center flex-col gap-y-4 p-4'>
        <h2 className='head'>About Us</h2>
        <div className='grid md:grid-cols-[30%_70%] gap-x-4 items-center justify-center glassy rounded-xl shadow-lg p-2 text-sm'>
          <img src='/home.jpg' alt='product' className='md:-translate-x-6' />
          <p className='md:-translate-x-6'>
            A sustainable initiative encouraging students to
            <strong> plant</strong> and <strong>care</strong> for a
            <strong> tree</strong> during their academic journey. It aims to
            instill <strong>environmental responsibility</strong> and connect
            education with <strong>ecological conservation</strong>. By linking
            students with tree growth, the project contributes to
            <strong>carbon sequestration</strong>, <strong>biodiversity</strong>
            , and overall <strong>environmental well-being</strong>. “
            <i>
              <strong>One Student One Tree</strong>
            </i>
            ” demonstrates how small actions can collectively make a significant
            positive
            <strong>environmental impact</strong>.
          </p>
        </div>
        <div className='glassy p-2 rounded-xl shadow-lg'>
          <h3 className='font-bold text-2xl'>How to Use This App !?</h3>
          <div className='grid md:grid-cols-[70%_30%] gap-x-4 items-center justify-center p-2 text-sm'>
            <ul className='list flex flex-col gap-y-4'>
              <li>
                <img src='/tree-solid.svg' alt='point icon' className='icon' />
                Allow the app to access your location for accuracy and
                legitimacy.
              </li>
              <li>
                <img src='/tree-solid.svg' alt='point icon' className='icon' />
                Upload images of trees planted each semester.
              </li>
              <li>
                <img src='/tree-solid.svg' alt='point icon' className='icon' />
                Suspicious or unauthorized activities will be reported to the
                college for verification.
              </li>
              <li>
                <img src='/tree-solid.svg' alt='point icon' className='icon' />
                View a comprehensive record of your tree planting activities in
                a dedicated section.
              </li>
              <li>
                <img src='/tree-solid.svg' alt='point icon' className='icon' />
                Log out securely when done to protect your account and data
                privacy.
              </li>
            </ul>
            <img
              src='/homeImg2.png'
              alt='product'
              className='md:translate-x-10 bg-secondary mt-4 md:mt-0'
            />
          </div>
        </div>
      </article>
    </main>
  )
}
