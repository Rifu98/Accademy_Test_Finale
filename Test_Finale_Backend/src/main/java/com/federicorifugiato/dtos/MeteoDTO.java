package com.federicorifugiato.dtos;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class MeteoDTO {
    @NotNull(message = "L'id non può essere vuoto")
    private Long id;

    @NotBlank(message = "La città non può essere vuots")
    private String citta;

    @NotNull(message = "La data non può essere vuota")
    private LocalDate data;

    @NotNull(message = "La temperatura massima non può essere vuota")
    private double tempmax;

    @NotNull(message = "Il codice meteo non può essere vuoto")
    private int weathercode;

    @NotNull(message = "La temperatura minima non può essere vuota")
    private double tempmin;

    @NotNull(message = "L'id utente non può essere vuoto")
    private Long userId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public int getWeathercode() {
		return weathercode;
	}

	public void setWeathercode(int weathercode) {
		this.weathercode = weathercode;
	}
    
}
