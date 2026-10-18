# Mew & Maple — domain öncesi performans kontrolü

**18 Ekim 2026, yayın öncesi.** Domain henüz satın alınmış olarak doğrulanmadı; bu raporun amacı hazır olmayan bir canlı siteye trafik çekmek değil, yerel derlemede gereksiz performans maliyetlerini azaltmak.

## Yapılan performans düzenlemeleri

- Ana sayfadaki ve bireysel rehberlerdeki görünür en büyük kapak görselleri için `fetchpriority="high"`, `loading="eager"`, `decoding="async"` ve sayfanın `<head>` bölümüne eşleşen `rel="preload" as="image"` ipucu eklendi.
- Makale kartları diğer görselleri mevcut `loading="lazy"` ile yüklemeye devam eder; tüm görseller öncelikli hâle getirilmez.
- GitHub içeriğindeki **56 editoryal görsel 3.12 MB toplam boyutunda**, ana kapak görsellerinin her biri **90 KB'dan küçük** ve en büyük bireysel dosya ~209 KB. Bu, sekiz makalenin tamamına ait dosya toplamıdır; bir sayfanın tüm dosyaları indirdiği anlamına gelmez.
- Bundan sonra tek görsel 250 KiB, kahraman/hero WebP 150 KiB veya toplu görseller 5 MiB sınırını aşarsa kaynak denetimi başarısız olur. Bunlar başlangıç için **proje bütçeleri**, Core Web Vitals hedefleri değildir.

## Bağımsız Lighthouse ölçümü

GitHub Actions PR doğrulamasında `npm run preview` ile yerel taslak-safe ana sayfa çalıştırılır, Chromium/Lighthouse'ın mobil profiliyle Performance, Accessibility ve Best Practices kategorileri ölçülür. Rapor puanlarını, LCP/FCP/TBT/CLS/Speed Index değerlerini günlükler.

SEO Lighthouse kategorisi kasıtlı olarak ölçülmüyor: taslak derlemede `noindex` zorunlu olduğundan SEO puanıyla yayın kalitesi karşılaştırması yapmak yanıltıcı olur. 80/100 Performance ve 90/100 Accessibility yalnızca inceleme eşiği olarak loglanır; gürültülü CI koşullarında otomatik yayın onayı verilmez.

## Domain sonrasına kalan

- Gerçek `mewandmaple.com` üzerinde açılış sayfası ve yayımlanmış en az iki makale için ayrı **mobil Lighthouse** testleri yapılmalı.
- Gerçek ağ gecikmesi, Chrome UX Report/Core Web Vitals saha verileri, cache/CDN, SSL, yönlendirmeler ve mobil Safari/Android farklılıkları bu yerel testin kapsamı dışındadır.
- Domain ve yayıncı onayları alınmadan `SITE_URL`, `PUBLIC_SITE_READY`, makale `status` ve `PUBLISH_APPROVED` değiştirilmedi.

