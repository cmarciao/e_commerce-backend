CREATE DATABASE IF NOT EXISTS ecommerce;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    url_photo VARCHAR NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INT NOT NULL
);