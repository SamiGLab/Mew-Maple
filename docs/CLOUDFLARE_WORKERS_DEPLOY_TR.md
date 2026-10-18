# Mew & Maple — Cloudflare Workers dağıtım kaydı (18 Ekim 2026)

Bu proje **Cloudflare Workers Builds**, Cloudflare Pages değil. Kullanıcının verdiği hedef adres:
`https://mew-maple.samiayten-hu.workers.dev/`.

## Depoya işlenen altyapı

- Worker adı: `mew-maple` (mevcut Workers adresiyle uyumlu).
- `wrangler.jsonc`: statik içerik dizini `./dist`, `auto-trailing-slash`, gerçek `404-page`.
- Derleme: `npm run build`. Dağıtım: `npx wrangler deploy`. Kök: `/`, Git branch: `main`.
- `PUBLIC_SITE_READY` henüz **true olarak atanmayacak**. İçerik kayıtlarında sekiz makale `status: review`; statik derleme rehber sayfalarını dışarıda bırakır.
- Taslak derlemede `dist/_headers` dosyası `X-Robots-Tag: noindex, nofollow, noarchive` üretir. Meta `noindex,nofollow`, boş sitemap ve search-index kontrolü ayrıca devam eder.
- `noindex` **erişim kontrolü değildir**. Workers URL'sine ulaşan kişi yayımlanmış (taslak-safe) sayfaları görebilir; public GitHub deposundaki Markdown dosyaları da zaten herkese görünür.

## Cloudflare hesap erişimi olmadan doğrulanamayacaklar

- [ ] Workers Builds'nin son `main` commit'ini otomatik dağıttığı ve build/deploy logunun başarıyla tamamlandığı.
- [ ] `workers.dev` canlı adreste /, /robots.txt, /search-index.json, /404 ve /guides/.. HTTP durum kodu / response başlıkları.
- [ ] Gerçek domainin satın alınması, DNS doğrulaması ve Custom Domains bağlantısı.
- [ ] Yayıncı kimliği, Privacy/çerez/affiliate bilgileri ve sonraki `PUBLIC_SITE_READY=true` geçişi.

Cloudflare kontrol paneli: Workers & Pages > `mew-maple` > Deployments. Build ayarları ayrı olarak Settings > Build'de. **Build token'ın değerini veya Cloudflare API tokenlarını GitHub'a ya da sohbet ekran görüntülerine koymayın.**

Not: Yalnızca build komutunun başarıyla bitmesi son deploy adımının da geçtiğini kanıtlamaz. Canlı site ayrıca kontrol edilmelidir.
