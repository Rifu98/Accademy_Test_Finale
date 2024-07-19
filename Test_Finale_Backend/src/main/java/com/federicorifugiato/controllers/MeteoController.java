package com.federicorifugiato.controllers;

import com.federicorifugiato.dtos.MeteoRegistrationDTO;
import com.federicorifugiato.jwt.JWTTokenNeeded;
import com.federicorifugiato.jwt.Secured;
import com.federicorifugiato.services.MeteoService;

import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/meteo")
@JWTTokenNeeded
@Secured(role = "USER")
public class MeteoController {

    @Autowired
    private MeteoService meteoService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveMeteo(@Valid MeteoRegistrationDTO meteoDTO) {
        meteoService.save(meteoDTO);
        return Response.status(Response.Status.OK).build();
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteMeteo(@PathParam("id") Long id) {
        meteoService.deleteMeteo(id);
        return Response.status(Response.Status.OK).build();
    }
}
