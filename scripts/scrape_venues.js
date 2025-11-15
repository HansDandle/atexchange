const puppeteer = require('puppeteer');
const fs = require('fs');

const BASE_URL = 'https://do512.com/venues';
const MAX_PAGES = 22;

async function scrapePage(page, browser) {
    const url = page === 1 ? BASE_URL : `${BASE_URL}?page=${page}`;
    const pageInstance = await browser.newPage();
    await pageInstance.goto(url, { waitUntil: 'networkidle2' });

    const venues = await pageInstance.evaluate(() => {
        const venueElements = document.querySelectorAll('.ds-listing.ds-listing-venue');
        const venues = [];

        venueElements.forEach((element) => {
            const nameElement = element.querySelector('.ds-title a');
            const addressElement = element.querySelector('.ds-listing-address');

            const name = nameElement ? nameElement.textContent.trim() : null;
            const address = addressElement ? addressElement.textContent.trim() : null;

            if (name && address) {
                venues.push({ name, address });
            }
        });

        return venues;
    });

    await pageInstance.close();
    return venues;
}

async function scrapeAllPages() {
    const browser = await puppeteer.launch();
    let allVenues = [];

    for (let page = 1; page <= MAX_PAGES; page++) {
        console.log(`Scraping page ${page}...`);
        const venues = await scrapePage(page, browser);
        allVenues = allVenues.concat(venues);
    }

    await browser.close();
    return allVenues;
}

(async () => {
    try {
        const venues = await scrapeAllPages();
        fs.writeFileSync('venues.json', JSON.stringify(venues, null, 2));
        console.log(`Scraped ${venues.length} venues. Data saved to venues.json.`);
    } catch (error) {
        console.error('Error scraping venues:', error);
    }
})();