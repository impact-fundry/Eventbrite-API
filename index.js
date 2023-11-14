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
            
            const grabEvent = await page.evaluate(() => {      
                const eventsDetails = document.querySelectorAll(".eds-structure__main")
                let eventsArr = [];
                eventsDetails.forEach(event => { 
                const eventTitle = event.querySelector(".eds-event-card__formatted-name--is-clamped");
                const eventDate = event.querySelector(".eds-event-card-content__sub-title");
                const eventLocation = event.querySelector(".card-text--truncated__one");
                const eventFee = "Free";
                const eventImage = event.querySelector("img").getAttribute("src");
                
                const data = {
                    title: eventTitle === null ? "nothing": eventTitle.innerText,
                    date: eventDate === null ? "nothing" : eventDate.innerText,
                    location: eventLocation === null ? "nothing" : eventLocation.innerText,
                    fee: eventFee,
                    image: eventImage === null ? "nothing" : eventImage
                }
                
                eventsArr.push(data);
            });
                return eventsArr;
            });
            console.log(grabEvent);
            res.send(grabEvent)
            await browser.close() 
        } catch (err) {
            console.log(err)
            res.send([])
        }
    })();
});


