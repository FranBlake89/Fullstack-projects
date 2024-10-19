import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function ProjectForm() {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/projects/create-project', { title })
      .then(response => {
        setTitle('');
        window.location.reload(); // Refrescar la página para ver los nuevos proyectos
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="projectTitle">
        <Form.Label>Project Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">Add Project</Button>
    </Form>
  );
}

export default ProjectForm;