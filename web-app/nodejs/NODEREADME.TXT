CENTOS 7

#INSTALL NVM
cd /universe/temp
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

#ADD TO PATH
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

#VERIFY NVM INSTALL
command -v nvm

#LIST VERSION OF NODE
nvm ls-remote

#INSTALL VERSION 6.10.0
nvm install 6.10.0

#CHECK INSTALL AND VERSION
node --version

#INSTALL LATEST
nvm install 7.7.2

#USE 6.10.0
nvm use 6.10.0

#CHECK VERSION
node --version


#CONFIGURE INTELLIJ
enable ECMAScript6 under javascript libraries
JSLint - assume node, use strict


#INSTALL REDIS
cd /universe/temp
wget http://download.redis.io/redis-stable.tar.gz
cp redis-stable.tar.gz /universe/
cd /universe/
tar xvzf redis-stable.tar.gz
rm -f redis-stable.tar.gz
cd redis-stable
make

make test
yum -y install tcl
make test

#Make sure Path has /usr/local/bin
sudo cp src/redis-server /usr/local/bin/
sudo cp src/redis-cli /usr/local/bin/

#start server
redis-server --daemonize yes


##IF HUGE PAGES WARNING, ADD THIS:
sysctl -w net.core.somaxconn=65535
echo never > /sys/kernel/mm/transparent_hugepage/enabled
##TO:
vi /etc/rc.local

vi /etc/sysctl.conf
sysctl vm.overcommit_memory=1



#CHECK IF REDIS IS WORKING
$ redis-cli
redis 127.0.0.1:6379> ping
PONG
redis 127.0.0.1:6379> set mykey somevalue
OK
redis 127.0.0.1:6379> get mykey
"somevalue"


npm install forever
forever start chatServer.js
forever [start | stop | stopall | list]


iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 8888 -j ACCEPT -m comment --comment "chatserver.js"
iptables save
