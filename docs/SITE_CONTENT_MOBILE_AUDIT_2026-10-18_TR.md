# Mew & Maple site kontrolü — 18 Ekim 2026

## Bulgular
- Canlı alan adı GitHub Pages üzerinden HTTP 200 yanıtı veriyor.
- Canlı sitede makale yok: Pages iş akışında PUBLIC_SITE_READY=false. Kaynakta 8 makale var; 1 published, 7 review. Taslaklar statik sayfalara ve arama indeksine aktarılmıyor.
- Yayın kapalı olduğu için kategoriler, arama, sitemap ve RSS içeriksiz. robots meta noindex,nofollow; canonical ve sosyal paylaşım görsel metadata alanları yayın koşuluna bağlı olarak çıkmıyor.
- Yayıncı adı, kamuya açık iletişim ve gizlilik başvuru adresi eksik. Bunlar doğrulanmadan doldurulmadı. Gizlilik metni henüz tamamlanmış bir yasal politika olarak değerlendirilmemeli.
- Bilgi sayfalarında dahili hazırlık ve yayın öncesi görev notları görünüyordu.
- Mobil menü bağlantılarının yüksekliği yaklaşık 23 px idi.

## Uygulanan temizlik
- Üst taslak bandı yalnızca yerel geliştirme ortamıyla sınırlandı.
- About, editorial policy ve privacy sayfalarındaki dahili görev notları Astro kaynak yorumlarına taşındı; oluşturulan HTML'de bulunmuyorlar. Mevcut yayın kontrolü bu gereksinimleri görmeye devam ediyor.
- Gizlilik başlığı, affiliate ve arama metinlerindeki taslak/ortam ifadeleri temizlendi. Kaynak metinlerdeki teknik gözlemler korundu; kimlik veya iletişim bilgisi uydurulmadı.
- Altbilgideki working-brand ifadesi kaldırıldı.
- Mobil menü ve altbilgi bağlantıları en az 44 px yüksekliğe çıkarıldı. Makale tablolarına küçük ekranda yatay kaydırma eklendi.
- Yedi inceleme durumundaki makale kaynak dosyaları korundu. Canlı blog yazıları olmadıkları için silinmediler.

## Doğrulama
- Kaynak kontrol zinciri: içerik, SEO yapısı, alıntı yapısı, 56 görsel, yayın kapıları ve diğer mevcut kontroller geçti.
- Astro statik derleme başarılı: 11 HTML sayfası.
- Statik navigasyon: 187 bağlantı, 0 hata.
- Taslak sızıntı kontrolü: 11 HTML sayfası, 0 hata; arama indeksi boş, makale rotası yok.
- Chromium ana sayfa ölçümleri: 320, 390, 768 ve 1440 px ekranlarda yatay taşma görülmedi.
- 390 px'de yedi menü bağlantısının tamamı 44 px; taslak bandı yok.
- Kontrol tarayıcı emülasyonuyla yapıldı; fiziksel telefon testi yapılmadı.

## Sonraki işler (öncelik sırasıyla)
1. Yayıncı ve iletişim bilgilerini doğrulayıp bilgi/gizlilik sayfalarını tamamlamak.
2. Hangi makalelerin yayımlanacağına karar verip mevcut yayın kapısını tamamlamak. Şu an published işaretli tek yazı bile canlıya çıkmıyor.
3. İçerik yayına açıldıktan sonra kategori, arama, sitemap, RSS, canonical ve sosyal önizlemeyi gerçek alan adında tekrar kontrol etmek.
4. İçerik yayına açıldıktan sonra mobil performans ve makale okuma deneyimini yeniden ölçmek.
