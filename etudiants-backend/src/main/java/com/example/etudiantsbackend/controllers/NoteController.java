package com.example.etudiantsbackend.controllers;

import com.example.etudiantsbackend.models.Note;
import com.example.etudiantsbackend.models.Etudiant;
import com.example.etudiantsbackend.services.NoteService;
import com.example.etudiantsbackend.services.EtudiantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
public class NoteController {

    private final NoteService noteService;
    private final EtudiantService etudiantService;

    public NoteController(NoteService noteService, EtudiantService etudiantService) {
        this.noteService = noteService;
        this.etudiantService = etudiantService;
    }

    @GetMapping("/{idEtudiant}/notes")
    public ResponseEntity<List<Note>> getNotesForEtudiant(@PathVariable Long idEtudiant) {
        Etudiant etudiant = etudiantService.obtenirEtudiantParId(idEtudiant)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
        
        List<Note> notes = noteService.getNotesForEtudiant(etudiant);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @PostMapping("/{idEtudiant}/notes")
    public ResponseEntity<Note> ajouterNote(@PathVariable Long idEtudiant, @RequestBody Note note) {
        Etudiant etudiant = etudiantService.obtenirEtudiantParId(idEtudiant)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
        
        note.setEtudiant(etudiant);
        Note nouvelleNote = noteService.ajouterNote(note);
        return new ResponseEntity<>(nouvelleNote, HttpStatus.CREATED);
    }
}
