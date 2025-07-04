package com.packt.cardb.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.packt.cardb.service.model.CarDTO;
import com.packt.cardb.service.model.OwnerDTO;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class CarServiceTest 
{
	@Test
	public void testApp()
    		throws JsonProcessingException
    {
    	OwnerDTO o = new OwnerDTO();
    	o.setFirstname("John");
    	
    	CarDTO c = new CarDTO();
    	c.setId(10);
    	c.setModel("Ford");
    	c.setOwner(o);
    	
    	java.util.List<CarDTO> cars = new java.util.ArrayList<CarDTO>();
    	cars.add(c);
    	
    	o.setCars(cars);
    	
    	ObjectMapper m = new ObjectMapper();
    	String resultCar = m.writeValueAsString(c);
    	String resultOwner = m.writeValueAsString(o);
    	
    	System.out.println(resultCar);
    	System.out.println(resultOwner);
    	
        assertTrue( resultCar.contains("Ford"));
        assertTrue( resultOwner.contains("John"));
    }
}