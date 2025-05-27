const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ヘッドレスChromeを直接使用してスクリーンショットを作成
console.log('🚀 ヘッドレスChromeを使用してspiceengine.jpのスクリーンショットを開始します...');

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

async function takeScreenshot(url, index) {
  return new Promise((resolve, reject) => {
    console.log(`\n[${index + 1}/${urls.length}] ${url} にアクセス中...`);
    
    // ファイル名を生成（URLから安全な文字列に変換）
    const filename = url
      .replace(/https?:\/\//, '')
      .replace(/[^a-zA-Z0-9.-]/g, '_') + '.png';
    
    const filepath = path.join(screenshotsDir, filename);
    
    // ヘッドレスChromeコマンドを構築
    const command = `google-chrome --headless --no-sandbox --disable-gpu --disable-dev-shm-usage --virtual-time-budget=5000 --window-size=1920,1080 --screenshot="${filepath}" "${url}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ ${url} でエラーが発生: ${error.message}`);
        resolve(); // 失敗してもスクリプトを継続
      } else {
        console.log(`✅ スクリーンショット保存: ${filename}`);
        resolve();
      }
    });
  });
}

async function main() {
  // 各URLを順次処理
  for (let i = 0; i < urls.length; i++) {
    await takeScreenshot(urls[i], i);
    // 少し待機（サーバー負荷軽減）
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎉 すべてのスクリーンショット撮影が完了しました！');
  console.log(`📁 スクリーンショットは ${screenshotsDir} に保存されています。`);
}

main().catch(console.error);