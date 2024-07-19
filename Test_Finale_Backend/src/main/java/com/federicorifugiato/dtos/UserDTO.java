package com.federicorifugiato.dtos;

import java.util.List;

import jakarta.validation.constraints.*;

public class UserDTO {
    @NotNull
    private Long id;

    @NotBlank
    private String nome;

    @NotBlank
    private String cognome;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String ruolo;
    
    private List<MeteoDTO> ricercheMeteo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRuolo() {
		return ruolo;
	}

	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}

	public List<MeteoDTO> getRicercheMeteo() {
		return ricercheMeteo;
	}

	public void setRicercheMeteo(List<MeteoDTO> ricercheMeteo) {
		this.ricercheMeteo = ricercheMeteo;
	}  
     
}
