# Mew & Maple — son yatay logo ve favicon tutarlılığı

Tarih: 18 Ekim 2026. Bu değişiklik mevcut taslak-siteyi düzeltir; kamuya açık makale yayımlama kararı değildir.

## Yapılanlar

- **Header:** Geçici "kedi ikonu + HTML ile yeniden yazılmış Mew & Maple" birleşimi kaldırıldı. Daha önce bağımsız üretilmiş, kullanıcı tarafından seçilmiş gerçek `/brand/autumn/lockup.webp` yatay logosu kullanılıyor (360 × 120 WebP). Görselin en-boy oranı korunuyor; mobil dahil doğal oranında gösteriliyor. Bağlantı için erişilebilir `aria-label` korunuyor.
- **Footer:** Aynı `lockup.webp` dosyası kullanılıyor. Logonun orman yeşili yazılarının koyu footer üzerinde okunabilmesi için küçük, krem renkli ve yuvarlatılmış bir pano seçildi. Footer sloganı metin olarak da mevcut.
- **Favicon:** Eski marka ikonuyla yarışan `/brand/favicon.svg` HTML bağlantısı çıkarıldı. HTML'de artık yalnızca son marka setindeki yeşil kedi silüeti `/brand/autumn/cat-silhouette.webp` (`image/webp`, gerçek boyut 96×96) tanıtılıyor.
- **PWA manifesti:** Eski SVG girdisi çıkarıldı; yalnızca yeni yeşil kedi ikonu ve gerçek 96×96 boyut bildiriliyor. Önceki SVG kaynak dosyaları arşiv/önceki tasarımlar olarak kalabilir ama aktif olarak sunulmuyor.
- **Duyarlılık:** 1100 piksel ve altında üst menü navigasyonu gerektiğinde logonun altına geçiyor. Mobilde yatay logo 298 px ile sınırlandırılıyor, yatay taşma ve okunamaz biçimde küçülme önleniyor.

## Kontroller

- `npm run audit:brand`: tek favicon bağlantısı, tek manifest ikonu, orijinal yatay görselin header/footer'da varlığı ve eski parçalara geri dönülmemesi.
- Chromium tarayıcı QA: 390/768/1440 pikselde gerçek logo yüklemeleri, yatay logo ölçüsü, linklerin ve favicon referansının doğruluğu.
- `scripts/check-live-worker.mjs`: gerçek Worker yanıtında iki logo, favicon sayısı, WebP 200 yanıtları ve manifest tekliğinin kontrolü. Otomatik post-deploy pipeline en son Git commit'i bekler.
- Site taslak durumunda: tüm sekiz makale `review`, `PUBLIC_SITE_READY` kapalı, HTTP ve HTML `noindex` korunmalı.

## Sonraki tur için açık noktalar

- Kullanıcının tasarım onayıyla birebir yatay logo yerleşimini masaüstü ve mobil gerçek tarayıcıda kontrol etme.
- WebP faviconun desteklenmediği tarayıcıları da kapsamak için **aynı yeşil silüetten üretilmiş** PNG/ICO veya sade SVG fallback seçeneği; daha önceki **farklı marka tasarımını** yedek olarak geri getirmemek gerekir.
- Domain `mewandmaple.com` henüz bu turda bağlanmıyor. Search Console'un Domain mülkünü doğrulamak için Google'ın gerçek DNS TXT kaydı gerekir. Hukuki yayıncı bilgileri de eksik.

