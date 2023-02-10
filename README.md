# MicroServices


## Authentication micro service: 
Node.js and TypeScript-based microservice responsible for managing user login and registration. User data is securely stored in a MySQL database table, ensuring the confidentiality and integrity of the information. The system has been developed with scalability and performance in mind, making it well-suited for handling high volumes of requests and user data. The use of TypeScript adds type safety to the codebase and enhances the overall maintainability of the system.

## Photo micro service: 
This is a highly performant and scalable micro service, built using Flask and MongoDB. It is responsible for managing and storing user photos in their respective albums. The system utilizes Redis for caching these photos, ensuring fast and efficient retrieval of data. The micro service also integrates with an Authentication service to ensure secure and authorized access to user data.

All services are containerized using Docker, making the deployment process easier and more efficient.

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Installation
```bash
git clone https://github.com/vipulvyas/MicroServices-Project/
cd MicroServices-Project
```
create image for both service app
```bash
cd Authentication
docker build -t auth .  # Authentication directory has docker file for auth service
cd ../Fetch\ Photo/
docker build -t photo .   # Fetch Photo directory has docker file for photo service
```
Now start docker compose
```bash
cd ..
docker-compose up
```
Now we have to create DB table in mysql 
```bash
docker ps -a
```
copy the container name or container id of mysql service
```bash
docker exec -it <mysql_container_id/name> bash
```
Now login to mysal shell using root user
```bash
$ mysql -u root -p 
# password:12345
> use AuthDB;
> CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(1600) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
It's done.

## Usage
After successfully completing the installation process, the services should now be up and running.

- The Authentication micro service should be accessible at http://localhost:3000
- The Photo micro service should be accessible at http://localhost:5000

## Testing
You can test the services by sending appropriate HTTP requests to the endpoints.

## Stop Services
To stop the services, simply press CTRL + C and then run:
```bash
docker-compose down
```

## Notes
Ensure that the ports 3000, 5000, 3306 are available on your system. If they are already in use, you can change the port mapping in the docker-compose.yml file.




