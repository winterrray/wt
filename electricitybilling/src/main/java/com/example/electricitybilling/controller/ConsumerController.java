package com.example.electricitybilling.controller;

import com.example.electricitybilling.model.Consumer;
import com.example.electricitybilling.repository.ConsumerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consumers")
@CrossOrigin("*")
public class ConsumerController {

    @Autowired
    private ConsumerRepository consumerRepo;

    @GetMapping
    public List<Consumer> getAllConsumers() {
        return consumerRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getConsumerById(@PathVariable int id) {
        return consumerRepo.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Consumer with ID " + id + " not found."));
    }


    @PostMapping
    public Consumer addConsumer(@RequestBody Consumer consumer) {
        return consumerRepo.save(consumer);
    }

    @PutMapping("/{id}")
    public Consumer updateConsumer(@PathVariable int id, @RequestBody Consumer updated) {
        Consumer existing = consumerRepo.findById(id).orElseThrow();
        existing.setName(updated.getName());
        existing.setAddress(updated.getAddress());
        return consumerRepo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteConsumer(@PathVariable int id) {
        consumerRepo.deleteById(id);
    }
}
