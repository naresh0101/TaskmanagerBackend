
### How to run ( Project set up )

* ``` npm i ```
* ``` sudo npm install -g nodemon ``` if you have already installed no need to install
##### Now set up your Mongo db 
    * install mongo community in you machine or there are so many blogs or video in internet where you can find installation process. ( you can also take help from chat GPT)
    * Follow the below steps 
        * Type ```monog```
        * ```db.createUser(
       {
         user: "mongoadmin", // main admin user it could be anything
         pwd: "mongoadmin", // password against this could be anything 
         roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
       }
     )```
    * Now add user , password and roles config.json 
)
* ``` NODE_ENV=development nodemon app.js ```