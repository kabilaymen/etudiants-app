import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addNote } from "../api";
import "./styles/FormulaireAjoutNote.css";

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
        setError("Une erreur est survenue lors de l'ajout de la note");
      });
  };

  return (
    <div className="note-form-main">
      <div className="note-form-container">
        <h2 className="note-form-title">Ajouter une note</h2>
        <form onSubmit={handleSubmit} className="note-form">
          <div className="form-group">
            <label htmlFor="nomDuCours" className="form-label">Nom du cours</label>
            <input
              type="text"
              id="nomDuCours"
              value={note.nomDuCours}
              onChange={(e) => setNote({ ...note, nomDuCours: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="valeurDeNote" className="form-label">Valeur de la note</label>
            <input
              type="number"
              id="valeurDeNote"
              value={note.valeurDeNote}
              onChange={(e) =>
                setNote({ ...note, valeurDeNote: e.target.value })
              }
              min="0"
              max="20"
              required
              className="form-input"
            />
          </div>
          <button
            type="submit"
            className={`form-button ${loading ? "form-button-loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Ajout en cours..." : "Ajouter note"}
          </button>
        </form>
        {error && <p className="form-error">{error}</p>}
      </div>
    </div>
  );
}

export default FormulaireAjoutNote;
