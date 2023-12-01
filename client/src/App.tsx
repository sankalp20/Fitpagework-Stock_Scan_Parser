import Home from "./pages/Home";
import Criterias from "./pages/Criterias";
import CriteriaDetails from "./pages/CriteriaDetails";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:criteriaId" element={<Criterias />} />
        <Route path="/:criteriaId/:variableId" element={<CriteriaDetails />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
