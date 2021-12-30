const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const theaterRouter = require("../theaters/theaters.router")
const reviewsRouter = require("../reviews/reviews.router")
const methodNotAllowed = require("../errors/methodNotAllowed");


router.use("/:movieId/theaters", theaterRouter)
router.use("/:movieId/reviews", reviewsRouter)

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);


router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);



module.exports = router;