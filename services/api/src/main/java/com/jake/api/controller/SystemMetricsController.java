package com.jake.api.controller;

import com.jake.api.model.SystemMetricSample;
import com.jake.api.service.SystemMetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/system")
public class SystemMetricsController {
    @Autowired
    private SystemMetricsService systemMetricsService;

    @GetMapping("/current")
    public SystemMetricSample getCurrentMetric() {
        return systemMetricsService.getCurrentMetric();
    }

    @GetMapping("/history")
    public List<SystemMetricSample> getMetricHistory() {
        return systemMetricsService.getMetricHistory();
    }
}
