import React from "react";
import ReactDOM from "react-dom/client";
import Employees from "./pages/employees";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Report from "./pages/report";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/report" element={<Report />} />
            <Route path="/employees" element={<Employees />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
