# Mew & Maple — Yayın hazırlığı: gerçek hesap ve sahiplik gereksinimleri

**Durum: Yayın kararı bekliyor.** Bu belge hesap erişimlerini, gerçek kimlik bilgilerini veya hukuk kararlarını uydurmaz. Gizli anahtarları GitHub'a yazmayın.

## Son otomatik doğrulama
- GitHub'da ana kaynak: `SamiGLab/Mew-Maple`; Astro ile statik yapı.
- Sekiz makale halen `status: review`.
- `docs/image-qa-status.json`: **56/56 görsel editoryal kullanım için değerlendirildi ve onaylandı.** Güvenlik riski görülen fotoğraflara uyarılar eklendi; 5 çelişkili görsel SVG açıklama şemalarıyla değiştirildi. Bunlar veterinerlik veya ürün güvenliği sertifikası değildir. Gerçek PNG renderları GitHub Actions #39110806927 çıktısında incelendi (bkz. `docs/FINAL_VISUAL_EDITORIAL_QA_2026-10-18.md`).
- GitHub Actions PR #38 başarılı: gerçek Chromium'da 390/768/1440 px toplam 20 kontrol, makalelerin mobil düzeni, görüntü yüklemeleri, arama, keyboard skip-link, temel Axe WCAG A/AA ve taslak sızıntı testi geçti. Gerçek cihaz, prod Lighthouse ve Cloudflare erişim testi ayrıdır.
- PR #39 Google Fonts harici veri talebini kaldırdı. PR #40 düşük kontrastlı metin renklerini iyileştirdi.
- Dört temel kaynak kuruluşuna ait dokuz benzersiz referans URL'sinin erişimi ve konu uyumu araştırıldı; her tıbbi/etolojik iddianın yetkili uzman onayı verilmiş değildir.

> **Public repository confirmed by owner.** GitHub source and Markdown drafts are public by design. Do not commit business/personal secrets. Owner has agreed to public visibility but has **not** confirmed production publication.
>
> **Worker live verification (18 Oct 2026): COMPLETE.** Cloudflare Production screen showed active version `66c9c552` and 100% traffic. [GitHub Actions #39118094587](https://github.com/SamiGLab/Mew-Maple/actions/runs/39118094587) verified 6 real HTTPS paths, their 200/404 codes, noindex HTTP/meta tags and empty draft sitemap/search, with zero errors. This does not verify a custom domain or authorize content publication.

## Kullanıcı/işletme tarafından doğrulanması gerekenler
- [ ] **Gerçek sahip olunan domain**: Domain nedir, satın alındı mı, hangi kayıt şirketinde, DNS yönetimi nerede?
- [ ] **Yayıncı/işletme kimliği**: Gerçek kişi mi, şirket mi? Hangi ülke hukukuna tabi? Yayıncı adı ve posta/iletişim adresi için kamusal biçim ne olacak?
- [ ] **İletişim**: Yayımlanacak destek e-posta adresi; gereksiz kişisel bilgi kullanmayın.
- [ ] **Privacy/çerezler**: Kullanılacak sağlayıcılar, veri saklama/işleme bölgeleri, çerez kategorileri, rıza/opt-out koşulları; gerekli hukuki değerlendirme.
- [ ] **Analitik ve affiliate**: GA4/GSC ya da başka ölçüm kurulacak mı? Hangi onay mekanizması uygulanacak? Affiliate hesapları gerçekten mevcut mu?
- [x] **Taslak-safe barındırma**: Workers Production sürümü canlı ve gerçek HTTP testleri geçti. `*.workers.dev` herkese açık olabilir; yalnızca taslak-safe sayfalar sunuluyor. GitHub deposu public olduğundan kaynak taslakları GitHub üzerinden ayrıca görülebilir.
- [x] **Görsel editoryal QA**: 56/56, 5 SVG render önizlemesi dahil tamamlandı; 51 fotoğraf yalnızca uygun uyarılarla editoryal olarak kullanılabilir.
- [ ] **Makale yayımlama kararı**: Sekiz makalenin `review` statüsünü değiştirmek ve gerçek yayın tarihlerini atamak ancak domain, yayıncı, hukuk ve test gereksinimlerinin tamamlanmasından sonra mümkündür.

## Geçiş sırası
1. **Tamamlandı:** Görsel editoryal bulguları düzeltildi; PR #33–36 ve otomatik kaynak/önizleme testleri başarılı.
2. Domain, yayıncı kimliği, hukuki sayfalar ve gerçek hizmet konfigürasyonunu doğrula.
3. **Tamamlandı (taslak-safe sürüm):** Cloudflare Workers gerçek HTTPS/robots/noindex ve taslak 404 kontrolü geçti. Makalelerin kendisi veya gizli içerikler için ayrıca Cloudflare Access koruması gerekecek; `PUBLIC_SITE_READY=false` olarak kalacak.
4. Son Lighthouse mobil testi, klavye/ekran okuyucu, social OG, iç linkler, canonical, sitemap, GSC/GA4, privacy rızasını test et.
5. Yayın öncesi yazılı Go/No-Go kararı; yalnızca ondan sonra gerçek `SITE_URL`, makalelerde `publishedAt`, `status: published`, `PUBLIC_SITE_READY=true`, `PUBLISH_APPROVED=YES`.

**Yayın yapılmadı.** Bu dosya görevleri uygulanabilir kontrol listesine dönüştürür, gerçek hesap erişimi veya domain doğrulaması yerine geçmez.
