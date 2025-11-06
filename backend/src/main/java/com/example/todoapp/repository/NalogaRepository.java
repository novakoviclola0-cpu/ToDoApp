package com.example.todoapp.repository;


import com.example.todoapp.model.Naloga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NalogaRepository extends JpaRepository<Naloga,Integer> {
    List<Naloga> findByOpravljeno(boolean opravljeno);
    List<Naloga> findByPomembno(boolean pomembno);
    List<Naloga> findAllByOrderByRokAsc();
    List<Naloga> findAllByOrderByRokDesc();
}

//@Repository	govori Springu da je ovo deo koji komunicira s bazom
//extends JpaRepository<Naloga, Integer>	deduje od vmesnika koji nam dozvoljava da ne moramo da posemo sve sql ukaze sami
//JpaRepository	automatski dodaje metode kao što su findAll(), save(), deleteById() itd.