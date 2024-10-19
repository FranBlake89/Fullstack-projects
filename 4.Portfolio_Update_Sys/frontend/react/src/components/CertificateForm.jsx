import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CertificateForm = () => {
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    imgCert: '',
    urlCert: ''
  });
  const [editId, setEditId] = useState(null); // To track if we're editing an existing certificate

  // Fetch certificates on component mount
  useEffect(() => {
    fetchCertificates();
  }, []);

  // Fetch all certificates
  const fetchCertificates = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/certificates');
      setCertificates(response.data);
    } catch (err) {
      console.error('Error fetching certificates:', err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission for creating or updating a certificate
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing certificate
      await updateCertificate(editId, formData);
    } else {
      // Create new certificate
      await createCertificate(formData);
    }
    setFormData({ title: '', institution: '', imgCert: '', urlCert: '' });
    setEditId(null); // Reset edit state after submit
    fetchCertificates();
  };

  // Create a new certificate
  const createCertificate = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/certificates', data);
    } catch (err) {
      console.error('Error creating certificate:', err);
    }
  };

  // Update an existing certificate
  const updateCertificate = async (id, data) => {
    try {
      await axios.put(`http://localhost:3000/api/certificates/${id}`, data);
    } catch (err) {
      console.error('Error updating certificate:', err);
    }
  };

  // Delete a certificate
  const deleteCertificate = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/certificates/${id}`);
      fetchCertificates(); // Refresh the certificate list after deletion
    } catch (err) {
      console.error('Error deleting certificate:', err);
    }
  };

  // Load certificate data into form for editing
  const handleEdit = (certificate) => {
    setFormData({
      title: certificate.title,
      institution: certificate.institution,
      imgCert: certificate.imgCert,
      urlCert: certificate.urlCert || ''
    });
    setEditId(certificate._id);
  };

  return (
    <div>
      <h2>{editId ? 'Edit Certificate' : 'Add Certificate'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="institution"
          placeholder="Institution"
          value={formData.institution}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imgCert"
          placeholder="Image URL"
          value={formData.imgCert}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="urlCert"
          placeholder="Certificate URL (optional)"
          value={formData.urlCert}
          onChange={handleChange}
        />
        <button type="submit">{editId ? 'Update Certificate' : 'Add Certificate'}</button>
      </form>

      <h2>Certificates List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Institution</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate._id}>
              <td>{certificate.title}</td>
              <td>{certificate.institution}</td>
              <td>
                <img src={certificate.imgCert} alt={certificate.title} style={{ width: '100px' }} />
              </td>
              <td>
                <button onClick={() => handleEdit(certificate)}>Edit</button>
                <button onClick={() => deleteCertificate(certificate._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CertificateForm;
