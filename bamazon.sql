DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bbq", "decor", 399.80, 488),
("roses", "floral", 59.99, 100),
("chocolates", "candy", 3.10, 12),
("perfume", "cosmetic", 100.25, 50),
("earrings", "jewelry", 300, 20),
("vitamins", "pharmacy", 13.64, 1000),
("soda", "candy", 1.99, 800),
("bracelet", "jewelry", 175.99, 10),
("mirror", "decor", 99.99, 30),
("stationary", "office", 5.45, 3650),
("daffodils", "floral", 39.99, 190),
("laptop", "office", 499.99, 4000),
("lilies", "floral", 13.99, 200),
("aster", "floral", 4.99, 1000),
("bird of paradise", "floral", 89.99, 50),
("hydrangeas", "floral", 62.22, 129),
("pearls", "jewelry", 99.99, 30),
("cough syrup", "pharmacy", 13.44, 10099),
("tissues", "pharmacy", 2.99, 40000); 