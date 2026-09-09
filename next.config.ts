import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Kaldırılan sayfalar. Arama motorlarında ve eski paylaşımlarda kalmış
   * bağlantılar boşa düşmesin diye kalıcı yönlendirme.
   */
  redirects() {
    return [
      { source: "/studyo", destination: "/hakkimda", permanent: true },
      { source: "/hediye-karti", destination: "/randevu", permanent: true },
    ];
  },
};

export default nextConfig;
