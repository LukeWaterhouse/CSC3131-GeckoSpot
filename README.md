# CSC3131 - GeckoSpot

## Running containers

to run the containers first open terminal in the api folder and run
```
npm install
```

this ensures nodemon is installed to enable hot loading

 # 
 after this open terminal in the project root and run
 ```
 docker-compose up
 ```
 this will start all the containers on a bridge network, you can access the front end on **localhost:3000**
 # 


 ## Running tests

in order to run the tests open terminal in the client folder and run
```
npm install
```
once this has completed, in the same directory run 
```
npm test
```
if tests do not run automatically press **a** to run all tests
# 


## Format Code

if you have made changes/additions and would like to format the code consistently with the project, in the project root run
```
prettier --write .
```
this will use the .pretterrc to format all files