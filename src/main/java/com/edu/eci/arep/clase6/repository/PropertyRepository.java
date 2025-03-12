package com.edu.eci.arep.clase6.repository;

import com.edu.eci.arep.clase6.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
}