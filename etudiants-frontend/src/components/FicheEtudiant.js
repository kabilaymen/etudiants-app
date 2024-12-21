import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getNotes } from "../api";

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

  return (
    <div>
      <Link to={`/`}>Retour</Link>
      <h1>Détails de l'Étudiant</h1>
      {loading && <p>Chargement des données...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {etudiant && !loading && (
        <>
          <h2>{etudiant.nom}</h2>
          <p>Date de Création : {etudiant.dateDeCreation}</p>
        </>
      )}

      <h2>Notes</h2>
      {notes.length > 0 ? (
        <table border="1">
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
                style={{
                  backgroundColor: note.valeurDeNote > 10 ? "lightgreen" : "lightcoral",
                }}
              >
                <td>{note.nomDuCours}</td>
                <td>{note.valeurDeNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune note disponible</p>
      )}

      {!error && etudiant && (
        <Link to={`/etudiants/${id}/ajouter-note`}>
          <button>Ajouter une Note</button>
        </Link>
      )}
    </div>
  );
}

export default FicheEtudiant;
