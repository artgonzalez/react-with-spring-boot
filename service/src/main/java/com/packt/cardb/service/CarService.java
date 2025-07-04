package com.packt.cardb.service;

import com.packt.cardb.service.model.CarDTO;

public interface CarService 
{
	Iterable<CarDTO> getCars();
	CarDTO getCar(long id);
}
