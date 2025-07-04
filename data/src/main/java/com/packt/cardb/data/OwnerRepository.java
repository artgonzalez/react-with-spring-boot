package com.packt.cardb.data;

import org.springframework.data.repository.CrudRepository;

import com.packt.cardb.domain.Owner;

public interface OwnerRepository extends CrudRepository<Owner, Long> {

}

