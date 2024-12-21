import { useState } from 'react'
import StudentSideBar from '../components/sidebar/StudentSideBar'
import StudentHeader from '../components/sidebar/StudentHeader'
import './Resource.css'

const Resource = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [showModal, setShowModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const plantGrowthData = [
    {
      title: 'Plant Growth: Stage 1',
      description:
        'Absorbs nutrients from the soil and sunlight for photosynthesis.',
      detailedContent:
        'In Stage 1, the plant begins its life by focusing on absorbing essential nutrients from the soil through its roots. These nutrients include nitrogen, phosphorus, and potassium, which are crucial for the plant’s early development. The root system plays a critical role in anchoring the plant to the soil, ensuring stability, and providing the foundation for further growth. At the same time, the roots absorb water, which is a vital element for the plants overall health and cellular processes.As the roots expand deeper into the soil, the plant simultaneously begins to capture sunlight through its leaves. This sunlight is essential for photosynthesis, the process by which the plant converts light energy into chemical energy, producing food that fuels growth. Chlorophyll, the green pigment in leaves, enables the plant to absorb sunlight efficiently, transforming it into glucose and oxygen. This energy production is a continuous cycle, allowing the plant to thrive, grow, and build more complex structures in later stages.',
    },
    {
      title: 'Plant Growth: Stage 2',
      description:
        'The plant develops roots and stems that support further growth.',
      detailedContent:
        'In Stage 2, the plant begins to develop stronger and more robust root systems, as well as stems that serve as the main structural support for future growth. During this phase, the roots grow deeper into the soil, allowing the plant to access water and nutrients from a larger area. This is crucial for the plants overall stability and health.The development of the stem plays a pivotal role, as it supports the leaves and provides a transport system for nutrients and water. The vascular system within the stem begins to mature, allowing efficient movement of water from the roots to the leaves, and nutrients from the leaves to the rest of the plant. At this stage, the plant is preparing itself for even larger growth and begins to focus on expanding its reach above and below the ground.',
    },
  ]

  const handleLearnMoreClick = data => {
    setSelectedCard(data)
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
    setSelectedCard(null)
  }

  return (
    <div className='grid-container'>
      <StudentHeader OpenSidebar={OpenSidebar} />
      <StudentSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className='main-container'>
        <div className='main-content'>
          <Container fluid className='resource-container'>
            <section className='green-care-section mb-4 pinned-section'>
              <h2 className='section-title'>GreenO Plant Care</h2>
              <ul className='green-care-points pinned-points'>
                <li>
                  🌿 Water early in the morning to prevent excess evaporation.
                </li>
                <li>☀️ Ensure 6 hours of sunlight daily.</li>
                <li>🍃 Use organic fertilizers for nourishment.</li>
                <li>✂️ Prune plants regularly for healthy growth.</li>
                <li>💧 Monitor soil moisture, avoid over-watering.</li>
              </ul>
            </section>

            <section className='plant-growth-section'>
              <h2 className='section-title'>Plant Growth Process</h2>
              <Row className='plant-cards-row'>
                {plantGrowthData.map((data, index) => (
                  <Col key={index} md={4} className='mb-4'>
                    <Card className='enhanced-card'>
                      <Card.Body>
                        <Card.Title className='card-title-enhanced'>
                          {data.title}
                        </Card.Title>
                        <Card.Text className='card-text-enhanced'>
                          {data.description}
                        </Card.Text>
                        <Button
                          variant='primary'
                          className='enhanced-button'
                          onClick={() => handleLearnMoreClick(data)}>
                          Learn More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* Modal for displaying detailed content */}
              <Modal
                show={showModal}
                onHide={handleClose}
                centered
                className='custom-modal-width'>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedCard?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p className='detailedContent'>
                    {selectedCard?.detailedContent}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </section>
            <section className='video-section'>
              <h2 className='section-title'>Video Resources</h2>
              <Row className='video-cards-row'>
                <Col md={6} className='mb-4'>
                  <Card className='video-card-enhanced'>
                    <Card.Body>
                      <iframe
                        width='100%'
                        height='315'
                        src='https://www.youtube.com/embed/CBjrdMlZlfE?autoplay=1&mute=1'
                        title='YouTube video player 1'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                    </Card.Body>
                    <Card.Footer className='video-description'>
                      Plant Growth Process
                    </Card.Footer>
                  </Card>
                </Col>
                <Col md={6} className='mb-4'>
                  <Card className='video-card-enhanced'>
                    <Card.Body>
                      <iframe
                        width='100%'
                        height='315'
                        src='https://www.youtube.com/embed/eLACnABG2LM?autoplay=1&mute=1'
                        title='YouTube video player 2'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                    </Card.Body>
                    <Card.Footer className='video-description'>
                      Major Mistakes We Usually Do
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </section>
          </Container>
        </div>
      </main>
    </div>
  )
}

export default Resource
