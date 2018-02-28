#!/usr/bin/env bash
cd /universe/Neeis/
./stopAll.sh


cd /universe/Neeis
grails war

cd /universe/Neeis/target
mv portal*.war ROOT.war

ssh root@104.131.41.129 'service tomcat stop'

ssh root@104.131.41.129 'rm -f /usr/share/apache-tomcat-7.0.73/webapps/ROOT.war'

ssh root@104.131.41.129 'rm -rf /usr/share/apache-tomcat-7.0.73/webapps/ROOT/'

scp /universe/Neeis/target/ROOT.war root@104.131.41.129:/usr/share/apache-tomcat-7.0.73/webapps

ssh root@104.131.41.129 'chmod 777 /usr/share/apache-tomcat-7.0.73/webapps/ROOT.war'

ssh root@104.131.41.129 'service tomcat start'

cd /universe/Neeis/target
rm -f portal*.war


cd /universe/Neeis/
./restartServer.sh 
