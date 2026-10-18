> **Hosting update (18 Oct 2026):** The actual hosting setup is **Cloudflare Workers Builds**, not Pages. For build/deployment and access specifics, see `docs/CLOUDFLARE_WORKERS_DEPLOY_TR.md`. The Pages sections below describe an earlier plan and are not the current implementation. Workers custom-domain and Access setup must be checked against Workers documentation.

# Mew & Maple — Domain satın alımı ve Cloudflare Pages kurulum sırası (taslak)

**Tarih:** 18 Ekim 2026. Hedef isim: `mewandmaple.com` (satın alma henüz doğrulanmadı). Bu yönerge alan adının kullanıcı tarafından satın alınmasını, DNS sahipliğini ve Cloudflare hesabını varsaymaz.

## A. Domain satın alınırken kontrol edilecekler

1. `mewandmaple.com` için sepet toplamı, ilk yıl ve **ikinci yıl yenileme ücreti** kontrol edilir. Kampanya yalnız ilk yıl geçerli olabilir.
2. Gizlilik/WHOIS özelliğinin uygunluğu, otomatik yenileme, transfer ve ek hizmet bedelleri kontrol edilir. Gereksiz `.org`, `.net`, hosting, ücretli e-posta veya ekstra SSL alınmaz.
3. Alan adı kullanıcı kontrolündeki hesaba kaydedilir; iki aşamalı doğrulama açılır. Fatura, domain registrar ve bitiş/yenileme tarihi kaydedilir. Şifre veya kurtarma kodları GitHub'a **yazılmaz**.
4. Domain sahipliği ve marka/tescil uygunluğu farklı konulardır. Sosyal kullanıcı adı ve marka sicili incelemesi ayrıca tamamlanır.

## B. Alan adı doğrulandıktan sonra DNS planı

1. Cloudflare hesabının erişimi doğrulanır; DNS alanı `mewandmaple.com` için eklenir. Registrar mevcutsa, Cloudflare'nin **bu hesaba atadığı gerçek nameserver** değerleri registrar paneline girilir. Nameserver değerleri tahmin edilmez.
2. DNS etkinliği Cloudflare panelinde doğrulanır. Var olan e-posta kullanılıyorsa MX/SPF/DKIM/DMARC kayıtları taşınmadan nameserver değiştirilmez.
3. `SamiGLab/Mew-Maple` deposunu Cloudflare Workers & Pages'e Git üzerinden bağlamak için hesap izni kontrol edilir.
4. Framework `Astro`, build komutu `npm run build`, çıktı klasörü `dist`, Node.js uyumu mevcut CI sürümüyle kontrol edilir.
5. **İlk kurulum:** `PUBLIC_SITE_READY=false`, `PUBLISH_APPROVED` ayarlanmaz, `SITE_URL` prod domain olarak ayarlanmaz. Bu modda tüm makaleler `review` olduğu için statik rehber rotaları çıkmamalıdır.

## C. Kritik erişim kuralı — Cloudflare Pages 'preview' her zaman özel değildir

Cloudflare Pages PR/branch preview adresleri **varsayılan olarak herkese açıktır**. Pages > Settings > General > **Enable access policy** yalnızca preview deploy'larını korur; varsayılan `<project>.pages.dev` veya production custom domain adresini kendiliğinden korumaz. Üretim hostunun da gizli kalması gerekiyorsa ayrı Cloudflare Access uygulama ve politikası gerekir. Hash tabanlı eski preview URL'leri de erişim kontrollü olmalıdır.

- Cloudflare Access koruması doğrulanmadan **taslak içerikleri yayımlayan bir Pages derlemesi oluşturulmaz**.
- Mevcut `astro dev` yerel ortamda 8 makaleyi gösterir; `npm run build` ile oluşan statik draft-safe çıktı makaleleri **bilerek içermez**. Dolayısıyla bulutta sekiz taslağı görmek için ayrı ve güvenliği önceden kanıtlanmış bir editorial preview akışı tasarlanmalıdır.
- `noindex`, gizli önizleme koruması değildir. Bilinmeyen kişilerin sayfayı açmasını engellemez.
- Domainin Cloudflare Pages'e otomatik CNAME bağlanması yalnızca Pages dashboard **Custom domains > Set up a domain** akışıyla yapılmalıdır; rastgele/manuel CNAME oluşturulmamalıdır.

## D. Üretime geçmeden son kontroller

- [ ] Kullanıcı, `mewandmaple.com` alan adını gerçekten satın aldı ve hesap erişimini doğruladı.
- [ ] Tescil/benzer marka riskleri kontrol edildi; yayıncı ve iletişim bilgileri kesinleştirildi.
- [x] Görseller: `docs/image-qa-status.json` 56/56 editoryal onay; 5 SVG alternatifinin gerçek PNG çıktısı incelendi. Bu ürün güvenliği sertifikası değildir.
- [ ] Sekiz makalenin kaynak/editör onayı ve gerçek yayın tarihi eklendi.
- [ ] Privacy, Editorial Policy, Affiliate Disclosure ve About gerçek işletime göre tamamlandı.
- [ ] Analytics/çerez rızası, kullanılacak hizmetlere ve ülkelere göre kontrol edildi.
- [ ] Preview Access ve varsa üretim hostu kısıtı **anonim oturumdan** test edildi.
- [ ] Mobil Lighthouse, bağlantılar, ekran okuyucu/klavye, arama dizini, X-Robots-Tag, canonical/OG, site haritası/RSS doğrulandı.
- [ ] Final açık yayın Go/No-Go kararı sonrası `SITE_URL=https://mewandmaple.com`, `PUBLIC_SITE_READY=true`, `PUBLISH_APPROVED=YES` ayrı prod aşamasında atanır. `www` yönlendirmesi/301 ve `pages.dev` yönlendirmesi uygunluğa göre yapılandırılır.

**Kullanıcı bir alan adı satın alacağını belirtti; satın alma ve Cloudflare'da herhangi bir değişiklik bu dosyanın yazıldığı anda yapılmamıştır.**

## Resmi kaynaklar

- Custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Preview deployments / Access: https://developers.cloudflare.com/pages/configuration/preview-deployments/
- Pages known issues (Access hosts): https://developers.cloudflare.com/pages/platform/known-issues/
- Redirect pages.dev to custom domain: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/
