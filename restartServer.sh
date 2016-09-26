ps -ef | grep "grails.build.execution.context=/tmp/Neeis" | awk '{print $2}' | xargs kill
cd /universe/Neeis/
./serverStart.sh

