/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import EducationForm from './EducationForm';
import SkillForm from './SkillForm';
import CertificateForm from './CertificateForm';
import Navbar from './Navbar';
import Login from './Login';
function Dashboard() {
  const [key, setKey] = useState('projects'); // Controla la pestaña activa
  const [projects, setProjects] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Cargar datos al montar el componente
    axios.get('/api/projects').then(response => setProjects(response.data));
    axios.get('/api/education').then(response => setDegrees(response.data));
    axios.get('/api/skills').then(response => setSkills(response.data));
    axios.get('/api/certificates').then(response => setCertificates(response.data));
  }, []);

  // Función genérica para eliminar un elemento
  const handleDelete = (id, type) => {
    const url = `/api/${type}/${id}`;
    axios.delete(url).then(() => {
      if (type === 'projects') setProjects(prev => prev.filter(item => item._id !== id));
      if (type === 'education') setDegrees(prev => prev.filter(item => item._id !== id));
      if (type === 'skills') setSkills(prev => prev.filter(item => item._id !== id));
      if (type === 'certificates') setCertificates(prev => prev.filter(item => item._id !== id));
    });
  };

  return (
    <>
      <Navbar />
      <Login />
    
    </>
    
  );
}

// Componente genérico de tabla para listar datos con botones de editar y borrar
function DataTable({ data, type, handleDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title/Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.title || item.name}</td>
            <td>
              <Button variant="warning" className="me-2">Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(item._id, type)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Dashboard;