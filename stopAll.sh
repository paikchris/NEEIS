ps -ef | grep "grails" | awk '{print $2}' | xargs kill
