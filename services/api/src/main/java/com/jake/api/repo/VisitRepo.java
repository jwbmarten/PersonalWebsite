package com.jake.api.repo;

import com.jake.api.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepo extends JpaRepository<Visit, Long> {

}
