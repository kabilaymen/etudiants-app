import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListeEtudiants from "./components/ListeEtudiants";
import FicheEtudiant from "./components/FicheEtudiant";
import FormulaireAjoutNote from "./components/FormulaireAjoutNote";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListeEtudiants />} />
        <Route path="/etudiants/:id" element={<FicheEtudiant />} />
        <Route path="/etudiants/:id/ajouter-note" element={<FormulaireAjoutNote />} />
      </Routes>
    </Router>
  );
}

export default App;
