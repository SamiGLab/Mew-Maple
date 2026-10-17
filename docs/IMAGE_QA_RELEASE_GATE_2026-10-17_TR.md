# Mew & Maple — Görsel yayın güvenliği kontrolü

17 Ekim 2026: 56 WebP envanterlendi. `window-perch-vs-cat-tree-figure-02.webp` byte-özdeş kopya yerine, insanın pencere tüneği bağlantısını kontrol ettiği yeni bir editoryal görselle değiştirilmek üzere önerildi; sayfadaki alt metin ve açıklama sahneye uyumlu hale getirildi. **Görselin değiştirilmesi, güvenli kurulum belgesi veya editoryal nihai onay değildir.**

QA manifesti: `docs/image-qa-status.json`. Dört adet `replace-required`, üç adet `manual-review`, bir adet `updated-pending-review` ve diğer 48 adet `pending-final-review` durumu vardır.

Yeni `npm run audit:images` denetimi, manifest/disk dosya eşleşmesini, WebP sihirli baytlarını ve SHA-256 dosya tekrarı kontrolünü yapar; `PUBLIC_SITE_READY=true` halinde 56 görselin tümü `approved` olmadığı sürece işlemi başarısız kılar. Bunlar **görselin gerçekten kediler için güvenli olduğu garantisi değildir**; insan editörün tam çözünürlükte güvenlik ve temsil denetimi gerekir.

Çözülmeyen görseller:
- `diy-cat-toys-figure-06.webp`: erişilebilir ip/yumak ve tüy malzemeleri.
- `indoor-cat-play-routine-figure-05.webp`: açıkta ip ve oyuncak sepeti.
- `window-perch-vs-cat-tree-figure-04.webp`: gözetimsiz oyuncak/olta depolama.
- `home-for-two-indoor-cats-figure-06.webp`: oltayı tutan kişi görünmüyor.
- `window-perch-vs-cat-tree-figure-05.webp`: kopabilecek asılı pompon olabilir.
- `indoor-cat-play-routine-figure-04.webp`: oyun sırasında insan kadraj dışında.
- `indoor-cat-enrichment-ideas-figure-05.webp`: ipin/cismin yapısı belirsiz.

Bu dosyalar değiştirilmeden güvenlik onayı verilmemeli; diğerlerinin de tam çözünürlükte ayrı kontrolü gerekir. Sekiz makalenin tamamı `review`; canlı site, domain, reklam, analytics veya affiliate açılmadı. Kaftan Angelo üzerinde hiçbir işlem yapılmadı.
