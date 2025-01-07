DROP TABLE IF EXISTS service_reservations;
DROP TABLE IF EXISTS stands_reservations;
DROP TABLE IF EXISTS stands;
DROP TABLE IF EXISTS pavillons;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS ticket_prices;
DROP TABLE IF EXISTS ticket_age_categories;
DROP TABLE IF EXISTS ticket_animation_categories;
DROP TABLE IF EXISTS provider_sport_categories;
DROP TABLE IF EXISTS sports_categories;
DROP TABLE IF EXISTS provider_service_categories;
DROP TABLE IF EXISTS service_categories;
DROP TABLE IF EXISTS provider_requests;
DROP TABLE IF EXISTS customer_accounts;

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

CREATE TABLE IF NOT EXISTS ticket_animation_categories
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT
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
    age_category_id              INT NOT NULL REFERENCES ticket_age_categories(_id) ON DELETE CASCADE,
    animation_category_id        INT NOT NULL REFERENCES ticket_animation_categories(_id) ON DELETE CASCADE

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
