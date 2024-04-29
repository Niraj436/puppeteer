import puppeteer from 'puppeteer';
import fs from 'fs';

const run = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto('https://en.wikipedia.org/wiki/Zinedine_Zidane');

	// full page screen shot
	await page.screenshot({ path: 'screenshot.png', fullPage: true });

	// pdf file
	await page.pdf({
		path: 'page.pdf',
		format: 'A4',
	});

	// get title
	// const title = await page.title();
	// console.log(title);

	// get all text
	const text = await page.evaluate(() => document.body.innerText);
	// console.log(text);

	const image = await page.$$eval('tbody tr td img', (elements) =>
		elements.map((e) => ({
			path: e.src,
		}))
	);
	// console.log(image);

	// console.log(text);

	fs.writeFile('text.txt', text, (err) => {
		if (err) throw err;
		console.log(' text file saved successfully');
	});
	fs.writeFile('imagepath.json', JSON.stringify(image), (err) => {
		if (err) throw err;
		console.log('Image path file saved successfully');
	});
	await browser.close();
};

run();
