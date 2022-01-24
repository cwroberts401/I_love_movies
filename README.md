# I Love Movies

A RESTful api that allows users to access a varitey of information about movie showtimes, theater imformation, and movie reviews.

GET /movies
* response 200 (text/plain) returns a list of movies in database

GET /movies/:movieId
* response 200 (text/plain) return a specfic movie that corresponds with the movieId
* response 404 (not found) if movieId does not exist 

GET /reviews
* response 200 (text/plain) returns a list of all reviews

PUT /reviews/:reviewId
* response 200 (text/plain) updates and returns edited review that corresponds with the reviewId

DELETE /reviews/:reviewId

* response 204 deletes review that corresponds to reviewId

GET /theaters
* response 200 (text/plain) returns a list of all theaters

GET movies/:movieId/reviews
* response 200 (text/plain) returns all reviews for movie as defined by movieId

GET movies/:movieId/theaters
* response 200 (text/plain) returns all theaters playing movie as defined by movieId
