# upercut
An application for Upercut technical test <br>
##### To-Dos
* The goal of the exercise is : using graphql and Apollo server With mongodb
* Create 2 collections Company and employee<br>
    A company can have many employees (DONE)<br>
    But an employee can have only one company (DONE)
* Company fields (DONE)<br>
Name<br>
Email<br>
Password
* Employee fields (DONE)<br>
Firstname<br>
Lastname<br>
Email<br>
Password
* Methods to implement :<br>
getCompanies (DONE)<br>
getCompanyById (DONE)<br>
getMyEmployees (DONE)<br>
getEmployees (DONE)<br>
updateCompany (must be signed in) (DONE)<br>
updateEmployee (must be signed in) (DONE)<br>
insertCompany (must be signed in) (DONE)<br>
insertEmployee (must be signed in) (DONE)<br>
deleteCompany (must be signed in) (DONE)<br>
deleteEmployee (must be signed in) (DONE)<br>
login(employee and company) (DONE)

##### Admin User Script MongoDB
```
{
    firstname: 'admin',
    lastname: 'admin',
    email: 'admin@mail.com',
    password: 'admin',
    companyid: '',
    lastLogin: '2021-08-29 09:04:53',
    token: 'dIhAl3MDSfyHDgDVbnwW5BpU2nSijn2F'
}
```

##### PM2 Setup
* Start PM2<br>
```
pm2 start pmtwo.json
```
* Show all PM2 Services
```
pm2 list
``` 
<br>or<br>
```
pm2 monit
```
* Stop all PM2 Service
```
pm2 stop all
```
* Delete all PM2 Service
```
pm2 delete all
```


##### CURL Script
* health<br>
```
curl --request POST \
--header 'content-type: application/json' \
--url http://localhost:4000/ \
--data '{"query":"query { health}"}'
```
* getCompanies<br>
```
curl --request POST \
--header 'content-type: application/json' \
--url http://localhost:4000/ \
--data '{"query":"query { getCompanies { _id name email } }"}'
```
* getCompanyById<br>
```
curl --request POST \
--header 'content-type: application/json' \
--url http://localhost:4000/ \
--data '{"query":"query { getCompanyById (id: \"123\") { _id name email } }"}'
```
* getEmployees<br>
```
curl --request POST \
--header 'content-type: application/json' \
--url http://localhost:4000/ \
--data '{"query":"query { getEmployees { _id firstname lastname email lastLogin } }"}'
```
* getMyEmployees<br>
```
curl --request POST \
--header 'content-type: application/json' \
--url http://localhost:4000/ \
--data '{"query":"query { getMyEmployees (companyid: \"123456\") { _id firstname lastname email lastLogin } }"}'
```
* insertCompany<br>
```
curl --request POST \
--header 'content-type: application/json' \
--header 'authorization: UBf7ANDaBdlR1Yhic4WLVmcTDN0pRJ0P' \
--url http://localhost:4000/ \
--data '{"query":"mutation { insertCompany (name: \"testcomp\", email: \"testcomp@gmail.com\", password: \"testcomp\") { status message } }"}'
```
* insertEmployee<br>
```
curl --request POST \
--header 'content-type: application/json' \
--header 'authorization: UBf7ANDaBdlR1Yhic4WLVmcTDN0pRJ0P' \
--url http://localhost:4000/ \
--data '{"query":"mutation { insertEmployee (firstname: \"testemp\", lastname: \"testemp\", email: \"testemp@gmail.com\", password: \"testemp\", companyid: \"\") { status message } }"}'
```
* updateCompany<br>
```
curl --request POST \
--header 'content-type: application/json' \
--header 'authorization: UBf7ANDaBdlR1Yhic4WLVmcTDN0pRJ0P' \
--url http://localhost:4000/ \
--data '{"query":"mutation { updateCompany (name: \"tescompedit\", _id: \"612ae89ec19f1f799b87ef25\",email: \"tescompedit@gmail.com\", password: \"tescompedit\") { status message } }"}'
```
* updateEmployee<br>
```
curl --request POST \
--header 'content-type: application/json' \
--header 'authorization: UBf7ANDaBdlR1Yhic4WLVmcTDN0pRJ0P' \
--url http://localhost:4000/ \
--data '{"query":"mutation { updateEmployee (firstname: \"tesempedit\", lastname: \"tesempedit\",_id: \"612ae900c19f1f799b87eff9\",email: \"tesempedit@gmail.com\", password: \"tesempedit\", companyid: \"\") { status message } }"}'
```
* deleteCompany<br>
```
curl --request POST \
--header 'content-type: application/json' \
--header 'authorization: UBf7ANDaBdlR1Yhic4WLVmcTDN0pRJ0P' \
--url http://localhost:4000/ \
--data '{"query":"mutation { deleteCompany (_id: \"612ae89ec19f1f799b87ef25\") { status message } }"}'
```
* deleteEmployee<br>
```
curl --request POST \
--header 'content-type: application/json' \
--header 'authorization: UBf7ANDaBdlR1Yhic4WLVmcTDN0pRJ0P' \
--url http://localhost:4000/ \
--data '{"query":"mutation { deleteEmployee (_id: \"612ae900c19f1f799b87eff9\") { status message } }"}'
```
* login<br>
```
curl --request POST \
--header 'content-type: application/json' \
--url http://localhost:4000/ \
--data '{"query":"mutation { login (email: \"admin@mail.com\", password : \"admin\") { status token } }"}'
```