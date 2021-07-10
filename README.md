# updated-manga
A web scraper bot built on Cheerio, Axios, and NodeMailer to check for updated manga.

Edit the constants.json file in /src before running.

```
{
    "loginUser" : "",
    "loginPass" : "",
    "sendToUser" : "",
    "website" : "https://m.mangabat.com/manga-list-all", 
    "mangaTitles" : [
        "title1",
        "title2
    ]
}
```

## How To Run

In the console: `npm start`

In Heroku: Fork this repository, connect the forked repository to Heroku via the Heroku app, and deploy.

In Docker:

- `docker build -t updatedmanga`
- `docker run updatedmanga`
