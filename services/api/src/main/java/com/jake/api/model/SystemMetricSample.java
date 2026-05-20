package com.jake.api.model;

import java.time.LocalDateTime;

public class SystemMetricSample {
    private LocalDateTime timestamp;
    private Double cpuTempCelsius;
    private Double cpuUsagePercent;
    private Double memoryUsagePercent;

    public SystemMetricSample() {
    }

    public SystemMetricSample(LocalDateTime timestamp, Double cpuTempCelsius, Double cpuUsagePercent, Double memoryUsagePercent) {
        this.timestamp = timestamp;
        this.cpuTempCelsius = cpuTempCelsius;
        this.cpuUsagePercent = cpuUsagePercent;
        this.memoryUsagePercent = memoryUsagePercent;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Double getCpuTempCelsius() {
        return cpuTempCelsius;
    }

    public void setCpuTempCelsius(Double cpuTempCelsius) {
        this.cpuTempCelsius = cpuTempCelsius;
    }

    public Double getCpuUsagePercent() {
        return cpuUsagePercent;
    }

    public void setCpuUsagePercent(Double cpuUsagePercent) {
        this.cpuUsagePercent = cpuUsagePercent;
    }

    public Double getMemoryUsagePercent() {
        return memoryUsagePercent;
    }

    public void setMemoryUsagePercent(Double memoryUsagePercent) {
        this.memoryUsagePercent = memoryUsagePercent;
    }
}
