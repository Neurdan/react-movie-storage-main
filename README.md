# Getting Started

## Launching api server

First you need to start the container with api
This can be done by running the command:
#### `docker run --name movies -p 8000:8000 webbylabhub/movies` 
**Note: in this command port is 8000**

or if you need a different port to run, you can use this command:
#### `docker run --name movies -p 8001:8000 webbylabhub/movies `
**Note: in this command port is 8001**

You need to wait until the server api container starts

After starting the api server, you can proceed to the launch of the client part

## Launching react app
After you have launched the api server, you need to run the react application.\
In order to do this, you need to run a command that will download the image from a remote server and deploy everything you need
#### `docker run -d --name movies-client -p 3000:3000 -e REACT_APP_API_URL=http://localhost:YOUR-PORT/api/v1 neurdan/react-movie-storage`

**Note: Instead of the words YOUR_PORT, you need to write the port on which you launched your api server, as indicated in the section launching the api server**

That's all it takes to run the application

### Using application 
Further, after the full launch of the application, you need to go to the address:
[http://localhost:3000](http://localhost:3000) to start to use in your browser.
