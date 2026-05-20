package com.jake.api.service;

import com.jake.api.model.SystemMetricSample;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

@Service
public class SystemMetricsService {
    private static final int MAX_SAMPLES = 120; // 1 hour at 30-second intervals
    private static final long SAMPLE_INTERVAL_MS = 30_000;
    private final Deque<SystemMetricSample> metricsBuffer = new LinkedList<>();
    private final OperatingSystemMXBean osBean = ManagementFactory.getOperatingSystemMXBean();

    public SystemMetricSample getCurrentMetric() {
        synchronized (metricsBuffer) {
            if (metricsBuffer.isEmpty()) {
                return null;
            }
            return metricsBuffer.getLast();
        }
    }

    public List<SystemMetricSample> getMetricHistory() {
        synchronized (metricsBuffer) {
            return new ArrayList<>(metricsBuffer);
        }
    }

    public void collectMetrics() {
        try {
            double cpuTemp = readCpuTemperature();
            double cpuUsage = readCpuUsage();
            double memoryUsage = readMemoryUsage();

            SystemMetricSample sample = new SystemMetricSample(
                LocalDateTime.now(),
                cpuTemp,
                cpuUsage,
                memoryUsage
            );

            synchronized (metricsBuffer) {
                metricsBuffer.addLast(sample);

                // Keep only the last 120 samples (1 hour)
                while (metricsBuffer.size() > MAX_SAMPLES) {
                    metricsBuffer.removeFirst();
                }
            }
        } catch (Exception e) {
            System.err.println("Error collecting metrics: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private double readCpuTemperature() throws IOException {
        try {
            String path = "/sys/class/thermal/thermal_zone0/temp";
            BufferedReader reader = new BufferedReader(new FileReader(path));
            String line = reader.readLine();
            reader.close();
            if (line != null) {
                long tempMilliCelsius = Long.parseLong(line.trim());
                return tempMilliCelsius / 1000.0;
            }
        } catch (IOException e) {
            System.err.println("Could not read CPU temperature from thermal_zone0: " + e.getMessage());
        }
        return 0.0;
    }

    private double readCpuUsage() {
        try {
            com.sun.management.OperatingSystemMXBean sunOsBean = (com.sun.management.OperatingSystemMXBean) osBean;
            double cpuLoad = sunOsBean.getSystemCpuLoad();
            if (cpuLoad < 0) {
                return 0.0;
            }
            return cpuLoad * 100.0; // Convert to percentage
        } catch (Exception e) {
            System.err.println("Could not read CPU usage: " + e.getMessage());
            return 0.0;
        }
    }

    private double readMemoryUsage() throws IOException {
        try {
            BufferedReader reader = new BufferedReader(new FileReader("/proc/meminfo"));
            long memTotal = 0;
            long memAvailable = 0;
            String line;

            while ((line = reader.readLine()) != null) {
                if (line.startsWith("MemTotal:")) {
                    memTotal = extractMemValue(line);
                } else if (line.startsWith("MemAvailable:")) {
                    memAvailable = extractMemValue(line);
                }
            }
            reader.close();

            if (memTotal > 0) {
                return ((memTotal - memAvailable) / (double) memTotal) * 100.0;
            }
        } catch (IOException e) {
            System.err.println("Could not read memory usage from /proc/meminfo: " + e.getMessage());
        }
        return 0.0;
    }

    private long extractMemValue(String line) {
        // Line format: "MemTotal:        7822356 kB"
        String[] parts = line.split("\\s+");
        if (parts.length >= 2) {
            try {
                return Long.parseLong(parts[1]);
            } catch (NumberFormatException e) {
                return 0;
            }
        }
        return 0;
    }
}
