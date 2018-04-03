#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install -y apache2
DEBIAN_FRONTEND=noninteractive sudo -E apt-get -q -y -f install mysql-server
sudo apt-get -y install php5
sudo apt-get -y install nodejs
sudo apt-get -y install nodejs-legacy
if ! [ -L /var/www/html/ ]; then
  sudo rm -rf /var/www/html/
  sudo ln -fs /vagrant /var/www/html
fi

echo 'CREATE DATABASE IF NOT EXISTS geekshubstravel CHARACTER SET Latin1 COLLATE latin1_spanish_ci;'> nodemysql.sql
echo 'USE geekshubstravel;' >> nodemysql.sql
echo 'CREATE TABLE user (id INT NOT NULL AUTO_INCREMENT,username VARCHAR(45) NOT NULL,email VARCHAR(45) NOT NULL,password VARCHAR(80) NOT NULL,hash VARCHAR(80) NULL,PRIMARY KEY (id));' >> nodemysql.sql
echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'10.0.2.2' IDENTIFIED BY 'mysql';" >> nodemysql.sql
cat nodemysql.sql
sudo mysql -u root < nodemysql.sql
