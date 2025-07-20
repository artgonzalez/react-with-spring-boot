package com.packt.cardb.service.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CarDTO {
	private long id;
	private String brand;
	private String model;
	private String color;
	private String registerNumber;
	private int year;
	private int price;
	@JsonBackReference
	private OwnerDTO owner;
}
