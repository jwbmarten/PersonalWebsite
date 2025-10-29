package com.jake.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.jake.api.service.TrackingService;

import jakarta.servlet.http.HttpServletRequest;

import java.net.URI;
import java.util.Map;


@RestController                                    // @RestController tells Spring "this class handles HTTP requests, and return values should be written directly as JSON"
public class ApiController {

    private final TrackingService tracking;
    public ApiController(TrackingService tracking) { this.tracking = tracking;}
    

    @GetMapping("/ping")                           // Route registration for GET /ping 
    public Map<String, Object> ping() {            // Spring Boot automatically serializes return values to JSON (via Jackson)
        return Map.of("pong", true);               // returns Map<"pong", true> which gets converted to JSON of {"pong":true}
    }

}
