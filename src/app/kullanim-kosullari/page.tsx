import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Prose from "@/components/ui/Prose";
import DemoNotice from "@/components/ui/DemoNotice";
import { ArrowUpRight } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";

const UPDATED = "1 Eylül 2026";
const PATH = "/kullanim-kosullari";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Kullanım Koşulları",
    description:
      "Emir Ketenci sitesinin amacı, içerik hakları, randevu ve kapora koşullarına genel çerçeve, yaş sınırı ve sorumluluk sınırları.",
    path: PATH,
  }),
  robots: { index: false, follow: true },
};

const sections = [
  { id: "amac", title: "Sitenin amacı" },
  { id: "icerik", title: "İçeriğin niteliği" },
  { id: "telif", title: "İçerik ve telif hakları" },
  { id: "randevu", title: "Randevu ve kapora" },
  { id: "yas", title: "Yaş sınırı" },
  { id: "uygunluk", title: "Sağlık ve uygunluk" },
  { id: "sorumluluk", title: "Sorumluluk sınırı" },
  { id: "baglantilar", title: "Dış bağlantılar" },
  { id: "degisiklik", title: "Değişiklik hakkı" },
  { id: "iletisim", title: "Uygulanacak hükümler" },
];

export default function KullanimKosullariPage() {
  const others = site.legalNav.filter((item) => item.href !== PATH);

  return (
    <>
      <PageHero
        eyebrow="Yasal"
        title="Kullanım Koşulları"
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "Kullanım Koşulları" }]}
        description={
          <>
            <span className="block font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ash-deep">
              Son güncelleme · {UPDATED}
            </span>
            <span className="mt-4 block">
              {site.domain} sitesini ziyaret ederek bu koşulları kabul etmiş olursunuz. Metin,
              sitenin ne için var olduğunu, içeriğin kime ait olduğunu ve randevu sürecinin hangi
              çerçevede yürüdüğünü anlatır.
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
                <h2 id="amac">Sitenin amacı</h2>
                <p>
                  {site.domain}, {site.legalName}&apos;nun tanıtım sitesidir. Amacı, stüdyonun
                  çalışmalarını göstermek, çalışma biçimini anlatmak ve randevu talebini başlatmaktır.
                  Site üzerinden ürün satışı yapılmaz, ödeme alınmaz ve kesin randevu takvimi
                  oluşturulmaz; talebiniz bize ulaştıktan sonra süreç yazışmayla devam eder.
                </p>

                <h2 id="icerigin-niteligi">İçeriğin niteliği</h2>
                <p>
                  Sitedeki metinler bilgilendirme amaçlıdır; tıbbi tavsiye ya da hukuki görüş
                  değildir. Fiyat aralıkları, süreler ve iyileşme bilgileri tipik durumları
                  anlatır; sizin çalışmanız için geçerli olan koşullar, tasarım onaylanmadan önce
                  size ayrıca yazılı olarak iletilir.
                </p>

                <h2 id="telif">İçerik ve telif hakları</h2>
                <p>
                  Sitede yer alan tasarımlar, çizimler, fotoğraflar, metinler ve marka işareti;
                  Emir Ketenci&apos;ye aittir. Kişisel olarak ilham almak için
                  kaydedebilirsiniz. Ancak:
                </p>
                <ul>
                  <li>
                    Çalışmaların ticari amaçla çoğaltılması, satılması ya da başka bir stüdyoda
                    birebir uygulanması için izin gerekir.
                  </li>
                  <li>
                    Paylaşırken kaynak gösterin; imzayı kaldırmayın ya da görseli
                    tanınmayacak biçimde değiştirmeyin.
                  </li>
                  <li>
                    Sizin için üretilen özel tasarımın kişisel kullanım hakkı sizindir; tasarımın
                    telif hakkı Emir Ketenci&apos;de kalır ve aynı tasarım başka bir kişiye uygulanmaz.
                  </li>
                </ul>
                <p>
                  Bize gönderdiğiniz referans görsellerinin haklarına sahip olduğunuzu ya da
                  kullanma izniniz bulunduğunu varsayarız. Üçüncü kişiye ait bir çalışmanın birebir
                  kopyalanmasını kabul etmiyoruz.
                </p>

                <h2 id="randevu">Randevu ve kapora</h2>
                <p>
                  Randevu talebi göndermek, randevunun kesinleştiği anlamına gelmez.{" "}
                  {site.booking.depositNote} Kapora toplam ücretten düşülür.
                </p>
                <ul>
                  <li>
                    Tarih değişikliğini en az 72 saat önce bildirirseniz kapora yeni tarihe
                    aktarılır.
                  </li>
                  <li>
                    Daha geç bildirimlerde ve gelinmeyen randevularda kapora iade edilmez; o saat
                    başka bir kişiye kapatılmış olur.
                  </li>
                  <li>
                    Stüdyodan kaynaklanan bir iptalde kapora tamamen iade edilir ya da dilerseniz
                    yeni tarihe aktarılır.
                  </li>
                </ul>
                <p>
                  Koşulların güncel ayrıntısı için <Link href="/sss">sık sorulan sorular</Link>{" "}
                  sayfasına bakabilir, süreci{" "}
                  <Link href={site.booking.href}>randevu talebi</Link> adımından başlatabilirsiniz.
                </p>

                <h2 id="yas">Yaş sınırı</h2>
                <p>
                  Stüdyo, {site.minimumAge} yaşını doldurmamış kişilere veli onayı olsa dahi dövme
                  uygulamaz. Seans günü yaşınızı gösteren resmî bir kimlik ibraz etmeniz istenir;
                  kimlik gösterilmediğinde randevu iptal edilir ve kapora iade edilmez.
                </p>

                <h2 id="uygunluk">Sağlık ve uygunluk</h2>
                <p>
                  Alkol veya uyuşturucu etkisi altında seansa alınmazsınız. Kan sulandırıcı
                  kullanımı, hamilelik, emzirme dönemi, kontrolsüz kronik rahatsızlıklar ve
                  uygulama bölgesindeki cilt sorunları randevunun ertelenmesini gerektirebilir.
                  Bildiğiniz sağlık durumlarını önceden paylaşmak sizin sorumluluğunuzdadır;
                  paylaşılmayan bilgilerden doğan sonuçlardan stüdyo sorumlu tutulamaz.
                </p>

                <h2 id="sorumluluk">Sorumluluk sınırı</h2>
                <p>
                  Uygulama, tek kullanımlık malzeme ve hijyen kurallarına uygun biçimde yapılır.
                  Bununla birlikte iyileşme; cilt tipine, bakım alışkanlıklarına ve kişisel
                  faktörlere bağlıdır. Size verilen{" "}
                  <Link href="/bakim">bakım rehberine</Link> uyulmaması hâlinde ortaya çıkan renk
                  kaybı, iz ve enfeksiyon riskleri kapsam dışındadır.
                </p>
                <p>
                  Site kesintisiz ve hatasız çalışacak şekilde tasarlanır; ancak teknik arıza,
                  bakım ya da üçüncü taraf altyapı sorunları nedeniyle geçici erişim kesintileri
                  olabilir. Sitedeki bilgilerin güncelliğini korumak için makul özeni gösteririz;
                  yazım hatası veya güncellenmemiş bir bilgi fark ederseniz bize bildirin.
                </p>

                <h2 id="baglantilar">Dış bağlantılar</h2>
                <p>
                  Site, sosyal medya hesaplarımıza ve harita servisine bağlantı verir. Bu
                  platformların içeriği, gizlilik uygulamaları ve kullanım koşulları kendi
                  sorumluluklarındadır; bağlantıya tıkladığınızda o platformun kuralları geçerli
                  olur.
                </p>

                <h2 id="degisiklik">Değişiklik hakkı</h2>
                <p>
                  Bu koşulları, hizmetin kapsamı ya da mevzuat değiştiğinde önceden haber vermeksizin
                  güncelleyebiliriz. Güncel sürüm her zaman bu adreste yayımlanır ve sayfanın
                  başındaki tarih yenilenir. Devam eden bir randevu süreciniz varsa, o süreç için
                  talebinizi gönderdiğiniz tarihteki koşullar geçerli olmaya devam eder.
                </p>

                <h2 id="iletisim">Uygulanacak hükümler</h2>
                <p>
                  Bu koşullara ve sitenin kullanımına Türkiye Cumhuriyeti mevzuatı uygulanır. Kişisel
                  verilerin işlenmesine ilişkin bilgilendirme için{" "}
                  <Link href="/kvkk">KVKK Aydınlatma Metni</Link> ve{" "}
                  <Link href="/gizlilik">Gizlilik Politikası</Link> sayfalarına bakın. Sorularınız
                  için{" "}
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
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
