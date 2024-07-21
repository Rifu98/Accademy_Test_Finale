package com.federicorifugiato.services.impl;

import com.federicorifugiato.daos.MeteoDao;
import com.federicorifugiato.dtos.MeteoRegistrationDTO;
import com.federicorifugiato.models.Meteo;
import com.federicorifugiato.services.MeteoService;
import com.federicorifugiato.services.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeteoServiceImpl implements MeteoService {

    @Autowired
    private MeteoDao meteoDao;

    @Autowired
    private UserService userService;

    @Override
    public void save(MeteoRegistrationDTO meteoDTO) {
        Meteo meteo = new Meteo();
        meteo.setCitta(meteoDTO.getCitta());
        meteo.setData(meteoDTO.getData());
        meteo.setTempmax(meteoDTO.getTempmax());
        meteo.setTempmin(meteoDTO.getTempmin());
        meteo.setWeathercode(meteoDTO.getWeathercode());
        meteo.setUser(userService.findById(meteoDTO.getUserId()));
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
