package com.example.etudiantsbackend.services;

import com.example.etudiantsbackend.models.Etudiant;
import com.example.etudiantsbackend.models.Note;
import com.example.etudiantsbackend.repositories.EtudiantRepository;
import com.example.etudiantsbackend.repositories.NoteRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService {
    private final EtudiantRepository etudiantRepository;
    private final NoteRepository noteRepository;

    public EtudiantService(EtudiantRepository etudiantRepository, NoteRepository noteRepository) {
        this.etudiantRepository = etudiantRepository;
        this.noteRepository = noteRepository;
    }

    public Etudiant creerEtudiant(String nom) {
        Etudiant etudiant = new Etudiant();
        etudiant.setNom(nom);
        return etudiantRepository.save(etudiant);
    }

    public List<Etudiant> listerEtudiants() {
        List<Etudiant> etudiants = etudiantRepository.findAll();
        etudiants.forEach(etudiant -> etudiant.setMoyenne(calculerMoyenne(etudiant)));
        return etudiants;
    }

    public Optional<Etudiant> obtenirEtudiantParId(Long id) {
        Optional<Etudiant> etudiantOpt = etudiantRepository.findById(id);
        etudiantOpt.ifPresent(etudiant -> etudiant.setMoyenne(calculerMoyenne(etudiant)));
        return etudiantOpt;
    }

    private double calculerMoyenne(Etudiant etudiant) {
        List<Note> notes = noteRepository.findByEtudiant(etudiant);
        if (notes.isEmpty()) return 0;

        double total = notes.stream().mapToDouble(Note::getValeurDeNote).sum();
        return total / notes.size();
    }
}