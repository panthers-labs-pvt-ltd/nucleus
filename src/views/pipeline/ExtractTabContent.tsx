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
  CFormSelect,
  CButton,
  CFormTextarea,
} from '@coreui/react';

interface SourceForm {
  id: number;
  sourceType: string;
  dataframeName: string;
  connectionName: string;
  sqlText: string;
  fileName: string;
  filePath: string;
  schemaPath: string;
  sourceConfig: string;
}

const ExtractTabContent: React.FC = () => {
  const [sourceForms, setSourceForms] = useState<SourceForm[]>([
    {
      id: 1,
      sourceType: 'postgres',
      dataframeName: '',
      connectionName: '',
      sqlText: '',
      fileName: '',
      filePath: '',
      schemaPath: '',
      sourceConfig: ''
    }
  ]);
  const [sourceCounter, setSourceCounter] = useState(1);

  const addSourceForm = () => {
    setSourceCounter(prev => prev + 1);
    setSourceForms([
      ...sourceForms,
      {
        id: sourceCounter + 1,
        sourceType: 'postgres',
        dataframeName: '',
        connectionName: '',
        sqlText: '',
        fileName: '',
        filePath: '',
        schemaPath: '',
        sourceConfig: ''
      }
    ]);
  };

  const removeSourceForm = (id: number) => {
    if (sourceForms.length > 1) {
      setSourceForms(sourceForms.filter(form => form.id !== id));
    }
  };

  const handleInputChange = (id: number, field: keyof SourceForm, value: string) => {
    setSourceForms(prevForms =>
      prevForms.map(form => (form.id === id ? { ...form, [field]: value } : form))
    );
  };

  const runQuery = (id: number) => {
    const form = sourceForms.find(f => f.id === id);
    console.log('Running query for form:', form);
    // Future: Trigger your backend API here
  };

  return (
    <CForm>
      {/* Source Type Section */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Source Type</h5>
        <CButton color="success" size="sm" onClick={addSourceForm}>+ Add Source</CButton>
      </div>
      {sourceForms.map((form) => (
        <CCard className="mb-3" key={`source-${form.id}`}>
          <CCardBody>
            {sourceForms.length > 1 && (
              <div className="d-flex justify-content-end mb-2">
                <CButton color="danger" size="sm" onClick={() => removeSourceForm(form.id)}>Remove</CButton>
              </div>
            )}
            <CRow className="mb-3">
              <CCol md={2}>
                <CFormLabel>SeqNum</CFormLabel>
                <CFormInput type="number" value={form.id} disabled />
              </CCol>
              <CCol md={4}>
                <CFormLabel>Source</CFormLabel>
                <CFormSelect value={form.sourceType} onChange={(e) => handleInputChange(form.id, 'sourceType', e.target.value)}>
                  <option value="postgres">Postgres</option>
                  <option value="csv">CSV</option>
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Dataframe Name</CFormLabel>
                <CFormInput type="text" value={form.dataframeName} onChange={(e) => handleInputChange(form.id, 'dataframeName', e.target.value)} placeholder="Enter Dataframe Name" />
              </CCol>
            </CRow>

            {/* Connection Name only for Postgres */}
            {form.sourceType === 'postgres' && (
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Connection Name</CFormLabel>
                  <CFormSelect value={form.connectionName} onChange={(e) => handleInputChange(form.id, 'connectionName', e.target.value)}>
                    <option value="">Select Connection</option>
                    <option value="Postgres_Connection_Local">Postgres_Connection_Local</option>
                    <option value="MySQL_Connection_Local">MySQL_Connection_Local</option>
                    <option value="Test_Connection">Test_Connection</option>
                  </CFormSelect>
                </CCol>
              </CRow>
            )}

            {form.sourceType === 'csv' && (
              <>
                <CRow className="mb-3">
                  <CCol md={6}>
                    <CFormLabel>File Name</CFormLabel>
                    <CFormInput type="text" value={form.fileName} onChange={(e) => handleInputChange(form.id, 'fileName', e.target.value)} placeholder="Enter File Name (for CSV)" />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>File Path</CFormLabel>
                    <CFormInput type="text" value={form.filePath} onChange={(e) => handleInputChange(form.id, 'filePath', e.target.value)} placeholder="Enter File Path (for CSV)" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md={6}>
                    <CFormLabel>Schema Path</CFormLabel>
                    <CFormInput type="text" value={form.schemaPath} onChange={(e) => handleInputChange(form.id, 'schemaPath', e.target.value)} placeholder="Enter Schema Path (for CSV)" />
                  </CCol>
                </CRow>
              </>
            )}

            {/* SQL Text with Monaco Editor */}
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
                  <CButton color="info" size="sm" onClick={() => runQuery(form.id)}>
                    ▶️ Run Query
                  </CButton>
                </div>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Source Configuration (JSON)</CFormLabel>
                <CFormTextarea rows={4} value={form.sourceConfig} onChange={(e) => handleInputChange(form.id, 'sourceConfig', e.target.value)} placeholder='{"delimiter":",","header":true}'></CFormTextarea>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ))}

      {/* Optional Save or Proceed Button */}
      <div className="d-flex justify-content-end mt-4">
        <CButton color="primary">Save & Continue</CButton>
      </div>
    </CForm>
  );
};

export default ExtractTabContent;
