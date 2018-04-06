#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install debconf-utils
debconf-set-selections <<< "mysql-server mysql-server/root_password password mysql"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password mysql"
sudo -E apt-get -q -y install mysql-server
sudo apt-get -y install nodejs
sudo apt-get -y install nodejs-legacy
sudo apt-get -y install npm

sudo mysql -uroot -pmysql < /vagrant/nodemysql.sql
