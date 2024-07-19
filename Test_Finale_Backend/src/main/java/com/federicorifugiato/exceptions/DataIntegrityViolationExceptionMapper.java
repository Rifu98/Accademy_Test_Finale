package com.federicorifugiato.exceptions;

import com.federicorifugiato.dtos.ErrorResponse;
import org.springframework.dao.DataIntegrityViolationException;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class DataIntegrityViolationExceptionMapper implements ExceptionMapper<DataIntegrityViolationException> {

    @Override
    public Response toResponse(DataIntegrityViolationException exception) {
        ErrorResponse response = new ErrorResponse("Duplicate entry detected. Please ensure unique values for fields.");
        return Response.status(Response.Status.CONFLICT).entity(response).build();
    }
}
