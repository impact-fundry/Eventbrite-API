const express = require("express");
const app = express();
const puppeteer = require('puppeteer');

app.get("/api", (req,res) => {
    res.json({"users": ["userOne","userTwo","userThree"]});
})

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    await page.goto("https://www.eventbrite.co.uk/o/rise-london-16793628230")
    await page.screenshot({path: "mywebsite.png"})

    (async () => {
        // Launch the browser and open a new blank page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        // Navigate the page to a URL
        await page.goto('https://www.eventbrite.co.uk/o/rise-london-16793628230');
      
        // Set screen size
        await page.setViewport({width: 1080, height: 1024});
      
        // Type into search box
        await page.type('.search-box__input', 'automate beyond recorder');
      
        // Wait and click on first result
        const searchResultSelector = '.search-box__link';
        await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);
      
        // Locate the full title with a unique string
        const textSelector = await page.waitForSelector(
          'text/Customize and automate'
        );
        const fullTitle = await textSelector?.evaluate(el => el.textContent);
      
        // Print the full title
        console.log('The title of this blog post is "%s".', fullTitle);
      
        await browser.close();
      })();
      
    await browser.close();
})

app.listen(5000, () => { console.log("Server started on port 5000") });

