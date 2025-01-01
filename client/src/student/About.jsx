export default function StudentHome() {
  return (
    <article className='center flex-col gap-y-4 p-4 relative top-10 mt-4 md:mt-0 mb-8'>
      <div className='about'>
        <span className='pl-4'>
          <h2 className='head'>About</h2>
          <p>
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
            <strong> environmental impact</strong>.
          </p>
        </span>
        <img
          src='/home.jpg'
          alt='product'
          className='md:translate-x-4 banner'
        />
      </div>
      <div className='about'>
        <span className='pl-4'>
          <h3 className='head'>GUIDE !</h3>
          <ul className='list flex flex-col gap-y-4'>
            <li>
              <img src='/tree-solid.svg' alt='point icon' className='icon' />
              Allow the app to access your location for accuracy and legitimacy.
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
              View a comprehensive record of your tree planting activities in a
              dedicated section.
            </li>
            <li>
              <img src='/tree-solid.svg' alt='point icon' className='icon' />
              Log out securely when done to protect your account and data
              privacy.
            </li>
          </ul>
        </span>
        <img
          src='/homeImg2.png'
          alt='product'
          className='md:translate-x-5 bg-secondary banner mt-4 md:mt-0'
        />
      </div>
    </article>
  )
}
