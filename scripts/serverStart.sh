#!/bin/bash
SHELL=/bin/bash
PATH=$PATH:/root/.sdkman/candidates/grails/current/bin:/root/.sdkman/candidates/groovy/current/bin:/root/.sdkman/candidates/grails/current/bin:/root/bin
export GRAILS_OPTS="-server -Xmx768M -Xms64M -XX:PermSize=32m -XX:MaxPermSize=256m -Dfile.encoding=UTF-8 -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/universe/Neeis/logs -XX:ErrorFile=/universe/Neeis/logs/error.log"

cd /universe/Neeis
( nohup grails -noreloading run-app -https  --non-interactive 2>&1 > /dev/null & )
