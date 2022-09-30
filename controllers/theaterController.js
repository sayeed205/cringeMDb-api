const Scraper = require("../scrapper/scrapper");

const scraper = new Scraper();

const getTheatre = async (req, res) => {
  let result = {};
  try {
    const movies = await scraper.getTheatre();
    result.movies = movies;
    result.url = scraper.baseUrl + scraper.theatrePath;
    result["total movies"] = movies.length;
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getTheatre;
