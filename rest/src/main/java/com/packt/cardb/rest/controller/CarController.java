package com.packt.cardb.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.packt.cardb.service.CarService;
import com.packt.cardb.service.model.CarDTO;

@RestController
@RequestMapping("/api")
public class CarController {
	@Autowired CarService carService;
	
	@GetMapping("/cars")
	ResponseEntity<Iterable<CarDTO>> all() {
		Iterable<CarDTO> cars = carService.getCars();
		
		return new ResponseEntity<>(cars, HttpStatus.OK);
	}
	
	@GetMapping("/cars/{id}")
	ResponseEntity<CarDTO> getCar(@PathVariable Long id) {
		CarDTO car = carService.getCar(id);
		return new ResponseEntity<>(car, HttpStatus.OK);
	}
}
