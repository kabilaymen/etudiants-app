import React, { useEffect, useState } from "react";
import { getEtudiants, addEtudiant } from "../api";
import { Link } from "react-router-dom";
import FormulaireAjoutEtudiant from "./FormulaireAjoutEtudiant";

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

  return (
    <div>
      <FormulaireAjoutEtudiant onAddEtudiant={handleAddEtudiant} />
      <h1>Liste des Étudiants</h1>
      <table border="1">
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
                style={{
                  backgroundColor: etudiant.moyenne > 10 ? "lightgreen" : "lightcoral",
                }}
              >
                <td>
                  <Link to={`/etudiants/${etudiant.id}`} state={{ etudiant }}>
                    {etudiant.nom}
                  </Link>
                </td>
                <td>{etudiant.dateDeCreation}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Aucun étudiant trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListeEtudiants;
