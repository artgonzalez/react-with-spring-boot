package com.packt.cardb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import com.packt.cardb.domain.Car;
import com.packt.cardb.data.CarRepository;

import com.packt.cardb.service.model.CarDTO;

@Service
public class CarServiceImpl implements CarService {
	
	@Autowired private CarRepository repository;
	@Autowired ModelMapper mapper;
	
	public Iterable<CarDTO> getCars(){
		Iterable<Car> carsDB = repository.findAll();
    	
		List<CarDTO> cars = mapper.map(carsDB, new TypeToken<List<CarDTO>>() {}.getType());
		
		return cars;		
	}
	
	public CarDTO getCar(long id) {
		Car car = repository.findById(id).get();
		CarDTO carDTO = mapper.map(car, CarDTO.class);
		
		return carDTO;
	}
}
