import { createContext, useContext, type ReactNode } from 'react'

export type Lang = 'tr' | 'en'

/** Route paths per language. */
export const ROUTES = {
  home: { tr: '/', en: '/en' },
  modules: { tr: '/moduller', en: '/en/modules' },
  faq: { tr: '/sss', en: '/en/faq' },
  contact: { tr: '/iletisim', en: '/en/contact' },
  privacy: { tr: '/gizlilik', en: '/en/privacy' },
} as const
export type RouteKey = keyof typeof ROUTES

const tr = {
  meta: {
    title: 'Hype Vision — Mevcut kameralarınızla endüstriyel yapay zeka',
    desc: 'İSG, kalite kontrol ve verimlilik için gerçek zamanlı görüntü işleme. 102 modül, marka bağımsız, KVKK uyumlu, yüz tanıma yok.',
  },
  nav: { solutions: 'Çözümler', modules: 'Modüller', how: 'Nasıl çalışır', faq: 'SSS', contact: 'İletişim', panel: 'Panel', demo: 'Demo talep et' },
  story: {
    eyebrow: "Hype Vision · 2020'den beri · 102 modül",
    h1a: 'Kameralarınız', h1b: 'artık görüyor.', h1c: 'Fabrikanız için yapay zeka.',
    sub: 'Mevcut IP kameralarınızı gerçek zamanlı İSG, kalite ve verimlilik sensörüne dönüştürüyoruz. Yeni donanım yok. Yüz tanıma yok.',
    scroll: 'Fabrikaya girmek için kaydırın',
    connecting: 'Kameraya bağlanılıyor',
    fall: { k: 'Düşme & bayılma', t: 'Biri yere düştü.', badge: 'Alarm · vardiya amiri bilgilendirildi', body: 'Ani duruş değişimi ve ardından hareketsizlik. Kimse fark etmeden amirin telefonu çalar.', m: 'Düşme tespiti', rows: ['Hareketsizlik', 'Alarm süresi', 'Kanallar', 'Kayıt'], ch: 'SMS · WhatsApp · Siren' },
    fire: { k: 'Yangın & duman', t: 'Yangın. 2,1 saniyede görüldü.', badge: 'Tahliye başladı', body: 'Alev ve duman, zaten sahip olduğunuz kamerada tespit edilir. Siren, tahliye takibi ve SCADA aynı anda tetiklenir.', m: 'Yangın & duman', rows: ['Tespit süresi', 'Bölge', 'Aksiyon', 'Bölgedeki kişi'], zone: 'Kimyasal depo', act: 'Siren · Tahliye · SCADA' },
    fork: { k: 'İnsan – forklift', t: 'Kaza değil, ramak kala.', badge: 'Ramak kala · siren açık', body: 'Yaya ile çatallar arasındaki gerçek zemin mesafesi ölçülür. Güvenli sınırın altında siren çalar.', m: 'Yakınlaşma', rows: ['Çatala mesafe', 'Güvenli sınır', 'Forklift hızı', 'Aksiyon'], act: 'Siren · olay kaydı' },
    prod: { k: 'Üretim & kalite', t: 'Her ürün sayılır.', body: 'Hareketli hatta sayım, takip ve yüzey kusuru tespiti — numune yerine %100 kontrol.', m: 'Hat 1 · canlı', rows: ['Bugünkü ürün', 'Hat verimliliği', 'Yüzey kusuru', 'Ort. çevrim'] },
    work: { k: 'Boşta kalma & çevrim', t: 'Her istasyon ölçülür.', body: 'Aktivite ve çevrim süresi istasyon bazında — asla kişi bazında değil. "5 numaralı istasyon 14 dk boşta kaldı", kim olduğu değil.', m: 'İstasyon 05 · bugün', rows: ['Aktif süre', 'Boşta', 'Ort. çevrim', 'İstasyon verimi'] },
    exit: { k: 'Acil çıkış', t: 'Acil çıkış kapalı.', badge: 'Çıkış kapalı · 06:12', body: 'Yangın çıkışının önüne bırakılan paletler eşik süreyi aşınca bildirilir — denetimde en çok ceza yazılan, gözle en çok kaçırılan madde.', m: 'Çıkış blokajı', rows: ['Blokaj süresi', 'Eşik', 'Nesne', 'Bildirilen'], obj: '2 palet', who: 'İSG sorumlusu' },
    ppe: { k: 'KKD uyumu', t: 'Eldiven yok. İşaretlendi.', body: 'Bölgeye özel kural: kalite kontrolde baret + eldiven, sevkiyatta baret + yelek, kaynakta yüz siperi.', m: 'KKD · KK bölgesi', rows: ['Baret', 'Yelek', 'Eldiven', 'Bugünkü uyum'] },
    intel: { k: 'Tesis 01 — canlı', t: 'Tüm operasyonu anlar.', m: 'Tesis 01 · şimdi', rows: ['Çevrimiçi kamera', 'Aktif modül', 'KKD uyumu', 'Hat verimliliği', 'Açık alarm'] },
    zones: ['KİMYASAL DEPO', 'ÜRETİM', 'HAT 1', 'DEPO', 'YÜKLEME', 'KALİTE KONTROL'],
    zoneM: ['Yangın alarmı · CAM-02', 'Verimlilik %94', '1.284 ürün', 'Raf doluluk %82', 'Ramak kala · CAM-04', 'KKD %96'],
    cams: ['Montaj koridoru · B bölgesi', 'Kimyasal depo', 'Yükleme rampası · Şerit 2', 'Hat 1 · Konveyör', 'CNC hücresi 05', 'Kuzey acil çıkış', 'Kalite kontrol · Kapı 3'],
    final: { eyebrow: 'Hype Vision platformu', h: ['Tek yapay zeka platformu.', 'Her kamera.', 'Her operasyon.'], sub: 'Mevcut CCTV altyapınızı operasyonel zekâya dönüştürün. 4 kamerayla 3–6 haftada pilot.', live: 'Canlı · Tesis 01 · 32 kamera', alerts: '04 açık alarm', tiles: ['Düşme tespiti', 'Yangın · kimyasal', 'Ramak kala 1,2 m', 'Çıkış kapalı'], cta: 'Demo talep et', cta2: 'Modülleri keşfet' },
  },
  home: {
    intro: { eyebrow: 'Neden Hype Vision', h: 'İnsan denetimi ölçeklenmez. Yapay zeka ölçeklenir.', p: 'Fabrikalar binlerce saatlik görüntü kaydeder ama neredeyse hiçbirini izlemez. Hype Vision kameraları kayıt cihazından karar veren bir sisteme dönüştürür: ihlali anında yakalar, hatayı hattan çıkmadan bulur, duruşu dakikası dakikasına ölçer. Ham video değil — alarm, sayaç ve kanıt.' },
    stats: [['2020+', 'Saha deneyimi'], ['102', 'Hazır & projeye özel modül'], ['7/24', 'Kesintisiz denetim'], ['0', 'Yeni kamera gereksinimi']],
    domains: {
      eyebrow: 'Çözümler', h: 'Altı uygulama alanı, tek platform.', p: 'Tek modülle başlayın, aynı altyapı üzerinde genişletin. Her modül kamera içinde tanımlı bölgelere uygulanır.',
      items: [
        { code: 'A', n: 49, t: 'İş Sağlığı ve Güvenliği', d: 'KKD, tehlikeli alan, forklift–yaya, düşme, yangın ve duman. İSG uzmanının sahada gözle yaptığı denetimi 7/24 kesintisiz hale getirir.', tags: ['Baret & yelek', 'Düşme', 'Yangın', 'Forklift–yaya'], img: '08-kkd' },
        { code: 'B', n: 15, t: 'Personel Verimliliği', d: 'İstasyon doluluğu, boşta kalma, çevrim süresi, darboğaz ve OEE bileşenleri — kimlik tespiti olmadan.', tags: ['Boşta kalma', 'Çevrim süresi', 'OEE', 'Darboğaz'], img: '06-cnc-istasyon' },
        { code: 'C', n: 12, t: 'Kalite Kontrol', d: 'Yüzey kusuru, eksik parça, etiket/OCR ve ambalaj doğrulama. Az örnekle çalışan anomali modelleri dahil.', tags: ['Yüzey kusuru', 'Anomali', 'OCR', 'Red sinyali'], img: '05-uretim-hatti' },
        { code: 'D', n: 9, t: 'Lojistik & Depo', d: 'Palet sayımı, raf doluluğu, rampa süresi, forklift rotası ve sevkiyat kanıt arşivi.', tags: ['Palet sayım', 'Rampa süresi', 'Raf doluluk'], img: '04-forklift' },
        { code: 'E', n: 9, t: 'Otel, Restoran & Tesis', d: 'Masa doluluğu, servis süresi, hijyen uyumu ve ortak alan yoğunluğu.', tags: ['Servis süresi', 'Hijyen', 'Doluluk'], img: '00-genel' },
        { code: 'F', n: 8, t: 'Belediye & Kamu', d: 'Kaçak döküm, konteyner doluluğu, kaldırım işgali, trafik yoğunluğu ve park ihlali.', tags: ['Kaçak döküm', 'Trafik', 'Park ihlali'], img: '01-kusbakisi' },
      ],
      more: 'Tüm modülleri gör',
    },
    camera: {
      eyebrow: 'Kamera entegrasyonu', h: 'Mevcut kameralarınızla çalışır. Marka fark etmez.', p: 'Hype Vision bir kamera satıcısı değil; tesisinizdeki IP kameralardan gelen görüntüyü analiz eden bir yazılım katmanıdır. Kamera değişimi, kablolama veya ek sensör gerekmez.',
      points: ['RTSP / ONVIF destekleyen her IP kamera ve NVR', 'Edge (tesis içi) veya bulut — yerel kurulumda görüntü tesisten çıkmaz', 'Mevcut NVR kayıt düzeniniz ve saklama süreniz değişmez', 'Bir GPU tipik olarak 8–16 kamera akışını işler'],
      flow: ['Mevcut IP kameralar', 'Hype Vision AI', 'Canlı panel', 'Alarm & aksiyon'],
      brands: 'Uyumlu markalar (örnek)', other: 'Listede yok mu? RTSP veya ONVIF ile bağlanır.',
    },
    integr: {
      eyebrow: 'Entegrasyon & bildirim', h: 'Tespit panelde kalmaz — sahada aksiyona dönüşür.',
      items: [
        { t: 'ERP & MES', d: 'Üretim ve olay verisi tek yerde, çift giriş yok.', tags: ['SAP', 'Oracle', 'Dynamics 365', 'REST API'] },
        { t: 'VMS popup', d: 'Olay anında VMS ekranında açılır.', tags: ['Milestone', 'Dahua', 'Hikvision', 'Genetec'] },
        { t: 'Mobil & mesaj', d: 'Geri bildirim anında cebinizde.', tags: ['Mobil panel', 'WhatsApp', 'SMS', 'E-posta'] },
        { t: 'IoT & saha', d: 'Alarm çaldırır, cihazları otomatik devreye alır.', tags: ['Siren / flaşör', 'Röle & I/O', 'Hat durdurma', 'Modbus'] },
      ],
    },
    roles: {
      eyebrow: 'Kimler için', h: 'Her rol için net, ölçülebilir değer.',
      items: [
        { r: 'Fabrika Müdürü', p: 'Saha gerçeğini vardiya sonunda öğreniyorsunuz; OEE, duruş ve idle kayıpları geç raporlanıyor.', s: 'Verimlilik, duruş, kalite ve İSG özeti tek panelde canlı. Karar vardiya içinde verilir.', tags: ['OEE & duruş', 'Vardiya KPI', 'Tek ekran'] },
        { r: 'İSG Sorumlusu', p: 'KKD ve bölge ihlalleri örneklemeli denetimle kalıyor; risk geç fark ediliyor, kanıt zayıf.', s: '7/24 KKD ve tehlikeli alan analizi; ihlal anında alarm ve zaman damgalı kanıt görüntüsü.', tags: ['KKD tespiti', 'VMS popup', 'Siren'] },
        { r: 'Kalite Mühendisi', p: 'Fire birikiyor, manuel kontrol yoruluyor; hata müşteriye kadar gizli kalıyor.', s: 'Hat içi 0,1–0,3 sn hata tespiti; OK/red, hata tipi trendi ve vardiya raporu.', tags: ['Anlık tespit', 'OK / red', 'Fire azaltma'] },
      ],
      problem: 'Sorun', solution: 'Hype Vision ile',
    },
    compare: {
      eyebrow: 'Karşılaştırma', h: 'Manuel denetim ve Hype Vision.', cols: ['', 'Manuel denetim', 'Hype Vision'],
      rows: [
        ['Kapsam', 'Örneklemeli turlar, kör noktalar', '7/24, her kamera karesi'],
        ['Tespit süresi', 'Saatler — çoğu vardiya sonu', 'Anlık (0,1–3 sn)'],
        ['Kanıt', 'Kağıt checklist, hafıza', 'Otomatik görüntü + zaman damgası'],
        ['Raporlama', 'Excel, gecikmeli', 'Canlı panel, saatlik KPI'],
        ['Ölçek', 'Personel sayısıyla sınırlı', 'Kamera başına sınırsız izleme'],
        ['İSG uyumu', 'Reaktif, olay sonrası', 'Proaktif alarm ve dijital iz'],
      ],
    },
    pilot: {
      eyebrow: 'Pilot süreci', h: 'Keşiften rapora dört adım.', p: 'Her aşama net teslimat, ölçülebilir KPI ve yazılı pilot raporu ile kapanır. Kabul kriteri karşılanmazsa devam yükümlülüğünüz doğmaz.',
      steps: [
        ['Keşif', '1–2 gün', 'Mevcut kameralar ve öncelikli risk alanları birlikte çıkarılır; hangi kameranın hangi modüle uygun olduğu yazılı bildirilir.'],
        ['Kurulum', '3–5 gün', 'Edge bağlantısı, bölge ve kural tanımı, alarm kanalları tesisinize göre ayarlanır.'],
        ['Kalibrasyon & pilot', '30 gün', 'Modeller sizin sahanızdan toplanan görüntülerle ince ayarlanır; canlı panel ve günlük KPI.'],
        ['Rapor', 'Pilot sonu', 'Doğruluk ölçüm raporu, ROI özeti ve yaygınlaştırma planı.'],
      ],
    },
    results: {
      eyebrow: 'Saha sonuçları', h: 'Türkiye’de üretim tesislerinde ölçülen sonuçlar.', p: 'Müşteri adı paylaşmadan, tipik sonuç aralıkları:',
      items: [['%22', 'Fire düşüşü', 'Otomotiv yan sanayi · 6 ay kalite pilotu'], ['0,1 sn', 'Hata tespiti', 'Elektronik & PCB · hat içi ayırma'], ['−%18', 'Boşta kalma', 'Tekstil · vardiya verimlilik takibi'], ['<2 sn', 'KKD alarm süresi', 'Metal & makine · 7/24 İSG']],
    },
    kvkk: {
      eyebrow: 'KVKK & gizlilik', h: 'Kimseyi tanımayız. Bölgeyi ve olayı ölçeriz.', p: '102 modülün 100’ü kişisel veri işlemez: analiz bölge, nesne ve hareket bazlıdır. Çıktı "3 numaralı istasyonda 14 dk boşta kalma" biçimindedir, "Ahmet 14 dk durdu" değil. Yüz tanıma ana kataloğumuzda yer almaz.',
      lv: [['Yeşil', 'Kimliksiz', 'Bölge, nesne ve hareket bazlı. Ek yükümlülük yok.'], ['Sarı', 'Kişisel veri', 'Plaka tanıma gibi. Aydınlatma ve envanter kaydı gerekir.'], ['Kırmızı', 'Özel nitelikli', 'Biyometrik. Ana katalog dışında, yalnızca hukuki değerlendirme sonrası.']],
    },
    faq: { eyebrow: 'SSS', h: 'En sık sorulanlar.', all: 'Tüm sorular' },
    cta: { eyebrow: 'Ücretsiz ön değerlendirme', h: 'Sahanızı bize gösterin.', p: 'Mevcut kameralarınızdan birkaç örnek kayıt gönderin; hangi modüllerin sizin sahanızda çalışacağını üç iş günü içinde yazılı olarak bildirelim.', b1: 'Pilot talep et', b2: 'Modülleri incele' },
  },
  modules: {
    eyebrow: 'Ürün modülleri kataloğu', h: '102 modül. Altı uygulama alanı.', p: 'Hepsi mevcut IP kameralarınız üzerinde çalışır. Her modül için sahada ölçülen doğruluk aralığını yazıyoruz; hiçbiri %97’nin üzerinde taahhüt içermez.',
    ready: 'Hazır', custom: 'Projeye özel', acc: 'Doğruluk',
    groups: [
      { code: 'A', t: 'İş Sağlığı ve Güvenliği', n: 49, img: '08-kkd', items: [['Baret / kask kontrolü', 1], ['Eldiven kontrolü', 1], ['Koruyucu maske kontrolü', 1], ['Yasaklı alan ihlali', 1], ['Yüksekte çalışma kontrolü', 1], ['İnsan – forklift yakınlaşma', 1], ['Asılı yük altında personel', 1], ['Düşme, kayma ve bayılma', 1], ['Telefon kullanımı / sigara', 1], ['Yangın ve alev tespiti', 1], ['Gaz kaçağı (metan)', 1], ['Kamera sabotajı', 1], ['Acil çıkış blokajı', 0], ['LOTO uyum doğrulama', 0]] },
      { code: 'B', t: 'Personel Verimliliği', n: 15, img: '06-cnc-istasyon', items: [['İstasyon doluluk & boşta kalma', 0], ['Çevrim süresi analizi', 0], ['Hat duruş & sebep sınıflandırma', 0], ['Darboğaz tespiti', 0], ['OEE bileşen takibi', 0], ['İş makinesi kullanım süresi', 1], ['Nesne ve insan sayımı', 1], ['Yoğunluk ısı haritası', 1]] },
      { code: 'C', t: 'Kalite Kontrol', n: 12, img: '05-uretim-hatti', items: [['Yüzey kusuru (çizik, çatlak, ezik, pas)', 0], ['Az örnekle anomali tespiti', 0], ['Kaynak dikişi kontrolü', 0], ['Eksik parça / montaj doğrulama', 0], ['Etiket, barkod ve OCR', 0], ['Dolum seviyesi & kapak', 0]] },
      { code: 'D', t: 'Lojistik & Depo', n: 9, img: '04-forklift', items: [['Palet & koli sayımı', 0], ['Raf doluluk oranı', 0], ['Rampa (dock) süresi', 0], ['Forklift rota & boş sefer', 0], ['Kapı / bariyer açık kalma', 0]] },
      { code: 'E', t: 'Otel, Restoran & Tesis', n: 9, img: '00-genel', items: [['Masa doluluk & devir süresi', 0], ['Servis süresi analizi', 0], ['Hijyen uyumu (bone, eldiven, önlük)', 0], ['Otopark doluluğu', 0]] },
      { code: 'F', t: 'Belediye & Kamu', n: 8, img: '01-kusbakisi', items: [['Kaçak döküm & moloz', 0], ['Çöp konteyneri doluluğu', 0], ['Kaldırım & yol işgali', 0], ['Trafik yoğunluğu & araç sınıfı', 0], ['Park ihlali', 0]] },
    ],
    accTitle: 'Gerçekçi doğruluk beklentileri',
    accRows: [['KKD tespiti', '%88 – %96'], ['Alan ve bölge ihlali', '%94 – %97'], ['İnsan – forklift yakınlaşma', '%90 – %96'], ['Düşme ve bayılma', '%85 – %93'], ['Yangın, duman ve gaz', '%90 – %97'], ['Sayım ve doluluk', '%92 – %97'], ['Süre ve verimlilik', '%93 – %97'], ['Yüzey kusuru', '%92 – %97']],
    accNote: 'Doğruluk kamera açısı, çözünürlük, aydınlatma ve sahne karmaşıklığına göre değişir; teklif aşamasında sizin kameralarınızdan alınan örnek görüntülerle netleştirilir.',
  },
  faqPage: { eyebrow: 'Sık sorulan sorular', h: 'İlk toplantıda sorulanlar — cevaplarıyla.', more: 'Cevabını bulamadınız mı?' },
  faqs: [
    ['Mevcut kameralarım yeterli mi?', 'Büyük olasılıkla evet. RTSP veya ONVIF destekleyen her IP kamera çalışır. Belirleyici olan çözünürlükten çok açıdır. Teklif öncesi kayıtlarınızı inceleyip hangi kameranın hangi modüle uygun olduğunu yazılı bildiririz.'],
    ['Kamera değiştirmem veya kablo çekmem gerekir mi?', 'Kural olarak hayır. Bazen mevcut bir kameranın açısını değiştirmek yeterlidir. Yalnızca bazı kalite kontrol modüllerinde kontrollü aydınlatma ve özel kamera gerekebilir.'],
    ['Görüntülerim dışarı çıkıyor mu?', 'Edge kurulumda hayır — analiz tesisinizdeki sunucuda yapılır. Bulut kurulumda yalnızca ihlal anına ait kısa klipler aktarılır, sürekli akış gönderilmez.'],
    ['Personelden rıza almam gerekir mi?', 'Yeşil sınıftaki modüllerde kişisel veri işlenmediği için rıza gerekmez; kamera bilgilendirmesi ve aydınlatma metni yeterlidir. Nihai değerlendirmeyi kendi hukuk danışmanınızla yapmanız gerekir.'],
    ['Personel bunu gözetleme olarak görür mü?', 'Sistem kimseyi tanımaz, kişi bazlı performans raporu üretmez. Çıktı istasyon ve bölge bazlıdır. Devreye alma öncesi personel bilgilendirme sunumu sağlıyoruz.'],
    ['Ne kadar sürede kurulur?', 'Tipik pilot 3–6 hafta. Büyük kısmı kurulum değil, sizin sahanızdan toplanan görüntülerle kalibrasyon ve yanlış alarm ayarıdır.'],
    ['Yanlış alarm çok olur mu?', 'Başlangıçta olur ve süreç buna göre planlanır. Kurulumun 2–4 haftası eşik ayarına ayrılır ve teklife dahildir.'],
    ['Mevcut ERP veya İSG yazılımıma bağlanır mı?', 'REST API ve webhook ile SCADA, MES, ERP, İSG yazılımı ve BI araçlarına bağlanır. Excel ve PDF çıktı standarttır.'],
    ['İnternet kesilirse sistem durur mu?', 'Edge kurulumda hayır; analiz yerel çalışmaya devam eder, bildirimler bağlantı gelince iletilir.'],
    ['Fiyat neye göre belirlenir?', 'Kamera sayısı, modül sayısı ve işlem donanımının yeri belirleyicidir. Kamera–modül kombinasyonunuzu belirttiğinizde yazılı fiyat veriyoruz.'],
  ],
  contact: {
    eyebrow: 'İletişim', h: 'Tesisiniz için birlikte planlayalım.', p: 'İSG, verimlilik, kalite veya güvenlik odağında bilgi almak için formu doldurun. Örnek kamera kaydınızı iletirseniz üç iş günü içinde modül uygunluk raporu hazırlıyoruz.',
    steps: [['Talep', 'Formu doldurun, talebiniz bize ulaşır.'], ['Keşif', 'Kameralarınız ve hat yapınız netleşir.'], ['Görüşme', 'Canlı senaryo veya teknik brifing.']],
    f: { name: 'Ad Soyad', company: 'Firma', phone: 'Telefon', email: 'E-posta', focus: 'İlgi alanı', msg: 'Not (opsiyonel)', send: 'Gönder', sending: 'Gönderiliyor…', ok: 'Teşekkürler! Talebiniz bize ulaştı, en kısa sürede dönüş yapacağız.', err: 'Gönderilemedi. Lütfen info@hypevisionlab.com adresine yazın.', consent: 'Bilgileriniz yalnızca iletişim talebiniz için kullanılır.' },
    focus: ['İSG denetimi', 'Personel verimliliği', 'Kalite kontrol', 'Lojistik & depo', 'Güvenlik'],
    addr: 'GTÜ Teknopark, Hightech Binası\n41480 Gebze, Kocaeli, Türkiye',
  },
  privacy: {
    h: 'Gizlilik ve KVKK',
    body: [
      ['Veri sorumlusu', 'Hype Vision, GTÜ Teknopark, Gebze / Kocaeli. İletişim: info@hypevisionlab.com'],
      ['Toplanan veriler', 'İletişim formunda paylaştığınız ad, firma, telefon, e-posta ve not bilgileri yalnızca talebinize dönüş yapmak amacıyla işlenir ve e-posta yoluyla ekibimize iletilir.'],
      ['Çerezler', 'Bu site zorunlu olmayan izleme çerezi kullanmaz.'],
      ['Haklarınız', 'KVKK madde 11 kapsamındaki haklarınız için info@hypevisionlab.com adresine yazabilirsiniz.'],
      ['Ürün tarafında veri', 'Hype Vision modüllerinin büyük çoğunluğu kişisel veri işlemez; analiz bölge, nesne ve hareket bazlıdır. Edge kurulumda görüntü tesisten çıkmaz.'],
    ],
  },
  footer: { tag: 'Mevcut kameralarınızla İSG, verimlilik, kalite ve güvenlikte ölçülebilir sonuç.', product: 'Ürün', company: 'Kurumsal', rights: 'Tüm hakları saklıdır.' },
}

type Dict = typeof tr

const en: Dict = {
  meta: {
    title: 'Hype Vision — Industrial AI on your existing cameras',
    desc: 'Real-time computer vision for safety, quality and productivity. 102 modules, brand-agnostic, GDPR/KVKK friendly, no face recognition.',
  },
  nav: { solutions: 'Solutions', modules: 'Modules', how: 'How it works', faq: 'FAQ', contact: 'Contact', panel: 'Panel', demo: 'Request a demo' },
  story: {
    eyebrow: 'Hype Vision · since 2020 · 102 modules',
    h1a: 'Your cameras', h1b: 'can now see.', h1c: 'AI for your factory.',
    sub: 'We turn your existing IP cameras into real-time safety, quality and productivity sensors. No new hardware. No face recognition.',
    scroll: 'Scroll to enter the plant',
    connecting: 'Connecting to camera',
    fall: { k: 'Fall & collapse', t: 'Someone went down.', badge: 'Alarm · supervisor notified', body: 'A sudden posture change followed by no motion. The supervisor’s phone rings before anyone else notices.', m: 'Fall detection', rows: ['No motion', 'Alert sent', 'Channels', 'Clip saved'], ch: 'SMS · WhatsApp · Siren' },
    fire: { k: 'Fire & smoke', t: 'Fire. Seen in 2.1 seconds.', badge: 'Evacuation started', body: 'Flame and smoke detected on the camera you already own. Siren, evacuation tracking and SCADA trigger at once.', m: 'Fire & smoke', rows: ['Detected in', 'Zone', 'Actions', 'People in zone'], zone: 'Chemical storage', act: 'Siren · Evac · SCADA' },
    fork: { k: 'Human – forklift', t: 'A near miss, not an accident.', badge: 'Near miss · siren on', body: 'Real floor distance between people and forks, calibrated to the ground plane. Below the safe limit, the siren sounds.', m: 'Proximity', rows: ['Distance to forks', 'Safe limit', 'Forklift speed', 'Action'], act: 'Siren · log event' },
    prod: { k: 'Production & quality', t: 'Every product, counted.', body: 'Counting, tracking and surface-defect detection on the moving line — 100% inspection instead of sampling.', m: 'Line 1 · live', rows: ['Products today', 'Line efficiency', 'Surface defects', 'Avg cycle'] },
    work: { k: 'Idle & cycle time', t: 'Every station, measured.', body: 'Activity and cycle time per station — never per person. “Station 5 was idle for 14 minutes”, not who.', m: 'Station 05 · today', rows: ['Active time', 'Idle', 'Avg cycle', 'Station eff.'] },
    exit: { k: 'Emergency exit', t: 'The exit is blocked.', badge: 'Exit blocked · 06:12', body: 'Pallets left in front of a fire exit beyond the threshold — one of the most-fined, least-noticed violations.', m: 'Exit obstruction', rows: ['Blocked for', 'Threshold', 'Objects', 'Notified'], obj: '2 pallets', who: 'HSE lead' },
    ppe: { k: 'PPE compliance', t: 'Missing gloves. Flagged.', body: 'Zone-specific rules: helmet + gloves at QC, helmet + vest in shipping, face shield in welding.', m: 'PPE · QC zone', rows: ['Helmet', 'Vest', 'Gloves', 'Compliance today'] },
    intel: { k: 'Plant 01 — live', t: 'It understands the whole operation.', m: 'Plant 01 · now', rows: ['Cameras online', 'Active modules', 'PPE compliance', 'Line efficiency', 'Open alerts'] },
    zones: ['CHEMICAL STORAGE', 'PRODUCTION', 'LINE 1', 'WAREHOUSE', 'LOADING DOCK', 'QUALITY CONTROL'],
    zoneM: ['Fire alert · CAM-02', 'Efficiency 94%', '1,284 products', 'Racks 82%', 'Near miss · CAM-04', 'PPE 96%'],
    cams: ['Assembly aisle · Zone B', 'Chemical storage', 'Loading dock · Lane 2', 'Line 1 · Conveyor', 'CNC cell 05', 'North emergency exit', 'Quality control · Gate 3'],
    final: { eyebrow: 'Hype Vision platform', h: ['One AI platform.', 'Every camera.', 'Every operation.'], sub: 'Transform existing CCTV infrastructure into operational intelligence. Pilot on 4 cameras in 3–6 weeks.', live: 'Live · Plant 01 · 32 cameras', alerts: '04 open alerts', tiles: ['Fall detected', 'Fire · chemical', 'Near miss 1.2 m', 'Exit blocked'], cta: 'Request a demo', cta2: 'Explore modules' },
  },
  home: {
    intro: { eyebrow: 'Why Hype Vision', h: 'Human inspection doesn’t scale. AI does.', p: 'Factories record thousands of hours of footage and watch almost none of it. Hype Vision turns cameras from recorders into a system that acts: it catches violations instantly, finds defects before they leave the line and measures downtime to the minute. Not raw video — alarms, counters and evidence.' },
    stats: [['2020+', 'Field experience'], ['102', 'Ready & custom modules'], ['24/7', 'Continuous inspection'], ['0', 'New cameras required']],
    domains: {
      eyebrow: 'Solutions', h: 'Six application domains, one platform.', p: 'Start with a single module and grow on the same infrastructure. Every module runs on zones you define inside each camera.',
      items: [
        { code: 'A', n: 49, t: 'Occupational Health & Safety', d: 'PPE, hazardous areas, forklift–pedestrian, falls, fire and smoke. Turns the HSE officer’s walk-around into 24/7 inspection.', tags: ['Helmet & vest', 'Falls', 'Fire', 'Forklift–person'], img: '08-kkd' },
        { code: 'B', n: 15, t: 'Workforce Productivity', d: 'Station occupancy, idle time, cycle time, bottlenecks and OEE components — without identifying anyone.', tags: ['Idle time', 'Cycle time', 'OEE', 'Bottleneck'], img: '06-cnc-istasyon' },
        { code: 'C', n: 12, t: 'Quality Control', d: 'Surface defects, missing parts, label/OCR and packaging checks. Includes few-shot anomaly models.', tags: ['Surface defects', 'Anomaly', 'OCR', 'Reject signal'], img: '05-uretim-hatti' },
        { code: 'D', n: 9, t: 'Logistics & Warehouse', d: 'Pallet counting, rack occupancy, dock time, forklift routes and shipment evidence archive.', tags: ['Pallet count', 'Dock time', 'Rack occupancy'], img: '04-forklift' },
        { code: 'E', n: 9, t: 'Hospitality & Facilities', d: 'Table occupancy, service time, hygiene compliance and common-area density.', tags: ['Service time', 'Hygiene', 'Occupancy'], img: '00-genel' },
        { code: 'F', n: 8, t: 'Municipal & Public', d: 'Illegal dumping, container fill level, sidewalk obstruction, traffic density and parking violations.', tags: ['Illegal dumping', 'Traffic', 'Parking'], img: '01-kusbakisi' },
      ],
      more: 'See all modules',
    },
    camera: {
      eyebrow: 'Camera integration', h: 'Works with the cameras you have. Any brand.', p: 'Hype Vision is not a camera vendor; it is a software layer that analyses the video from the IP cameras already installed in your plant. No camera swap, no cabling, no extra sensors.',
      points: ['Any IP camera or NVR that supports RTSP / ONVIF', 'Edge (on-premise) or cloud — on-premise video never leaves the plant', 'Your NVR recording and retention stay untouched', 'One GPU typically handles 8–16 camera streams'],
      flow: ['Existing IP cameras', 'Hype Vision AI', 'Live panel', 'Alarm & action'],
      brands: 'Compatible brands (examples)', other: 'Not listed? It connects via RTSP or ONVIF.',
    },
    integr: {
      eyebrow: 'Integration & alerting', h: 'Detections don’t stay on a dashboard — they trigger action.',
      items: [
        { t: 'ERP & MES', d: 'Production and event data in one place, no double entry.', tags: ['SAP', 'Oracle', 'Dynamics 365', 'REST API'] },
        { t: 'VMS popup', d: 'Pops up on your VMS the moment it happens.', tags: ['Milestone', 'Dahua', 'Hikvision', 'Genetec'] },
        { t: 'Mobile & messaging', d: 'Feedback in your pocket instantly.', tags: ['Mobile panel', 'WhatsApp', 'SMS', 'E-mail'] },
        { t: 'IoT & field', d: 'Sounds the alarm and switches devices automatically.', tags: ['Siren / beacon', 'Relay & I/O', 'Line stop', 'Modbus'] },
      ],
    },
    roles: {
      eyebrow: 'Who it’s for', h: 'Clear, measurable value for every role.',
      items: [
        { r: 'Plant Manager', p: 'You learn what happened on the floor at the end of the shift; OEE, downtime and idle losses are reported late.', s: 'Productivity, downtime, quality and safety summarised live on one panel. Decisions happen within the shift.', tags: ['OEE & downtime', 'Shift KPIs', 'One screen'] },
        { r: 'HSE Officer', p: 'PPE and zone violations are only sampled; risk is noticed late and evidence is weak.', s: '24/7 PPE and hazardous-area analysis; instant alarm with time-stamped evidence.', tags: ['PPE detection', 'VMS popup', 'Siren'] },
        { r: 'Quality Engineer', p: 'Scrap piles up, manual inspection tires; defects stay hidden until the customer finds them.', s: 'In-line defect detection in 0.1–0.3 s; OK/reject, defect-type trends and shift reports.', tags: ['Instant detection', 'OK / reject', 'Less scrap'] },
      ],
      problem: 'The problem', solution: 'With Hype Vision',
    },
    compare: {
      eyebrow: 'Comparison', h: 'Manual inspection vs Hype Vision.', cols: ['', 'Manual inspection', 'Hype Vision'],
      rows: [
        ['Coverage', 'Sampled rounds, blind spots', '24/7, every camera frame'],
        ['Detection time', 'Hours — often end of shift', 'Instant (0.1–3 s)'],
        ['Evidence', 'Paper checklists, memory', 'Automatic image + timestamp'],
        ['Reporting', 'Excel, delayed', 'Live panel, hourly KPIs'],
        ['Scale', 'Limited by headcount', 'Unlimited per camera'],
        ['Safety compliance', 'Reactive, after the fact', 'Proactive alarms and digital trail'],
      ],
    },
    pilot: {
      eyebrow: 'Pilot process', h: 'From site survey to report in four steps.', p: 'Every stage closes with a clear deliverable, measurable KPIs and a written pilot report. If the acceptance criteria aren’t met, you have no obligation to continue.',
      steps: [
        ['Survey', '1–2 days', 'We map your existing cameras and priority risk areas together and tell you in writing which camera suits which module.'],
        ['Setup', '3–5 days', 'Edge connection, zones and rules, alerting channels configured for your plant.'],
        ['Calibration & pilot', '30 days', 'Models fine-tuned on footage from your own site; live panel and daily KPIs.'],
        ['Report', 'End of pilot', 'Accuracy report, ROI summary and roll-out plan.'],
      ],
    },
    results: {
      eyebrow: 'Field results', h: 'Measured results in manufacturing plants.', p: 'Without naming customers, typical result ranges:',
      items: [['22%', 'Less scrap', 'Automotive supplier · 6-month quality pilot'], ['0.1 s', 'Defect detection', 'Electronics & PCB · in-line rejection'], ['−18%', 'Idle time', 'Textile · shift productivity tracking'], ['<2 s', 'PPE alarm time', 'Metal & machinery · 24/7 safety']],
    },
    kvkk: {
      eyebrow: 'Privacy by design', h: 'We don’t recognise anyone. We measure zones and events.', p: '100 of our 102 modules process no personal data: analysis is based on zones, objects and motion. The output reads “station 3 was idle for 14 minutes”, never “Ahmet stopped for 14 minutes”. Face recognition is not part of our main catalogue.',
      lv: [['Green', 'Identity-free', 'Zone, object and motion based. No extra obligations.'], ['Yellow', 'Personal data', 'E.g. licence plates. Requires notice and processing records.'], ['Red', 'Special category', 'Biometric. Outside the main catalogue, only after legal review.']],
    },
    faq: { eyebrow: 'FAQ', h: 'Most asked questions.', all: 'All questions' },
    cta: { eyebrow: 'Free assessment', h: 'Show us your floor.', p: 'Send a few sample recordings from your existing cameras; within three business days we’ll tell you in writing which modules will work on your site.', b1: 'Request a pilot', b2: 'Browse modules' },
  },
  modules: {
    eyebrow: 'Product module catalogue', h: '102 modules. Six application domains.', p: 'All run on your existing IP cameras. For every module we publish the accuracy range measured in the field; none promises more than 97%.',
    ready: 'Ready', custom: 'Project-specific', acc: 'Accuracy',
    groups: [
      { code: 'A', t: 'Occupational Health & Safety', n: 49, img: '08-kkd', items: [['Hard hat / helmet detection', 1], ['Glove detection', 1], ['Respiratory mask detection', 1], ['Restricted area violation', 1], ['Working at heights', 1], ['Human–forklift proximity', 1], ['Personnel under suspended load', 1], ['Slip, trip, fall & collapse', 1], ['Phone use / smoking', 1], ['Fire & flame detection', 1], ['Methane gas leak', 1], ['Camera tampering', 1], ['Emergency exit obstruction', 0], ['LOTO compliance', 0]] },
      { code: 'B', t: 'Workforce Productivity', n: 15, img: '06-cnc-istasyon', items: [['Station occupancy & idle time', 0], ['Cycle time analysis', 0], ['Line stoppage & downtime reasons', 0], ['Bottleneck detection', 0], ['OEE component tracking', 0], ['Machinery utilisation time', 1], ['Object & people counting', 1], ['Density heatmap', 1]] },
      { code: 'C', t: 'Quality Control', n: 12, img: '05-uretim-hatti', items: [['Surface defects (scratch, crack, dent, rust)', 0], ['Few-shot anomaly detection', 0], ['Weld seam inspection', 0], ['Missing component / assembly check', 0], ['Label, barcode & OCR', 0], ['Fill level & cap inspection', 0]] },
      { code: 'D', t: 'Logistics & Warehouse', n: 9, img: '04-forklift', items: [['Pallet & carton counting', 0], ['Rack occupancy', 0], ['Dock time measurement', 0], ['Forklift route & empty trips', 0], ['Door / barrier left open', 0]] },
      { code: 'E', t: 'Hospitality & Facilities', n: 9, img: '00-genel', items: [['Table occupancy & turnover', 0], ['Service time analysis', 0], ['Hygiene compliance (hairnet, gloves, apron)', 0], ['Parking occupancy', 0]] },
      { code: 'F', t: 'Municipal & Public', n: 8, img: '01-kusbakisi', items: [['Illegal dumping & debris', 0], ['Waste container fill level', 0], ['Sidewalk & road obstruction', 0], ['Traffic density & classification', 0], ['Parking violations', 0]] },
    ],
    accTitle: 'Realistic accuracy expectations',
    accRows: [['PPE detection', '88% – 96%'], ['Area & zone violation', '94% – 97%'], ['Human–forklift proximity', '90% – 96%'], ['Fall & collapse', '85% – 93%'], ['Fire, smoke & gas', '90% – 97%'], ['Counting & occupancy', '92% – 97%'], ['Time & productivity', '93% – 97%'], ['Surface defects', '92% – 97%']],
    accNote: 'Accuracy depends on camera angle, resolution, lighting and scene complexity; it is confirmed during the proposal stage with sample footage from your own cameras.',
  },
  faqPage: { eyebrow: 'Frequently asked questions', h: 'What gets asked in the first meeting — answered.', more: 'Didn’t find your answer?' },
  faqs: [
    ['Are my existing cameras good enough?', 'Most likely yes. Any IP camera supporting RTSP or ONVIF works. Angle matters more than resolution. Before quoting we review your footage and tell you in writing which camera suits which module.'],
    ['Do I need new cameras or cabling?', 'As a rule, no. Sometimes adjusting an existing camera’s angle is enough. Only some quality-control modules may need controlled lighting and a dedicated camera.'],
    ['Does my video leave the site?', 'Not with an edge installation — analysis runs on a server in your plant. In the cloud setup only short clips of violations are transferred, never a continuous stream.'],
    ['Do I need employee consent?', 'Green-class modules process no personal data, so consent is not required; camera notices and a privacy notice are enough. The final assessment is yours with your legal counsel.'],
    ['Will staff see this as surveillance?', 'The system recognises no one and produces no per-person performance reports. Output is per station and zone. We provide a staff briefing before go-live.'],
    ['How long does setup take?', 'A typical pilot takes 3–6 weeks. Most of that is calibration with footage from your site and false-alarm tuning, not installation.'],
    ['Will there be many false alarms?', 'At first, yes — and the process is planned for it. Two to four weeks of threshold tuning are part of every proposal.'],
    ['Does it connect to my ERP or HSE software?', 'Via REST API and webhooks to SCADA, MES, ERP, HSE software and BI tools. Excel and PDF exports are standard.'],
    ['What if the internet goes down?', 'With edge installation analysis keeps running locally; notifications are delivered once the connection is back.'],
    ['How is pricing determined?', 'By number of cameras, number of modules and where processing runs. Tell us your camera–module mix and we’ll send a written quote.'],
  ],
  contact: {
    eyebrow: 'Contact', h: 'Let’s plan it for your plant.', p: 'Fill in the form for safety, productivity, quality or security. Send us a sample recording and we’ll prepare a module suitability report within three business days.',
    steps: [['Request', 'Fill in the form, it reaches our team.'], ['Survey', 'Your cameras and line layout get clear.'], ['Meeting', 'Live scenario or technical briefing.']],
    f: { name: 'Full name', company: 'Company', phone: 'Phone', email: 'E-mail', focus: 'Area of interest', msg: 'Note (optional)', send: 'Send', sending: 'Sending…', ok: 'Thank you! We received your request and will get back to you shortly.', err: 'Could not send. Please e-mail info@hypevisionlab.com.', consent: 'Your details are used only to answer your request.' },
    focus: ['Health & safety', 'Workforce productivity', 'Quality control', 'Logistics & warehouse', 'Security'],
    addr: 'GTÜ Technopark, Hightech Building\n41480 Gebze, Kocaeli, Türkiye',
  },
  privacy: {
    h: 'Privacy',
    body: [
      ['Controller', 'Hype Vision, GTÜ Technopark, Gebze / Kocaeli, Türkiye. Contact: info@hypevisionlab.com'],
      ['Data we collect', 'The name, company, phone, e-mail and note you share in the contact form are processed only to respond to your request and are forwarded to our team by e-mail.'],
      ['Cookies', 'This site uses no non-essential tracking cookies.'],
      ['Your rights', 'To exercise your rights under KVKK / GDPR, write to info@hypevisionlab.com.'],
      ['Data in our product', 'Most Hype Vision modules process no personal data; analysis is zone, object and motion based. With edge installation video never leaves the plant.'],
    ],
  },
  footer: { tag: 'Measurable results in safety, productivity, quality and security — on your existing cameras.', product: 'Product', company: 'Company', rights: 'All rights reserved.' },
}

export const DICT = { tr, en }

const LangCtx = createContext<Lang>('tr')
export const LangProvider = ({ lang, children }: { lang: Lang; children: ReactNode }) => <LangCtx.Provider value={lang}>{children}</LangCtx.Provider>
export const useLang = () => useContext(LangCtx)
export const useT = () => DICT[useContext(LangCtx)]
export const path = (k: RouteKey, l: Lang) => ROUTES[k][l]
