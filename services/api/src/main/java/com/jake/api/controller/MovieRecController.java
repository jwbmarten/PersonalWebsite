package com.jake.api.controller;

import com.jake.api.model.MovieRecommendation;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

@RestController
public class MovieRecController {

    private final JdbcTemplate jdbc;

    public MovieRecController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @GetMapping("/randomMovie")
    public MovieRecommendation randomMovie() {
        final String sql = "select id, title, director, release_year, imdb_url, letterboxd_url, art_url, tagline, blurb, genres, created_at " +
                "from movie_recommendation order by random() limit 1";

        RowMapper<MovieRecommendation> mapper = new RowMapper<>() {
            @Override
            public MovieRecommendation mapRow(ResultSet rs, int rowNum) throws SQLException {
                MovieRecommendation rec = new MovieRecommendation();
                rec.setId(rs.getLong("id"));
                rec.setTitle(rs.getString("title"));
                rec.setDirector(rs.getString("director"));
                int year = rs.getInt("release_year");
                rec.setReleaseYear(rs.wasNull() ? null : year);
                rec.setImdbUrl(rs.getString("imdb_url"));
                rec.setLetterboxdUrl(rs.getString("letterboxd_url"));
                rec.setArtUrl(rs.getString("art_url"));
                rec.setTagline(rs.getString("tagline"));
                rec.setBlurb(rs.getString("blurb"));

                Array g = rs.getArray("genres");
                if (g != null) {
                    Object arr = g.getArray();
                    if (arr instanceof String[]) {
                        rec.setGenres(Arrays.asList((String[]) arr));
                    } else if (arr instanceof Object[]) {
                        Object[] o = (Object[]) arr;
                        String[] s = Arrays.stream(o).map(Object::toString).toArray(String[]::new);
                        rec.setGenres(Arrays.asList(s));
                    } else {
                        rec.setGenres(List.of(arr.toString()));
                    }
                }

                Timestamp ts = rs.getTimestamp("created_at");
                if (ts != null) rec.setCreatedAt(ts.toInstant());

                return rec;
            }
        };

        return jdbc.queryForObject(sql, mapper);
    }
}
