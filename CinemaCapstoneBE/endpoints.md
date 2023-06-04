## API Endpoints:
This file is a short documentation of the REST API built into this project, describing the most important endpoints of the application and its use cases.  
One of the future improvement that i want to bring into this project, it's the implementation of the OpenAPI - Swagger-UI, to build a more efficient and comprehensible documentation of the API.  


## Table of Contents
* [Authorization](#authorization)
* [Users](#users)
* [Movies](#movies)
* [Programs](#programs)
* [Rooms](#rooms)
* [Tickets](#tickets)
* [News](#news)


---
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
at this path: `./CinemaCapstoneBE/src/main/resources/data/CapstoneProject.postman_collection`  
Or click here [collection](./src/main/resources/data/CapstoneProject.postman_collection)
