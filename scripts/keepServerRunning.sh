#!/bin/bash
SHELL=/bin/bash
PATH=/root/.sdkman/candidates/grails/current/bin:/root/.sdkman/candidates/groovy/current/bin:/root/.sdkman/candidates/grails/current/bin:/usr/local/rvm/gems/ruby-1.9.2-p330/bin:/usr/local/rvm/gems/ruby-1.9.2-p330@global/bin:/usr/local/rvm/rubies/ruby-1.9.2-p330/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/rvm/bin:/root/bin

if (( $(ps -ef | grep -v grep | grep "run-app -https --non-interactive" | wc -l) > 0 ))
then
echo "grails is running!!!"
else
echo "starting"
cd /universe/Neeis
export GRAILS_OPTS="-XX:MaxPermSize=2000m -Xms256m  -Xmx4000M -server -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/universe/Neeis/logs -XX:ErrorFile=/universe/Neeis/logs/error.log "
echo $PATH
echo $GRAILS_OPTS
( nohup grails -noreloading run-app -https  --non-interactive 2>&1 > /dev/null & )
echo "started"
fi

