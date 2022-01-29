const puppeteer = require('puppeteer');
const fs = require('fs');

const scraping = async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		console.log('Buscando o link das imagens...');
		await page.goto(
			'https://facebook.com/pg/nasasolarsystem/photos/?tab=album&album_id=164320877917'
		);

		const imgsList = await page.evaluate(() => {
			const nodeList = document.querySelectorAll('div._2eea a img.img');
			const imgsArray = [...nodeList];
			console.log(imgsArray);
			const imgsList = imgsArray.map((img) => {
				return { src: img.src };
			});

			return imgsList;
		});

		fs.writeFile(
			'imgs_source.json',
			JSON.stringify(imgsList, null, 2),
			(err) => {
				if (err) {
					throw new Error('Oops, algo deu errado... ' + err);
				}
			}
		);

		await browser.close();
		console.log('Sucesso');
	} catch (error) {
		console.log('Oops, algo deu errado... ' + error);
	}
};

module.exports = { scraping };
