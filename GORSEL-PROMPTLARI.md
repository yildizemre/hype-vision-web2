# Hype Vision — Fabrika görsel promptları

Bütün görseller **aynı fabrikada** geçmeli. Bunun için:

1. Önce **00-genel.jpg** görselini üret. Bu, fabrikanın "kimlik kartı" olacak.
2. Diğer bütün görselleri üretirken bu görseli **referans görsel** olarak ver (Midjourney: `--cref` / `--sref`, ChatGPT/Gemini: "bu görseldeki fabrikanın içinde..." diye ekle, Flux/Kling: image reference).
3. Her promptun başındaki **ORTAK BLOK**'u değiştirmeden kopyala. Fabrikanın rengi, ışığı ve yerleşimi bu blokla sabit kalıyor.
4. Görsellerin üstüne **yazı, kutu, etiket, logo koyma**. Tespit kutularını ve yazıları ben sitede canlı olarak ekliyorum.

**Format:** 16:9 yatay, en az 2560×1440 (mümkünse 4K). JPG.
**Kaydet:** `hype-new-webstyle/public/scenes/` klasörüne, aşağıdaki dosya adlarıyla.

---

## ORTAK BLOK (her promptun başına aynen koy)

```
Photorealistic still frame from a real CCTV security camera inside the same modern heavy-industry factory: a large steel-frame production hall with grey epoxy floor, yellow painted safety walkway lines, blue steel columns, high ceiling with LED high-bay lights, a long conveyor line in the middle, CNC machines along the back wall, orange warehouse pallet racks on the right side, a loading dock with roller doors on the left. Workers wear dark navy work uniforms with orange hi-vis vests and white hard hats. Cool neutral lighting with a slight blue tint, realistic, documentary, no people looking at camera, natural colours, sharp detail, 16:9.
```

**Negatif (destekliyorsa):**
```
text, watermark, logo, bounding boxes, UI, labels, cartoon, 3D render, CGI look, illustration, distorted hands, extra limbs, warped machinery, fisheye distortion
```

---

## Sahneler

### 00 — Genel bakış (referans görsel) → `00-genel.jpg`
```
[ORTAK BLOK] Very wide elevated establishing view from a high corner of the hall, about 12 metres up, looking diagonally across the whole factory floor. You can see the conveyor line, CNC row, warehouse racks on the right, loading dock on the left, and around 15 workers spread across the floor at their stations. Calm, normal working day.
```

### 01 — Kuşbakışı plan → `01-kusbakisi.jpg`
```
[ORTAK BLOK] Top-down bird's-eye view of the entire factory floor seen from directly above, roof removed, like a drone looking straight down. Clear separate areas: production line in the centre, warehouse racks on the right, loading dock with trucks on the left, a chemical storage area with blue and red drums in the back-left corner, a quality control area with inspection tables at the front-right. Workers visible as small figures.
```

### 02a — Düşme ÖNCESİ → `02a-dusme-once.jpg`
```
[ORTAK BLOK] CCTV camera mounted high on a column, looking down at about 40 degrees into an assembly aisle next to the conveyor. One worker in hi-vis vest and white hard hat is walking alone down the aisle carrying a small box. Empty floor around him.
```

### 02b — Düşme SONRASI → `02b-dusme-sonra.jpg`
```
[ORTAK BLOK] Exact same camera angle and same aisle as the previous image. The same worker has collapsed and is lying motionless face-down on the floor, the small box dropped next to him, hard hat slightly displaced. Nobody else nearby yet.
```
*(02b'yi üretirken 02a'yı referans ver, açı birebir aynı kalsın.)*

### 03a — Yangın ÖNCESİ → `03a-yangin-once.jpg`
```
[ORTAK BLOK] CCTV camera high on the wall looking down into the chemical storage corner of the same factory: rows of blue and red steel drums on spill-containment pallets, hazard signs on the wall, a fire extinguisher cabinet. Quiet, no people.
```

### 03b — Yangın SONRASI → `03b-yangin-sonra.jpg`
```
[ORTAK BLOK] Exact same camera angle and same chemical storage corner. A fire has started among the drums: bright orange flames about 2 metres high, thick grey-black smoke rising toward the ceiling and spreading under the roof, orange glow reflecting on the floor and drums. Realistic, no people.
```

### 04 — Forklift ve yaya → `04-forklift.jpg`
```
[ORTAK BLOK] CCTV camera high above the loading dock aisle, looking down at about 45 degrees. A yellow forklift carrying a pallet is driving forward along the marked lane; a worker in hi-vis vest is crossing the lane on a pedestrian crossing only 1–2 metres in front of the forks, a dangerous near miss. Motion feels real.
```

### 05 — Üretim hattı → `05-uretim-hatti.jpg`
```
[ORTAK BLOK] CCTV camera above the conveyor line, looking along it at about 35 degrees. Cardboard boxes and metal parts are moving on the conveyor in a regular row, around 10 items visible, two operators working at the side of the line.
```

### 06 — CNC istasyonu → `06-cnc-istasyon.jpg`
```
[ORTAK BLOK] CCTV camera above and behind a CNC machine workstation. One operator in hi-vis vest and hard hat is loading a metal part into the open CNC machine, the control screen glowing blue. The station area is clearly visible.
```

### 07 — Kapatılmış acil çıkış → `07-acil-cikis.jpg`
```
[ORTAK BLOK] CCTV camera on the ceiling looking at the green-marked emergency exit door on the back wall of the factory, with a glowing green EXIT sign above it. Two wooden pallets stacked with cardboard boxes have been left directly in front of the exit door, blocking it. No people.
```

### 08 — KKD kontrolü → `08-kkd.jpg`
```
[ORTAK BLOK] CCTV camera at head height plus 1.5 metres, looking slightly down at a worker standing at a quality-control table, body facing the camera. He wears a white hard hat and an orange hi-vis vest but his hands are bare, no gloves, holding a metal part. Upper body clearly visible.
```

---

## Video versiyonu (Kling / Veo / Runway, isteğe bağlı)

Elinde araç varsa, fotoğraflar arasındaki geçişler gerçek bir kamera uçuşuna dönüşür. Her video 5–8 saniye olsun:

- `v01-giris.mp4`: 00-genel.jpg'den başla → *"Slow cinematic drone flight descending from the ceiling into the factory floor, smooth, no cuts"*
- `v02-dusme.mp4`: 02a → 02b → *"Static CCTV shot, the worker walking suddenly slips and collapses on the floor and stays still"*
- `v03-yangin.mp4`: 03a → 03b → *"Static CCTV shot, a small flame appears between the drums and grows into a fire with thick smoke filling the ceiling"*
- `v04-forklift.mp4`: 04 → *"Static CCTV shot, forklift drives forward while a worker crosses in front of it and jumps back"*
- `v05-uretim.mp4`: 05 → *"Static CCTV shot, products move steadily along the conveyor"*

Videolar hazır olursa kaydırmayı videonun karelerine bağlarım: aşağı kaydırınca video ileri, yukarı kaydırınca geri oynar.

---

## Bana göndereceklerin

`public/scenes/` klasörüne yukarıdaki adlarla koyman yeterli. Hepsi aynı anda gelmek zorunda değil. Hangisi gelirse o sahneyi gerçek görüntüye çevirip tespit kutularını görüntüdeki kişilerin ve nesnelerin üstüne hizalarım.
