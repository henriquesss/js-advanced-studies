## All in one testing project

The objective of this project is to practice all my testing skills and get 100% coverage.


### Crud comands

GET: curl http://localhost:3000/users
GET by ID:curl http://localhost:3000/users/1
POST: curl -X POST -H "Content-Type: application/json" -d '{"name": "JOHN DOE", "email": "john@example.com", "status:" "active"}' http://localhost:3000/users
PUT: curl -X PUT -H "Content-Type: application/json" -d '{"name": "John Smith"}' http://localhost:3000/users/1
DELETE: curl -X DELETE http://localhost:3000/users/1

