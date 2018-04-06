CREATE DATABASE IF NOT EXISTS geekshubstravel CHARACTER SET Latin1 COLLATE latin1_spanish_ci;
USE geekshubstravel;
CREATE TABLE user (id INT NOT NULL AUTO_INCREMENT,username VARCHAR(45) NOT NULL,email VARCHAR(45) NOT NULL,password VARCHAR(80) NOT NULL,hash VARCHAR(80) NULL,PRIMARY KEY (id));
create table destination (id int auto_increment not null, city varchar(45) not null, country varchar(45) not null, price float(8) not null, image varchar(45) not null, type varchar(20) not null, description varchar(45) not null, active int(1) not null default 1, primary key(id));
