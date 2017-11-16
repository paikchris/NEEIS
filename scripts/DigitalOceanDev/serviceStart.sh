#!/bin/bash

SHELL=/bin/bash
JAVA_HOME=/root/.sdkman/candidates/java/current/
export JAVA_HOME
echo $PATH
PATH=/root/.sdkman/candidates/grails/current/bin:/root/.sdkman/candidates/groovy/current/bin:/root/.sdkman/candidates/grails/current/bin:/usr/local/rvm/gems/ruby-1.9.2-p330/bin:/usr/local/rvm/gems/ruby-1.9.2-p330@global/bin:/usr/local/rvm/rubies/ruby-1.9.2-p330/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/rvm/bin:/root/bin
export GRAILS_OPTS="-server -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/universe/Neeis/logs -XX:ErrorFile=/universe/Neeis/logs/error.log "
cd /universe/Neeis
ps -ef | grep "grails" | awk '{print $2}' | xargs kill
echo $PWD
echo $JAVA_HOME
grails -noreloading run-app -https
