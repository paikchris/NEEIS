#!/usr/bin/env bash

chmod 755 /universe/AdminScripts/backup_mysql.sql
MYSQLPW='Perseverence!2'

mysql -u root -p$MYSQLPW -e "DROP DATABASE IF EXISTS neeisPortal;"

mysqladmin -u root -p$MYSQLPW create neeisPortal
mysql -u root -p$MYSQLPW neeisPortal --connect-expired-password  < /universe/AdminScripts/backup_mysql.sql