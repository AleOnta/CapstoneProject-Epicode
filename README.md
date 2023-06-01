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


## Technologies Used

### Back-end

- Java SE 17 - Object-oriented programming language
- Spring Boot 3.0.6 - Java-based framework for building RESTful APIs
- PostgreSQL - Relational database management system
- JWT Authentication - JSON Web Token authentication mechanism

### Front-end

- React 18.2.0 - JavaScript library for building user interfaces
- TypeScript 4.9.5 - Typed superset of JavaScript
- React Redux 8.0.5 - Official React bindings for Redux state management
- Redux Toolkit 1.9.5 - Redux toolset for efficient development
- React Bootstrap 2.7.4 - UI framework for React applications
- React Router DOM 6.1.1 - Routing library for React applications
- Sass 1.62.1 - CSS extension language
- React YouTube 10.1.0 - React component for YouTube player integration

### Additional Technologies

- Payment Gateway API - Integration for secure payment processing
- Other libraries, frameworks, or tools you used in your project


## Features

- Browse ongoing movie projections
- Search for movies and retrieve detailed information
- Purchase cinema tickets online
- Secure payment processing


## Screenshots

The following is a screenshot of the Movie-focus page:
![Example screenshot](./cinema_capstone_fe/src/assets/imgs/movie_card.png)

This is a screenshot of the Seats-selection into the check-out page:
![Example screenshot](./cinema_capstone_fe/src/assets/imgs/seats_selection.png)


## Installation

1. Clone the repository: `git clone [https://github.com/AleOnta/CapstoneProject-Epicode]`


### Back end setup:

1. To correctly initialize the back end of the application, you will need to restore the PostgreSQL database through PG Admin 4 Dashboard and the SQL Database backup provided in the CinemaCapstone_BE folder.
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


### Front end setup:

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

## Usage

- Register as a user to access ticket purchasing functionality.
- Explore the ongoing projections to choose a movie.
- Utilize the search feature to find detailed information about a specific movie.
- Select the desired movie and follow the steps to purchase tickets securely.

`write-your-code-here`


## API Endpoints

1. Auth endpoints:
  - `/auth/register`  
  The endpoint is available only for POST requests, it is provided to allow visitors to register into the database.
  To correctly create a new user it will be necessary to provide a JSON request body built as the following:
```json
{
"firstname": "...",
"lastname": "...",
"username": "...",
"email": "...",
"password": "...",
"birthdate": "yyyy-mm-dd"
}
```
  - `auth/login`  
  The endpoint is available only for POST requests, it is provided to allow registered users to login and receive their own JWT token.  
  To correctly complete the login process it is  necessary to provide a JSON request body built as the following:
```json
{
"username": "...",
"password": "..."
}
```
or
```json
{
"email": "...",
"password": "..."
}
```


## Project Status

Project is: _in progress_ .


## Room for Improvement

Room for improvement:
- Update of the Postman Collection with pageable request for each endpoint

To do:
- Update of user password only
