package com.example.electricitybilling.repository;

import com.example.electricitybilling.model.Billing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillingRepository extends JpaRepository<Billing, Integer> {
}
