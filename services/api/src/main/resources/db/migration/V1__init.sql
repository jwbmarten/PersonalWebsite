-- Tables
CREATE TABLE IF NOT EXISTS page_views (
    id              BIGSERIAL PRIMARY KEY,
    path            TEXT NOT NULL,
    country         CHAR(2),
    ip              TEXT,
    referrer        TEXT,
    user_agent      TEXT,
    ray             TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS music_recommendation (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT,
    artist          TEXT,
    album           TEXT,
    youtube_url     TEXT,
    spotify_url     TEXT,
    art_url         TEXT,
    notes           TEXT,
    tags            TEXT[],
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path_created_at ON page_views (path, created_at);

-- Prevent duplicate seeds by (title, artist)
ALTER TABLE music_recommendation
    ADD CONSTRAINT uq_music_title_artist UNIQUE (title, artist);


INSERT INTO music_recommendation (title, artist, album, youtube_url, spotify_url, art_url, notes, tags)
VALUES
    ('Docket (feat. Bully)', 'Blondshell', 'Docket (feat. Bully)',
     'https://www.youtube.com/watch?v=if2juwy6T70',
     'https://open.spotify.com/track/64Js3amhV3Pa7ho3Io1PM1?si=21ebf3a6b3f347a3',
     '/music_art/blondshell_docket.jpg',
     NULL,
     ARRAY['indie rock','grunge']),

    ('Weak In Your Light', 'Nation of Language', 'Strange Disciple',
     'https://www.youtube.com/watch?v=Mx2xsH7a9cc',
     'https://open.spotify.com/track/4odb2UIgc0u22MNV7p4iQq?si=72e94ace2bd44e3c',
     '/music_art/notionOfLanguage_weakInYourLight.jpg',
     NULL,
     ARRAY['synthpop','post punk']),

    ('Glass, Concrete & Stone', 'David Byrne', 'Grown Backwards',
     'https://www.youtube.com/watch?v=d-VNf1hT_XM',
     'https://open.spotify.com/track/5JJRxktdvtSjN3AeITJNCs?si=c6888e06dd544c65',
     '/music_art/glassConcreteStone_davidByrne.jpg',
     NULL,
     ARRAY['art pop','post punk']),

     ('Nobody', 'Mitski', 'Be the Cowboy',
     'https://www.youtube.com/watch?v=qooWnw5rEcI',
     'https://open.spotify.com/track/2P5yIMu2DNeMXTyOANKS6k?si=3feb08afa1e54571',
     '/music_art/Mitski_BeTheCowboy.jpg',
     NULL,
     ARRAY['indie rock','art pop']),

     ('What, Me Worry?', 'Portugal. The Man', 'What, Me Worry?',
     'https://www.youtube.com/watch?v=FUBRjHDnzE8',
     'https://open.spotify.com/track/0ePX6rVjeql7Bt1KurTbAG?si=0ee7e8bab1704935',
     '/music_art/portugal_meWorry.jpg',
     NULL,
     ARRAY['psychedelic pop','indie rock']),

     ('Your Woman', 'White Town', 'Women in Technology',
     'https://www.youtube.com/watch?v=lVL-zZnD3VU',
     'https://open.spotify.com/track/3UBItNVbFQiVC5hBQlBvnr?si=6a8bfb0cbe644c23',
     '/music_art/whiteTown_WIT.jpg',
     NULL,
     ARRAY['synthpop','funk']),

     ('The Thing', 'Pixies', 'Velouria',
     'https://youtu.be/9qaJKP0GFwU?si=krdrPogZRIGCd9by',
     'https://open.spotify.com/track/16EKGMPGE3f6X3p18CjtkB?si=a76ce9e331d342de',
     '/music_art/pixies_velouria.jpg',
     NULL,
     ARRAY['synthpop','funk'])

ON CONFLICT ON CONSTRAINT uq_music_title_artist DO NOTHING;
