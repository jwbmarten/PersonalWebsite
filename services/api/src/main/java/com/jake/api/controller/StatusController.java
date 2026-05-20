// StatusController.java
package com.jake.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.lang.management.ManagementFactory;
import java.time.Instant;
import java.util.Map;
import java.time.Duration;;

@RestController
public class StatusController {
  @GetMapping("/uptime")
  public Map<String,Object> status() {
    var rt = ManagementFactory.getRuntimeMXBean();
    long uptimeMs    = rt.getUptime();                    // millis since start
    Duration d = Duration.ofMillis(uptimeMs);
    long days = d.toDays();
    long hours = d.minusDays(days).toHours();
    long minutes = d.minusDays(days).minusHours(hours).toMinutes();
    return Map.of(
      "uptimeDays", days,
      "uptimeHours", hours,
      "uptimeMinutes", minutes
    );
  }

}
