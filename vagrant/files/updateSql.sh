#!/usr/bin/env bash

#SETUP SQL SERVER FROM A SQL DUMP BACKUP FROM AIMSQL
cd /vagrant/files/
yes | unzip sqlfileQuote.zip
sqlcmd -S localhost -U SA -P 'jakePoos521' -i /vagrant/files/sqlfileQuote.sql