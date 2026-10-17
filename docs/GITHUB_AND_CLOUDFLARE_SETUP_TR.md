# GitHub + Cloudflare Pages | Kurulum sırası (Mew & Maple)

## Ön koşullar
- Özel GitHub deposu: `mew-and-maple-blog` (ayrı repo; Kaftan Angelo ile ilişkisi yok).
- GitHub hesabının depo sahibi tarafından oluşturulması gerekir. Bu iş **henüz yapılmadı**.
- GitHub Actions'da doğrulanmış `npm run build` başarılı olmadan Cloudflare kurulumuna geçme.

## GitHub'a ilk aktarım
1. https://github.com/new adresinde **private** `mew-and-maple-blog` adında boş depo aç. README/.gitignore ekleme (bu ZIP'de var).
2. Bu ZIP'i bilgisayarında bir klasöre çıkart. ZIP içindeki `Mew_Maple_Astro_Starter` içindekiler doğrudan depo kökünde olmalı.
3. Terminalde ilgili klasörde:

```bash
git init
git branch -M main
git add .
git commit -m "Initialize Mew & Maple draft-safe Astro blog"
git remote add origin https://github.com/SamiGLab/mew-and-maple-blog.git
git push -u origin main
```

4. GitHub `Actions` sekmesinde `Validate source and build` akışının başarılı olduğunu doğrula.
5. `npm install` sonrası bir `package-lock.json` oluşursa commit et; GitHub Actions dosyasında `npm install` yerine `npm ci` kullan, `setup-node` içinde `cache: npm` ayarla. Lock dosyası olmadan `npm ci` çalışmaz.

## Üretim güvenliği
- Yerel geliştirmede (`npm run dev`) 8 makale review statüsünde görünür.
- Üretim/staging derlemesinde `PUBLIC_SITE_READY=false` olursa makale URL'leri hiç oluşturulmaz, sitemap boş olur ve meta robots `noindex,nofollow` olur.
- `robots.txt` erişimi açık kalır: Arama motorları noindex etiketini okuyabilsin. **noindex bir gizlilik bariyeri değildir**. Yayınlanmamış dosyalar için gerçek erişim kontrolü gerekiyorsa Cloudflare Access gibi koruma sağla.
- İstenen yayın için kaynak ve veterinerlik güvenliği denetimi, gerçek yazar kimliği, özgün kaynaklar, tamamlanmış hukuki sayfalar ve kullanıcı onayı gerekir.
- `PUBLIC_SITE_READY=true` tek başına yetersiz; `PUBLISH_APPROVED=YES`, gerçek HTTPS domain, en az bir tarihli yayımlanmış makale ve tamamlanmış açıklama sayfaları da gerekli.

## Cloudflare Pages (CI geçtiğinde)
1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → bağımsız GitHub repo.
2. Production branch: `main`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Ortam değişkenleri ilk etapta `SITE_URL=https://preview.invalid`, `PUBLIC_SITE_READY=false`, `PUBLISH_APPROVED=NO`.
6. İlk dağıtımda site **taslak/indekssiz** olarak kalmalı. Gerçek yayın onayından önce hiçbir koşulda `PUBLIC_SITE_READY=true` yapma.
7. Gerçek domain satın alındığında ve doğrulandığında `SITE_URL` değerini gerçek HTTPS domain ile değiştir. Hukuki ve içerik kontrolünden sonra `PUBLIC_SITE_READY=true` + `PUBLISH_APPROVED=YES`.
8. Domain DNS/HTTPS, canonical, sitemap, indexability, Google Search Console ve Pinterest bağlantı doğrulamasını sonradan test et.

## Şimdiki engeller
- Bu ortamdan yeni GitHub deposu oluşturulamıyor; GitHub üzerinde depo görünmedi.
- npm registry DNS hatası (`EAI_AGAIN`) nedeniyle gerçek Astro build testi lokal ortamda henüz yapılmadı.
- Cloudflare ve domain hesapları henüz doğrulanmadı.
