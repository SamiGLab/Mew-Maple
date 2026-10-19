import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Carousels data structure
const carousels = [
  {
    num: 1,
    titleTr: "Carousel 1: 5 Apartment Cat Rules We Swear By (Kiracı Dostu 5 Kedi Kuralı)",
    topic: "Kiralık küçük evde kediyle yaşamanın depozito yakmayan 5 kuralı",
    hook: "5 Apartment Cat Rules We Swear By (That Landlords Won’t Complain About) 🛋️✨",
    caption: `5 Apartment Cat Rules We Swear By (That Landlords Won’t Complain About) 🛋️✨

Living in a rental apartment with a cat doesn't mean sacrificing your security deposit or your interior decor. 

Swipe through for 5 practical rules we swear by:
👉 Rule 1: Place sturdy scratchers directly against sofa corners where cats mark territory.
👉 Rule 2: Create vertical paths using existing low furniture with non-slip felt mats.
👉 Rule 3: Use high-sided open litter boxes to contain scatter without trapping odors.
👉 Rule 4: Swap flimsy plastic blinds for cordless Roman shades or tension rod curtains.
👉 Rule 5: Install floor-to-ceiling tension climbing poles with zero drywall holes.

Which of these rules do you use in your apartment? Tell us below! 👇
📥 Grab our free Small-Home Cat Setup Checklist via the link in our bio (@mewandmaple)!`,
    cta: "Save this carousel for your next apartment audit & tap link in bio for the free checklist! 🔖",
    hashtags: "#apartmentcat #renterfriendly #catfriendlyhome #catmomlife #indoorcats #smallspaceliving #cattips #catdecor #catcare #petfriendlyapartment #interiorstylingwithcats",
    slides: [
      {
        slideNum: 1,
        type: "Cover / Hook",
        overlay: "5 APARTMENT CAT RULES WE SWEAR BY (That Landlords Won't Complain About)",
        subtext: "Swipe to read →",
        prompt: "Minimalist Scandinavian apartment living room, a content adult cat sitting gracefully on a cream linen rug looking directly at the camera, modern warm aesthetic, muted sage green wall, soft golden hour sunlight, architectural pet living photography, high-end interior editorial style, shot on 35mm f/2.0 --ar 4:5 --v 6.0"
      },
      {
        slideNum: 2,
        type: "Rule 1: Scratching Post Placement",
        overlay: "RULE 1: DON'T HIDE THE SCRATCHER",
        subtext: "Cats scratch sofa arms to mark prominent social boundaries. Place a sturdy post right where they already want to scratch.",
        prompt: "Aesthetic living room corner shot showing a sleek, modern tall sisal scratching post placed directly flush against the corner of a contemporary beige sofa, cat paw stretched scratching the sisal, natural morning light, clean tidy floor, interior design photography --ar 4:5 --v 6.0"
      },
      {
        slideNum: 3,
        type: "Rule 2: Drill-Free Vertical Space",
        overlay: "RULE 2: VERTICAL SPACE WITHOUT DRILLS",
        subtext: "Clear existing furniture tops (bookshelves, credenzas) with non-slip washable mats. Instant high perches with zero drywall damage.",
        prompt: "Low modern wood bookshelf in a small apartment, the top surface cleared and styled with a cozy felt mat where a fluffy cat rests looking down happily, zero wall anchors or screws, soft warm ambient lighting, peaceful home vibe --ar 4:5 --v 6.0"
      },
      {
        slideNum: 4,
        type: "Rule 3: High-Sided Open Litter Boxes",
        overlay: "RULE 3: HIGH-SIDED OPEN BOXES BEAT HOODS",
        subtext: "Closed lids trap ammonia fumes and drive cats away. High-sided open boxes stop floor scatter while maintaining healthy airflow.",
        prompt: "Tidy modern apartment bathroom corner, featuring a sleek high-sided open litter box on clean tile floor with a textured rubber catching mat, minimalist aesthetic, bright clean daylight, fresh airy feeling --ar 4:5 --v 6.0"
      },
      {
        slideNum: 5,
        type: "Outro & Call To Action",
        overlay: "READY TO AUDIT YOUR SPACE?",
        subtext: "Download our free printable Small-Home Cat Setup Checklist! Tap the link in bio (@mewandmaple) or visit mewandmaple.com.",
        prompt: "Aesthetic flatlay mockup on a natural wooden table: a printed checklist titled 'Small-Home Cat Setup Checklist', a warm cup of coffee, a peaceful tabby cat resting its chin on paws in the corner of frame, warm cozy morning light, organized pet life --ar 4:5 --v 6.0"
      }
    ]
  },
  {
    num: 2,
    titleTr: "Carousel 2: How to Tire Out an Indoor Cat in 15 Minutes (15 Dakikada Kediyi Yorma Rutini)",
    topic: "Gece 2 koşuşturmalarını bitiren 15 dakikalık bilimsel av-yakala-ye-uyu rutini",
    hook: "Does your cat turn into a midnight racer at 2 A.M.? Here is how to tire them out in 15 minutes. 🏎️💨",
    caption: `Does your cat turn into a midnight racer at 2 A.M.? Here is how to tire them out in 15 minutes. 🏎️💨

Midnight zoomies happen when indoor cats have pent-up predatory energy with no outlet. Waving toys randomly doesn't work—you need to complete their biological sequence:

🎯 Minutes 0–10: The Stalk & Chase
Mimic realistic prey moving away from your cat. Let them plan their pounce!

🐾 Minutes 10–12: The Crucial Catch
Allow them to physically catch and 'kill' the lure between their paws. Never skip the catch!

🌾 Minutes 12–15: The Cool Down
Slow down movements to let their heart rate normalize.

🍗 Minute 15: The Bedtime Meal
Feed a small protein snack or wet food. Biology takes over: Hunt ➡️ Catch ➡️ Eat ➡️ Groom ➡️ SLEEP.

Swipe through for the breakdown! Save this for tonight's bedtime routine! 😴
📥 Grab our free 7-Day Indoor Cat Activity Planner via the link in bio!`,
    cta: "Save this bedtime protocol & download our free 7-Day Planner via link in bio! 🔖",
    hashtags: "#catzoomies #catbehavior #catroutine #catplaytime #indoorcat #catenrichment #catmomtips #nighttimezoomies #happycats #catwellness #bedtimeroutine",
    slides: [
      {
        slideNum: 1,
        type: "Cover / Hook",
        overlay: "HOW TO TIRE OUT AN INDOOR CAT IN 15 MINUTES (Without Night Zoomies)",
        subtext: "Swipe to see the bedtime routine →",
        prompt: "Intense cinematic close-up of a domestic cat's focused dilated pupils tracking a moving toy, dramatic warm side lighting, soft cozy living room background, predatory feline focus, crisp fur texture, 85mm macro lens pet photography --ar 4:5 --v 6.0"
      },
      {
        slideNum: 2,
        type: "Step 1: Stalk & Chase",
        overlay: "STEP 1: STALK & CHASE (MINUTES 0–10)",
        subtext: "Never wave toys in your cat's face. Prey naturally runs away! Move the wand along floorboards, around corners, and under chairs.",
        prompt: "Dynamic shot of a cat crouching in playful stalking posture on a textured living room rug, a feather wand lure gliding along the floor away from the cat, warm evening lamplight, authentic interactive play --ar 4:5 --v 6.0"
      },
      {
        slideNum: 3,
        type: "Step 2: The Crucial Catch",
        overlay: "STEP 2: THE CRUCIAL CATCH (MINUTES 10–12)",
        subtext: "Let them physically catch and 'kill' the lure multiple times. Frustration happens when cats chase without tactile completion.",
        prompt: "A domestic cat victoriously clutching a feather toy between its front paws on a cozy rug, kicking with back legs playfully, proud and satisfied expression, warm indoor evening lighting --ar 4:5 --v 6.0"
      },
      {
        slideNum: 4,
        type: "Step 3: Cool Down & Bedtime Snack",
        overlay: "STEP 3: COOL DOWN & FEED (MINUTES 12–15)",
        subtext: "Slow the wand down to mimic tired prey, then immediately offer a small protein snack. 'Hunt -> Catch -> Eat -> Sleep' is hardwired biology.",
        prompt: "A cute cat eating a small savory meal from a shallow ceramic bowl on a clean wooden floor, warm evening lighting, relaxed calm body language, peaceful kitchen corner --ar 4:5 --v 6.0"
      },
      {
        slideNum: 5,
        type: "Outro & Free Planner CTA",
        overlay: "WANT A PEACEFUL NIGHT'S SLEEP?",
        subtext: "Download our free printable 7-Day Indoor Cat Activity Planner to schedule your daily play sessions. Link in bio (@mewandmaple)!",
        prompt: "A deeply relaxed cat curled up in a fluffy round donut bed fast asleep, peaceful nighttime bedroom atmosphere, warm soft lamp glow, tranquil domestic scene --ar 4:5 --v 6.0"
      }
    ]
  },
  {
    num: 3,
    titleTr: "Carousel 3: Leaving Your Cat While at Work? The 4-Zone Rule (İşe Giderken 4 Bölge Kuralı)",
    topic: "Evde yalnız kalan kedinin can sıkıntısı ve ayrılık stresini önleyen 4 bölge",
    hook: "Leaving your indoor cat alone while you're at work? Set up these 4 zones first. 🏢🐈",
    caption: `Leaving your indoor cat alone while you're at work? Set up these 4 zones first. 🏢🐈

Cats don't need 8 hours of non-stop action while you're at the office—they sleep 12–16 hours a day! What they need are safe, predictable zones:

☀️ Zone 1: Safe Window Theatre (Bird-watching without blind cord hazards)
🧩 Zone 2: Independent Foraging (Cardboard food puzzles hidden under chairs)
🛋️ Zone 3: High-Altitude Sanctuary (Elevated retreat far from loud hallway noise)
💧 Zone 4: Separated Hydration (Fresh water placed away from the food bowl)

Swipe through to see how to set up each zone!
Save this checklist before heading out tomorrow morning! 🔖
🔗 Full guide at mewandmaple.com (link in bio)!`,
    cta: "Save this post for your workday routine & read the complete guide via link in bio! 📌",
    hashtags: "#cattips #indoorcat #workingcatmom #boredcat #catwelfare #apartmentliving #catroutine #catlover #catlifestyle #felineenrichment #petparenting #cathealth",
    slides: [
      {
        slideNum: 1,
        type: "Cover / Hook",
        overlay: "LEAVING YOUR CAT WHILE AT WORK? Set Up These 4 Zones First.",
        subtext: "Swipe to set up your home →",
        prompt: "A curious cat sitting calmly on an entryway rug looking towards the doorway of an aesthetic warm apartment, soft morning light, cozy home atmosphere, thoughtful editorial pet photography --ar 4:5 --v 6.0"
      },
      {
        slideNum: 2,
        type: "Zone 1: Window Theatre",
        overlay: "ZONE 1: SAFE WINDOW THEATRE",
        subtext: "Visual enrichment prevents daytime boredom. Keep blind cords securely tied up and check window screen tightness.",
        prompt: "Calm cat lounging on an upholstered window seat looking outside at autumn trees, blinds safely drawn up and cords tucked away, warm sunbeam across the room --ar 4:5 --v 6.0"
      },
      {
        slideNum: 3,
        type: "Zone 2: Independent Foraging",
        overlay: "ZONE 2: INDEPENDENT FORAGING",
        subtext: "Never leave string or wand toys unattended! Use safe cardboard puzzle feeders with dry treats hidden around the room.",
        prompt: "A simple cardboard treat puzzle box hidden under a wooden coffee table, a cat sniffing and reaching in to extract a treat, cozy apartment morning light --ar 4:5 --v 6.0"
      },
      {
        slideNum: 4,
        type: "Zone 3 & 4: Retreat & Hydration",
        overlay: "ZONE 3 & 4: RETREAT & HYDRATION",
        subtext: "Provide high quiet sleeping caves away from noisy appliances, and place water bowls in a separate room from food.",
        prompt: "Split view showing an elevated cozy felt cat cave on top of a bookshelf, and a clean ceramic water fountain in a quiet corner away from the food bowl, warm natural light --ar 4:5 --v 6.0"
      },
      {
        slideNum: 5,
        type: "Outro & Call To Action",
        overlay: "SMALL HABITS, HAPPIER CATS",
        subtext: "Read the full workday routine guide on mewandmaple.com. Save this post for your morning routine! 🔖",
        prompt: "A happy cat stretching its paws lazily on a sunny sofa cushion, peaceful afternoon light, harmonious pet home aesthetic --ar 4:5 --v 6.0"
      }
    ]
  },
  {
    num: 4,
    titleTr: "Carousel 4: Window Perch vs. Cat Tree: Which Fits Small Homes? (Pencere Yatağı mı Kedi Ağacı mı?)",
    topic: "Küçük daireler için zemin alanı, tırmalama ve güvenlik açısından ürün kıyası",
    hook: "Window Perch vs. Cat Tree: Which one actually belongs in a small apartment? 🪟🪵",
    caption: `Window Perch vs. Cat Tree: Which one actually belongs in a small apartment? 🪟🪵

Tight on square footage? Don't buy bulky carpet towers before reading this comparison:

📐 Floor Space:
Cat trees eat up at least 2x2 feet of floor space. Window perches take ZERO floor space.

🐾 Scratching & Exercise:
Cat trees provide crucial vertical stretching and scratching posts. Window perches only offer lounging and outdoor viewing.

⚖️ Stability & Safety:
Window perches require solid glass and weekly suction checks. Cat trees require heavy weighted bases so they don't tip during sprints.

💡 The Small-Apartment Formula:
Pair a slim suction-cup window perch for bird watching WITH a tall, space-saving sisal post placed right next to your couch!

Swipe through for the full comparison! Save this before you shop! 🛍️
🔗 Full buyer review on mewandmaple.com!`,
    cta: "Save this guide before buying cat furniture! Link in bio for dimensions & safety checklist 🔖",
    hashtags: "#cattree #catperch #windowperch #catgear #catfurniture #smallspaceliving #petcareadvice #catmomproblems #apartmentlivingwithcats #catparent #indoorcatcare",
    slides: [
      {
        slideNum: 1,
        type: "Cover / Hook",
        overlay: "WINDOW PERCH VS. CAT TREE: Which One Actually Fits Your Space?",
        subtext: "Swipe to compare →",
        prompt: "Split composition: on the left a modern slim wooden cat tree, on the right a sleek window perch with a tabby cat basking in sun, warm minimalist apartment interior, editorial pet product photography --ar 4:5 --v 6.0"
      },
      {
        slideNum: 2,
        type: "1. Floor Footprint Comparison",
        overlay: "1. FLOOR FOOTPRINT",
        subtext: "Cat trees require at least 2x2 feet of valuable floor space. Window perches take ZERO floor space-ideal for studios under 500 sq ft.",
        prompt: "Clean floor perspective of a compact studio apartment showing a 2x2 foot floor footprint of a cat tree compared to a floating window perch above floor level, bright clean interior --ar 4:5 --v 6.0"
      },
      {
        slideNum: 3,
        type: "2. Scratching & Vertical Exercise",
        overlay: "2. SCRATCHING & STRETCHING",
        subtext: "Cat trees provide full-body vertical scratching exercise. Window perches only provide rest and observation.",
        prompt: "Cat stretching full vertical length scratching a thick textured sisal post, showing strength and flexibility, warm indoor light --ar 4:5 --v 6.0"
      },
      {
        slideNum: 4,
        type: "3. Stability & Weight Safety",
        overlay: "3. STABILITY & SAFETY",
        subtext: "Perches need weekly suction checks and solid glass. Trees require heavy bases (18x18\"+) so they never wobble during jumps.",
        prompt: "Close up of sturdy suction cups attached firmly to a clean glass window, and a heavy solid wood base of a cat tree, warm natural light, reassuring stability --ar 4:5 --v 6.0"
      },
      {
        slideNum: 5,
        type: "Outro & Small-Space Formula",
        overlay: "OUR SMALL-SPACE VERDICT",
        subtext: "Get a sturdy window perch for views + a slim vertical post for scratching. Best of both worlds! Full review at mewandmaple.com.",
        prompt: "A stylish apartment living room with a slim sisal post next to the sofa and a sunlit window perch, cat resting happily on the perch, perfect compact harmony --ar 4:5 --v 6.0"
      }
    ]
  }
];

function xmlEscape(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Read current markdown
let mdPath = resolve('docs/MEW_MAPLE_SOSYAL_MEDYA_PROMPTLAR_VE_METINLER.md');
let currentMd = readFileSync(mdPath, 'utf8');

let carouselMd = `

====================================================================
# BÖLÜM 2: INSTAGRAM CAROUSEL (KAYDIRMALI GÖNDERİ) PAKETLERİ
====================================================================
* Her bir carousel 5 slayttan oluşur ve Instagram'ın en yüksek etkileşimli formatı olan **4:5 Dikey Portre (1080x1350 px)** ölçüsündedir.
* Tüm slayt promptları \`--ar 4:5\` parametresiyle sonbahar estetiği ve Midjourney/Flux uyumlu olarak hazırlanmıştır.
* Canva üzerinde her slaytın üzerine eklenecek başlık ve açıklamalar belirtilmiştir.

`;

for (const c of carousels) {
  carouselMd += `---
## 📑 ${c.titleTr}
* **Konu:** ${c.topic}
* **Kanca (Hook / İlk Cümle):** ${c.hook}

### 📸 Slayt Slayt Görsel Promptları ve Canva Tasarım Kılavuzu:

`;

  for (const s of c.slides) {
    carouselMd += `#### 🖼️ Slayt ${s.slideNum}: ${s.type}
* **Canva Yazı Katmanı (Overlay):** **"${s.overlay}"**
* **Canva Açıklama Metni:** *${s.subtext}*
* **AI Görsel Promptu (Midjourney / Flux / DALL-E):**
\`\`\`text
${s.prompt}
\`\`\`

`;
  }

  carouselMd += `### 📝 Instagram Gönderi Açıklaması (Caption):
\`\`\`text
${c.caption}
\`\`\`
* **Harekete Geçirici Çağrı (CTA):** ${c.cta}
* **Hashtag Seti:** \`${c.hashtags}\`

`;
}

writeFileSync(mdPath, currentMd + carouselMd, 'utf8');
console.log('Appended Carousels to Markdown at:', mdPath);

// Now generate XML representation for Word document
let docxXmlAdditions = `
  <!-- CAROUSEL SECTION HEADER -->
  <w:p>
    <w:pPr>
      <w:spacing w:before="600" w:after="200"/>
      <w:pBdr>
        <w:top w:val="single" w:sz="36" w:space="15" w:color="D97736"/>
      </w:pBdr>
    </w:pPr>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/>
        <w:b/>
        <w:sz w:val="44"/>
        <w:color w:val="D97736"/>
      </w:rPr>
      <w:t>BÖLÜM 2: INSTAGRAM CAROUSEL (KAYDIRMALI GÖNDERİ) PAKETLERİ</w:t>
    </w:r>
  </w:p>
  <w:p>
    <w:pPr><w:spacing w:before="0" w:after="400"/></w:pPr>
    <w:r>
      <w:rPr><w:i/><w:sz w:val="22"/><w:color w:val="5C6A64"/></w:rPr>
      <w:t>Her biri 5'er slayttan oluşan 4 adet kaydırmalı gönderi. Tüm slaytlar 4:5 Dikey Portre (1080x1350) formatında Midjourney/Flux görsel promptları, Canva yazı katmanları ve gönderi metinleriyle hazırlanmıştır.</w:t>
    </w:r>
  </w:p>
`;

for (const c of carousels) {
  docxXmlAdditions += `
    <w:p>
      <w:pPr>
        <w:spacing w:before="400" w:after="100"/>
        <w:pBdr><w:top w:val="single" w:sz="18" w:space="10" w:color="263C34"/></w:pBdr>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/>
          <w:b/>
          <w:sz w:val="32"/>
          <w:color w:val="263C34"/>
        </w:rPr>
        <w:t>${xmlEscape(c.titleTr)}</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:before="40" w:after="140"/></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="263C34"/></w:rPr><w:t>Kanca / Hook: </w:t></w:r>
      <w:r><w:rPr><w:b/><w:color w:val="D97736"/></w:rPr><w:t>${xmlEscape(c.hook)}</w:t></w:r>
    </w:p>
  `;

  for (const s of c.slides) {
    docxXmlAdditions += `
      <w:p>
        <w:pPr><w:spacing w:before="140" w:after="40"/></w:pPr>
        <w:r>
          <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="263C34"/></w:rPr>
          <w:t>🖼️ Slayt ${s.slideNum}: ${xmlEscape(s.type)}</w:t>
        </w:r>
      </w:p>
      <w:p>
        <w:pPr><w:spacing w:before="20" w:after="20"/></w:pPr>
        <w:r><w:rPr><w:b/><w:color w:val="5C6A64"/></w:rPr><w:t>Canva Başlığı: </w:t></w:r>
        <w:r><w:rPr><w:b/><w:color w:val="D97736"/></w:rPr><w:t>"${xmlEscape(s.overlay)}"</w:t></w:r>
      </w:p>
      <w:p>
        <w:pPr><w:spacing w:before="20" w:after="40"/></w:pPr>
        <w:r><w:rPr><w:b/><w:color w:val="5C6A64"/></w:rPr><w:t>Canva Alt Açıklama: </w:t></w:r>
        <w:r><w:rPr><w:i/></w:rPr><w:t>${xmlEscape(s.subtext)}</w:t></w:r>
      </w:p>
      <w:p>
        <w:pPr>
          <w:spacing w:before="40" w:after="120"/>
          <w:shd w:val="clear" w:color="auto" w:fill="FAF8F5"/>
          <w:pBdr><w:left w:val="single" w:sz="18" w:space="10" w:color="D97736"/></w:pBdr>
        </w:pPr>
        <w:r><w:rPr><w:b/><w:sz w:val="16"/><w:color w:val="D97736"/></w:rPr><w:t>AI GÖRSEL PROMPTU (--ar 4:5):&#10;</w:t></w:r>
        <w:r>
          <w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="18"/><w:color w:val="2C3531"/></w:rPr>
          <w:t>${xmlEscape(s.prompt)}</w:t>
        </w:r>
      </w:p>
    `;
  }

  docxXmlAdditions += `
    <w:p>
      <w:pPr><w:spacing w:before="120" w:after="40"/></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="263C34"/></w:rPr><w:t>Gönderi Metni (Caption):</w:t></w:r>
    </w:p>
  `;

  for (const line of c.caption.split('\n')) {
    docxXmlAdditions += `
      <w:p>
        <w:pPr><w:spacing w:before="20" w:after="20"/></w:pPr>
        <w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:t>${xmlEscape(line)}</w:t></w:r>
      </w:p>
    `;
  }

  docxXmlAdditions += `
    <w:p>
      <w:pPr><w:spacing w:before="40" w:after="200"/></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="263C34"/></w:rPr><w:t>Hashtag Seti: </w:t></w:r>
      <w:r><w:rPr><w:color w:val="5C6A64"/><w:sz w:val="18"/></w:rPr><w:t>${xmlEscape(c.hashtags)}</w:t></w:r>
    </w:p>
  `;
}

// Generate complete updated document.xml
// We need to re-run the full buildDocumentXml from generate-social-docs.mjs but appending docxXmlAdditions
let baseDocxGenerator = readFileSync(resolve('scripts/generate-social-docs.mjs'), 'utf8');

// Replace the return in buildDocumentXml with bodyXml + docxXmlAdditions
let modified = baseDocxGenerator.replace(
  'return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">\n  <w:body>\n    ${bodyXml}\n  </w:body>\n</w:document>`;',
  'return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">\n  <w:body>\n    ${bodyXml}\n    ${docxXmlAdditions}\n  </w:body>\n</w:document>`;'
);

// We can execute modified in memory and write out document.xml!
const fullScript = modified.replace('const docXml = buildDocumentXml();', `
const docxXmlAdditions = \`${docxXmlAdditions}\`;
const docXml = buildDocumentXml();
`);

writeFileSync(resolve('scripts/temp-full-doc-gen.mjs'), fullScript, 'utf8');
console.log('Temporary generator prepared.');
