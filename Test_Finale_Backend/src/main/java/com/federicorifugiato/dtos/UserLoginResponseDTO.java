package com.federicorifugiato.dtos;

import java.util.Date;

public class UserLoginResponseDTO {

	private String token;
	private Date ttl;
	private Date tct;
	private Long id;
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Date getTtl() {
		return ttl;
	}
	public void setTtl(Date ttl) {
		this.ttl = ttl;
	}
	public Date getTct() {
		return tct;
	}
	public void setTct(Date creation) {
		this.tct = creation;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
}
