import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Prose from "@/components/ui/Prose";
import DemoNotice from "@/components/ui/DemoNotice";
import Badge from "@/components/ui/Badge";
import { ArrowUpRight } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

const UPDATED = "18 Ağustos 2026";
const PATH = "/cerez-politikasi";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Çerez Politikası",
    description:
      "Emir Ketenci sitesinde hangi çerezlerin kullanıldığı, hangilerinin kullanılmadığı ve çerezleri tarayıcınızdan nasıl yöneteceğiniz.",
    path: PATH,
  }),
  robots: { index: false, follow: true },
};

const sections = [
  { id: "cerez-nedir", title: "Çerez nedir" },
  { id: "mevcut-durum", title: "Sitedeki mevcut durum" },
  { id: "turler", title: "Çerez türleri" },
  { id: "yonetim", title: "Tarayıcıdan yönetme" },
  { id: "depolama", title: "Gömülü içerik" },
  { id: "degisiklik", title: "Değişiklikler" },
  { id: "iletisim", title: "İletişim" },
];

const cookieTypes = [
  {
    name: "Zorunlu çerezler",
    purpose:
      "Sayfanın açılması, güvenlik ve dil tercihi gibi sitenin çalışması için gereken temel işlevler. Kapatılamaz, çünkü kapatıldığında site çalışmaz.",
    life: "Oturum süresi",
    status: "Kullanımda",
    active: true,
  },
  {
    name: "Tercih çerezleri",
    purpose:
      "Filtre seçimi, görünüm tercihi gibi ayarları bir sonraki ziyarette hatırlamak için kullanılır. Sitenin çalışması için şart değildir.",
    life: "Kullanılmıyor",
    status: "Kapalı",
    active: false,
  },
  {
    name: "Ölçümleme çerezleri",
    purpose:
      "Hangi sayfaların ne kadar görüntülendiğini toplu ve isimsiz olarak sayar. İleride kullanılırsa, önce bu sayfada duyurulur ve onayınız istenir.",
    life: "Kullanılmıyor",
    status: "Kapalı",
    active: false,
  },
];

export default function CerezPolitikasiPage() {
  const others = site.legalNav.filter((item) => item.href !== PATH);

  return (
    <>
      <PageHero
        eyebrow="Yasal"
        title="Çerez Politikası"
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "Çerez Politikası" }]}
        description={
          <>
            <span className="block font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ash-deep">
              Son güncelleme · {UPDATED}
            </span>
            <span className="mt-4 block">
              {site.domain} sitesinde tarayıcınıza hangi bilgilerin yazıldığını, hangilerinin
              yazılmadığını ve bu tercihi kendi tarayıcınızdan nasıl yöneteceğinizi anlatır.
            </span>
          </>
        }
      />

      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-20">
            <aside className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:self-start">
              <h2 className="type-eyebrow">İçindekiler</h2>
              <nav aria-label="Sayfa içi gezinme" className="mt-5 border-t border-[var(--hairline)]">
                <ol className="flex flex-col">
                  {sections.map((section, index) => (
                    <li key={section.id} className="border-b border-[var(--hairline)]">
                      <a
                        href={`#${section.id}`}
                        className="flex min-h-11 items-center gap-3 py-3 text-[0.8125rem] leading-snug text-ash transition-colors hover:text-bone"
                      >
                        <span className="font-mono text-[0.6875rem] text-ash-deep">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <DemoNotice />

              <Prose>
                <h2 id="cerez-nedir">Çerez nedir</h2>
                <p>
                  Çerez, ziyaret ettiğiniz sitenin tarayıcınıza bıraktığı çok küçük bir metin
                  dosyasıdır. Bir sonraki sayfaya geçtiğinizde sitenin sizi &quot;aynı ziyaretçi&quot;
                  olarak tanımasını sağlar. Tek başına kimliğinizi göstermez; içine ne yazıldığına
                  bağlı olarak teknik bir gereklilik de olabilir, ziyaretçi takibi de.
                </p>

                <h2 id="mevcut-durum">Sitedeki mevcut durum</h2>
                <p>
                  <strong>
                    Şu an bu sitede yalnızca zorunlu çerezler kullanılıyor.
                  </strong>{" "}
                  Reklam çerezi, sosyal medya piksel kodu ve üçüncü taraf ölçümleme aracı
                  bulunmuyor. Bu nedenle karşınıza bir çerez onay penceresi çıkmıyor: onaylamanız
                  gereken bir izleme yok.
                </p>
                <p>
                  Randevu talebi gönderdiğinizde forma yazdıklarınız çerezle değil, doğrudan e-posta
                  yoluyla bize ulaşır. Bu bilgilerin nasıl işlendiği{" "}
                  <Link href="/gizlilik">Gizlilik Politikası</Link> sayfasında anlatılır.
                </p>
              </Prose>

              <div className="mt-12 max-w-2xl">
                <h2 id="turler" className="type-h3 mb-4 text-bone">
                  Çerez türleri
                </h2>
                <p className="type-body">
                  Aşağıdaki tablo, bir dövme stüdyosu sitesinde karşılaşabileceğiniz üç çerez
                  türünü ve bu sitedeki durumlarını gösterir.
                </p>

                <ul className="mt-7 grid gap-px border border-[var(--hairline)] bg-[var(--hairline)]">
                  {cookieTypes.map((type) => (
                    <li key={type.name} className="bg-ink p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-[1.0625rem] font-medium text-bone">{type.name}</h3>
                        <Badge tone={type.active ? "signal" : "muted"} dot={type.active}>
                          {type.status}
                        </Badge>
                      </div>
                      <p className="type-body mt-3 text-[0.9375rem]">{type.purpose}</p>
                      <p className="type-eyebrow mt-4 flex items-center gap-3">
                        <span>Saklama</span>
                        <span aria-hidden className="h-px w-6 bg-[var(--hairline-strong)]" />
                        <span className="text-ash">{type.life}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <Prose className="mt-4">
                <h2 id="yonetim">Tarayıcıdan yönetme</h2>
                <p>
                  Çerezleri kabul etmek zorunda değilsiniz. Tüm güncel tarayıcılar, ayarlar
                  bölümündeki gizlilik başlığı altından çerezleri görmenize, tek tek silmenize ya da
                  tümüyle engellemenize izin verir. Genel yol şudur:
                </p>
                <ul>
                  <li>
                    Tarayıcı menüsünden <strong>Ayarlar</strong> bölümünü açın.
                  </li>
                  <li>
                    <strong>Gizlilik ve güvenlik</strong> başlığına girin.
                  </li>
                  <li>
                    Çerezler ve site verileri bölümünden mevcut kayıtları görüntüleyin, silin ya da
                    yeni çerezleri engelleyin.
                  </li>
                  <li>
                    Yalnızca bu siteyi etkilemek istiyorsanız, adres çubuğundaki kilit simgesinden
                    site bazlı izinleri düzenleyin.
                  </li>
                </ul>
                <p>
                  Zorunlu çerezleri engellerseniz sitenin bazı bölümleri beklendiği gibi
                  çalışmayabilir; bu bizim tarafımızdan değil, tarayıcı tercihinizden kaynaklanır.
                </p>

                <h2 id="depolama">Gömülü içerik</h2>
                <p>
                  İletişim sayfasındaki harita, siz <strong>Haritayı yükle</strong> düğmesine
                  basmadan yüklenmez. Basana kadar harita sağlayıcısına hiçbir istek gitmez ve
                  tarayıcınıza bu servisle ilgili hiçbir kayıt yazılmaz. Yüklemeyi seçerseniz,
                  ilgili sağlayıcının kendi çerez ve gizlilik kuralları devreye girer.
                </p>
                <p>
                  Sosyal medya bağlantılarımız gömülü akış değil, düz bağlantıdır; tıklamadığınız
                  sürece ilgili platformlarla aranızda veri alışverişi olmaz.
                </p>

                <h2 id="degisiklik">Değişiklikler</h2>
                <p>
                  Siteye ölçümleme ya da tercih çerezi eklenirse bu sayfa önce güncellenir, ardından
                  ilk ziyaretinizde tercihinizi sorarız. Onay vermediğiniz sürece zorunlu çerezler
                  dışında hiçbir kayıt oluşturulmaz.
                </p>

                <h2 id="iletisim">İletişim</h2>
                <p>
                  Çerezlerle ilgili sorularınız için{" "}
                  <a
                    href={whatsappLink("Merhaba, çerezlerle ilgili bir sorum var.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  &apos;tan yazabilirsiniz.
                </p>
              </Prose>

              <div className="mt-16 max-w-2xl border-t border-[var(--hairline)] pt-10">
                <h2 className="type-eyebrow">Diğer yasal metinler</h2>
                <ul className="mt-6 grid gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-3">
                  {others.map((item) => (
                    <li key={item.href} className="bg-ink">
                      <Link
                        href={item.href}
                        className="group flex min-h-11 items-center justify-between gap-4 p-5 text-[0.875rem] leading-snug text-ash transition-colors hover:text-bone"
                      >
                        {item.label}
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-ash-deep transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
