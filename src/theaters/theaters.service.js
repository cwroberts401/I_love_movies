const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")

const tableName = "theaters";

const reduceMovies = reduceProperties("theater_id", {
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
});

function list() {
  return knex(tableName)
  .join("movies_theaters","theaters.theater_id","movies_theaters.theater_id")
  .join("movies","movies_theaters.movie_id","movies.movie_id")
  .select("theaters.*","movies.rating","movies.runtime_in_minutes","movies.title")
  .then(reduceMovies, null, 4);
}

function listFiltered(movieId) {
    return knex(tableName)
    .join("movies_theaters","theaters.theater_id","movies_theaters.theater_id")
    .join("movies","movies_theaters.movie_id","movies.movie_id")
    .select("theaters.*")
    .where('movies.movie_id', movieId)
    .distinct(); 
    // is distinct the best way to do this? when the tables are joined same theater comes up multiple times
  }

module.exports = {
  list, listFiltered
};