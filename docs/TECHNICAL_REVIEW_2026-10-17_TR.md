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
