# react-with-spring-boot

Full Stack Development with Spring Boot and React - Third Edition
Author: Juha Hinkula

#Oracle setup
Install Docker
#Download Oracle 23ai container(Linux)
docker pull container-registry.oracle.com/database/free:latest

#configure docker volume (Linux)
sudo docker volume create oracle-data

#start container: 
 sudo docker run -d -p 1521:1521 -v oracle-data:/opt/oracle/oradata container-registry.oracle.com/database/free

#change password:
 sudo  docker exec -it containerid ./setPassword.sh newpassword
 
#Create Oracle table space and car db
CREATE USER cars IDENTIFIED BY oracle
   DEFAULT TABLESPACE users
   TEMPORARY TABLESPACE temp
   QUOTA UNLIMITED ON users;
 
GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE TO cars; 
 
#RUN THE JAVA PROGRAM
 in Eclipse, right-click the com.packt.cardb.CardbApplication.java file
 Select Run As -> Java Application


