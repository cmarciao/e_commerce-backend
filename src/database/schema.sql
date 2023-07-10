CREATE DATABASE IF NOT EXISTS ecommerce;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    created_at DATE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    url_photo VARCHAR NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE carts (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    amount INT NOT NULL,
    total FLOAT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    user_id UUID UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    product_id UUID,
    cart_id UUID,
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(cart_id) REFERENCES carts(id)
);

CREATE TABLE sales (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    amount INT NOT NULL,
    price FLOAT NOT NULL,
    finished_at TIMESTAMP NOT NULL DEFAULT now(),
    user_id UUID,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE sale_items (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    sale_id UUID,
    product_id UUID,
    amount INT NOT NULL,
    FOREIGN KEY(sale_id) REFERENCES sales(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);
