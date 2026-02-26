export type Studio = {
  id: string;
  name: string;
  headline: string;
  description: string;
  imageUrl: string;
  images: string[]; // Carousel için 3 görsel
  location?: string;
  active: boolean;
  order: number;
  calendlyUrl: string;
};

// Her stüdyo için ayrı Calendly Event Type URL'leri
const DEFAULT_CALENDLY_URL = "https://calendly.com/tunabstncx/30min";

export const studios: Studio[] = [
  {
    id: "greenbox-studyosu",
    name: "Greenbox Stüdyosu",
    headline: "Hayalindeki Dünyayı İnşa Et",
    description:
      "Çizgi film, kısa film, animasyon veya sosyal medya içeriği... Projen ne olursa olsun, tam donanımlı çekim stüdyomuzda, profesyonel kamera, ışık ve ses ekipmanlarıyla hayalindeki görselliği yarat.",
    imageUrl: "/assets/cs1.png",
    images: ["/assets/cs1.png", "/assets/cs4.png", "/assets/cs7.png"],
    location: "Sanal Divizyon",
    active: true,
    order: 1,
    calendlyUrl: "https://calendly.com/sanal-divizyon/sanal-divizyon-uye-randevu-clone?embed_domain=www.divizyon.org&embed_type=PopupText&hide_event_type_details=1&hide_gdpr_banner=1",
  },
  {
    id: "ses-ve-miksaj-studyosu",
    name: "Ses ve Miksaj Stüdyosu",
    headline: "Projelerine Profesyonel Bir Ses Ver",
    description:
      "Podcast kaydından oyun/film müziği üretimine kadar her türlü dijital ses projesi için tasarlanmış, akustik düzenlemeye sahip stüdyomuzda, profesyonel ekipmanlarla sesini duyur.",
    imageUrl: "/assets/cs2.png",
    images: ["/assets/cs2.png", "/assets/cs5.png", "/assets/cs8.png"],
    location: "Piksel Divizyon",
    active: true,
    order: 2,
    calendlyUrl: "https://calendly.com/piksel-divizyon/piksel-divizyon-misafir-randevu?embed_domain=www.divizyon.org&embed_type=PopupText&hide_event_type_details=1&hide_gdpr_banner=1",
  },
  {
    id: "render-studyosu",
    name: "Render Stüdyosu",
    headline: "Haftaları Saatlere İndir",
    description:
      "Animasyon, modelleme ve oyun geliştirme gibi yüksek işlem gücü gerektiren projelerin için özel olarak kurulan render farm altyapımızla, haftalar sürebilecek render sürelerini saatlere indir.",
    imageUrl: "/assets/cs3.png",
    images: ["/assets/cs3.png", "/assets/cs6.png", "/assets/cs9.png"],
    location: "Piksel Divizyon",
    active: true,
    order: 3,
    calendlyUrl: DEFAULT_CALENDLY_URL,
  },
  {
    id: "post-produksiyon-studyosu",
    name: "Post Prodüksiyon Stüdyosu",
    headline: "İçeriğine Son Rötuşları Yap",
    description:
      "Kurgu, renk düzeltme, ses tasarımı ve efekt çalışmaları için tasarlanmış post prodüksiyon stüdyomuzda, profesyonel ekipman ve yazılımlarla projeni tamamla.",
    imageUrl: "/assets/cs3.png",
    images: ["/assets/cs3.png", "/assets/cs6.png", "/assets/cs9.png"],
    location: "Piksel Divizyon",
    active: true,
    order: 4,
    calendlyUrl: "https://calendly.com/piksel-divizyon/piksel-divizyon-misafir-randevu?embed_domain=www.divizyon.org&embed_type=PopupText&hide_event_type_details=1&hide_gdpr_banner=1",
  },
  {
    id: "toplanti-odasi",
    name: "Toplantı Odası",
    headline: "Ekibinle Bir Araya Gel",
    description:
      "Proje toplantıları, beyin fırtınası seansları veya ekip çalışmaları için tasarlanmış konforlu toplantı odamızda, fikirlerini paylaş ve projelerini planla.",
    imageUrl: "/assets/cs3.png",
    images: ["/assets/cs3.png", "/assets/cs6.png", "/assets/cs9.png"],
    location: "Piksel Divizyon",
    active: true,
    order: 5,
    calendlyUrl: DEFAULT_CALENDLY_URL,
  },
];

