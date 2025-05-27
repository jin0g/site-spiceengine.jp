const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🚀 Puppeteerを使用してspiceengine.jpのスクリーンショットを開始します...');
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-features=VizDisplayCompositor'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // スクリーンショット保存ディレクトリを作成
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  // spiceengine.jpの主要なページURL（リダイレクト先を使用）
  const urls = [
    'http://www.spiceengine.jp',
    'http://www.spiceengine.jp/en.html',
    'http://www.spiceengine.jp/blog.html'
  ];

  console.log(`📸 ${urls.length}つのページのスクリーンショットを撮影します...`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`\n[${i + 1}/${urls.length}] ${url} にアクセス中...`);
    
    try {
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      
      // ページタイトルを取得
      const title = await page.title();
      console.log(`📄 ページタイトル: ${title}`);
      
      // ファイル名を生成（URLから安全な文字列に変換）
      const filename = url
        .replace(/https?:\/\//, '')
        .replace(/[^a-zA-Z0-9.-]/g, '_') + '.png';
      
      const filepath = path.join(screenshotsDir, filename);
      
      // フルページスクリーンショットを撮影
      await page.screenshot({ 
        path: filepath, 
        fullPage: true,
        type: 'png'
      });
      
      console.log(`✅ スクリーンショット保存: ${filename}`);
      
      // 少し待機（サーバー負荷軽減）
      await page.waitForTimeout(1000);
      
    } catch (error) {
      console.error(`❌ ${url} でエラーが発生: ${error.message}`);
    }
  }

  await browser.close();
  console.log('\n🎉 すべてのスクリーンショット撮影が完了しました！');
  console.log(`📁 スクリーンショットは ${screenshotsDir} に保存されています。`);
})();