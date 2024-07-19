package com.federicorifugiato.controllers;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.federicorifugiato.dtos.MeteoDTO;
import com.federicorifugiato.dtos.UserDTO;
import com.federicorifugiato.jwt.JWTTokenNeeded;
import com.federicorifugiato.jwt.Secured;
import com.federicorifugiato.models.User;
import com.federicorifugiato.services.UserService;


@Controller
@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@JWTTokenNeeded
@Secured(role = "USER")
public class UserController {

    @Autowired
    private UserService userService;

    @GET
    @Path("/{email}")
    public Response findByEmail(@PathParam("email") String email) {
        User user = userService.findByEmail(email);
        UserDTO userDTO = new UserDTO();
        userDTO.setNome(user.getNome());
        userDTO.setCognome(user.getCognome());
        userDTO.setEmail(user.getEmail());
        userDTO.setRuolo(user.getRuolo());
        userDTO.setId(user.getId());
        List<MeteoDTO> meteoDTO = new ArrayList<MeteoDTO>();
        user.getRicercheMeteo().forEach(r -> {
        	MeteoDTO meteo = new MeteoDTO();
        	meteo.setCitta(r.getCitta());
        	meteo.setData(r.getData());
        	meteo.setId(r.getId());
        	meteo.setTempmax(r.getTempmax());
        	meteo.setTempmin(r.getTempmin());
        	meteoDTO.add(meteo);
        });
        userDTO.setRicercheMeteo(meteoDTO);
        return Response.ok(userDTO).build();
    }
}
