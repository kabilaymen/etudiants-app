import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getNotes } from "../api";
import "./styles/FicheEtudiant.css";

function FicheEtudiant() {
  const { id } = useParams();
  const location = useLocation();
  const [etudiant] = useState(location.state?.etudiant || null);
  const [notes, setNotes] = useState(location.state?.notes || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!etudiant) {
      setError("Étudiant non trouvé");
      setLoading(false);
      return;
    }

    if (notes.length === 0) {
      setLoading(true);
      getNotes(id)
        .then((response) => {
          if (response.data) {
            setNotes(response.data);
            setError(null);
          } else {
            setError("Aucune note trouvée pour cet étudiant");
          }
        })
        .catch(() => {
          setError("Une erreur s'est produite lors du chargement des notes");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, etudiant, notes.length]);

  const formattedDate = (etudiant) => new Date(etudiant.dateDeCreation).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fiche-container">
      <Link to={`/`} className="back-link">Retour</Link>
      <h1 className="fiche-title">Détails de l'étudiant</h1>
      {loading && <p className="loading-text">Chargement des données...</p>}
      {error && <p className="error-text">{error}</p>}

      {etudiant && !loading && (
        <div className="etudiant-info">
          <h2 className="etudiant-name">{etudiant.nom}</h2>
          <p className="etudiant-date">Date de Création : {formattedDate(etudiant)}</p>
        </div>
      )}

      <h2 className="notes-title">Notes</h2>
      {notes.length > 0 ? (
        <table className="notes-table">
          <thead>
            <tr>
              <th>Cours</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr
                key={note.id}
                className={note.valeurDeNote > 10 ? "note-row-high" : "note-row-low"}
              >
                <td>{note.nomDuCours}</td>
                <td>{note.valeurDeNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-notes">Aucune note disponible</p>
      )}

      {!error && etudiant && (
        <Link to={`/etudiants/${id}/ajouter-note`} className="add-note-link">
          <button className="add-note-button">Ajouter une note</button>
        </Link>
      )}
    </div>
  );
}

export default FicheEtudiant;
