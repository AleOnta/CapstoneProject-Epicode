# CapstoneProject - Thynk Cinema
> This project represents my last web application built while following Epicode boot camp for the past 6 months.   
> The Capstone Project is meant to be a demonstration of the skills learned during the boot camp and a business card for the future.   
> We were given about 25 days to develop an idea, choose the desired technologies, and then realize it.  
> Also, this Capstone represents for me the huge improvements I've reached in the last few months of my life.  


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Installation](#installation)
* [Usage](#usage)
* [API Endpoints](#api-endpoints)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)


## General Information
- My Capstone Project intends to simulate the web application of a cinema, to sell its products and retain its customers.
- As explained earlier, this project intends to demonstrate the skills learned during the last 6 months of boot camp, both front-end & back-end sides.

---
## Technologies Used

### Backend

- Java SE 17 - Object-oriented programming language
- Spring Boot 3.0.6 - Java-based framework for building RESTful APIs
- PostgreSQL - Relational database management system
- JWT Authentication - JSON Web Token authentication mechanism

### Frontend

- React 18.2.0 - JavaScript library for building user interfaces
- TypeScript 4.9.5 - Typed superset of JavaScript
- React Redux 8.0.5 - Official React bindings for Redux state management
- Redux Toolkit 1.9.5 - Redux toolset for efficient development
- React Bootstrap 2.7.4 - UI framework for React applications
- React Router DOM 6.1.1 - Routing library for React applications
- Sass 1.62.1 - CSS extension language
- React YouTube 10.1.0 - React component for YouTube player integration
---


### Additional Technologies

- Payment Gateway API - Integration for secure payment processing
- Other libraries, frameworks, or tools you used in your project
---


## Features

- Browse ongoing movie projections
- Search for movies and retrieve detailed information
- Purchase cinema tickets online
- Secure payment processing
---


## Screenshots

The following is a screenshot of the Movie-focus page:
![Example screenshot](./cinema_capstone_fe/src/assets/imgs/movie_card.png)

This is a screenshot of the Seats-selection into the check-out page:
![Example screenshot](./cinema_capstone_fe/src/assets/imgs/seats_selection.png)


## Installation

1. Clone the repository: `git clone [https://github.com/AleOnta/CapstoneProject-Epicode]`


### Backend setup:

1. To correctly initialize the backend of the application, you will need to restore the PostgreSQL database through PG Admin 4 Dashboard and the SQL Database backup provided in the CinemaCapstone_BE folder.
   - Follow the next path to find it: `./CinemaCapstoneBE/src/main/resources/backup.sql`

2. Once retrieved the file is, open PG Admin and: 
   - Create a new database with the name `CapstoneProject_cinema`.
   - Then right click on it and select `Restore`.
   - In field `Filename` select the backup.sql file found before.
   - Then click again on `Restore` to complete the process.

3. After that, open Eclipse IDE (for Enterprise Edition) into a workspace and:
   - Click on `File` in the menu.
   - Select `Import`.
   - Click on `Existing Maven Project`.
   - Click on `Browse` and select the CinemaCapstoneBE directory in the cloned repository.

4. Once completed those two steps, you are ready to run the API on `http://localhost:8080`
   - To do that, right-click on the project folder in the package explorer, hover with the mouse on the field `Run As` and select `Spring Boot Application`. 
---

### Frontend setup:

1. First, you will have to open the `cinema_capstone_fe` directory in your favorite IDE:

2. Install the dependencies:
```shell
npm install
```

3. Run the development server:
```shell
npm start
```

4. Open your browser and visit: `http://localhost:3000`
---


## Usage

- Register as a user to access ticket purchasing functionality.
- Explore the ongoing projections to choose a movie.
- Utilize the search feature to find detailed information about a specific movie.
- Select the desired movie and follow the steps to purchase tickets securely.
---


## API Endpoints

### Authorization:
- `/auth/register`  
The endpoint is available only for POST requests, it is provided to allow visitors to register into the database.
To correctly create a new user it will be necessary to provide a JSON request body built as the following:
```json
{
"firstname": "String",
"lastname": "String",
"username": "String",
"email": "String",
"password": "String",
"birthdate": "yyyy-mm-dd"
}
```  
   
- `auth/login`  
The endpoint is available only for POST requests, it is provided to allow registered users to login and receive their own JWT token.  
To correctly complete the login process it is  necessary to provide a JSON request body built as the following:
```json
{
"username": "String",
"password": "String"
}
``` 
or
```json
{
"email": "String",
"password": "String"
}
```  
---
  
### Users:
- `/users`      
This endpoint is available for GET & PUT requests, it provides a method to find all users persisted in the database and to update a specific user.  
To receive all users registered as response, you will have to perform a GET request without passing any parameter: `http://localhost:8080/api/users`  
To update a user object, you will have to add to the request body the following JSON object:
```json
{
"id": "Long",
"firstname": "String",
"lastname": "String",
"username": "String",
"email": "String",
"password": "String",
"birthdate": "yyyy-mm-dd"
}
```  
     
- `/users/:id`  
This endpoint is available for GET & DELETE requests, and has been created to find or delete a specific user stored in the database.    
The only parameter requested is the ID (Long value) passed through the URL, such as: `http://localhost:8080/api/users/1`  
---

### Movies:  
- `/movies`  
  This endpoint is available for GET, POST & PUT requests:  
  - GET = a GET request will return all movies stored in the database. 
  - POST = a POST request will require a JSON body request as the following:
  ```json
  {
  "tmdbId": "Long",
  "title": "String",
  "plot": "String",
  "genre": "String",
  "prodCompany": "String",
  "releaseDate": "yyyy-mm-dd",
  "filmLength": "Integer",
  "posterPath": "String",
  "castPath": "String",
  "budget": "Integer",
  "revenue": "Long",
  "popularity": "Double",
  "vote": "Double"
  }
  ```
  - PUT = a PUT request will require JSON request body as the previous one, but with the addition of the entity id:
  ```json
  {
  "id": "Long",
  "tmdbId": "Long",
  "title": "String",
  "plot": "String",
  "genre": "String",
  "prodCompany": "String",
  "releaseDate": "yyyy-mm-dd",
  "filmLength": "Integer",
  "posterPath": "String",
  "castPath": "String",
  "budget": "Integer",
  "revenue": "Long",
  "popularity": "Double",
  "vote": "Double"
  }
  ```
- `/movies/:id`
  This endpoint is available for GET & DELETE requests, and in both cases will require a URL parameter/path variable `/:id`:
  - GET = will return the movie object with the id as the one passed as a parameter.
  - DELETE = will delete the movie entity with the specified id passed as a parameter, from the database.
---
  
### Programs:
- `/programs`
  This endpoint is available for GET & PUT:
  - GET = will return all programs stored in the database.
  - PUT = a PUT request will require a JSON request body as the following:
  ```json
  {
    "id": "Long",
    "fromDate": "yyyy-mm-dd",
    "toDate": "yyyy-mm-dd",
    "status": "Enum as String",
    "price": "Double",
    "film": {
      "id": "Long",
      "...": "..."
    },
    "room": {
      "id": "Long",
      "...": "..."
    }
  }
  ```
- `/programs/:id`
  This endpoint is available for GET & DELETE requests and in both cases will require a URL parameter/path variable `/:id`:
  - GET: will return the program object with the id as the one passed as a parameter.
  - DELETE: will delete the program entity with the specified id passed as a parameter from the database.


- `/programs/:movieId/:roomId`
  This endpoint is available for POST request, and is provided to permit the creation of new program entities.
  The POST request will require 3 differents parameters, such as:
  - the related movie id, that will be passed as URL parameter/path variable `/:movieId`.
  - the related room id, that will be passed as URL parameter/path variable `/:roomId`.
  - A JSON request body of the program entity that you are trying to add:
  ```json
  {
    "fromDate": "yyyy-mm-dd",
    "toDate": "yyyy-mm-dd",
    "status": "Enum as String",
    "price": "Double"
  }
  ```
---
  
### Rooms:
- `/rooms`
This endpoint is available for GET, POST & PUT requests:
  - GET = will return all the room entities stored in the database.
  - POST = the POST request will require a JSON request body as the following:
  ```json
  {
    "name": "String",
    "totalSeats": "Integer",
    "normalSeats": "Integer",
    "vipSeats": "Integer",
    "timetables": "String"
  }
  ``` 
  - PUT = the PUT request will require a JSON request body as the following:
  ```json
  {
    "id": "Long",
   "name": "String",
    "totalSeats": "Integer",
    "normalSeats": "Integer",
    "vipSeats": "Integer",
    "timetables": "String"
    "programs": [{"...": "..."}],
    "tickets": [{"...": "..."}]
  }
  ```
- `/rooms/:id`
This endpoint is available for GET & DELETE requests and in both cases will require a URL parameter/path variable `/:id`:
  - GET = will return the room entity with id as the one passed as a parameter.
  - DELETE = will delete the room entity with the specified id passed as a parameter from the database.
---  
  
### Tickets:
-  `/tickets`
This endpoint is available only for GET requests, and it will return all ticket entities stored in the database.  
  
- `/tickets/:id`
This endpoint is available for GET & DELETE requests, and in both cases will require a URL parameter/path variable `/:id`:  
  - GET = will return the ticket entity with id as the one passed as a parameter.  
  - DELETE = will delete the ticket entity with the specified id passed as a parameter from the database.   
-  `/tickets/user_id/:userId`
This endpoint is available only for a GET request, and it's provided by a custom query.  
The request will require to pass as a URL parameter/path variable the id of the desired user.  
The server will respond with a list of all tickets of the specified user.  
- `/tickets/:ownerId/:programId`
This endpoint is available only for POST request, and it is provided to permit the creation of new ticket entities.  
The POST request will require 3 differents parameters such as:  
  - the id of the user that is purchasing the ticket, that will be passed as URL parameter/path variable `/:ownerId`.
  - the related program id, that will be passed as URL parameter/path variable `/:programId`.
  - A JSON request body of the ticket entity that you are trying to add:
  ```json
  {
    "emitDate": "yyyy-mm-dd",
    "perDate": "yyyy-mm-dd",
    "hours": "String",
    "seatCode": "String"
  }
  ```  
---  
### News:
- `/news`
This endpoint is available only for a GET request, that won't require any parameter, and will return all news entities stored in the database.
- `/news/:movieId`
This endpoint is available only for a POST request, provided to permit the creation of new news entities.  
The POST request will require 2 differents parameters such as:
  - the related movie id, passed as as URL parameter/path variable `/:movieId`.
  - A JSON request body of the news entity that you are trying to add:
  ```json
  {
    "redactDate": "yyyy-mm-dd",
    "author": "String",
    "title": "String",
    "article": "String"
  }
  ```
---

### Custom / Specific GET requests:
Please, note the endpoints described above are just the simple CRUD of the application, for further GET requests take a look to the Postman collection  
at this path: ./CinemaCapstoneBE/src/main/resources/CinemaCollection

## Project Status

Project is: _in progress_ .


## Room for Improvement

Room for improvement:
- Update of the Postman Collection with pageable request for each endpoint

To do:
- Update of user password only
