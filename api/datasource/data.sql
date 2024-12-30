DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS ticketsagecategories CASCADE;
DROP TABLE IF EXISTS ticketsanimationcategories CASCADE;
DROP TABLE IF EXISTS dedicationreservations CASCADE;
DROP TABLE IF EXISTS availabledates CASCADE;
DROP TABLE IF EXISTS stands CASCADE;
DROP TABLE IF EXISTS pavillons CASCADE;
DROP TABLE IF EXISTS sportscategories CASCADE;
DROP TABLE IF EXISTS customersaccounts CASCADE;

CREATE TABLE IF NOT EXISTS customersaccounts
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

CREATE TABLE IF NOT EXISTS sportscategories
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS ticketsanimationcategories
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS ticketsagecategories
(
    _id         SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS ticketprices
(
    _id                          SERIAL PRIMARY KEY,
    age_category_id              INT NOT NULL REFERENCES ticketsagecategories(_id) ON DELETE CASCADE,
    animation_category_id        INT NOT NULL REFERENCES ticketsanimationcategories(_id) ON DELETE CASCADE,
    price                        NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets
(
    _id               SERIAL PRIMARY KEY,
    date              DATE NOT NULL,
    time              TIME NOT NULL,
    customer_id       INT NOT NULL REFERENCES customersaccounts(_id) ON DELETE CASCADE,
    price_id          INT NOT NULL REFERENCES ticketprices(_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS availabledates
(
    _id     SERIAL PRIMARY KEY,
    date    DATE,
    times   JSON,
    anim_id INT REFERENCES customersaccounts (_id)
);

CREATE TABLE IF NOT EXISTS dedicationreservations
(
    _id         SERIAL PRIMARY KEY,
    date        DATE,
    time        TIME,
    ticket_id INT REFERENCES tickets (_id),
    anim_id     INT REFERENCES customersaccounts (_id)
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
    prestataire_id INT REFERENCES customersaccounts (_id),
    pavillon_id    INT REFERENCES pavillons (_id)
);
