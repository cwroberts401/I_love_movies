const knex = require("../db/connection");
const tableName = "reviews";
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties")


const addCatergory = mapProperties({
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname"
})
const reduceCritics = reduceProperties("review_id", {
  organization_name: ["critic", "organization_name"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
});

function list() {
  return knex(tableName)
  .select('*');
}

function listForMovies(movieId) {
  return knex(tableName)
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("reviews.*","critics.organization_name","critics.preferred_name","critics.surname")
    .where("reviews.movie_id", movieId)
    .then(reduceCritics, null, 4)
}

function read(review_id) {
  return knex(tableName)
  .join("critics", "reviews.critic_id", "critics.critic_id")
  .select("reviews.*","critics.organization_name","critics.preferred_name","critics.surname")
  .where({ review_id })
  .first()
  .then(addCatergory);
}


function update(updatedReview) {
  return knex(tableName)
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("reviews.*","critics.organization_name","critics.preferred_name","critics.surname")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
}

function destroy(review_id) {
  return knex(tableName).where({ review_id }).del();
}


module.exports = {
  list, read, update, delete: destroy, listForMovies
};