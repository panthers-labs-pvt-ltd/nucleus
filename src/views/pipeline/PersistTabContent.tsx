import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
} from '@coreui/react';

interface TransformForm {
  id: number;
  sqlText: string;
}

const PersistTabContent: React.FC = () => {
  const [transformForms, setTransformForms] = useState<TransformForm[]>([
    {
      id: 1,
      sqlText: ''
    }
  ]);
  const [transformCounter, setTransformCounter] = useState(1);

  const addTransformForm = () => {
    setTransformCounter(prev => prev + 1);
    setTransformForms([
      ...transformForms,
      {
        id: transformCounter + 1,
        sqlText: ''
      }
    ]);
  };

  const removeTransformForm = (id: number) => {
    if (transformForms.length > 1) {
      setTransformForms(transformForms.filter(form => form.id !== id));
    }
  };

  const handleInputChange = (id: number, field: keyof TransformForm, value: string) => {
    setTransformForms(prevForms =>
      prevForms.map(form => (form.id === id ? { ...form, [field]: value } : form))
    );
  };

  const runTransformQuery = (id: number) => {
    const form = transformForms.find(f => f.id === id);
    console.log('Running transform query for form:', form);
    // Future: Trigger your backend API here
  };

  return (
    <CForm>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Transformations</h5>
        <CButton color="success" size="sm" onClick={addTransformForm}>+ Add Persist</CButton>
      </div>
      {transformForms.map((form) => (
        <CCard className="mb-3" key={`transform-${form.id}`}>
          <CCardBody>
            {transformForms.length > 1 && (
              <div className="d-flex justify-content-end mb-2">
                <CButton color="danger" size="sm" onClick={() => removeTransformForm(form.id)}>Remove</CButton>
              </div>
            )}
            <CRow className="mb-3">
              <CCol md={2}>
                <CFormLabel>SeqNum</CFormLabel>
                <CFormInput type="number" value={form.id} disabled />
              </CCol>

            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>SQL Text</CFormLabel>
                <Editor
                  height="200px"
                  defaultLanguage="sql"
                  theme="vs-dark"
                  value={form.sqlText}
                  onChange={(value) => handleInputChange(form.id, 'sqlText', value || '')}
                />
                <div className="d-flex justify-content-end mt-2">
                  <CButton color="info" size="sm" onClick={() => runTransformQuery(form.id)}>
                    ▶️ Run Query
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ))}

      <div className="d-flex justify-content-end mt-4">
        <CButton color="primary">Save & Continue</CButton>
      </div>
    </CForm>
  );
};

export default PersistTabContent;
