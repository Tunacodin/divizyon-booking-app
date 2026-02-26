# Divizyon Stüdyo Rezervasyon Platformu

Modern, responsive ve Calendly entegreli stüdyo rezervasyon web uygulaması.

## 🎯 Özellikler

- **5 Farklı Stüdyo**: Greenbox, Ses & Miksaj, Render, Post Prodüksiyon, Toplantı Odası
- **Calendly Entegrasyonu**: Her stüdyo için ayrı Calendly Event Type desteği
- **Mobil Öncelikli Tasarım**: Telefon, tablet ve masaüstü için optimize edilmiş responsive layout
- **Modern UI**: 60-30-10 renk kuralı, design token sistemi, component-based mimari
- **Hızlı ve Hafif**: Next.js 15 + TailwindCSS ile optimize edilmiş performans
- **Erişilebilir**: ARIA rolleri, klavye navigasyonu, focus ring desteği

## 📁 Proje Yapısı

```
bookingapp/
├── app/
│   ├── layout.tsx          # Root layout (metadata, font)
│   ├── page.tsx            # Ana sayfa
│   └── globals.css         # Design tokens ve global stiller
├── components/
│   ├── booking-page.tsx    # Ana rezervasyon sayfası komponenti
│   ├── studio-card.tsx     # Stüdyo kartı komponenti
│   ├── calendly-embed.tsx  # Calendly iframe embed
│   └── button.tsx          # Button komponenti
├── lib/
│   ├── studios.ts          # Stüdyo konfigürasyonu (buradan düzenlenir!)
│   └── utils.ts            # Yardımcı fonksiyonlar
├── public/
│   └── studios/            # Stüdyo görselleri
│       ├── greenbox.png
│       ├── ses.png
│       ├── toplanti.png
│       ├── render.png      # (Eklenecek)
│       └── post.png        # (Eklenecek)
└── README.md
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm, yarn, pnpm veya bun

### 1. Bağımlılıkları Yükle

```bash
npm install
# veya
yarn install
# veya
pnpm install
# veya
bun install
```

### 2. Development Sunucusunu Başlat

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
# veya
bun dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

### 3. Production Build

```bash
npm run build
npm run start
```

## ⚙️ Stüdyo Konfigürasyonu

### Stüdyo Bilgilerini Düzenleme

Tüm stüdyo bilgileri `lib/studios.ts` dosyasında saklanır. Bu dosyayı düzenleyerek:

- Stüdyo adı ve açıklamalarını değiştirebilirsiniz
- Calendly URL'lerini güncelleyebilirsiniz
- Stüdyoları aktif/pasif yapabilirsiniz
- Sıralamayı değiştirebilirsiniz
- İkon ve görselleri değiştirebilirsiniz

**Örnek:**

```typescript
{
  id: "greenbox-studyosu",              // Benzersiz ID
  name: "Greenbox Stüdyosu",             // Stüdyo adı
  headline: "Hayalindeki Dünyayı İnşa Et", // Kısa başlık
  description: "Tam açıklama...",        // Detaylı açıklama
  icon: "video",                         // İkon adı (video, mic, cpu, scissors, users)
  imageUrl: "/studios/greenbox.png",     // Görsel yolu (public/ klasöründe)
  active: true,                          // Aktif/pasif durumu
  order: 1,                              // Sıralama (düşük = üstte)
  calendlyUrl: "https://calendly.com/...", // Calendly Event Type URL'si
}
```

### Calendly URL'lerini Güncelleme

1. **Calendly hesabınızda** her stüdyo için ayrı Event Type oluşturun
2. Event Type'ın **paylaşım URL'sini** kopyalayın (örn: `https://calendly.com/kullanici/greenbox`)
3. `lib/studios.ts` dosyasında ilgili stüdyonun `calendlyUrl` alanını güncelleyin
4. Sunucuyu yeniden başlatın (dev mode'da otomatik yenilenir)

**Not:** Şu anda tüm stüdyolar `DEFAULT_CALENDLY_URL` değişkenini kullanıyor. Her stüdyo için farklı URL'ler atayın.

### Yeni Stüdyo Ekleme

`lib/studios.ts` dosyasındaki `studios` dizisine yeni bir obje ekleyin:

```typescript
{
  id: "yeni-studyo",
  name: "Yeni Stüdyo",
  headline: "Kısa başlık",
  description: "Detaylı açıklama",
  icon: "video", // veya mic, cpu, scissors, users
  imageUrl: "/studios/yeni.png",
  active: true,
  order: 6,
  calendlyUrl: "https://calendly.com/kullanici/yeni-studyo",
}
```

Görseli `public/studios/` klasörüne ekleyin.

## 🎨 Tasarım Sistemi

### Renk Paleti (60-30-10 Kuralı)

Tüm renkler `app/globals.css` dosyasında design token olarak tanımlı:

- **60% - Primary Background**: `--color-bg-primary` (Açık gri)
- **30% - Surface**: `--color-bg-secondary` (Beyaz)
- **10% - Accent**: `--color-accent` (Turuncu `#fab758`)

### Renkleri Değiştirme

`app/globals.css` dosyasında `:root` altındaki RGB değerlerini düzenleyin:

```css
:root {
  --color-bg-primary: 246 247 248;      /* Ana arkaplan */
  --color-bg-secondary: 255 255 255;    /* Kart arkaplanı */
  --color-accent: 250 183 88;           /* Vurgu rengi (Calendly turuncu) */
  --color-text-primary: 15 23 42;       /* Ana metin */
  --color-text-secondary: 30 41 59;     /* İkincil metin */
  --color-text-muted: 100 116 139;      /* Soluk metin */
}
```

### Spacing Sistemi

Tailwind'in varsayılan spacing scale'i kullanılır: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px.

### Breakpoint'ler

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌐 Deployment

### Vercel (Önerilen)

1. Projeyi GitHub'a push edin
2. [Vercel](https://vercel.com)'e gidin ve "Import Project" seçin
3. GitHub reposunu seçin
4. Deploy butonuna tıklayın

Vercel otomatik olarak Next.js projesini tanır ve build eder.

### Netlify

1. Projeyi GitHub'a push edin
2. [Netlify](https://netlify.com)'da "Add new site" → "Import from Git"
3. Build ayarları:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. Deploy edin

### Diğer Platformlar

Herhangi bir Node.js hosting platformunda çalışır:

```bash
npm run build
npm run start
```

## 📱 Responsive Davranış

### Mobil (< 640px)
- Stüdyo kartları üstte dikey olarak listelenir
- Seçili stüdyo detayı altta açılır
- Calendly iframe mobil için optimize edilmiş yükseklik
- Kompakt butonlar ve iconlar

### Tablet (640px - 1024px)
- Kartlar daha geniş, daha fazla bilgi gösterir
- Detay paneli aşağıda kalır
- Orta boy padding ve spacing

### Desktop (> 1024px)
- Sol sidebar: Stüdyo kartları (sticky)
- Sağ panel: Seçili stüdyo detayı ve Calendly embed
- Kart thumbnailları görünür
- Maksimum yükseklik kullanımı

## 🔧 Özelleştirme

### Stüdyo İkonlarını Değiştirme

Mevcut ikonlar (Lucide React):
- `video` - Video kamera
- `mic` - Mikrofon
- `cpu` - İşlemci (render)
- `scissors` - Makas (edit)
- `users` - Kullanıcılar (toplantı)

Yeni ikon eklemek için `components/studio-card.tsx` dosyasındaki `ICONS` objesini güncelleyin.

### Meta Tags ve SEO

`app/layout.tsx` dosyasında metadata'yı düzenleyin:

```typescript
export const metadata: Metadata = {
  title: "Divizyon | Stüdyo Rezervasyon",
  description: "Divizyon stüdyoları için Calendly üzerinden hızlı rezervasyon.",
  // Daha fazla meta tag ekleyebilirsiniz
};
```

### Font Değiştirme

`app/layout.tsx` dosyasında `Inter` yerine farklı bir Google Font import edin:

```typescript
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});
```

## 🐛 Sorun Giderme

### Calendly iframe yüklenmiyor
- Tarayıcınızın cookie ve iframe ayarlarını kontrol edin
- Calendly URL'sinin doğru olduğundan emin olun
- Tarayıcı konsolunda hata mesajlarını kontrol edin

### Görseller görünmüyor
- Görsellerin `public/studios/` klasöründe olduğundan emin olun
- Dosya adlarının `lib/studios.ts` ile eşleştiğini kontrol edin
- Görsellerin .png, .jpg veya .webp formatında olduğundan emin olun

### Stüdyo sıralaması değişmiyor
- Development sunucusunu yeniden başlatın
- Tarayıcıyı hard refresh yapın (Cmd+Shift+R / Ctrl+Shift+R)
- `lib/studios.ts` dosyasındaki `order` değerlerini kontrol edin

## 📦 Teknoloji Stack'i

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Booking**: Calendly Embedded
- **Deployment**: Vercel (önerilen)

## 🔐 Güvenlik Notları

- ✅ Tüm Calendly iframe'leri `referrerPolicy="no-referrer-when-downgrade"` ile güvenli
- ✅ External linkler `rel="noopener noreferrer"` ile açılır
- ✅ XSS koruması (React otomatik escape eder)
- ⚠️ Produksiyonda HTTPS kullanın

## 🎯 Gelecek İyileştirmeler

- [ ] Calendly Webhook entegrasyonu (otomatik bildirimler)
- [ ] Analytics entegrasyonu (Google Analytics, Plausible)
- [ ] Çoklu dil desteği (i18n)
- [ ] Dark mode toggle
- [ ] Stüdyo filtreleme (kategoriye göre)
- [ ] Favori stüdyolar (localStorage)
- [ ] Admin panel (stüdyo CRUD operasyonları)

## 📄 Lisans

MIT License

---

**Geliştiren**: Divizyon
**Tarih**: Şubat 2026
**Version**: 2.0.0
**Framework**: Next.js 15
