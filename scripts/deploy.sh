cd /universe/Neeis/
./stopAll.sh

cd /universe/Neeis
grails war

cd /universe/Neeis/target
mv portal*.war portal.war


ssh root@104.131.41.129 'rm -f /usr/share/apache-tomcat-7.0.73/webapps/portal.war'

scp /universe/Neeis/target/portal.war root@104.131.41.129:/usr/share/apache-tomcat-7.0.73/webapps

ssh root@104.131.41.129 'chmod 777 /usr/share/apache-tomcat-7.0.73/webapps/portal.war'

ssh root@104.131.41.129 'service tomcat restart'

cd /universe/Neeis/target
rm -f portal*.war


cd /universe/Neeis/
./restartServer.sh 
