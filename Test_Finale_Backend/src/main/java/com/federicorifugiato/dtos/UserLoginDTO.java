package com.federicorifugiato.dtos;

import jakarta.validation.constraints.*;

public class UserLoginDTO {

    @Email(message = "Formato email non valido")
    @NotBlank(message = "L'email non può essere vuota")
    private String email;

    @NotBlank(message = "La password non può essere vuota")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    message = "Password debole")
    private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
