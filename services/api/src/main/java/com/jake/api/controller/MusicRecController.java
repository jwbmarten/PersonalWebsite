package com.jake.api.controller;

import com.jake.api.model.MusicRecommendation;
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
public class MusicRecController {

    private final JdbcTemplate jdbc;

    public MusicRecController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/randomSong")
    public MusicRecommendation randomSong() {
        String sql = "select id, title, artist, album, youtube_url, spotify_url, art_url, notes, tags, created_at " +
                "from music_recommendation order by random() limit 1";

        RowMapper<MusicRecommendation> mapper = new RowMapper<>() {
            @Override
            public MusicRecommendation mapRow(ResultSet rs, int rowNum) throws SQLException {
                MusicRecommendation rec = new MusicRecommendation();
                rec.setId(rs.getLong("id"));
                rec.setTitle(rs.getString("title"));
                rec.setArtist(rs.getString("artist"));
                rec.setAlbum(rs.getString("album"));
                rec.setYoutubeUrl(rs.getString("youtube_url"));
                rec.setSpotifyUrl(rs.getString("spotify_url"));
                rec.setArtUrl(rs.getString("art_url"));
                rec.setNotes(rs.getString("notes"));

                Array sqlArray = rs.getArray("tags");
                if (sqlArray != null) {
                    Object arr = sqlArray.getArray();
                    if (arr instanceof String[]) {
                        String[] sarr = (String[]) arr;
                        rec.setTags(Arrays.asList(sarr));
                    } else if (arr instanceof Object[]) {
                        Object[] oarr = (Object[]) arr;
                        String[] sarr = Arrays.stream(oarr).map(Object::toString).toArray(String[]::new);
                        rec.setTags(Arrays.asList(sarr));
                    } else {
                        // fallback: convert to single-item list
                        rec.setTags(List.of(arr.toString()));
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
