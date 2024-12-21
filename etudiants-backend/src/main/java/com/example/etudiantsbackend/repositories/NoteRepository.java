package com.example.etudiantsbackend.repositories;

import com.example.etudiantsbackend.models.Etudiant;
import com.example.etudiantsbackend.models.Note;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByEtudiant(Etudiant etudiant);
}
