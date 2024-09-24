// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace with your ESP32's IP address
  const ESP32_IP = 'http://192.168.1.156'; // Example IP

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ESP32_IP}/data`);
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from ESP32:', error);
        setLoading(false);
      }
    };

    // Fetch data on component mount
    fetchData();

    // Optional: Set interval to fetch data periodically
    const interval = setInterval(fetchData, 5000); // every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [ESP32_IP]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading data...</p>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="text-center mt-5">
        <p>Error fetching data. Please ensure the ESP32 is connected and the IP address is correct.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">CHARGE CONTROLLER Dashboard</h1>
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Charging Status</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>State:</strong> {data.charger_state}
              </Card.Text>
              <Card.Text>
                <strong>PWM Duty Cycle:</strong> {data.pwm}%
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>Solar Panel</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Current:</strong> {data.sol_amps} A
              </Card.Text>
              <Card.Text>
                <strong>Voltage:</strong> {data.sol_volts} V
              </Card.Text>
              <Card.Text>
                <strong>Power:</strong> {data.sol_watts} W
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Battery</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Voltage:</strong> {data.bat_volts} V
              </Card.Text>
              <Card.Text>
                <strong>Load Status:</strong> {data.load_status}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>System Info</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Uptime:</strong> {data.seconds} seconds
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h4 className="mt-48">By Fochu felix Awah</h4>
    </Container>
  );
};

export default Dashboard;
