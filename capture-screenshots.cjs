const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to mobile size for some, desktop for others
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to local site...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Hero Section Screenshot
  console.log('Capturing Hero Section...');
  await page.screenshot({ path: 'my-remotion-video/public/screenshot_hero.png' });

  // 2. Scroll down to show features/grid
  console.log('Capturing Features/Grid...');
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'my-remotion-video/public/screenshot_features.png' });

  // 3. Navigate to a specific listing (Athens Flat)
  console.log('Navigating to /athens...');
  await page.goto('http://localhost:5173/athens', { waitUntil: 'networkidle2' });

  // Capture listing top
  console.log('Capturing Listing Top...');
  await page.screenshot({ path: 'my-remotion-video/public/screenshot_listing_top.png' });

  // Scroll to gallery
  console.log('Capturing Gallery...');
  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'my-remotion-video/public/screenshot_gallery.png' });

  // Switch to mobile viewport to show responsiveness
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  console.log('Capturing Mobile Hero...');
  await page.screenshot({ path: 'my-remotion-video/public/screenshot_mobile.png' });

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
