package com.packt.cardb.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Car {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String brand;
	private String model;
	private String color;
	private String registerNumber;
	@Column(name="`year`")
	private int year;
	private int price;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="owner")
	private Owner owner;
	
	public Car(String brand, String model, String color, String registerNumber, int year, int price, Owner owner) {
		this.brand = brand;
		this.model = model;
		this.color = color;
		this.registerNumber = registerNumber;
		this.year = year;
		this.price = price;
		this.owner = owner;
	}

}
