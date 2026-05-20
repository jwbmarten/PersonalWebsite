package com.jake.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
public class SystemMetricsScheduler {
    @Autowired
    private SystemMetricsService systemMetricsService;

    @Scheduled(fixedRate = 30_000)
    public void collectMetricsEvery30Seconds() {
        systemMetricsService.collectMetrics();
    }
}
