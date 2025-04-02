DROP TABLE IF EXISTS basket_items CASCADE;
DROP TABLE IF EXISTS baskets CASCADE;
DROP TABLE IF EXISTS goodies_variations CASCADE;
DROP TABLE IF EXISTS goodies CASCADE;
DROP TABLE IF EXISTS goodies_sizes CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS guestbook_entries CASCADE;
DROP TABLE IF EXISTS provider_schedule_status CASCADE;
DROP TABLE IF EXISTS provider_guestbook_status CASCADE;
DROP TABLE IF EXISTS service_reservations CASCADE;
DROP TABLE IF EXISTS stands_reservations CASCADE;
DROP TABLE IF EXISTS stands CASCADE;
DROP TABLE IF EXISTS pavillons CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS ticket_prices CASCADE;
DROP TABLE IF EXISTS ticket_age_categories CASCADE;
DROP TABLE IF EXISTS provider_sport_categories CASCADE;
DROP TABLE IF EXISTS sports_categories CASCADE;
DROP TABLE IF EXISTS provider_service_categories CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;
DROP TABLE IF EXISTS provider_requests CASCADE;
DROP TABLE IF EXISTS refresh_tokens CASCADE;
DROP TABLE IF EXISTS customer_accounts CASCADE;
DROP TABLE IF EXISTS content_home CASCADE;
DROP TABLE IF EXISTS matchs_tournament CASCADE;
DROP TABLE IF EXISTS rounds_tournament CASCADE;
DROP TABLE IF EXISTS teams_tournament CASCADE;


CREATE TABLE IF NOT EXISTS content_home (
    _id         SERIAL PRIMARY KEY,
    section     VARCHAR(255) NOT NULL,
    title       VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url   VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS customer_accounts
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(255),
    login       VARCHAR(255),
    password    VARCHAR(255),
    email       VARCHAR(255),
    picture     VARCHAR(255),
    description TEXT,
    privilege   INT,
    session     VARCHAR(255)
);

CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    user_id INT REFERENCES customer_accounts(_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS provider_requests
(
    _id         SERIAL PRIMARY KEY,
    date        DATE,
    state       INT,
    customer_id INT REFERENCES customer_accounts (_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS service_categories
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS provider_service_categories
(
    _id         SERIAL PRIMARY KEY,
    state       INT,
    customer_id INT REFERENCES customer_accounts (_id) ON DELETE CASCADE,
    service_id  INT REFERENCES service_categories(_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sports_categories
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS provider_sport_categories
(
    _id         SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer_accounts (_id) ON DELETE CASCADE,
    sport_id    INT REFERENCES sports_categories (_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ticket_age_categories
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS ticket_prices
(
    _id                          SERIAL PRIMARY KEY,
    price                        NUMERIC(10, 2) NOT NULL,
    age_category_id              INT NOT NULL REFERENCES ticket_age_categories(_id) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS tickets
(
    _id               SERIAL PRIMARY KEY,
    date              DATE NOT NULL,
    time              TIME NOT NULL,
    customer_id       INT NOT NULL REFERENCES customer_accounts (_id) ON DELETE CASCADE,
    price_id          INT NOT NULL REFERENCES ticket_prices(_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pavillons
(
    _id  SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS stands
(
    _id            SERIAL PRIMARY KEY,
    name           VARCHAR(255),
    price          NUMERIC(10, 2),
    pavillon_id    INT REFERENCES pavillons (_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS stands_reservations
(
    _id         SERIAL PRIMARY KEY,
    date        DATE,
    start_time  TIME,
    end_time    TIME,
    description    TEXT,
    customer_id   INT REFERENCES customer_accounts (_id) ON DELETE CASCADE,
    service_id  INT REFERENCES service_categories(_id) ON DELETE CASCADE,
    stand_id    INT REFERENCES stands (_id)
);

CREATE TABLE IF NOT EXISTS service_reservations
(
    _id         SERIAL PRIMARY KEY,
    date        DATE,
    time        TIME,
    ticket_id INT REFERENCES tickets (_id) ON DELETE CASCADE,
    service_id  INT REFERENCES service_categories(_id) ON DELETE CASCADE,
    stand_reservation_id INT REFERENCES stands_reservations(_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS provider_guestbook_status
(
    _id         SERIAL PRIMARY KEY,
    guestbook_activated      BOOLEAN,
    customer_id INT REFERENCES customer_accounts (_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS provider_schedule_status
(
    _id         SERIAL PRIMARY KEY,
    schedule_activated      BOOLEAN,
    customer_id INT REFERENCES customer_accounts (_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS guestbook_entries
(
    _id         SERIAL PRIMARY KEY,
    date       DATE,
    rating    INT,
    comment   TEXT,
    service_reservations_id INT REFERENCES service_reservations(_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports
(
    _id         SERIAL PRIMARY KEY,
    date       DATE,
    reason    TEXT,
    state     INT,
    guestbook_entry_id INT REFERENCES guestbook_entries(_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS goodies_sizes
(
    _id         SERIAL PRIMARY KEY,
    size       VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS goodies
(
    _id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    image      VARCHAR(255),
    price       NUMERIC(10, 2) NOT NULL,
    provider_service_categories_id INT REFERENCES provider_service_categories(_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS goodies_variations
(
    _id         SERIAL PRIMARY KEY,
    stock       INT,
    goodie_id   INT REFERENCES goodies(_id) ON DELETE CASCADE,
    size_id     INT REFERENCES goodies_sizes(_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS baskets (
    _id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT NOW(),
    state INT NOT NULL,
    is_order BOOLEAN DEFAULT FALSE,
    ticket_id INT REFERENCES tickets(_id) ON DELETE CASCADE,
    provider_service_categories_id INT REFERENCES provider_service_categories(_id) ON DELETE CASCADE
);



CREATE TABLE basket_items (
    _id SERIAL PRIMARY KEY,
    basket_id INT REFERENCES baskets(_id) ON DELETE CASCADE,
    item_id INT REFERENCES goodies_variations(_id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE teams_tournament
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE rounds_tournament
(
    _id     SERIAL PRIMARY KEY,
    name    VARCHAR(50)
);

CREATE TABLE matchs_tournament
(
    _id            SERIAL PRIMARY KEY,
    round_id      SERIAL REFERENCES rounds_tournament (_id) ON DELETE CASCADE,
    equipe1_id    INTEGER REFERENCES teams_tournament (_id) ON DELETE SET NULL,
    equipe2_id    INTEGER REFERENCES teams_tournament (_id) ON DELETE SET NULL,
    score_equipe1 INT,
    score_equipe2 INT,
    gagnant_id    INT REFERENCES teams_tournament (_id),
    date_match    TIMESTAMP
);
