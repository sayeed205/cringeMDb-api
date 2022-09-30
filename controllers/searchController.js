const Scraper = require("../scrapper/scrapper");

const scraper = new Scraper();

const getMovie = async (req, res) => {
  const { movie, year } = req.params;

  try {
    const movieDetails = await scraper.getMovie(movie, year);
    res.status(200).json(movieDetails);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getMovie;
