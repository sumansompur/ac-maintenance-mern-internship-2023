# AC Maintenance Service Provider Website
This project was done as part of partial requirement for the completion of degree at VTU.
The entire application is made using the MERN stack (MongoDB, ExpressJS, ReactJS and NodeJS).

## Steps to configure and run the application

- Install the NodeJS on your local system
- Clone the repository to the desired location
- Open the cloned directory in a terminal (command prompt in windows) or open the built in terminal of your edtor.
- Execute the following: `npm run install`
- This project uses MongoDB atlas database, create a new database in mongoDB atlas and get the connection string [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- Create a .env file in the server folder.
- Copy the connection string and paste it the .env file at the server folder as shown below:
> DATABASE_URL=`connection-string` <br />
> JWT_SECRET=`generate random alphanumeric string with 32 characters or more`  
- Run the project using `npm run start` or alternatively if you wish to run the express server in watch mode, run `npm run start:dev`

<br/>
<br/>
This project is open for use for anyone. Happy Coding  
