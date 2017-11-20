#!/usr/bin/env bash

ssh -t root@104.236.23.128 '/universe/AdminScripts/mysql_nightly_backup.sh'

sudo scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@104.236.23.128:/universe/AdminScripts/backup_mysql_nightly.sql /home/vagrant/
chmod 755 /home/vagrant/backup_mysql_nightly.sql
MYSQLPW='Perseverence!2'

mysql -u root -p$MYSQLPW -e "DROP DATABASE IF EXISTS neeisPortal;"


mysqladmin -u root -p$MYSQLPW create neeisPortal
mysql -u root -p$MYSQLPW neeisPortal --connect-expired-password  < /home/vagrant/backup_mysql_nightly.sql


