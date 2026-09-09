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
const PATH = "/kvkk";

export const metadata: Metadata = {
  ...pageMeta({
    title: "KVKK Aydınlatma Metni",
    description:
      "Veri sorumlusu kimliği, işlenen kişisel veri kategorileri, işleme amaçları, aktarım, saklama süreleri, ilgili kişi hakları ve başvuru yolu.",
    path: PATH,
  }),
  robots: { index: false, follow: true },
};

const sections = [
  { id: "veri-sorumlusu", title: "Veri sorumlusu" },
  { id: "kategoriler", title: "İşlenen veri kategorileri" },
  { id: "amaclar", title: "İşleme amaçları" },
  { id: "hukuki-sebep", title: "Hukuki sebepler" },
  { id: "yontem", title: "Toplama yöntemi" },
  { id: "aktarim", title: "Aktarım" },
  { id: "saklama", title: "Saklama ve imha" },
  { id: "haklar", title: "İlgili kişi hakları" },
  { id: "basvuru", title: "Başvuru yolu" },
];

const controller = [
  { label: "Unvan", value: site.legalName },
  { label: "Konum", value: `${site.location.city}, ${site.location.countryName}` },
  {
    label: "WhatsApp",
    value: site.contact.whatsappDisplay,
    href: whatsappLink("Merhaba, KVKK başvurusu yapmak istiyorum."),
  },
];

export default function KvkkPage() {
  const others = site.legalNav.filter((item) => item.href !== PATH);

  return (
    <>
      <PageHero
        eyebrow="Yasal"
        title="KVKK Aydınlatma Metni"
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "KVKK Aydınlatma Metni" }]}
        description={
          <>
            <span className="block font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ash-deep">
              Son güncelleme · {UPDATED}
            </span>
            <span className="mt-4 block">
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, randevu ve tasarım süreci
              boyunca hangi verilerinizin hangi amaçla işlendiğini, kime aktarıldığını ve nasıl
              başvuru yapacağınızı açıklar.
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

              <div className="mt-12 max-w-2xl">
                <h2 id="veri-sorumlusu" className="type-h3 mb-4 text-bone">
                  Veri sorumlusu
                </h2>
                <p className="type-body">
                  Kişisel verileriniz, aşağıda kimliği belirtilen veri sorumlusu tarafından işlenir.
                </p>
                <dl className="mt-7 grid gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2">
                  {controller.map((row) => (
                    <div key={row.label} className="bg-ink p-6">
                      <dt className="type-eyebrow">{row.label}</dt>
                      <dd className="mt-3 text-[0.9375rem] leading-relaxed text-bone">
                        {row.href ? (
                          <a
                            href={row.href}
                            className="underline decoration-ash-deep underline-offset-4 transition-colors hover:decoration-bone"
                          >
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <Prose className="mt-4">
                <h2 id="kategoriler">İşlenen veri kategorileri</h2>
                <ul>
                  <li>
                    <strong>Kimlik:</strong> ad, soyadı; stüdyoda yaş teyidi sırasında sözlü olarak
                    doğrulanan doğum yılı.
                  </li>
                  <li>
                    <strong>İletişim:</strong> e-posta adresi, telefon numarası.
                  </li>
                  <li>
                    <strong>Müşteri işlem:</strong> randevu tarihi, seçilen tarz, tasarım notları,
                    revizyon yazışmaları, kapora ve ödeme kaydı.
                  </li>
                  <li>
                    <strong>Görsel kayıt:</strong> ilettiğiniz referans görselleri ve izin verdiğiniz
                    hâlde çekilen çalışma fotoğrafları.
                  </li>
                  <li>
                    <strong>Sağlıkla ilgili beyan:</strong> yalnızca uygulamanın güvenliği için
                    gerekli olduğu ölçüde ve açık rızanızla; ayrı bir sağlık dosyası tutulmaz.
                  </li>
                  <li>
                    <strong>İşlem güvenliği:</strong> site ziyaretinde oluşan sunucu kayıtları.
                  </li>
                </ul>

                <h2 id="amaclar">İşleme amaçları</h2>
                <ul>
                  <li>Randevu talebinin alınması, değerlendirilmesi ve size dönüş yapılması.</li>
                  <li>Tasarımın hazırlanması, revizyonların yürütülmesi ve seansın planlanması.</li>
                  <li>
                    Uygulamanın güvenli yapılabilmesi için uygunluk ve yaş şartının teyit edilmesi.
                  </li>
                  <li>Seans sonrası bakım bilgilendirmesi ve rötuş takibinin yapılması.</li>
                  <li>Fatura düzenlenmesi, muhasebe ve yasal saklama yükümlülükleri.</li>
                  <li>Talep ve şikâyetlerin karşılanması, olası uyuşmazlıklarda hakkın korunması.</li>
                  <li>
                    Yalnızca açık rıza verilmişse: çalışmanın portfolyoda ve sosyal medyada
                    yayımlanması.
                  </li>
                </ul>

                <h2 id="hukuki-sebep">Hukuki sebepler</h2>
                <p>
                  Yukarıdaki işlemeler, Kanun&apos;da sayılan ve aşağıda sade dille özetlenen hukuki
                  sebeplere dayanır:
                </p>
                <h3>Sözleşmenin kurulması ve ifası</h3>
                <p>
                  Randevu, tasarım ve uygulama sürecinin yürütülebilmesi için doğrudan gerekli olan
                  kimlik, iletişim ve müşteri işlem verileri.
                </p>
                <h3>Hukuki yükümlülüğün yerine getirilmesi</h3>
                <p>
                  Fatura, muhasebe kayıtları ve mevzuatın saklamayı zorunlu kıldığı belgeler.
                </p>
                <h3>Bir hakkın tesisi, kullanılması veya korunması</h3>
                <p>
                  Kapora, iptal ve uyuşmazlık hâllerinde delil niteliği taşıyan yazışma kayıtları.
                </p>
                <h3>Meşru menfaat</h3>
                <p>
                  Stüdyo ve ziyaretçi güvenliği ile sitenin teknik bütünlüğünü koruyan sınırlı
                  kayıtlar; temel hak ve özgürlüklerinize zarar vermeyecek ölçüde.
                </p>
                <h3>Açık rıza</h3>
                <p>
                  Sağlıkla ilgili beyanlar ile çalışma görsellerinizin yayımlanması. Rızanızı
                  dilediğiniz zaman geri alabilirsiniz; geri alma, o ana kadar yapılmış işlemeleri
                  geçersiz kılmaz.
                </p>

                <h2 id="yontem">Toplama yöntemi</h2>
                <p>
                  Veriler; {site.domain} üzerindeki randevu formu, e-posta ve WhatsApp yazışmaları,
                  telefon görüşmeleri ve stüdyoda yüz yüze yapılan görüşmeler aracılığıyla, kısmen
                  otomatik ve otomatik olmayan yollarla toplanır.
                </p>

                <h2 id="aktarim">Aktarım</h2>
                <p>
                  Kişisel verileriniz pazarlama amacıyla üçüncü kişilere satılmaz veya devredilmez.
                  Aktarım yalnızca şu hâllerle sınırlıdır:
                </p>
                <ul>
                  <li>
                    Site barındırma, e-posta ve dosya saklama hizmeti veren teknik altyapı
                    sağlayıcıları.
                  </li>
                  <li>Fatura ve muhasebe hizmeti veren mali müşavir.</li>
                  <li>
                    Yetkili kamu kurum ve kuruluşları ile adli mercilerin hukuka uygun talepleri.
                  </li>
                  <li>
                    Açık rıza verilmişse, çalışmanın yayımlandığı sosyal medya platformları.
                  </li>
                </ul>
                <p>
                  Kullanılan altyapı sağlayıcılarının sunucuları yurt dışında bulunabilir; bu durumda
                  yurt dışına aktarım, Kanun&apos;un aradığı şartlara uygun biçimde yapılır.
                </p>

                <h2 id="saklama">Saklama ve imha</h2>
                <p>
                  Veriler, işleme amacının gerektirdiği süre boyunca ve mevzuatın öngördüğü saklama
                  süreleri kadar tutulur. Süre sona erdiğinde ya da işleme sebebi ortadan
                  kalktığında kayıtlar silinir, yok edilir veya anonim hâle getirilir. Süreler için{" "}
                  <Link href="/gizlilik">Gizlilik Politikası</Link> sayfasındaki tabloya bakın.
                </p>

                <h2 id="haklar">İlgili kişi hakları</h2>
                <p>Kanun kapsamında veri sorumlusuna başvurarak şu haklarınızı kullanabilirsiniz:</p>
                <ul>
                  <li>Kişisel verinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme.</li>
                  <li>İşlemenin amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
                  <li>Verilerin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme.</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme.</li>
                  <li>Şartlar oluştuğunda silinmesini veya yok edilmesini isteme.</li>
                  <li>
                    Düzeltme, silme ve yok etme işlemlerinin verinin aktarıldığı üçüncü kişilere
                    bildirilmesini isteme.
                  </li>
                  <li>
                    Yalnızca otomatik sistemlerle yapılan analiz sonucu aleyhinize bir sonuç
                    doğmasına itiraz etme.
                  </li>
                  <li>Hukuka aykırı işleme nedeniyle zarara uğramanız hâlinde giderim talep etme.</li>
                </ul>

                <h2 id="basvuru">Başvuru yolu</h2>
                <p>
                  Başvurunuzu, kimliğinizi tespit etmemize yetecek bilgilerle birlikte şu yollardan
                  biriyle iletebilirsiniz:
                </p>
                <ul>
                  <li>
                    WhatsApp:{" "}
                    <a
                      href={whatsappLink("Merhaba, KVKK başvurusu yapmak istiyorum.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.contact.whatsappDisplay}
                    </a>{" "}
                    — mesajın başına &quot;KVKK Başvurusu&quot; yazın.
                  </li>
                </ul>
                <p>
                  Talebinizi, niteliğine göre en kısa sürede ve her hâlde mevzuatta öngörülen süre
                  içinde (en geç otuz gün) ücretsiz olarak sonuçlandırırız. İşlemin ayrıca bir
                  maliyet gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen
                  tarifedeki ücret talep edilebilir. Başvurunuzun reddedilmesi ya da cevapsız
                  kalması hâlinde Kurul&apos;a şikâyet hakkınız saklıdır.
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
