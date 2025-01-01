DROP TABLE IF EXISTS stands CASCADE;
DROP TABLE IF EXISTS pavillons CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS ticket_age_categories CASCADE;
DROP TABLE IF EXISTS ticket_animation_categories CASCADE;
DROP TABLE IF EXISTS dedication_reservations CASCADE;
DROP TABLE IF EXISTS dedication_dates CASCADE;
DROP TABLE IF EXISTS sports_categories CASCADE;
DROP TABLE IF EXISTS provider_sport_categories CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;
DROP TABLE IF EXISTS provider_service_categories CASCADE;
DROP TABLE IF EXISTS customer_accounts CASCADE;

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

CREATE TABLE IF NOT EXISTS service_categories
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS provider_service_categories
(
    _id         SERIAL PRIMARY KEY,
    service_id  INT REFERENCES service_categories(_id),
    provider_id INT REFERENCES customer_accounts (_id)
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
    sport_id    INT REFERENCES sports_categories (_id),
    provider_id INT REFERENCES customer_accounts(_id)
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
    age_category_id              INT NOT NULL REFERENCES ticket_age_categories(_id) ON DELETE CASCADE,
    animation_category_id        INT NOT NULL REFERENCES ticket_animation_categories(_id) ON DELETE CASCADE,
    price                        NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets
(
    _id               SERIAL PRIMARY KEY,
    date              DATE NOT NULL,
    time              TIME NOT NULL,
    customer_id       INT NOT NULL REFERENCES customer_accounts (_id) ON DELETE CASCADE,
    price_id          INT NOT NULL REFERENCES ticket_prices(_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS dedication_dates
(
    _id     SERIAL PRIMARY KEY,
    date    DATE,
    times   JSON,
    anim_id INT REFERENCES customer_accounts (_id)
);

CREATE TABLE IF NOT EXISTS dedication_reservations
(
    _id         SERIAL PRIMARY KEY,
    date        DATE,
    time        TIME,
    ticket_id INT REFERENCES tickets (_id),
    anim_id     INT REFERENCES customer_accounts (_id)
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
    description    TEXT,
    price          NUMERIC(10, 2),
    prestataire_id INT REFERENCES customer_accounts (_id),
    pavillon_id    INT REFERENCES pavillons (_id)
);
