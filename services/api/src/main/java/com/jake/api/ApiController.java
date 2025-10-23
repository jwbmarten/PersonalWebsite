package com.jake.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;


@RestController                                    // @RestController tells Spring "this class handles HTTP requests, and return values should be written directly as JSON"
public class ApiController {


    @GetMapping("/ping")                           // Route registration for GET /ping 
    public Map<String, Object> ping() {            // Spring Boot automatically serializes return values to JSON (via Jackson)
        return Map.of("pong", true);               // returns Map<"pong", true> which gets converted to JSON of {"pong":true}
    }

    
}
