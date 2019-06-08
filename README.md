# Authentication
Authenticate and signin user for any other server 

#npm install :
install all the node packages first 

#npm run dev :
run the development server on port 3000

#connect authentication apis :

signin user - http://localhost:3000/signIn data: {username:"string", password:"string"}

verify user - http://localhost:3000/verify data: {token:"string", userid:"string"}

createadmin user - http://localhost:3000/createadmin data:  {username:"string", password:"string"}
