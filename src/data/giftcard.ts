export const giftCard = {
  eyebrow: "Hediye Kartı",
  title: "Dövmeyi hediye etmenin doğru yolu",
  description:
    "Tasarımı ve zamanlamayı hediye ettiğiniz kişi seçer. Siz sadece tutarı belirlersiniz. Kartın geçerlilik süresi 12 aydır ve tüm çalışmalarda kullanılabilir.",
  amounts: [
    { value: "2500", label: "2.500 TL", hint: "Minimal bir başlangıç" },
    { value: "5000", label: "5.000 TL", hint: "Küçük – orta ölçek" },
    { value: "10000", label: "10.000 TL", hint: "Orta ölçekli bir çalışma" },
    { value: "custom", label: "Serbest tutar", hint: "Siz belirleyin" },
  ],
  steps: [
    { title: "Tutarı seçin", description: "Hazır tutarlardan birini ya da serbest bir tutar belirleyin." },
    { title: "Kartı hazırlayayım", description: "Baskılı zarf içinde stüdyodan teslim ya da dijital kart olarak e-posta ile." },
    { title: "Sahibi randevusunu alsın", description: "Kart sahibi kendi fikriyle gelir, tasarım süreci sıfırdan onun için yürür." },
  ],
  notes: [
    "Geçerlilik süresi 12 aydır.",
    "Tüm tarzlar ve tüm çalışma ölçüleri için kullanılabilir.",
    "Nakde çevrilemez, devredilebilir.",
    "Bu bölüm demo amaçlıdır; satın alma akışı henüz aktif değildir.",
  ],
};
