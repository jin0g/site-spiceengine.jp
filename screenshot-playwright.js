// Playwrightを使用したスクリーンショット作成
const fs = require('fs');
const path = require('path');

console.log('🚀 Playwrightを使用してspiceengine.jpのスクリーンショットを開始します...');

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

async function takeScreenshots() {
  try {
    const { chromium } = require('playwright');
    
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`\n[${i + 1}/${urls.length}] ${url} にアクセス中...`);
      
      try {
        await page.goto(url, { 
          waitUntil: 'networkidle',
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
          fullPage: true
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
    
  } catch (error) {
    console.error('Playwrightライブラリが見つかりません。代替手段を試行します...');
    
    // 代替: WebFetchを使用してページ内容を取得し、HTMLとして保存
    console.log('📄 WebFetchを使用してページ内容を取得します...');
    await fetchPageContent();
  }
}

async function fetchPageContent() {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`\n[${i + 1}/${urls.length}] ${url} の内容を取得中...`);
    
    try {
      // curlを使用してHTMLを取得
      const { exec } = require('child_process');
      const filename = url
        .replace(/https?:\/\//, '')
        .replace(/[^a-zA-Z0-9.-]/g, '_') + '.html';
      
      const filepath = path.join(screenshotsDir, filename);
      
      await new Promise((resolve, reject) => {
        exec(`curl -L "${url}" -o "${filepath}"`, (error, stdout, stderr) => {
          if (error) {
            console.error(`❌ ${url} でエラーが発生: ${error.message}`);
            resolve();
          } else {
            console.log(`✅ HTML保存: ${filename}`);
            resolve();
          }
        });
      });
      
    } catch (error) {
      console.error(`❌ ${url} でエラーが発生: ${error.message}`);
    }
  }
  
  console.log('\n📄 ページ内容の取得が完了しました！');
  console.log(`📁 HTMLファイルは ${screenshotsDir} に保存されています。`);
}

takeScreenshots().catch(console.error);