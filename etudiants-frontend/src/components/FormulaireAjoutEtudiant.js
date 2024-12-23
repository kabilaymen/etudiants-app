import React, { useState } from "react";
import "./styles/FormulaireAjoutEtudiant.css";

function FormulaireAjoutEtudiant({ onAddEtudiant }) {
  const [nom, setNom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEtudiant(nom);
    setNom("");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Ajouter un étudiant</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="nom" className="form-label">Nom :</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Ajouter</button>
      </form>
    </div>
  );
}

export default FormulaireAjoutEtudiant;
