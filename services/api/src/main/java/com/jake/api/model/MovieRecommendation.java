package com.jake.api.model;

import java.time.Instant;
import java.util.List;

public class MovieRecommendation {
    private Long id;
    private String title;
    private String director;
    private Integer releaseYear;
    private String imdbUrl;
    private String letterboxdUrl;
    private String artUrl;
    private String tagline;
    private String blurb;
    private List<String> genres;
    private Instant createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }

    public Integer getReleaseYear() { return releaseYear; }
    public void setReleaseYear(Integer releaseYear) { this.releaseYear = releaseYear; }

    public String getImdbUrl() { return imdbUrl; }
    public void setImdbUrl(String imdbUrl) { this.imdbUrl = imdbUrl; }

    public String getLetterboxdUrl() { return letterboxdUrl; }
    public void setLetterboxdUrl(String letterboxdUrl) { this.letterboxdUrl = letterboxdUrl; }

    public String getArtUrl() { return artUrl; }
    public void setArtUrl(String artUrl) { this.artUrl = artUrl; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getBlurb() { return blurb; }
    public void setBlurb(String blurb) { this.blurb = blurb; }

    public List<String> getGenres() { return genres; }
    public void setGenres(List<String> genres) { this.genres = genres; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
