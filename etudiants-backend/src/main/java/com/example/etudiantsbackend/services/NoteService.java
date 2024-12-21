package com.example.etudiantsbackend.services;

import com.example.etudiantsbackend.models.Note;
import com.example.etudiantsbackend.models.Etudiant;
import com.example.etudiantsbackend.repositories.NoteRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note ajouterNote(Note note) {
        return noteRepository.save(note);
    }

    public List<Note> getNotesForEtudiant(Etudiant etudiant) {
        return noteRepository.findByEtudiant(etudiant);
    }
}
