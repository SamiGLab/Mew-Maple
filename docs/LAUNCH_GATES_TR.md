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
Plan kodu GitHub'da, statik hosting Cloudflare Pages. PUBLISH READY env var atanmadan sitede noindex/nofollow uygulanır ve robots taramayı engeller. Gerçek domain yokken canonical çıkarılmaz ve sitemap boş döner.
Değişiklikler GitHub pull request üzerinden gözden geçirilmeli; yayın sonrası geri dönüş commit revert ile yapılmalı.
