package com.example.electricitybilling.service;

import com.example.electricitybilling.model.Billing;
import com.example.electricitybilling.model.Consumer;
import com.example.electricitybilling.repository.BillingRepository;
import com.example.electricitybilling.repository.ConsumerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BillingService {

    @Autowired
    private BillingRepository billingRepo;

    @Autowired
    private ConsumerRepository consumerRepo;

    public double calculateBill(int units) {
        double amount = 0;

        if (units <= 50) {
            amount = units * 3.5;
        } else if (units <= 150) {
            amount = 50 * 3.5 + (units - 50) * 4.0;
        } else if (units <= 250) {
            amount = 50 * 3.5 + 100 * 4.0 + (units - 150) * 5.2;
        } else {
            amount = 50 * 3.5 + 100 * 4.0 + 100 * 5.2 + (units - 250) * 6.5;
        }

        return amount;
    }

    public Billing generateBill(int consumerId, int unitsConsumed) {
        Consumer consumer = consumerRepo.findById(consumerId).orElseThrow();
        double amount = calculateBill(unitsConsumed);

        Billing bill = new Billing();
        bill.setConsumer(consumer);
        bill.setUnitsConsumed(unitsConsumed);
        bill.setBillAmount(amount);
        bill.setBillingDate(LocalDate.now());

        return billingRepo.save(bill);
    }

    
}
