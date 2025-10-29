package com.jake.api.service;

import com.jake.api.model.Visit;
import com.jake.api.repo.VisitRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TrackingService {

    private final VisitRepo repo;

    public TrackingService(VisitRepo repo) { this.repo = repo; }


    @Transactional
    public void logVisit(String path, String country, String ip, String ref, String ua, String ray){
        Visit v = new Visit();
        v.setPath(path);
        v.setCountry(country);
        v.setIP(ip);
        v.setReferrer(ref);
        v.setUserAgent(ua);
        v.setRay(ray);
        repo.save(v);
    }
}
