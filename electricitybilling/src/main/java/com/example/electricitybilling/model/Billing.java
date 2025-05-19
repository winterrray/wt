package com.example.electricitybilling.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Billing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int unitsConsumed;
    private double billAmount;
    private LocalDate billingDate;

    @ManyToOne
    @JoinColumn(name = "consumer_id")
    @JsonBackReference
    private Consumer consumer;
}
