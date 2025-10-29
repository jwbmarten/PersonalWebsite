package com.jake.api.controller;

import com.jake.api.service.TrackingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
public class TrackingController {
  private final TrackingService tracking;
  public TrackingController(TrackingService tracking) { this.tracking = tracking; }

  @PostMapping("/track")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public void track(
      HttpServletRequest req,
      @RequestParam(value = "path", required = false) String path,
      @RequestHeader(value = "Referer", required = false) String referer,
      @RequestHeader(value = "CF-IPCountry", required = false) String country,
      @RequestHeader(value = "CF-Connecting-IP", required = false) String ip,
      @RequestHeader(value = "CF-Ray", required = false) String ray,
      @RequestHeader(value = "User-Agent", required = false) String ua
  ) {
    if (path == null && referer != null) {
      try {
        var u = URI.create(referer);
        if (u.getHost() != null && u.getHost().equalsIgnoreCase(req.getServerName())) {
          path = u.getRawPath() + (u.getRawQuery() != null ? "?" + u.getRawQuery() : "");
        }
      } catch (IllegalArgumentException ignored) {}
    }
    tracking.logVisit(path, country, ip, referer, ua, ray);
  }
}
