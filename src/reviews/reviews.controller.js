const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const { movieId } = req.params;
    const data = movieId? await service.listForMovies(movieId): await service.list();
    res.json({
        data,
    });
}

function reviewExists(req, res, next) {
    service
      .read(req.params.reviewId)
      .then((review) => {
        if (review) {
          res.locals.review = review;
          return next();
        }
        next({ status: 404, message: `review cannot be found.` });
      })
      .catch(next);
  }

async function update(req, res, next) {

  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const update = await service.update(updatedReview)
  const data = await service.read(res.locals.review.review_id)
  res.json({ data });
}

function destroy(req, res, next) {
  service
    .delete(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [reviewExists, asyncErrorBoundary(update)],
    delete: [reviewExists, destroy],
  };