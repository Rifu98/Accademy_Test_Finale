package com.federicorifugiato.controllers;

import com.federicorifugiato.dtos.UserSignupDTO;
import com.federicorifugiato.jwt.JWTTokenNeeded;
import com.federicorifugiato.jwt.Secured;
import com.federicorifugiato.dtos.UserLoginDTO;
import com.federicorifugiato.dtos.UserLoginResponseDTO;
import com.federicorifugiato.models.User;
import com.federicorifugiato.services.AuthService;
import com.federicorifugiato.services.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/auth")
public class AuthController {
	
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response signup(@Valid UserSignupDTO userSignupDTO) {
        User user = authService.signup(userSignupDTO);
        if (user != null) {
            return Response.status(Response.Status.OK).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@Valid UserLoginDTO userLoginDTO) {
        User user = authService.login(userLoginDTO);
        if (user != null) {
            UserLoginResponseDTO token = issueToken(user.getEmail());
            return Response.ok(token).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @GET
    @Path("/check")
    @Produces(MediaType.APPLICATION_JSON)
    @JWTTokenNeeded
    @Secured(role = "USER")
    public Response checkSession(@HeaderParam("Authorization") String token) {
        return Response.ok().build();
    }
    
	public UserLoginResponseDTO issueToken (String email) {
	    
	      byte[] secret = "33trentinientraronoatrentotuttie33trotterellando1234567890".getBytes();
	      Key key = Keys.hmacShaKeyFor(secret);
	      
	      User informazioniUtente = userService.findByEmail(email);
	      Map<String, Object> map = new HashMap<>();
	      map.put("nome", informazioniUtente.getNome());
	      map.put("cognome", informazioniUtente.getCognome());
	      map.put("email", email);
	      map.put("ruolo", informazioniUtente.getRuolo());

	      Date creation = new Date();
	      Date end = java.sql.Timestamp.valueOf(LocalDateTime.now().plusMinutes(15L));
	      
	      String tokenJwts = Jwts.builder()
	    		  .setClaims(map)
	    		  .setIssuer("http://localhost:8080")
	    		  .setIssuedAt(creation)
	    		  .setExpiration(end)
	    		  .signWith(key)
	    		  .compact();
	      
	      UserLoginResponseDTO token = new UserLoginResponseDTO();
	      
	      token.setToken(tokenJwts);
	      token.setTct(creation);
	      token.setTtl(end);
	      token.setId(informazioniUtente.getId());
	      
	      return token;
		
	}
}
