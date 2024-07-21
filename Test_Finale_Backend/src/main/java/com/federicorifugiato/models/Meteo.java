package com.federicorifugiato.models;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "meteo")
public class Meteo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String citta;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private double tempmax;

    @Column(nullable = false)
    private double tempmin;

    @Column(nullable = false)
    private int weathercode;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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

	public void setTempmax(double tempmax) {
		this.tempmax = tempmax;
	}

	public double getTempmin() {
		return tempmin;
	}

	public void setTempmin(double tempmin) {
		this.tempmin = tempmin;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getWeathercode() {
		return weathercode;
	}

	public void setWeathercode(int weathercode) {
		this.weathercode = weathercode;
	}
      
}
