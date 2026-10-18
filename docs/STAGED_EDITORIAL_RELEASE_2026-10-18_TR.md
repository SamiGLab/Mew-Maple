# Mew & Maple — 8 makalenin kontrollü yayın sırası

18 Ekim 2026. Bu iş planı alan adı `mewandmaple.com` olan blog için hazırlanmıştır.

## Mevcut doğrulanmış durum
- Kullanıcı `mewandmaple.com` sitesinin tarayıcısında açıldığını ve Search Console'da Domain mülkünün doğrulandığını bildirdi. Bu oturumda dış araçlar ana domaine bağlanamadı; **custom-domain HTTP/canonical/HTTPS kontrolü bağımsız olarak doğrulanmadı**. Bu yüzden mevcut `workers.dev` QA sonucunu custom-domain doğrulaması gibi göstermeyin.
- Sekiz makalenin tamamı GitHub'daki Markdown dosyalarında mevcut, fakat hepsi `status: review` ve Cloudflare'ın taslak-safe derlemesinde **ziyaretçilere sunulmuyor**.
- 56 görselin editoryal incelemesi tamamlandı; bu, gerçek ürün testi veya veteriner uzman onayı değildir.
- Bu turda ilk yazı, yayınlanmamış diğer makalelere kırık link vermeyecek biçimde düzenlendi; taslak statüsü korunuyor.
- GSC doğrulaması **indeksleme onayı** değildir.

## Önerilen sıra ve bağımsız yayın kontrolü

| Sıra | Slug | Konu | Kontrol |
|---|---|---|---|
| 1 | `indoor-cat-enrichment-ideas` | 15 Indoor Cat Enrichment Ideas That Don't Require a Big Home | Güvenlik, referans ve görsel uyarıları; başka taslağa link yok |
| 2 | `cat-friendly-apartment` | Cat-Friendly Apartment Without Renovating | Bağlantılar yalnızca yayındakilere veya güvenli kategori sayfasına |
| 3 | `indoor-cat-play-routine` | Sustainable Indoor Cat Play Routine | Birinci rehbere bağlantı; diğer taslak linklerini ayıkla |
| 4 | `cat-trees-small-apartments` | Cat Trees for Small Apartments | Ürün test edilmiş iddiası yok; tüm görsel risk açıklamaları |
| 5 | `entertain-cat-while-at-work` | Keeping an Indoor Cat Entertained While at Work | Yalnızca uygun bağımsız oyuncak ve güvenlik uyarıları |
| 6 | `window-perch-vs-cat-tree` | Window Perch vs Cat Tree | Montaj, pencere güvenliği, test edilmemiş ürün uyarıları |
| 7 | `diy-cat-toys` | Safety-First DIY Cat Toys | Yutma, boğulma ve küçük parça risklerinin dikkatli kontrolü |
| 8 | `home-for-two-indoor-cats` | Setting Up a Home for Two Indoor Cats | Kaynak paylaşımı, gerilim ve veteriner tavsiyesi eşikleri |

Yayın tarihi önceden atamayın: `publishedAt` yalnızca **gerçek yayın** günü yazılmalı. Makalelerin sırasını içerik performansına ve editoryal geri bildirime göre değiştirmek mümkündür. Her yeni yayın öncesinde güncel `/guides/` iç linkleri yalnızca yayınlanmış rehberlere yönlenmeli. `npm run audit:rollout` bunu yayın henüz kapalıyken bile test eder.

## İlk makale için kontrol edilenler
- Cornell University College of Veterinary Medicine'nin oyuncak güvenliği kaynağı ve Ohio State Indoor Pet Initiative'nin scratching sayfası 18 Ekim'de açıldı, ilgili iddialarla uyumluydu.
- Cats Protection yaşlı kedi bakım sayfası açıldı. PMC'deki akademik kaynak erişiminde reCAPTCHA görüldü: kaynak doğrulaması daha önce editoryal kontrolden geçmiş olsa da bu oturumda tam metin yeniden incelenemedi.
- Altı gövde çizimi ve bir kapak görseli, AI editorial illüstrasyonları olarak açıklanıyor. Gerçek üretici ürünleri veya kurulumu/test sonuçları olarak sunulmuyor.
- İlk rehberin `Keep reading` bölümündeki 3 henüz yayımlanmamış rehber bağlantısı, yayında da çalışabilen konu/kategori bağlantılarıyla değiştirildi.

## Yayına açmadan önce mutlaka tamamlanması gerekenler

1. **Yayıncının açık kimliği**: Blog bireysel yayın mı yoksa bir şirket adına mı işleyecek? Yayıncı ülke, herkese açık iletişim/kurumsal bilgiler ve sorumluluk bilgileri kullanıcı tarafından kararlaştırılmalı. Diğer iş projeleri otomatik olarak bu blogun yayıncısı kabul edilmemeli.
2. **Yasal/editoryal sayfalar**: Privacy, About, Editorial policy, Affiliate disclosure gerçek operasyona göre güncellenmeli. Yer tutucu metinler kaldırılmalı; üçüncü taraf/analitik/çerez açıklamalarında uydurma içerik olmamalı.
3. **Teknik domain**: `SITE_URL=https://mewandmaple.com` ve URL'nin asıl HTTPS canonical, `www` yönlendirmesi, tema ikonları, gerçekte Google'a görünür yanıtların kontrolleri. Son duruma geçmeden test gerektirir.
4. **Başlangıç onayı**: Kullanıcının ilk makaleyi açıkça yayına alma kararıyla sadece `indoor-cat-enrichment-ideas.md` `status: published` ve gerçek `publishedAt` olacak. Diğer 7'si `review` kalacak.
5. **Yayın güvenlik kapısı**: `PUBLIC_SITE_READY=true` ve `PUBLISH_APPROVED=YES` ancak kontrol edilmiş gerçek yayın ayarları, doğrulanmış yayıncı ve yasal sayfalar sonrasında açılabilir. Bu değişiklik bütün makaleleri otomatik yayımlamaz; yalnızca `published` olarak işaretli rehberleri gösterir.
6. **Yayın sonrası**: İlk URL için 200, canonical, sitemap, RSS, ana sayfa kartı, mobil favicon, OG preview, Search Console Indexing kontrolü; ardından sıradaki yazı.

## Favicon bulgusu
Aktif logo `/brand/autumn/lockup.webp`; favicon `/brand/autumn/cat-silhouette.webp`. Mevcut ikon dosyası **gerçekte 144×144 WebP**. Önceki HTML/manifest 96×96 bildiriyordu; düzeltildi ve WebP VP8X gerçek piksel boyutu otomatik teste eklendi. Eski marka SVG ikonu aktif değil. Aynı onaylı yeşil kedi görselinden 64×64 PNG tarayıcı faviconu üretildi; HTML'de yalnızca bu PNG tanıtılıyor. Manifest hem aynı ikonun PNG 64×64 hem WebP 144×144 sürümünü içeriyor. PNG/ICO/Apple Touch gibi başka boyutlar ileride gerekiyorsa ayrı test edilir; önceki farklı marka SVG'si tekrar etkinleştirilmiyor.
