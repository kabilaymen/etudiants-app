import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addNote } from "../api";

function FormulaireAjoutNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ nomDuCours: "", valeurDeNote: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    addNote(id, note)
      .then((response) => {
        setLoading(false);
        setNote({ nomDuCours: "", valeurDeNote: "" });

        const updatedEtudiant = response.data.etudiant;
        const updatedNotes = updatedEtudiant.notes;

        navigate(`/etudiants/${id}`, {
          state: {
            etudiant: updatedEtudiant,
            notes: updatedNotes,
          },
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        setError("An error occurred while adding the note");
      });
  };

  return (
    <div>
      <h2>Ajouter une Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du Cours</label>
          <input
            type="text"
            value={note.nomDuCours}
            onChange={(e) => setNote({ ...note, nomDuCours: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Valeur de la Note</label>
          <input
            type="number"
            value={note.valeurDeNote}
            onChange={(e) =>
              setNote({ ...note, valeurDeNote: e.target.value })
            }
            min="0"
            max="20"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter Note"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default FormulaireAjoutNote;
