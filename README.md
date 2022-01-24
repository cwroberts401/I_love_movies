# I Love Movies

A RESTful api that allows users to access a varitey of information about movie showtimes, theater imformation, and movie reviews.

GET /movies

* response 200 (text/plain)
returns a list of movies in database

GET /movies/:movieId

* response 200 (text/plain)
return a specfic movie that corresponds with the movieId
returns 404 (not found) if movieId does not exist 

