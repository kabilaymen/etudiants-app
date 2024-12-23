import React, { useEffect, useState } from "react";
import { getEtudiants, addEtudiant } from "../api";
import { Link } from "react-router-dom";
import FormulaireAjoutEtudiant from "./FormulaireAjoutEtudiant";
import "./styles/ListeEtudiants.css";

function ListeEtudiants() {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    getEtudiants()
      .then((response) => {
        setEtudiants(response.data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setEtudiants([]);
      });
  }, []);

  const handleAddEtudiant = (nom) => {
    addEtudiant(nom)
      .then((response) => {
        setEtudiants((prevEtudiants) => [...prevEtudiants, response.data]);
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  const formattedDate = (etudiant) => new Date(etudiant.dateDeCreation).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <div className="students-list-form-container">
      <FormulaireAjoutEtudiant onAddEtudiant={handleAddEtudiant} />
      <div className="students-list-container">
        <h1 className="students-list-title">Liste des étudiants</h1>
        <table className="students-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Date de Création</th>
            </tr>
          </thead>
          <tbody>
            {etudiants.length > 0 ? (
              etudiants.map((etudiant) => (
                <tr
                  key={etudiant.id}
                  className={
                    etudiant.moyenne > 10
                      ? "student-row success-row"
                      : "student-row warning-row"
                  }
                >
                  <td>
                    <Link
                      to={`/etudiants/${etudiant.id}`}
                      state={{ etudiant }}
                      className="student-link"
                    >
                      {etudiant.nom}
                    </Link>
                  </td>
                  <td>{formattedDate(etudiant)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-students-row">
                  Aucun étudiant trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListeEtudiants;
