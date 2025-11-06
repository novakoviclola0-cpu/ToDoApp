package com.example.todoapp.controller;


import com.example.todoapp.model.Naloga;
import com.example.todoapp.repository.NalogaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController //oznacava da kalsa vraca podatke JSON a ne html
@RequestMapping("/naloge") //svi url pocinju sa /naloge
public class NalogaController {

    @Autowired //Ova linija automatski ubacuje instancu klase NalogaRepository
    private NalogaRepository nalogaRepository;

    @GetMapping//PRIKAZ SVIH
    public List<Naloga> getAllNaloge() {
        return nalogaRepository.findAll();
    }

    @GetMapping("/{id}") //PRIKAZ PO ID
    public Optional<Naloga> getNalogaById(@PathVariable int id) {
        return nalogaRepository.findById(id);
    }

    @PostMapping //DODAVANJE
    public Naloga addNaloga(@RequestBody Naloga naloga) {
        return nalogaRepository.save(naloga);
    }

    @PutMapping("/{id}") //IZMENI
    public Naloga updateNaloga(@PathVariable int id, @RequestBody Naloga nalogaDetails) {
        Naloga naloga = nalogaRepository.findById(id).orElseThrow();
        naloga.setIme(nalogaDetails.getIme());
        naloga.setOpis(nalogaDetails.getOpis());
        naloga.setOpravljeno(nalogaDetails.isOpravljeno());
        naloga.setRok(nalogaDetails.getRok());
        naloga.setPomembno(nalogaDetails.isPomembno());
        return nalogaRepository.save(naloga);
    }

    @PutMapping("/{id}/status") //OPRAVLJAENO
    public ResponseEntity<Naloga> updateOpravljeno(@PathVariable int id, @RequestBody Map<String, Object> body) {
        Optional<Naloga> optionalNaloga = nalogaRepository.findById(id);
        if (optionalNaloga.isPresent()) {
            Naloga n = optionalNaloga.get();

            Object value = body.get("opravljeno");
            if (value instanceof Boolean) {
                n.setOpravljeno((Boolean) value);
            } else if (value instanceof String) {
                n.setOpravljeno(Boolean.parseBoolean((String) value));
            }

            nalogaRepository.save(n);
            return ResponseEntity.ok(n);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNaloga(@PathVariable int id) {
        if (nalogaRepository.existsById(id)) {
            nalogaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/filter")
    public List<Naloga> filterNaloga(
            @RequestParam(required = false)Boolean opravljeno,
            @RequestParam(required = false)Boolean pomembno,
            @RequestParam(required = false)String sort){

        if (opravljeno != null) {
            return nalogaRepository.findByOpravljeno(opravljeno);
        }
        if (pomembno != null) {
            return nalogaRepository.findByPomembno(pomembno);
        }
        if ("asc".equalsIgnoreCase(sort)) {
            return nalogaRepository.findAllByOrderByRokAsc();
        }
        if ("desc".equalsIgnoreCase(sort)) {
            return nalogaRepository.findAllByOrderByRokDesc();
        }
        return nalogaRepository.findAll();

    }


}