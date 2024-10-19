import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function EducationForm() {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/education/create-degree', { degree, institution })
      .then(response => {
        setDegree('');
        setInstitution('');
        window.location.reload(); // Refrescar la página
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="degree">
        <Form.Label>Degree</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="institution" className="mt-2">
        <Form.Label>Institution</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">Add Degree</Button>
    </Form>
  );
}

export default EducationForm;