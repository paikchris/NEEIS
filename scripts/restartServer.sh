#!/usr/bin/env bash
ps -ef | grep "grails.build.execution.context=/tmp/Neeis" | awk '{print $2}' | xargs kill
cd /universe/Neeis/
stopAll.sh
serverStart.sh

