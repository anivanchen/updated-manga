const constants = require("./constants.json");
const cron = require('node-cron')

function sendEmail(updatedManga) {
    const nodemailer = require('nodemailer');
    var mailOptions = {
        from: constants.loginUser,
        to: constants.sendToUser,
        subject: 'MangaBat Manga Updated',
        text: `${updatedManga}`
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: constants.loginUser,
            pass: constants.loginPass
        }
    });
    transporter.sendMail (mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

function getWebData() {
    const cheerio = require('cheerio');
    const axios = require('axios');
    var titleData = [];
    var otherData = [];
    axios.get(constants.website)
        .then((response) => {
            console.log('Fetch data successful')
            let $ = cheerio.load(response.data);
            $('div.list-story-item').each(function (i, e) {
                let title = $(e).find('a.item-title').text();
                let link = $(e).find('a.item-title').attr('href');
                let author = $(e).find('span.item-author').text();
                let chapter = $(e).find('a.item-chapter').first().text();
                let time = $(e).find('span.item-time').first().text();
                titleData.push(title);
                otherData.push('\n' + author + '\n' + chapter + '\n' + time + '\n' + link + '\n\n');
            })
            console.log('Filter data successful')
            checkUpdates(titleData, otherData);
        }).catch(function(error) {
            console.error(error);
        });
}

function checkUpdates(titleData, otherData) {
    var emaildata = '';
    for (let i = 0; i < titleData.length; i++) {
        for (let n = 0; n < constants.mangaTitles.length; n++) {
            if (titleData[i] === constants.mangaTitles[n]) {
                emaildata += constants.mangaTitles[n] + otherData[i];
            }
        }
    }
    if (emaildata !== '') {
        console.log('Data comparison successfully')
        sendEmail(emaildata);
        console.log('Sending data')
    }
    else {
        console.log('No data found to be equal in comparison')
    }
}

console.log('Service is online')

cron.schedule('*/5 * * * *', () => {
    console.log('Running script')
    getWebData();
});