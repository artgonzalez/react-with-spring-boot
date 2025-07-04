package com.packt.cardb.rest;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;

import org.springframework.context.annotation.ComponentScan;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.packt.cardb.rest.controller.CarController;

@SpringBootApplication
@ComponentScan(basePackages = {"com.packt.cardb.service"}, basePackageClasses = CarController.class)
@EntityScan("com.packt.cardb.domain")
@EnableJpaRepositories(basePackages = "com.packt.cardb.data")
public class Application{

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}