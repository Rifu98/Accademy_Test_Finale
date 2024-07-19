package com.federicorifugiato.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MeteoRegistrationDTO {
	@NotBlank(message = "La città non può essere vuots")
    private String citta;

    @NotNull(message = "La data non può essere vuots")
    private LocalDate data;

    @NotNull(message = "La temperatura massima non può essere vuots")
    private double tempmax;

    @NotNull(message = "La temperatura minima non può essere vuots")
    private double tempmin;

    @NotNull(message = "L'id utente non può essere vuoto")
    private Long userId;

	public String getCitta() {
		return citta;
	}

	public void setCitta(String citta) {
		this.citta = citta;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public double getTempmax() {
		return tempmax;
	}

	public void setTempmax(double d) {
		this.tempmax = d;
	}

	public double getTempmin() {
		return tempmin;
	}

	public void setTempmin(double tempmin) {
		this.tempmin = tempmin;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
