#!/usr/bin/env bash
#CREATE SSH KEYS
sudo mkdir /root/.ssh/
sudo cp /vagrant/files/idfile /root/.ssh/id_rsa
sudo chown root:root /root/.ssh/id_rsa
sudo chmod 700 /root/.ssh/id_rsa



#CHANGE MYSQL ROOT PASSWORD
mysqlpw=$(sudo grep 'temporary password' /var/log/mysqld.log | sed 's/^.*: //')
MYSQLPW_NEW='Perseverence!2'
echo "ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQLPW_NEW';" > /home/vagrant/mysqlinit.sql
mysql -u "root" -p$mysqlpw  --connect-expired-password < /home/vagrant/mysqlinit.sql
echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '$MYSQLPW_NEW';" > /home/vagrant/mysqlinit.sql
mysql -u "root" -p$MYSQLPW_NEW  --connect-expired-password < /home/vagrant/mysqlinit.sql
rm mysqlinit.sql


#GET THE LATEST MYSQL BACKUP FROM DIGITAL OCEAN DEV SERVER
sudo scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@104.236.23.128:/universe/AdminScripts/backup_mysql_nightly.sql /home/vagrant/
chmod 755 /home/vagrant/backup_mysql_nightly.sql
MYSQLPW='Perseverence!2'
mysqladmin -u root -p$MYSQLPW create neeisPortal
mysql -u root -p$MYSQLPW neeisPortal --connect-expired-password  < /home/vagrant/backup_mysql_nightly.sql


#SETUP SQL SERVER FROM A SQL DUMP BACKUP FROM AIMSQL
cd /vagrant/files/
yes | unzip sqlServerStatements.zip
printf "CREATE DATABASE Training\nGO\nUSE Training\nGO\nCREATE USER [web] WITH PASSWORD = 'jakePoos521'\nGO\nGRANT ALTER To web\nGO\nGRANT CONTROL To web\nGO\n" > /home/vagrant/sqlServerInit.sql
sqlcmd -S localhost -U SA -P 'jakePoos521' -i /home/vagrant/sqlServerInit.sql
#AIMSQL -> SQL SERVER MANAGEMENT STUDIO -> TRAINING DB -> RIGHT CLICK -> TASKS -> GENERATE SCRIPTS -> TRAINING -> SELECT ALL OBJECTS -> sqlServerBackup.sql
sqlcmd -S localhost -U SA -P 'jakePoos521' -i /vagrant/files/sqlServerBackup.sql
# AIMSQL -> SQL SERVER MANAGEMENT STUDIO -> TRAINING DB -> RIGHT CLICK -> SSMS TOOLS -> GENERATE INSERT STATEMENTS -> LIMIT ROWS TO ABOUT 3000 -> TrainingInsertStatements.sql
sqlcmd -S localhost -U SA -P 'jakePoos521' -i /vagrant/files/TrainingInsertStatements.sql
rm /vagrant/files/TrainingInsertStatements.sql



#CLONE NEEIS REPOSITORY
#cd /universe/
#rm -rf Neeis
#GITHUBUSER=$(sudo grep "GITHUBUSER" /vagrant/vagrant.conf | sed 's/^.*GITHUBUSER=//' | sed -e 's/^[ \t]*//')
#GITHUBPASSWORD=$(sudo grep "GITHUBPASSWORD" /vagrant/vagrant.conf | sed 's/^.*GITHUBPASSWORD=//' | sed -e 's/^[ \t]*//')
#echo $GITHUBUSER:$GITHUBPASSWORD
#git clone --verbose https://$GITHUBUSER:$GITHUBPASSWORD@github.com/paikchris/Neeis.git
#cd Neeis
#git checkout -B $GITHUBUSER-local
#git push -u origin $GITHUBUSER-local

