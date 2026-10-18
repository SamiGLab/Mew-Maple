# Cloudflare Workers — ana dala birleştirme sonrası otomatik canlı kontrol

**Amaç:** `mew-maple` Workers Builds ile GitHub `main` arasında otomatik doğrulama. Kullanıcı domain satın alana ve yayın için ayrıca izin verene kadar **yalnızca taslak-safe** durum kabul edilir.

## Sistem

- `.github/workflows/post-deploy-verify.yml`, her `main` push'unda devreye girer. Cloudflare'a gitmez, deploy yapmaz ve API token kullanmaz.
- `scripts/wait-for-worker-deploy.mjs`, `https://mew-maple.samiayten-hu.workers.dev/build-info.json` üzerinden **tam 40 karakterlik `github.sha`** eşleşmesini bekler.
- Asenkron Workers Builds için 20 saniye aralıklarla en fazla 8 dakika bekler. Daha yeni `main` push'u gelirse önceki kontrol iptal edilir (`concurrency.cancel-in-progress`).
- Sürüm kimliği eşleşince `scripts/check-live-worker.mjs` ana sayfa `noindex`/HTTP başlıkları, robots, boş sitemap/search, yayımlanmamış makale 404 ve bilinmeyen sayfa 404 testlerini çalıştırır.
- Yanlışlıkla `approved-publication` çalışan bir eşleşen sürüm **derhal başarısız** kabul edilir.
- Worker yeni commit'i 8 dakika içinde sunmuyorsa işlem başarısız olur; Cloudflare Builds logları kontrol edilmelidir.

## Güvenlik ve kapsam

- Public repoda yalnızca commit SHA, HTTP durumları ve taslak site metaverisi kullanılır; gizli anahtar yoktur.
- Bu kontrol, domain veya yayın kararı yerine geçmez; bireysel makalelerin kalitesi, yayıncı hukuki kimliği veya canlı `mewandmaple.com` performansını onaylamaz.
- Worker adresi/Builds bağı koparsa otomasyon hata döndürür; bu hata kaynak kodun bozulduğu anlamına gelmeyebilir. Önce Cloudflare > Workers & Pages > `mew-maple` > Builds/Deployments ekranındaki commit ve hata kayıtları incelenir.
- Cloudflare iş akışları proje yönetimi tarafından değiştirilirse scriptteki Worker origin de güncellenmelidir.

Kullanıcı tarafından domain alındıktan sonra `workers.dev` kontrolüne ek olarak gerçek domain ve yönlendirmeler için ayrı kontroller gerekir. `PUBLIC_SITE_READY`, `PUBLISH_APPROVED`, `SITE_URL` ve makale statüleri bu çalışmada değiştirilmedi.
