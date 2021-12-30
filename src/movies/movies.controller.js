const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const isShowing = req.query.is_showing
    const data = isShowing? await service.listShowing(): await service.list();
    res.json({
        data,
    });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

function movieExists(req, res, next) {
  service
    .read(req.params.movieId)
    .then((movie) => {
      if (movie) {
        res.locals.movie = movie;
        return next();
      }
      next({ status: 404, message: `Movie cannot be found.` });
    })
    .catch(next);
}

function addTheater(req, res, next) {
    service
    .addTheater(req.params.movieId)
    .then((movie) => {
      if (movie) {
        res.locals.movie = movie;
        return next();
      }
      next({ status: 404, message: `Movie cannot be found.` });
    })
    .catch(next);
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieExists, read],
    addTheater
  };