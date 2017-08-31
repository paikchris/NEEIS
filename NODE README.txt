CENTOS 7

#INSTALL NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

#=> Downloading nvm from git to '/root/.nvm'
#=> Cloning into '/root/.nvm'...
#remote: Counting objects: 6118, done.
#remote: Total 6118 (delta 0), reused 0 (delta 0), pack-reused 6118
#Receiving objects: 100% (6118/6118), 1.74 MiB | 0 bytes/s, done.
#Resolving deltas: 100% (3777/3777), done.
#* (detached from v0.33.1)
#  master
#=> Compressing and cleaning up git repository
#Counting objects: 6118, done.
#Delta compression using up to 2 threads.
#Compressing objects: 100% (6080/6080), done.
#Writing objects: 100% (6118/6118), done.
#Total 6118 (delta 4042), reused 1890 (delta 0)
#
#=> Appending nvm source string to /root/.bashrc
#=> bash_completion source string already in /root/.bashrc
#=> Close and reopen your terminal to start using nvm or run the following to use it now:
#
#export NVM_DIR="$HOME/.nvm"
#[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

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