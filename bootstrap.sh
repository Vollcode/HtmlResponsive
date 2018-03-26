#!/usr/bin/env bash


debconf-set-selections <<< 'mysql-server mysql-server/root_password password MySuperPassword'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password MySuperPassword'
apt-get update
apt-get install -y mysql-server
apt-get install -y apache2
if ! [ -L /var/www/html/]; then
    sudo rm -rf /var/www/html/
    sudo ln -fs /vagrant /var/www/html
fi
