# 全能氣象夥伴 WeatherMate AI

把天氣資料轉成「現在該怎麼做」的 AI 行動決策產品原型。

## 本機預覽

這是純靜態網站，不需要安裝套件。可直接開啟 `index.html`，或在此資料夾執行：

```powershell
python -m http.server 4173
```

瀏覽 `http://localhost:4173`。

## 部署到 GitHub Pages

1. 在 GitHub 建立新 repository，例如 `all-weather-companion`。
2. 將本資料夾設為 repository 根目錄並推送到 `main`。
3. 在 GitHub repository 的 **Settings → Pages → Build and deployment**，將 Source 設為 **GitHub Actions**。
4. `.github/workflows/pages.yml` 會自動部署網站。

## 產品定位

共同點是可靠預報、雷達、定位與警報；真正差異是「AI 行動決策引擎」：

1. 理解時間、行程、路線與偏好。
2. 把天氣機率轉成個人影響。
3. 在合適裝置與時機主動送達。
4. 透過回饋學習更有用的建議。

## 研究來源

- [中央氣象署開放資料平臺](https://opendata.cwa.gov.tw/devManual/insrtuction)
- [2025 Taiwan Internet Report](https://report.twnic.tw/2025/en/index.html)
- [Apple WeatherKit](https://developer.apple.com/weatherkit/)
- [Windy Premium](https://www.windy.com/subscription)
- [AccuWeather－臺灣 App Store](https://apps.apple.com/tw/app/id300048137)

## 注意

這是產品企劃與互動原型。畫面天氣、價格、成效指標均為測試假設，不是即時預報或銷售承諾。正式產品應保留官方警特報原文與來源，並對位置、行程及個人化資料採逐項授權與最少蒐集原則。
