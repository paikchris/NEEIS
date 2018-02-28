#!/usr/bin/env bash

MYSQLPW='Perseverence!2'
mysqldump -u root -p$MYSQLPW neeisPortal > /universe/AdminScripts/backup_mysql.sql
chmod 777 /universe/AdminScripts/backup_mysql.sql

sudo scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null /universe/AdminScripts/backup_mysql.sql root@104.236.23.128:/universe/AdminScripts/
