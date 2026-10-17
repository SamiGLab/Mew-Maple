# Yayın engelleyiciler (P0)
- [ ] Marka, alan adı ve gerçek yayıncı bilgisi doğrulandı.
- [ ] Sekiz makale kaynak, güvenlik ve görsel QA'dan geçti. 
- [ ] İçerik frontmatter status: published olarak editör onayıyla değiştirildi.
- [ ] Tüm iletişim, Privacy, Editorial ve Affiliate sayfaları gerçek operasyona göre gözden geçirildi.
- [ ] Google analytics / izin sistemi ve cookie düzeni gerçek işleyişe göre doğrulandı.
- [ ] SITE_URL gerçek, sahip olunan domain ile değiştirildi.
- [ ] PUBLIC_SITE_READY=true SADECE final Go/No-Go onayında ayarlandı.
- [ ] `npm run build` ve `npm run audit:content` tamam.
- [ ] Mobil Lighthouse, gerçek linkler ve sosyal önizlemeler kontrol edildi.
- [ ] Cloudflare üretim alan adı, HTTPS, 301 yönlendirmesi, sitemap/robots/canonical doğrulandı.
- [ ] GSC property ve sitemap; GA4 gerçek trafik ve privacy onayı test edildi.

## İşletim
Plan kodu GitHub'da, hedef statik hosting Cloudflare Pages. `PUBLIC_SITE_READY=false` iken sayfalarda `noindex,nofollow` uygulanır, sitemap boş kalır ve taslak makaleler üretim derlemesine alınmaz. `robots.txt` taramayı engellemez; aksi hâlde arama motoru `noindex` yönergesini göremeyebilir. `robots.txt` ve meta robots tarama/indeksleme kontrolleridir, erişim koruması değildir; özel önizleme ortamında ayrıca erişim kısıtı gerekir. Yayın için `PUBLIC_SITE_READY=true`, `PUBLISH_APPROVED=YES`, doğrulanmış `SITE_URL` ve editoryal/hukuki kontroller birlikte sağlanmalıdır. Gerçek domain doğrulanmadan canonical ve yayına alma kararları verilmez.
Değişiklikler GitHub pull request üzerinden gözden geçirilmeli; yayın sonrası geri dönüş commit revert ile yapılmalı.
