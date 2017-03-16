#!/bin/bash
SHELL=/bin/bash
PATH=/root/.sdkman/candidates/grails/current/bin:/root/.sdkman/candidates/groovy/current/bin:/root/.sdkman/candidates/grails/current/bin:/usr/local/rvm/gems/ruby-1.9.2-p330/bin:/usr/local/rvm/gems/ruby-1.9.2-p330@global/bin:/usr/local/rvm/rubies/ruby-1.9.2-p330/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/rvm/bin:/root/bin

cd /universe/Neeis
export GRAILS_OPTS="-XX:MaxPermSize=1000m -Xmx1000M -server -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/universe/Neeis/logs -javaagent:/universe/Neeis/dripstat/dripstat.jar "
( nohup grails -noreloading run-app --non-interactive 2>&1 > /dev/null & )
