package com.packt.cardb.service.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OwnerDTO {
    private long ownerid;
    private String firstname;
    private String lastname;
    @JsonManagedReference
    private List<CarDTO> cars;
}
