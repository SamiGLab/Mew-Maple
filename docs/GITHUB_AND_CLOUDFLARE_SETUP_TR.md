# Mew & Maple — GitHub ve Cloudflare test ortamı
**Güncellendi:** 17 Ekim 2026  |  **Durum:** GitHub hazır, Cloudflare henüz BAĞLI DEĞİL

## Gerçek durum
- GitHub deposu **PRIVATE**: https://github.com/SamiGLab/Mew-Maple
- Astro v0.3'ün 8 taslak rehberi, 56 WebP görseli ve kaynakları taşındı.
- `package-lock.json` eklendi; GitHub Actions `npm ci`, `npm run check:source`, `npm run build` testlerinde başarılı.
- Son doğrulanan örnek: https://github.com/SamiGLab/Mew-Maple/actions/runs/39061445609
- Kaynakça yapısal denetimi: https://github.com/SamiGLab/Mew-Maple/pull/5
- **Mew & Maple sitesi henüz canlı değil**. Domain satın alınmadı, Cloudflare Pages projesi açılmadı; taslak içerik `review` statüsünde.
- **Kritik kapsam sınırı:** `SamiGLab/kaftan-angelo`, kaftanangelo.com, ilgili DNS ve hosting kaynakları tamamen dokunulmaz.

## Cloudflare önizlemesine geçiş için yayın öncesi kontrol kapısı
Cloudflare'nin `*.pages.dev` temel adresi, repo PRIVATE olsa bile varsayılan olarak herkesin erişimine açık olabilir. Preview deployment'lar da varsayılan olarak herkese açıktır. `noindex` ve `robots` erişim kontrolü değildir.

1. Kullanıcı ayrı bir **Cloudflare Pages** projesi oluşturmayı onayladığında Dashboard → Workers & Pages üzerinden sadece `SamiGLab/Mew-Maple` reposunu bağla. Mevcut işletme projelerini seçme veya değiştirme.
2. Build command: `npm run build`; output: `dist`; project name: `mew-maple-staging` veya başka bağımsız isim; production branch: `main`.
3. Her iki ortam için güvenli ilk durum: `PUBLIC_SITE_READY=false`, `PUBLISH_APPROVED=NO`, `SITE_URL=https://preview.invalid`. Gerçek alan adı olmadan yayın modunu etkinleştirme.
4. Settings → General → **Enable access policy** ile *preview deployments* için Cloudflare Access aç. **Bu, ana `<project>.pages.dev` adresini otomatik olarak korumaz.**
5. Ayrıca `<project>.pages.dev` kök adresini kapsayan, yalnızca yetkili e-posta/kimliklerin giriş yapabildiği Cloudflare Access uygulaması/politikası yapılandır. Cloudflare'nin Pages Known Issues rehberinde ana `pages.dev` ve preview'lar için gereken iki aşamalı yapı anlatılıyor.
6. Yetkisi olmayan bir tarayıcıda hem ana `pages.dev` hem de preview URL'lerinde giriş/engelleme ekranını kontrol et. Yalnızca `x-robots-tag: noindex` görmek yeterli değildir.
7. İçerik rotalarının statik önizlemede bulunmadığını doğrula. Site bu aşamada sadece **taslak-güvenli iskelet** gösterebilir; editöryel rehber incelemesi local `npm run dev` ile veya ayrı korumalı inceleme ortamıyla yapılır.
8. Domain bağlama, GA4/çerez, affiliate, reklam ve gerçek `PUBLIC_SITE_READY=true` ayarları yapılmaz. Canlı yayına geçmek için #1 ve #2 P0 işleri, bütün kabul testleri ve sahibin açık son onayı gerekir.

## Geliştirme iş akışı ve geri dönüş
- Küçük değişiklikleri yeni dalda uygula; PR aç; `validate` job'unda `npm ci`, kaynak ve Astro build kontrolleri geçmeden `main` dalına alma.
- `main` dalına doğrudan force-push, tarihçe silme veya gizli çevre değişkeni yazma.
- Yayın dağıtımı başladıktan sonra problem olursa Cloudflare dashboard üzerinden önceki başarılı deployment'a geri dönmeyi değerlendir; kodun kalıcı geri alınması için `git revert` ile ters commit üreten yeni PR aç. Doğrulamadan prod env ayarı değiştirme.
- Branch protection/rulesets GitHub hesap planına bağlıdır: private depoda GitHub Pro/Team/Enterprise gerekebilir. Gerçek repo kuralı **henüz uygulanmış veya doğrulanmış değildir**.
- Bu talimatlar Cloudflare hesabında işlem yapıldığı anlamına gelmez.

## Resmi kaynaklar (17 Ekim 2026 inceleme)
- https://developers.cloudflare.com/pages/configuration/preview-deployments/
- https://developers.cloudflare.com/pages/platform/known-issues/
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
