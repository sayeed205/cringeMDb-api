const cheerio = require("cheerio");
const htmlScrapper = require("../helper/htmlScrapper");

class Scraper {
  constructor() {
    this.baseUrl = "https://cringemdb.com";
    this.moviePath = "/movie";
    this.theatrePath = "/movies-in-theaters";
    this.futurePath = "/movies-coming-soon";
  }

  async getMovie(movie, year) {
    movie = !movie
      ? null
      : movie.includes(" ")
      ? movie.replace(" ", "-")
      : movie;

    !year ? null : year.length === 4 ? year : null;
    const movieDetails = {};
    const url =
      this.baseUrl + this.moviePath + "/" + movie.toLowerCase() + "-" + year;

    const html = await htmlScrapper(url);

    const $ = cheerio.load(html);

    try {
      movieDetails.title = $(".title").text();
      movieDetails["release year"] = year;
      movieDetails.certification = $(".certification").text();
      movieDetails["rating- value"] = $("span[itemprop='ratingValue']")
        .text()
        .trim();
      movieDetails["rating count"] = $("span[itemprop='reviewCount']")
        .text()
        .trim();
      movieDetails.url = url;

      $(".content-warnings div").each((i, el) => {
        let key = $(el).filter(".content-flag").find("h3").text().trim();
        let value = $(el).filter(".content-flag").find("h4").text().trim();

        movieDetails[key] = value;
      });

      movieDetails.poster = $(".poster-banner img")
        .attr("src")
        .replace("w300_and_h450_bestv2", "original");

      const casts = {};
      $(".credits a").each((i, el) => {
        let key = $(el).find("h3").text().trim();
        let value = $(el).find("p").text().trim();
        casts[key] = value;
      });
      movieDetails.casts = casts;
      return movieDetails;
    } catch (error) {
      console.log(error); // TODO: handle error
    }
  }

  async getMovieByUrl(url) {
    let urlArr = url.split("/");
    let movie = urlArr[urlArr.length - 1].slice(0, -5);
    let year = urlArr[urlArr.length - 1].slice(-4);
    return await this.getMovie(movie, year);
  }

  async scrapeMovies(url) {
    const html = await htmlScrapper(url);
    const $ = cheerio.load(html);
    const moviesUrl = [];
    $("div .content a").each((i, el) => {
      let href = $(el).attr("href");
      href.startsWith("/movie/") ? (href = this.baseUrl + href) : "";
      moviesUrl.push(href);
    });
    const movies = [];
    for (let movie in moviesUrl) {
      movies.push(await this.getMovieByUrl(moviesUrl[movie]));
    }
    return movies;
  }

  async getTheatre() {
    const url = this.baseUrl + this.theatrePath;
    return await this.scrapeMovies(url);
  }

  async getFuture() {
    const url = this.baseUrl + this.futurePath;
    return await this.scrapeMovies(url);
  }
}

const scraper = new Scraper();
// scraper.getMovie("red notice", 2021);
// scraper.getTheatre();
// scraper.getMovieByUrl("https://cringemdb.com/movie/tenet-2020");
scraper.getFuture();

module.exports = Scraper;
