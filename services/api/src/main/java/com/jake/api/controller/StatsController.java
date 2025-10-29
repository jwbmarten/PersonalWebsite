package com.jake.api.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stats")
public class StatsController {

  private final JdbcTemplate jdbc;

  public StatsController(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  @GetMapping("/summary")
  public Map<String, Object> summary(@RequestParam(defaultValue = "14") int days) {
    Integer total = jdbc.queryForObject(
        "select count(*) from page_views where created_at >= now() - make_interval(days => ?)",
        Integer.class, days);

    Integer uniques = jdbc.queryForObject(
        "select count(distinct ip) from page_views where created_at >= now() - make_interval(days => ?)",
        Integer.class, days);

    Integer countries = jdbc.queryForObject(
        "select count(distinct country) from page_views where created_at >= now() - make_interval(days => ?)",
        Integer.class, days);

    return Map.of(
        "totalVisits", total,
        "uniqueVisitors", uniques,
        "countries", countries,
        "sinceDays", days
    );
  }

  @GetMapping("/traffic-by-day")
  public List<Map<String, Object>> byDay(@RequestParam(defaultValue = "14") int days) {
    return jdbc.query(
        "select to_char(date_trunc('day', created_at), 'YYYY-MM-DD') as date, " +
        "       count(*) as visits " +
        "from page_views " +
        "where created_at >= now() - make_interval(days => ?) " +
        "group by 1 order by 1",
        (rs, i) -> Map.of("date", rs.getString("date"), "visits", rs.getInt("visits")),
        days
    );
    }
  
  @GetMapping("/top-pages")
  public List<Map<String, Object>> topPages(@RequestParam(defaultValue = "10") int limit) {
    return jdbc.query(
        "select coalesce(path, '/') as path, count(*) as hits " +
        "from page_views group by 1 order by hits desc limit ?",
        (rs, i) -> Map.of("path", rs.getString("path"), "hits", rs.getInt("hits")),
        limit
    );
  }

  @GetMapping("/top-referrers")
  public List<Map<String, Object>> topReferrers(@RequestParam(defaultValue = "10") int limit) {
    // Avoids backreference-escaping pain by using substring() with a capture group
    return jdbc.query(
        "select coalesce(substring(referrer from 'https?://(?:www\\.)?([^/]+)'), '(direct / none)') as domain, " +
        "       count(*) as hits " +
        "from page_views " +
        "group by 1 order by hits desc limit ?",
        (rs, i) -> Map.of("domain", rs.getString("domain"), "hits", rs.getInt("hits")),
        limit
    );
  }

  @GetMapping("/recent")
  public List<Map<String, Object>> recent(@RequestParam(defaultValue = "20") int limit) {
    return jdbc.query(
        "select created_at as ts, country, path, referrer " +
        "from page_views order by created_at desc limit ?",
        (rs, i) -> {
          java.util.Map<String, Object> m = new java.util.HashMap<>();
          java.sql.Timestamp t = rs.getTimestamp("ts");
          m.put("ts", t != null ? t.toInstant().toString() : null);
          m.put("country", rs.getString("country"));
          m.put("path", rs.getString("path"));
          m.put("referrer", rs.getString("referrer"));
          return m;
        },
        limit
    );
  }
}
