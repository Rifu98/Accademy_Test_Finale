package com.federicorifugiato.services;

import com.federicorifugiato.dtos.MeteoDTO;
import com.federicorifugiato.dtos.MeteoRegistrationDTO;
import com.federicorifugiato.models.Meteo;

import java.util.List;

public interface MeteoService {
    void save(MeteoRegistrationDTO meteoDTO);
    List<Meteo> findByUserId(Long userId);
    void deleteMeteo(Long meteoId);
}
