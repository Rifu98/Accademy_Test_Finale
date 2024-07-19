package com.federicorifugiato.daos;

import com.federicorifugiato.models.Meteo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeteoDao extends CrudRepository<Meteo, Long> {
    List<Meteo> findByUserId(Long userId);
}
