#!/usr/bin/env bash

#SETUP SQL SERVER FROM A SQL DUMP BACKUP FROM AIMSQL
cd /vagrant/files/
yes | unzip sqlfileProducts.zip
sqlcmd -S localhost -U SA -P 'jakePoos521' -i /vagrant/files/sqlfileProducts.sql