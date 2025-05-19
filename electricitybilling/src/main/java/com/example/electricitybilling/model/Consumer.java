package com.example.electricitybilling.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consumer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String address;

    @OneToMany(mappedBy = "consumer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Billing> billingList;
}
