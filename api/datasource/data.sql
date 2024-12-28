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
    name        VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS ticketsagecategories
(
    _id                          SERIAL PRIMARY KEY,
    name                         VARCHAR(255),
    price                        NUMERIC(10, 2),
    description                  TEXT,
    _idTicketAnimationCategories INT REFERENCES ticketsanimationcategories (_id)
);

CREATE TABLE IF NOT EXISTS tickets
(
    _id                          SERIAL PRIMARY KEY,
    date                         DATE,
    time                         TIME,
    _idCustomer                  INT REFERENCES customersAccounts (_id),
    _idTicketAnimationCategories INT REFERENCES ticketsanimationcategories (_id),
    _idTicketAgeCategories       INT REFERENCES ticketsagecategories (_id)
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
    _idCustomer INT REFERENCES customersaccounts (_id),
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
