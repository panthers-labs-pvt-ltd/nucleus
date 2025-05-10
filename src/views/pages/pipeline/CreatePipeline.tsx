import React, { useState } from 'react';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton
} from '@coreui/react';

const CreatePipeline: React.FC = () => {
  const [pipelineName, setPipelineName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleCreate = () => {
    const payload = {
      pipelineName,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };
    console.log('Creating pipeline with:', payload);
    // TODO: Add API integration here
  };

  const handleCancel = () => {
    console.log('Pipeline creation cancelled');
    // TODO: Add navigation or reset logic here
  };

  return (
    <CCard>
      <CCardBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Pipeline Name *</CFormLabel>
              <CFormInput
                type="text"
                value={pipelineName}
                onChange={(e) => setPipelineName(e.target.value)}
                placeholder="Enter Pipeline Name"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Tags</CFormLabel>
              <CFormInput
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags (comma-separated)"
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Description</CFormLabel>
              <CFormTextarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Pipeline Description"
              />
            </CCol>
          </CRow>

          <div className="d-flex justify-content-end mt-4 gap-2">
            <CButton color="secondary" variant="outline" onClick={handleCancel}>
              Cancel
            </CButton>
            <CButton
              color="primary"
              disabled={!pipelineName.trim()}
              onClick={handleCreate}
            >
              Create
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default CreatePipeline;
