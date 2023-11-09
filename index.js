const express = require("express");
const app = express();
const puppeteer = require('puppeteer');

app.listen(5000, () => { console.log("Server started on port 5000") });

app.get("/api", (req,res) => {
    res.json({"users": ["userOne","userTwo","userThree"]});
})

app.get("/events", (req, res) => {
    (async () => {
        try {
            const browser = await puppeteer.launch({ headless: true });

            const page = await browser.newPage();
            await page.goto(`https://www.eventbrite.co.uk/o/rise-london-16793628230`);
            
            const grabTitle = await page.evaluate(() => {
                const eventTitle = document.querySelector(".card-text--truncated__one")
                return eventTitle.innerText;
            })
            console.log(grabTitle);
            res.send(grabTitle)
            await browser.close() 
        } catch (err) {
            console.log(err)
            res.send([])
        }
    })();
});


