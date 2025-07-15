import React from 'react';

interface GrafanaEmbedProps {
  
  width?: string;
  height?: string;
}

const GrafanaEmbed: React.FC<GrafanaEmbedProps> = ({
  
  width = '100%',
  height = '600px',
}) => {
  return (
    <div style={{ width, height }}>
      <iframe
        src={'http://localhost:5173/'}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Grafana Dashboard"
      ></iframe>
    </div>
  );
};

export default GrafanaEmbed;
