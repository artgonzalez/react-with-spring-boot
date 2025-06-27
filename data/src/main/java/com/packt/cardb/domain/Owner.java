package com.packt.cardb.domain;

import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Owner {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long ownerid;
    private String firstname;
    private String lastname;
    @OneToMany(cascade=CascadeType.ALL, mappedBy="owner")
    private List<Car> cars;

    public Owner(String firstname, String lastname) {
        super();
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
