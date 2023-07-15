import React from 'react';
import './PageLayout.css';

export { PageLayout };

// This will contain all of our pages
function PageLayout({ children }) {
  return (
    <React.StrictMode>
      <div>{children}</div>
    </React.StrictMode>
  );
}
