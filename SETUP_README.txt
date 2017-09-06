#MIGRATING FROM REMOTE DEVELOPMENT -> LOCAL DEVELOPMENT
#Guide written for Docker v17.06

1. Download Docker CE (Community Edition)
    - Windows: https://store.docker.com/editions/community/docker-ce-desktop-windows
    - Mac: https://store.docker.com/editions/community/docker-ce-desktop-mac
    - CentOS: https://docs.docker.com/engine/installation/linux/docker-ce/centos/

2. Install Using Instructions on Linked Page

3. Run Test Commands to Validate Installation. Run commands on Command Line on own computer (CMD or Terminal)
    - <docker version> (Prints Version Info)
    - <docker run hello-world> (Runs a Hello World Docker)
    - <docker ps> (Lists running Docker Containers)
    - <docker ps -a> (Lists Running and Stopped Docker Containers)
    - <docker images> (Lists Docker images on local machine)
    - <docker rm -f containerID> (Removes Containers from Docker)
    - <docker rmi containerID> (Removes Images from Docker)
