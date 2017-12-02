#!/usr/bin/env bash

#SYSTEM UPDATES
sudo yum -y update
sudo yum -y install zip
sudo yum -y install unzip
sudo yum -y install wget
sudo yum install -y epel-release
sudo yum install -y tcping
sudo yum install -y git
sudo yum install -y dos2unix
sudo yum install -y iptables-services

#INSTALL SDK MANAGER
yes | curl -s "https://get.sdkman.io" | bash
source "/root/.sdkman/bin/sdkman-init.sh"

##INSTALL JAVA 8
sdk install java 8u131-zulu
sdk install grails 2.5.5
sdk install groovy 2.4.4

##REPLACE GROOVY JARS
cp /vagrant/files/groovy-all-2.4.4.jar ~/.sdkman/candidates/grails/current/lib
cp /vagrant/files/groovy-all-2.4.4.jar ~/.sdkman/candidates/grails/current/dist

#UPDATE IPTABLES FIREWALL
sudo cp /vagrant/files/iptables.txt /etc/sysconfig/iptables
sudo systemctl stop firewalld && sudo systemctl start iptables; sudo systemctl start ip6tables
sudo iptables -S
sudo systemctl disable firewalld
sudo systemctl mask firewalld
sudo systemctl enable iptables
sudo systemctl enable ip6tables

##MYSQL DB
wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
sudo rpm -ivh mysql57-community-release-el7-11.noarch.rpm
sudo yum -y install mysql-server
sudo systemctl start mysqld

#CHANGE MYSQL ROOT PASSWORD
mysqlpw=$(sudo grep 'temporary password' /var/log/mysqld.log | sed 's/^.*: //')
MYSQLPW_NEW='Perseverence!2'
echo "ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQLPW_NEW';" > /home/vagrant/mysqlinit.sql
mysql -u "root" -p$mysqlpw  --connect-expired-password < /home/vagrant/mysqlinit.sql
echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '$MYSQLPW_NEW';" > /home/vagrant/mysqlinit.sql
mysql -u "root" -p$MYSQLPW_NEW  --connect-expired-password < /home/vagrant/mysqlinit.sql
rm mysqlinit.sql

#CREATE SSH KEYS
sudo mkdir /root/.ssh/
sudo cp /vagrant/files/idfile /root/.ssh/id_rsa
sudo chown root:root /root/.ssh/id_rsa
sudo chmod 700 /root/.ssh/id_rsa

#GET THE LATEST MYSQL BACKUP FROM DIGITAL OCEAN DEV SERVER
sudo scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@104.236.23.128:/universe/AdminScripts/backup_mysql_nightly.sql /home/vagrant/
chmod 755 /home/vagrant/backup_mysql_nightly.sql
MYSQLPW='Perseverence!2'
mysqladmin -u root -p$MYSQLPW create neeisPortal
mysql -u root -p$MYSQLPW neeisPortal --connect-expired-password  < /home/vagrant/backup_mysql_nightly.sql

#SQL SERVER
yes | sudo curl -o /etc/yum.repos.d/mssql-server.repo https://packages.microsoft.com/config/rhel/7/mssql-server-2017.repo
sudo yum install -y mssql-server
sudo ACCEPT_EULA='Y' MSSQL_PID='Developer' MSSQL_SA_PASSWORD='jakePoos521' MSSQL_TCP_PORT=1433 /opt/mssql/bin/mssql-conf setup
sudo systemctl start mssql-server
while ! tcping localhost 1433;do sleep 1; done

yes | sudo curl -o /etc/yum.repos.d/msprod.repo https://packages.microsoft.com/config/rhel/7/prod.repo
sudo ACCEPT_EULA='Y' yum install -y mssql-tools unixODBC-devel msodbcsql
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
source ~/.bashrc

#SETUP SQL SERVER FROM A SQL DUMP BACKUP FROM AIMSQL

printf "CREATE DATABASE Training\nGO\nUSE Training\nGO\nCREATE USER [web] WITH PASSWORD = 'jakePoos521'\nGO\nGRANT ALTER To web\nGO\nGRANT CONTROL To web\nGO\n" > /home/vagrant/sqlServerInit.sql
sqlcmd -S localhost -U SA -P 'jakePoos521' -i /home/vagrant/sqlServerInit.sql
#AIMSQL -> SQL SERVER MANAGEMENT STUDIO -> TRAINING DB -> RIGHT CLICK -> TASKS -> GENERATE SCRIPTS -> TRAINING -> SELECT ALL OBJECTS -> sqlServerBackup.sql
sqlcmd -S localhost -U SA -P 'jakePoos521' -i /vagrant/files/sqlServerBackup.sql
# AIMSQL -> SQL SERVER MANAGEMENT STUDIO -> TRAINING DB -> RIGHT CLICK -> SSMS TOOLS -> GENERATE INSERT STATEMENTS -> LIMIT ROWS TO ABOUT 3000 -> TrainingInsertStatements.sql
sqlcmd -S localhost -U SA -P 'jakePoos521' -i /vagrant/files/TrainingInsertStatements.sql



#CLONE NEEIS REPOSITORY
cd /universe/
rm -rf Neeis
GITHUBUSER=$(sudo grep "GITHUBUSER" /vagrant/vagrant.conf | sed 's/^.*GITHUBUSER=//' | sed -e 's/^[ \t]*//')
GITHUBPASSWORD=$(sudo grep "GITHUBPASSWORD" /vagrant/vagrant.conf | sed 's/^.*GITHUBPASSWORD=//' | sed -e 's/^[ \t]*//')
echo $GITHUBUSER:$GITHUBPASSWORD
git clone --verbose https://$GITHUBUSER:$GITHUBPASSWORD@github.com/paikchris/Neeis.git
cd Neeis
git checkout -B $GITHUBUSER-local
git push -u origin $GITHUBUSER-local

