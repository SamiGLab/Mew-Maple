# Yayın engelleyiciler (P0)
- [ ] Marka, alan adı ve gerçek yayıncı bilgisi doğrulandı.
- [x] Sekiz makale için editoryal kaynak/iddia kontrolü ve 56/56 görselin editoryal güvenlik incelemesi tamamlandı; uzman onayı veya ürün test edilmişliği iddia edilmiyor.
- [ ] İçerik frontmatter status: published olarak editör onayıyla değiştirildi.
- [ ] Tüm iletişim, Privacy, Editorial ve Affiliate sayfaları gerçek operasyona göre gözden geçirildi.
- [ ] Google analytics / izin sistemi ve cookie düzeni gerçek işleyişe göre doğrulandı.
- [ ] SITE_URL gerçek, sahip olunan domain ile değiştirildi.
- [ ] PUBLIC_SITE_READY=true SADECE final Go/No-Go onayında ayarlandı.
- [x] Taslak-safe GitHub Actions `npm run check:source`, `npm run build` ve görsel/SEO/robots otomatik testleri başarılı.
- [ ] Gerçek domain ve prod yapılandırmasıyla yayın öncesi son build ve duman testi tamamlandı.
- [x] GitHub Actions gerçek Chromium: 390/768/1440 px toplam 20 sayfa/ekran testi, temsilî axe/WCAG A-AA, görseller, arama ve taslak sızıntı testleri başarılı (#39113150022).
- [ ] Gerçek yayın ortamında mobil Lighthouse, manuel klavye/ekran okuyucu testi, canlı linkler ve sosyal önizlemeler kontrol edildi.
- [x] Cloudflare Workers Production deployment onaylandı: kullanıcı panelinde aktif sürüm `66c9c552`, trafik %100; GitHub Actions canlı doğrulama #39118094587 ile altı HTTPS uç noktası beklenen 200/404 ve `noindex` sonuçlarını verdi. Bu yalnızca **taslak-safe Workers URL'si** için geçerlidir.
- [ ] Cloudflare üretim alan adı, HTTPS, 301 yönlendirmesi, sitemap/robots/canonical doğrulandı.
- [ ] GSC property ve sitemap; GA4 gerçek trafik ve privacy onayı test edildi.

## İşletim
Plan kodu GitHub'da, mevcut statik hosting hedefi Cloudflare Workers Builds. `PUBLIC_SITE_READY=false` iken sayfalarda `noindex,nofollow` uygulanır, sitemap boş kalır ve taslak makaleler üretim derlemesine alınmaz. `robots.txt` taramayı engellemez; aksi hâlde arama motoru `noindex` yönergesini göremeyebilir. `robots.txt` ve meta robots tarama/indeksleme kontrolleridir, erişim koruması değildir; özel önizleme ortamında ayrıca erişim kısıtı gerekir. Yayın için `PUBLIC_SITE_READY=true`, `PUBLISH_APPROVED=YES`, doğrulanmış `SITE_URL` ve editoryal/hukuki kontroller birlikte sağlanmalıdır. Gerçek domain doğrulanmadan canonical ve yayına alma kararları verilmez.
Değişiklikler GitHub pull request üzerinden gözden geçirilmeli; yayın sonrası geri dönüş commit revert ile yapılmalı.
