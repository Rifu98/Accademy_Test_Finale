package com.federicorifugiato.services.impl;

import com.federicorifugiato.daos.MeteoDao;
import com.federicorifugiato.dtos.MeteoRegistrationDTO;
import com.federicorifugiato.models.Meteo;
import com.federicorifugiato.services.MeteoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeteoServiceImpl implements MeteoService {

    @Autowired
    private MeteoDao meteoDao;

    private ModelMapper modelMapper = new ModelMapper();

    @Override
    public void save(MeteoRegistrationDTO meteoDTO) {
        Meteo meteo = modelMapper.map(meteoDTO, Meteo.class);
        meteoDao.save(meteo);
    }

    @Override
    public List<Meteo> findByUserId(Long userId) {
        return meteoDao.findByUserId(userId);
    }

    @Override
    public void deleteMeteo(Long meteoId) {
        Optional<Meteo> meteoOptional = meteoDao.findById(meteoId);
        Meteo meteo = meteoOptional.get();
        meteoDao.delete(meteo);
    }
}
