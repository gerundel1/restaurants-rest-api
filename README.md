# Restaurants Rest API

Rest API powered by NodeJS/Express server. This API sends the requests to the Mongo Database and retrieves the data requested back. Hosting could be provided by Heroku.

API Requests:
 1. POST:   "/api/restaurants"     - Add new restaurant to the DB
 2. GET:    "/api/restaurants"     - Query "?page=x&perPage=y" must be provided ("borough=z" is optional)
 3. GET:    "/api/restaurants/:id" - Retrieves the restaurant with the ID provided in URL
 4. PUT:    "/api/restaurants/:id" - Updates the restaurant with the ID provided in URL
 5. DELETE: "/api/restaurants/:id" - Deletes the restaurant with the ID provided in URL
