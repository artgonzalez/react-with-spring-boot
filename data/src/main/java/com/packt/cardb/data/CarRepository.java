package com.packt.cardb.data;

import org.springframework.data.repository.CrudRepository;

import com.packt.cardb.domain.Car;

public interface CarRepository extends CrudRepository<Car, Long> {

}

