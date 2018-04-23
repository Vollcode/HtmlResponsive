CREATE DATABASE IF NOT EXISTS geekshubstravel CHARACTER SET Latin1 COLLATE latin1_spanish_ci;
USE geekshubstravel;
CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT,username VARCHAR(45) NOT NULL,email VARCHAR(45) NOT NULL,password VARCHAR(80) NOT NULL,hash VARCHAR(80), isAdmin INT(1) NOT NULL default 0, active INT(1) NOT NULL DEFAULT 0,createdAt DATE,updatedAt DATE, PRIMARY KEY (id));
INSERT INTO users (username, email, password, hash, isAdmin, active) VALUES ('admin', 'admin@mail.com', 'admin', 'nimda', 1, 1);
CREATE TABLE travels (id INT AUTO_INCREMENT NOT NULL, city VARCHAR(45) NOT NULL, price FLOAT(8) NOT NULL, image VARCHAR(45) NOT NULL, type VARCHAR(20) NOT NULL, description VARCHAR(80) NOT NULL, active INT(1) NOT NULL DEFAULT 1,createdAt DATE,updatedAt DATE, PRIMARY KEY(id));
INSERT into travels (city, price, image, type, description) VALUES ('Mykonos', 359, '/public/images/destinations/mykonos.jpg', 'FAMILY', 'Toda nuestra cultura nos viene dada de aqui.');
INSERT into travels (city, price, image, type, description) VALUES ('Londres',  729, '/public/images/destinations/londres.jpg', 'FAMILY', 'Para muchos, la capital mas guay del mundo.');
INSERT into travels (city, price, image, type, description) VALUES ('Dublin', 519, '/public/images/destinations/dublin.jpg', 'FAMILY', 'Es todo muy verde, menos la cerveza.');
INSERT into travels (city, price, image, type, description) VALUES ('Paris', 329, '/public/images/destinations/paris.jpg', 'FAMILY', 'Buen vino, buen queso, buen pan.');
INSERT into travels (city, price, image, type, description) VALUES ('Amsterdam', 199, '/public/images/destinations/amsterdam.jpg', 'FAMILY', 'Un lugar relajante o excitante');
INSERT into travels (city, price, image, type, description) VALUES ('Roma', 659, '/public/images/destinations/roma.jpg', 'FAMILY', 'La mejor pasta del mundo.');
