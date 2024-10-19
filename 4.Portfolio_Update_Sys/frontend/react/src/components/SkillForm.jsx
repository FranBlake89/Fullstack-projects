import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function SkillForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/skills/create-skill', { name, category })
      .then(response => {
        setName('');
        setCategory('');
        window.location.reload();
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="skillName">
        <Form.Label>Skill Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter skill"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="skillCategory" className="mt-2">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">Add Skill</Button>
    </Form>
  );
}

export default SkillForm;