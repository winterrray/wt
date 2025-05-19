package com.example.electricitybilling.repository;
import com.example.electricitybilling.model.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumerRepository extends JpaRepository<Consumer, Integer> {
}
