package com.example.electricitybilling.controller;

import com.example.electricitybilling.model.Billing;
import com.example.electricitybilling.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/billing")
@CrossOrigin("*")
public class BillingController {

    @Autowired
    private BillingService billingService;

    @PostMapping("/generate")
    public Billing generateBill(@RequestParam int consumerId, @RequestParam int units) {
        return billingService.generateBill(consumerId, units);
    }
}

