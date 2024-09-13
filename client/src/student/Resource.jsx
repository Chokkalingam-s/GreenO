import React, { useState } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import './Resource.css';

const Resource = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const plantGrowthData = [
    {
      title: 'Plant Growth: Stage 1',
      description: 'Absorbs nutrients from the soil and sunlight for photosynthesis.',
    },
    {
      title: 'Plant Growth: Stage 2',
      description: 'The plant develops roots and stems that support further growth.',
    },
    {
      title: 'Plant Growth: Stage 3',
      description: 'The final stage sees the plant produce flowers and fruits, completing the growth cycle.',
    },
  ];

  return (
    <div className="grid-container">
      <StudentHeader OpenSidebar={OpenSidebar} />

      <StudentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

      <div className="main-content">
        <Container fluid className="resource-container">
          
          <section className="green-care-section mb-4 pinned-section">
            <h2 className="section-title">GreenO Plant Care</h2>
            <ul className="green-care-points pinned-points">
              <li>🌿 Water early in the morning to prevent excess evaporation.</li>
              <li>☀️ Ensure 6 hours of sunlight daily.</li>
              <li>🍃 Use organic fertilizers for nourishment.</li>
              <li>✂️ Prune plants regularly for healthy growth.</li>
              <li>💧 Monitor soil moisture, avoid over-watering.</li>
            </ul>
          </section>

          <section className="plant-growth-section">
            <h2 className="section-title">Plant Growth Process</h2>
            <Row className="plant-cards-row">
              {plantGrowthData.map((data, index) => (
                <Col key={index} md={4} className="mb-4">
                  <Card className="enhanced-card">
                    <Card.Body>
                      <Card.Title className="card-title-enhanced">{data.title}</Card.Title>
                      <Card.Text className="card-text-enhanced">{data.description}</Card.Text>
                      <Button variant="primary" className="enhanced-button">
                        Learn More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
          <section className="video-section">
            <h2 className="section-title">Video Resources</h2>
            <Row className="video-cards-row">
              <Col md={6} className="mb-4">
                <Card className="video-card-enhanced">
                  <Card.Body>
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/CBjrdMlZlfE?autoplay=1&mute=1"
                      title="YouTube video player 1"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Card.Body>
                  <Card.Footer className="video-description">Plant Growth Process</Card.Footer>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card className="video-card-enhanced">
                  <Card.Body>
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/eLACnABG2LM?autoplay=1&mute=1"
                      title="YouTube video player 2"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Card.Body>
                  <Card.Footer className="video-description">Major Mistakes We Usually Do</Card.Footer>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
      </div>
    </div>
  );
};

export default Resource;
