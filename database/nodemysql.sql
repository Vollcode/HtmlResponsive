CREATE DATABASE IF NOT EXISTS geekshubstravel CHARACTER SET Latin1 COLLATE latin1_spanish_ci;
USE geekshubstravel;
CREATE TABLE user (id INT NOT NULL AUTO_INCREMENT,username VARCHAR(45) NOT NULL,email VARCHAR(45) NOT NULL,password VARCHAR(80) NOT NULL,hash VARCHAR(80), isAdmin INT(1) NOT NULL default 0,PRIMARY KEY (id));
INSERT INTO user (username, email, password, hash, isAdmin) VALUES ('admin', 'admin@mail.com', 'admin', 'nimda', 1);
CREATE TABLE travel (id INT AUTO_INCREMENT NOT NULL, travel VARCHAR(45) NOT NULL, price FLOAT(8) NOT NULL, image VARCHAR(45) NOT NULL, type VARCHAR(20) NOT NULL, description VARCHAR(45) NOT NULL, active INT(1) NOT NULL DEFAULT 1, PRIMARY KEY(id));
INSERT into travel (travel, price, image, type, description) VALUES ('Mykonos', 359, '../assets/images/mykonos.jpg', 'FAMILY', 'Toda nuestra cultura nos viene dada de aqui.');
INSERT into travel (travel, price, image, type, description) VALUES ('Londres',  729, '../assets/images/londres.jpg', 'FAMILY', 'Para muchos, la capital mas guay del mundo.');
INSERT into travel (travel, price, image, type, description) VALUES ('Dublin', 519, '../assets/images/dublin.jpg', 'FAMILY', 'Es todo muy verde, menos la cerveza.');
INSERT into travel (travel, price, image, type, description) VALUES ('Paris', 329, '../assets/images/paris.jpg', 'FAMILY', 'Buen vino, buen queso, buen pan.');
INSERT into travel (travel, price, image, type, description) VALUES ('Amsterdam', 199, '../assets/images/amsterdam.jpg', 'FAMILY', 'Un lugar relajante o excitante, segun prefieras.');
INSERT into travel (travel, price, image, type, description) VALUES ('Roma', 659, '../assets/images/roma.jpg', 'FAMILY', 'La mejor pasta del mundo.');
