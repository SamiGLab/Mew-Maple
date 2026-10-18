# Mew & Maple — domain beklenirken tamamlanan yayın hazırlığı

**18 Ekim 2026.** Domain henüz kullanıcı tarafından satın alınmış/doğrulanmış değil. Bu belge bir yayın izni değildir.

## Kapatılan küçük ama gerçek eksikler

- **Görsel erişilebilirliği:** Beş değiştirilmiş SVG diyagramının gerçek içeriği tekrar incelenerek üç makaledeki alternatif metinleriyle birebir uyumlu hale getirildi. Örnek: üzerinde kedi bulunmayan mama/su/tuvalet ayrım şeması artık "kedi yemek yiyor" diye anlatılmıyor.
- **Boş kategori deneyimi:** Henüz yayımlanmış yazısı olmayan kategori sayfalarında boş bir içerik ızgarası yerine editoryal hazırlık mesajı ve ana rehber kütüphanesine dönüş bağlantısı bulunuyor.
- **Editoryal kaynak denetimi:** SVG alt metinleri için açıklayıcı "diagram/illustration" şartı ve boş görsel alt metni kontrolü eklendi.
- **Yayın tarihleri:** `publishedAt` ve varsa `updatedAt` gerçek Gregorian YYYY-MM-DD olmalı, gelecekte olamaz ve güncelleme tarihi yayın tarihinden önce olamaz. Bu koşullar geçersiz tarihlerle yapılan bağımsız testlerle doğrulanır.
- **Hukuki metin kilidi:** Eksik yayıncı bilgisi, `Pre-launch draft` veya `not a final legal privacy policy` gibi açıklamalar yerinde duruyorsa yayın derlemesi başarısız olur.

## Sahiplik/hesap gerektiren sonraki işler

1. `mewandmaple.com` domaini kullanıcı hesabından satın alınır; registrar, yenileme bedeli ve 2FA kontrol edilir. **Henüz satın alındığı varsayılmıyor.**
2. Public marka ve yayıncı kimliği, ülke, geçerli iletişim adresi ve sorumlu kişinin ticari/statü bilgileri doğrulanır. Gizli veriler public depoya yazılmaz.
3. Gizlilik bildirimi Cloudflare'ın gerçek trafik/log/cookie özelliklerine ve planlanan ölçüm/affiliate araçlarına göre sonlandırılır; gerektiğinde uzman hukuk kontrolü alınır. Erken aşamada isteğe bağlı izleme kapalı tutulabilir.
4. Cloudflare Workers'a gerçek domain bağlanır; HTTPS, `www` yönlendirmeleri, cache/CSP, OG, robots ve sitemap canlı kontrol edilir.
5. `main` commit SHA ile `/build-info.json` karşılaştırılır. Üretim öncesi mobil Lighthouse/manuel klavye & ekran okuyucu kontrolü yapılır.
6. Her makalenin `status`, `publishedAt` ve varsa `updatedAt` alanları gerçek editoryal karara göre atanır. Son Go/No-Go sonrasında yayın anahtarları açılır.

`PUBLIC_SITE_READY`, `PUBLISH_APPROVED` ve makale `review` statüleri bu çalışmada **değiştirilmedi**.
