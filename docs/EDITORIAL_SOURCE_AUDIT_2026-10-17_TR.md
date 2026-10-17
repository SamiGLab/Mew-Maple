# Mew & Maple — Kaynakça ve editoryal P0 ilk denetim
**Tarih:** 17 Ekim 2026  |  **Durum:** PARTIAL REVIEW / YAYIN İZNİ DEĞİL

## Kapsam
Mew & Maple özel GitHub deposundaki sekiz İngilizce taslak makale. Tüm yazılar `status: review` olarak kalıyor. Kontrol, makale içi sayısal atıfların kaynakçalarıyla uyumunu, kaynak URLsini, güvenlik çerçevesini ve editoryal açıklamaları kapsar. Bu **veteriner onayı, SEO içerik özgünlük değerlendirmesi veya 56 görselin bireysel güvenlik onayı değildir.**

## Kaynakça yapısı
| Makale (slug) | Liste girişi | Durum |
| --- | ---: | --- |
| indoor-cat-enrichment-ideas | 3 | Atıf numaraları karşılıklı |
| entertain-cat-while-at-work | 5 | Atıf numaraları karşılıklı |
| cat-trees-small-apartments | 3 | Atıf numaraları karşılıklı |
| diy-cat-toys | 2 | Atıf numaraları karşılıklı |
| cat-friendly-apartment | 4 | Atıf numaraları karşılıklı |
| window-perch-vs-cat-tree | 3 | Atıf numaraları karşılıklı |
| indoor-cat-play-routine | 2 | Atıf numaraları karşılıklı |
| home-for-two-indoor-cats | 4 | Atıf numaraları karşılıklı |

Toplam: **26 kaynakça girişi, 7 benzersiz kaynak bağlantısı.**

## 17 Ekim 2026 kamuya açık kaynak incelemesi
1. Cornell Feline Health Center, **Safe toys and gifts** — adres erişilebilir; küçük parçalar ve ip/tüy benzeri yutulabilir oyuncak riskine ilişkin açıklama mevcut. https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/safe-toys-and-gifts
2. Ohio State University Indoor Pet Initiative, **Scratching** — erişilebilir; yatay/dikey yüzey tercihleri, sağlamlık ve yerleşim açıklanıyor. https://indoorpet.osu.edu/node/449
3. AAFP/ISFM, **Feline Environmental Needs Guidelines** — PubMed, 2013 tarihini, DOI **10.1177/1098612X13477537**, PMID **23422366** ve PMCID **PMC11383066** bilgilerini doğruluyor. PMC doğrudan sayfası bu kontrol ortamında bot kontrolü gösterdi; bunu erişilemez veya uydurma kaynak olarak nitelendirmiyoruz. Makale 2013 tarihli olup güncel yeni bir kılavuzmuş gibi sunulmamalı. https://pubmed.ncbi.nlm.nih.gov/23422366/
4. ASPCA, **High-Rise Syndrome** — erişilebilir; açık/korunmamış pencere güvenliği konusunda ilgili. https://www.aspca.org/news/high-rise-syndrome-lifesaving-tips-cat-parents
5. Cats Protection, **Preparing Your Home for a Cat** — erişilebilir. https://www.cats.org.uk/help-and-advice/getting-a-cat/preparing-for-a-cat
6. Cats Protection, **Getting Another Cat** — erişilebilir. https://www.cats.org.uk/help-and-advice/caring-for-your-cat/cats-and-your-family/other-cats
7. Cats Protection, **Introducing Cats** — erişilebilir. https://www.cats.org.uk/help-and-advice/caring-for-your-cat/cats-and-your-family/introducing-cats

## Risk ve açık denetimler
- **P0 — İnsan editör:** Sekiz yazıdaki her spesifik iddiayı tek tek kaynak pasajına karşı doğrula; kaynakların 2013–2026 arasındaki güncelliğini ayrıca değerlendir.
- **P0 — Görsel QA:** 56 WebP görselde açık pencere, sabitlenmemiş tırmanma elemanı, gözetimsiz ip, küçük yutulabilir oyuncak, yanıltıcı ürün/safety detayları için görüntü bazlı inceleme yap; sorunlu görseli yeniden üret.
- **P0 — Özgünlük/SEO:** Arama niyeti, mevcut SERP rekabeti ve deneyim/uzmanlık beyanları için ayrı editoryal inceleme.
- **P0 — İmza:** Gerçek yayıncı kimliği, iletişim, yayın politikası, gizlilik ve affiliate açıklama sayfaları onaylanmalı.
- **P1 — QA otomasyonu:** `npm run audit:citations` sadece yapısal referansları ve URL biçimini kontrol eder; dış bağlantının canlı olduğunu veya referansın her iddiayı desteklediğini garanti etmez.

## Yayın kararı
**NO-GO.** Sitedeki yayın kapısı kapalı kalacak: `PUBLIC_SITE_READY=false`, tüm makaleler `status: review`, canlı Cloudflare projesi henüz yok. Bu belge yalnızca denetimin ilk parçasıdır.
