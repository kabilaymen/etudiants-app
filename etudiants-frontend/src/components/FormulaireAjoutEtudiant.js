import React, { useState } from "react";

function FormulaireAjoutEtudiant({ onAddEtudiant }) {
  const [nom, setNom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEtudiant(nom);
    setNom("");
  };

  return (
    <div>
      <h2>Ajouter un Étudiant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default FormulaireAjoutEtudiant;
