#!/bin/sh
export PATH=$PATH:/root/.sdkman/candidates/grails/current/bin:root/.sdkman/candidates/groovy/current/bin:/root/.sdkman/candidates/grails/current/bin:/usr/local/rvm/gems/ruby-1.9.2-p330/bin:/usr/local/rvm/gems/ruby-1.9.2-p330@global/bin:/usr/local/rvm/rubies/ruby-1.9.2-p330/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/rvm/bin:/root/bin

# Defining a timeout of 1 hour
timeout=220

while true
do
  if curl -s --head  --request GET http://104.131.41.129:8080/portal/ | grep "200 OK" > /dev/null; then 
    echo "mysite.com is UP" >> /universe/Neeis/logs/grailsCron.txt
  else
    echo "mysite.com is DOWN" >> /universe/Neeis/logs/grailsCron.txt
    #sleep 2
    ps -ef | grep "grails.build.execution.context=/tmp/Neeis" | awk '{print $2}' | xargs kill
    cd /universe/Neeis
    export GRAILS_OPTS="-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/universe/Neeis/logs"
    ( nohup grails run-app --non-interactive >/universe/Neeis/logs/grailsCron.txt 2>&1 </universe/Neeis/logs/grailsCron.txt & )
    nohup echo "NOHUP TEST" >>  /universe/Neeis/logs/grailsCron.txt
  fi
  echo "waiting" >> /universe/Neeis/logs/grailsCron.txt
  sleep $timeout
done
