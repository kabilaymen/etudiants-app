package com.example.etudiantsbackend.controllers;

import com.example.etudiantsbackend.models.Etudiant;
import com.example.etudiantsbackend.services.EtudiantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {

    private final EtudiantService etudiantService;

    public EtudiantController(EtudiantService etudiantService) {
        this.etudiantService = etudiantService;
    }

    @PostMapping
    public ResponseEntity<Etudiant> creerEtudiant(@RequestBody String nom) {
        try {
            Etudiant etudiant = etudiantService.creerEtudiant(nom);
            return new ResponseEntity<>(etudiant, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Etudiant>> listerEtudiants() {
        List<Etudiant> etudiants = etudiantService.listerEtudiants();
        if (etudiants.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(etudiants, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Etudiant> obtenirEtudiant(@PathVariable Long id) {
        Optional<Etudiant> etudiantOpt = etudiantService.obtenirEtudiantParId(id);
        if (etudiantOpt.isPresent()) {
            return new ResponseEntity<>(etudiantOpt.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
