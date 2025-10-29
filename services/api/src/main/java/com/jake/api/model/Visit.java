package com.jake.api.model; 

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "page_views")
public class Visit {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String path;

    @Column(length = 2)
    private String country;    

    @Column(columnDefinition = "inet")
    private String ip;

    @Column(name = "referrer")
    private String referrer;

    @Column(name = "user_agent")
    private String userAgent;

    private String ray;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();


    public Long getId() {return this.id;}

    public String getPath(){ return this.path; }
    public void setPath(String path){ this.path = path; }

    public String getCountry(){ return this.country; }
    public void setCountry(String country){ this.country = country; }

    public String getIP(){ return this.ip; }
    public void setIP(String ip){ this.ip = ip; }

    public String getReferrer(){ return this.referrer; }
    public void setReferrer(String ref){ this.referrer = ref; }

    public String getUserAgent(){ return this.userAgent; }
    public void setUserAgent(String ua){ this.userAgent = ua; }

    public String getRay(){ return this.ray; }
    public void setRay(String ray){ this.ray = ray; }

    public Instant getCreatedAt() { return createdAt; }
}