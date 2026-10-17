# Teknik inceleme — 17 Ekim 2026

## Doğrulananlar
- 8 Markdown makale, 56 görsel referansı yerinde ve denetim scripti sıfır hata veriyor.
- robots.txt.ts içindeki hatalı çok satırlı string düzeltildi.
- GitHub Actions ilk sürümü kilit dosyası olmadan çalışacak şekilde düzeltildi; online build sonrasında package-lock.json kaydedilmeli, npm ci'ye geçilmeli.
- Üretim derlemesi PUBLIC_SITE_READY=false modundayken taslak makale rotaları üretmez; yerel geliştirmede editör görür.
- Preview sayfalarının noindex bilgisi arama botlarınca okunabilsin diye robots.txt üzerinde Disallow: / kullanılmıyor. Bu erişim gizliliği demek değildir. Özel taslaklar ayrıca erişim kontrolüyle korunmalıdır.
- Açık yayın modunda SITE_URL, PUBLISH_APPROVED=YES, gerçek yayın tarihleri ve hukuki/editoryal sayfaların placeholder temizliği kontrol edilir.
- RSS ve sitemap yayın bayrağına bağlıdır; makale yapılandırılmış verisine kurumsal yazar ve ana sayfa URL'si eklendi.

## Doğrulanamayanlar / engeller
- Bu konteynerde `npm install` sırasında registry.npmjs.org DNS sorgusu EAI_AGAIN ile başarısız oldu. Astro gerçek `npm run build` ve render testi yapılmadı.
- Kullanıcının bağlı GitHub hesabında mew-and-maple-blog deposu yok; bu bağlantıyla depo oluşturma aksiyonu sunulmuyor.
- SITE_URL gerçek mülk doğrulaması, marka/domain müsaitliği, gerçek yayıncı kimliği ve Cloudflare hesabı erişimi bekliyor.

## Sonraki doğrulama
1. GitHub'da `mew-and-maple-blog` adlı bağımsız repo aç.
2. Bu ZIP içeriğini repo köküne aktar; GitHub Actions CI'da npm install ve npm run build çalışsın.
3. Hatalar varsa düzelt. npm lockfile'ı commit et; CI'yı npm ci + cache'e geçir.
4. Cloudflare Pages preview URL için erişim kontrolü ayarla; yayın öncesi noindex teyit et.
5. İçerik, logo ve hukuki sayfa incelemesi bitince yayın bayrağını aç.


---

## GÜNCEL DURUM — 17 Ekim 2026 (önceki notların yerine geçer)

Üstteki "GitHub yok / npm derlenmedi" maddeleri, ilk yerel hazırlığın tarihsel anlık görüntüsüdür. **Artık geçerli engel değiller:**

- Ayrı PRIVATE GitHub deposu: https://github.com/SamiGLab/Mew-Maple
- 8 makale, 56 görsel ve tüm Astro kodu `main` dalında.
- `package-lock.json` ile tekrarlanabilir `npm ci` kurulumu, yedi release-gate testi ve gerçek Astro statik build GitHub Actions üzerinde geçmiştir: https://github.com/SamiGLab/Mew-Maple/actions/runs/39061445609
- Kaynakça yapısı için ek CI koruması ve ilk araştırma notu bir PR üzerinden aktarıldı: https://github.com/SamiGLab/Mew-Maple/pull/5
- Bütün yazılar hâlâ `status: review`. **Yayın izni VERİLMEDİ.**

**Güncel açık işler:** sekiz makalenin tek tek doğrulanan kaynak-iddia incelemesi, 56 AI görselin görsel güvenlik kontrolü, gerçek editör/yayıncı bilgisi, ticari isim ve domain kararı, hukuki sayfalar, Cloudflare Access ile korunan staging ve son yayın öncesi gerçek cihaz testleri.

**Cloudflare güvenlik düzeltmesi:** preview URL'lerine Access açmak tek başına ana `pages.dev` adresini korumaz. `noindex` asla erişim koruması değildir. Ayrıntı: `docs/GITHUB_AND_CLOUDFLARE_SETUP_TR.md`.

**Kaftan Angelo** deposu, domaini, DNS'i ve hostingi bu projeden bağımsızdır; burada hiçbir değişiklik yapılmadı.
