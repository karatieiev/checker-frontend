import React from 'react';
import ReactDOM from 'react-dom/client';
import Employees from "./pages/employees";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Employees />
  </React.StrictMode>
);
