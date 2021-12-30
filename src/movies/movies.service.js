const knex = require("../db/connection");

const tableName = "movies";

function list() {
  return knex('movies')
    .select();
}

function listShowing() {
  return knex('movies as m')
    .join('movies_theaters as mt','m.movie_id','mt.movie_id')
    .select('m.*','mt.is_showing')
    .where('mt.is_showing', true)
    .distinct(); 
}

function read(movie_id) {
  return knex(tableName).select("*").where({ movie_id }).first();
}

function addTheater(movie_id) {
    return knex(tableName)
        .join("movies_theaters","movies.movie_id","movies_theaters.movie_id")
        .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
        .select("theaters.*")
        .where('movies.movie_id', movie_id);
}

module.exports = {
  list, listShowing, read, addTheater
};