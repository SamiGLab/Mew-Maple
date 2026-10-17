# Mew & Maple — Astro v0.3 güvenlik denetimi (17 Ekim 2026)

## Yapılanlar
- Taslak makalelerden var olmayan makalelere verilen iç bağlantıları yakalayan kontrol eklendi.
- Yayımlanmış makalenin henüz yayımlanmamış başka bir makaleye bağlantı vermesini ENGELLEYEN yayın kontrolü eklendi.
- `SITE_URL` doğrulaması URL ayrıştırmasıyla güçlendirildi; örnek ve preview alan adları reddedilir.
- Yayın tarihinin gerçek tarih olup olmadığı ve gelecekte bulunmadığı kontrol ediliyor.
- About, Privacy, Editorial Policy ve Affiliate Disclosure sayfalarının taslak/placeholder bırakılması yayını engeller.
- Gerçek içerikleri değiştirmeyen izole test seti eklendi: preview build izni; tümü taslak içeriğe yayın engeli; yasal sayfa engeli; doğrulanmış fixture ile geçiş; örnek domain engeli; yayımlanmış→taslak makale bağlantısı engeli; yayın sahibi onayı engeli.
- `npm run check:source` artık otomatik olarak içerik denetimi, yayın kontrolü ve izole negatif testleri çalıştırır.

## Açık kalanlar
- `npm install` ve Astro gerçek derlemesi **BU ORTAMDA YAPILAMADI**: registry.npmjs.org DNS bağlantısı EAI_AGAIN. Kaynak denetimleri derlemenin yerini tutmaz.
- Kullanıcının GitHub hesabında `mew-and-maple-blog` deposu bulunmuyor; var olan `SamiGLab/kaftan-angelo` deposuna HİÇBİR İŞLEM yapılmadı.
- Domain, gerçek yayıncı bilgileri, editoryal kontrol ve özel preview erişim koruması bekliyor.
- Makalelerdeki kaynak bağlantılarının yayın öncesi tek tek doğrulanması gerekiyor.

## GitHub / Cloudflare sonraki adım
1. GitHub'da ayrı özel `mew-and-maple-blog` deposu aç; Kaftan Angelo deposunu kullanma.
2. Bu ZIP'in İÇİNDEKİ dosyaları (ZIP dosyasını değil) yeni deponun köküne yükle.
3. İnternete açık bir çalışma ortamında `npm install && npm run check:source && npm run build` çalıştır.
4. Oluşturulan `package-lock.json` dosyasını commit et, CI'yı npm ci ile sabitle.
5. Build başarılı olsa bile yayın izinleri ve hukuki sayfalar tamamlanmadan `PUBLIC_SITE_READY=true` verme.
