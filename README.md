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

## Instructions

### Console

- `npm start`

# Heroku 

- Fork this repository, connect the forked repository to Heroku via the Heroku app, and deploy.

# Docker

- `docker build -t updatedmanga`
- `docker run updatedmanga`
