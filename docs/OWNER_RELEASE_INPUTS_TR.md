# Mew & Maple — Yayın hazırlığı: gerçek hesap ve sahiplik gereksinimleri

**Durum: Yayın kararı bekliyor.** Bu belge hesap erişimlerini, gerçek kimlik bilgilerini veya hukuk kararlarını uydurmaz. Gizli anahtarları GitHub'a yazmayın.

## Son otomatik doğrulama
- GitHub'da ana kaynak: `SamiGLab/Mew-Maple`; Astro ile statik yapı.
- Sekiz makale halen `status: review`.
- `docs/image-qa-status.json`: 56 görsel incelendi; 28 editoryal uygun, 23 ek inceleme, 5 değiştirilmesi gerekli.
- GitHub Actions PR #26 başarılı; önceki CI kontrolleri yalnızca önizleme modunun güvenli şekilde derlenebildiğini gösterir. Bu, mobil/gerçek domain/özel önizleme doğrulaması değildir.
- Dört temel kaynak kuruluşuna ait dokuz benzersiz referans URL'sinin erişimi ve konu uyumu araştırıldı; her tıbbi/etolojik iddianın yetkili uzman onayı verilmiş değildir.

## Kullanıcı/işletme tarafından doğrulanması gerekenler
- [ ] **Gerçek sahip olunan domain**: Domain nedir, satın alındı mı, hangi kayıt şirketinde, DNS yönetimi nerede?
- [ ] **Yayıncı/işletme kimliği**: Gerçek kişi mi, şirket mi? Hangi ülke hukukuna tabi? Yayıncı adı ve posta/iletişim adresi için kamusal biçim ne olacak?
- [ ] **İletişim**: Yayımlanacak destek e-posta adresi; gereksiz kişisel bilgi kullanmayın.
- [ ] **Privacy/çerezler**: Kullanılacak sağlayıcılar, veri saklama/işleme bölgeleri, çerez kategorileri, rıza/opt-out koşulları; gerekli hukuki değerlendirme.
- [ ] **Analitik ve affiliate**: GA4/GSC ya da başka ölçüm kurulacak mı? Hangi onay mekanizması uygulanacak? Affiliate hesapları gerçekten mevcut mu?
- [ ] **Barındırma**: Cloudflare hesabı/Pages projesi ve kaynak depo erişim izinleri; `*.pages.dev` önizlemesi gerçek erişim kontrolü olmadan özel sayılmaz.
- [ ] **Editör/yayın onayı**: Beş görsel değiştirilecek; 23 öğenin riskleri çözülecek, kaynak-cümle eşleşmeleri gözden geçirilecek, makale bazında yayın statüsü ve tarihleri onaylanacak.

## Geçiş sırası
1. PR'lerde içerik/görsel hatalarını düzelt; yeniden görsel QA ve `npm run check:source` testini çalıştır.
2. Domain, yayıncı kimliği, hukuki sayfalar ve gerçek hizmet konfigürasyonunu doğrula.
3. Sadece erişim kısıtlı Cloudflare Pages önizlemesini ayarla; `PUBLIC_SITE_READY=false` olarak tut, erişim ve robots/noindex kontrolünü yap.
4. Son Lighthouse mobil testi, klavye/ekran okuyucu, social OG, iç linkler, canonical, sitemap, GSC/GA4, privacy rızasını test et.
5. Yayın öncesi yazılı Go/No-Go kararı; yalnızca ondan sonra gerçek `SITE_URL`, makalelerde `publishedAt`, `status: published`, `PUBLIC_SITE_READY=true`, `PUBLISH_APPROVED=YES`.

**Yayın yapılmadı.** Bu dosya görevleri uygulanabilir kontrol listesine dönüştürür, gerçek hesap erişimi veya domain doğrulaması yerine geçmez.
