const express = require('express');
const app = express();
const puppeteer = require('puppeteer');



app.get("/api", (req,res) => {
    res.json({"users": ["userOne","userTwo","userThree"]});
})

app.get("/events", (req, res) => {
    (async () => {
        try {
            const browser = await puppeteer.launch({
                headless: false
            }); 

            const page = await browser.newPage();
            await page.goto(`https://www.eventbrite.co.uk/o/rise-london-16793628230`);

            //$$eval is a puppeteer function you can check the documentation
            const grabTitle = await page.$$eval('[data-testid="organizer-profile__future-events"] .eds-event-card__formatted-name--is-clamped', titles => {
                console.log("Here are the titles: " + titles)
                //return titles.textcontent
                return titles.map(title => title.textContent);
              });
             
            ///////////////////////////////////I was testing something below. You can delete if you want.//////////////////////////////////////
            // const grabTitle = await page.evaluate(() => {
            //     const eventTitles = document.querySelectorAll('[data-testid="organizer-profile__future-events"] .eds-event-card__formatted-name--is-clamped');
                
            //     // Convert NodeList to an array and then map to extract the innerText of each element
            //     const titleArray = Array.from(eventTitles).map(title => title.innerText);
              
            //     console.log("These are the titles: ", titleArray);
              
            //     return titleArray[0];
            //   });

            console.log(grabTitle);
            res.send(grabTitle)
            // await browser.close() 
        } catch (err) {
            console.log(err)
            res.send([])
        }
    })();
});


app.listen(5000, () => { console.log("Server started on port 5000") });

