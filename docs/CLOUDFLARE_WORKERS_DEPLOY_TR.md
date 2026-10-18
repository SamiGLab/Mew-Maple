# Mew & Maple — Cloudflare Workers dağıtım kaydı (18 Ekim 2026)

> **18 Ekim 2026 canlı doğrulama tamamlandı:** Cloudflare ekranında Production sürümü `66c9c552` aktif ve %100 trafik alıyor. [Actions #39118094587](https://github.com/SamiGLab/Mew-Maple/actions/runs/39118094587) gerçek HTTPS üzerinden `/`, `/robots.txt`, `/sitemap.xml`, `/search-index.json` (200) ve taslak rehber ile geçersiz sayfa (404) doğrulamalarını **0 hatayla** tamamladı. `X-Robots-Tag: noindex, nofollow, noarchive` ve meta `noindex` doğrulandı. Bu **yayın onayı değildir**.

Bu proje **Cloudflare Workers Builds**, Cloudflare Pages değil. Kullanıcının verdiği hedef adres:
`https://mew-maple.samiayten-hu.workers.dev/`.

## Depoya işlenen altyapı

- Worker adı: `mew-maple` (mevcut Workers adresiyle uyumlu).
- `wrangler.jsonc`: statik içerik dizini `./dist`, `auto-trailing-slash`, gerçek `404-page`.
- Derleme: `npm run build`. Dağıtım: `npx wrangler deploy`. Kök: `/`, Git branch: `main`.
- `PUBLIC_SITE_READY` henüz **true olarak atanmayacak**. İçerik kayıtlarında sekiz makale `status: review`; statik derleme rehber sayfalarını dışarıda bırakır.
- Taslak derlemede `dist/_headers` dosyası `X-Robots-Tag: noindex, nofollow, noarchive` üretir. Meta `noindex,nofollow`, boş sitemap ve search-index kontrolü ayrıca devam eder.
- `noindex` **erişim kontrolü değildir**. Workers URL'sine ulaşan kişi yayımlanmış (taslak-safe) sayfaları görebilir; public GitHub deposundaki Markdown dosyaları da zaten herkese görünür.

> **Bağımsız kontrol notu (18 Ekim 2026):** `mew-maple.samiayten-hu.workers.dev` alan adı bu çalışma ortamındaki HTTP istemcisiyle DNS üzerinden çözümlenemedi. Bu bulgu canlı deploy'un başarısını veya hatasını tek başına kanıtlamaz; gerçek Cloudflare Builds logu ve hesabın doğru workers.dev alt alan adı mutlaka doğrulanmalıdır. Herkese açık bir URL üzerinden özel içerik kontrolü yapılmaz.

## Canlı HTTP kontrolü (Cloudflare hesabı şifresi gerektirmez)

- GitHub > Actions > **Live Workers safety check** > Run workflow yoluyla `https://mew-maple.samiayten-hu.workers.dev/` adresini test edin. URL hesapta farklıysa formdaki `base_url` alanını **gerçek Workers adresiyle** değiştirin.
- Alternatif: `npm run audit:live:worker` (gerekirse `LIVE_WORKER_URL=https://gercek-host/` ortam değişkenini ayarlayın).
- Script sırasıyla `/`, `/robots.txt`, `/sitemap.xml`, `/search-index.json`, taslak makale ve geçersiz rota HTTP yanıtlarını denetler. HTTPS, `noindex` meta ve `X-Robots-Tag`, boş sitemap/arama, **gerçek 404** doğrulanmadan deploy doğrulandı denmez.
- DNS veya HTTP erişimi yoksa "başarısız"/"erişim sağlanamadı" raporlanır; bu durumda Cloudflare > Workers & Pages > `mew-maple` > Deployments (ve Settings > Domains & Routes) ekranlarında son sürüm, hatalar ve etkin `workers.dev` route kontrol edilir.
- Bu çalışma yalnızca **hazır taslak-safe Worker** için geçerlidir; gerçek siteye makaleleri yayınlama onayı değildir.

## Cloudflare hesap erişimi olmadan doğrulanamayacaklar

- [x] Kullanıcının Cloudflare Production ekranında 18 Ekim 2026'da dağıtım sürümü `66c9c552` aktif ve trafiği %100 olarak görünüyordu. Exact Git SHA ↔ Cloudflare version mapping ayrıca kaydedilmedi.
- [x] `workers.dev` canlı HTTP kontrolü: 6 yolun 200/404 durumları, meta robots ve response başlıkları Actions #39118094587 ile doğrulandı.
- [ ] Gerçek domainin satın alınması, DNS doğrulaması ve Custom Domains bağlantısı.
- [ ] Yayıncı kimliği, Privacy/çerez/affiliate bilgileri ve sonraki `PUBLIC_SITE_READY=true` geçişi.

Cloudflare kontrol paneli: Workers & Pages > `mew-maple` > Deployments. Build ayarları ayrı olarak Settings > Build'de. **Build token'ın değerini veya Cloudflare API tokenlarını GitHub'a ya da sohbet ekran görüntülerine koymayın.**

Not: Yalnızca build komutunun başarıyla bitmesi son deploy adımının da geçtiğini kanıtlamaz. Canlı site ayrıca kontrol edilmelidir.
