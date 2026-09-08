import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Prose from "@/components/ui/Prose";
import DemoNotice from "@/components/ui/DemoNotice";
import { ArrowUpRight } from "@/components/ui/Icons";
import { fullAddress, mailLink, site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

const UPDATED = "1 Eylül 2026";
const PATH = "/gizlilik";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Gizlilik Politikası",
    description:
      "Emir Ketenci'nin hangi kişisel verileri topladığı, bu verileri neden işlediği, ne kadar sakladığı ve kiminle paylaştığı.",
    path: PATH,
  }),
  robots: { index: false, follow: true },
};

const sections = [
  { id: "kapsam", title: "Bu metin ne kapsıyor" },
  { id: "veriler", title: "Topladığımız veriler" },
  { id: "amac", title: "Neden işliyoruz" },
  { id: "sure", title: "Ne kadar saklıyoruz" },
  { id: "paylasim", title: "Kimlerle paylaşıyoruz" },
  { id: "gorseller", title: "Çalışma görselleri" },
  { id: "guvenlik", title: "Güvenlik" },
  { id: "haklar", title: "Haklarınız" },
  { id: "yas", title: "Yaş sınırı" },
  { id: "degisiklik", title: "Değişiklikler" },
  { id: "iletisim", title: "İletişim" },
];

export default function GizlilikPage() {
  const others = site.legalNav.filter((item) => item.href !== PATH);

  return (
    <>
      <PageHero
        eyebrow="Yasal"
        title="Gizlilik Politikası"
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "Gizlilik Politikası" }]}
        description={
          <>
            <span className="block font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ash-deep">
              Son güncelleme · {UPDATED}
            </span>
            <span className="mt-4 block">
              Bu metin, {site.domain} adresini ziyaret ettiğinizde ve randevu talebi gönderdiğinizde
              hangi bilgilerin toplandığını, bu bilgilerin neden gerektiğini ve üzerinde hangi
              haklara sahip olduğunuzu anlatır.
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
                <h2 id="kapsam">Bu metin ne kapsıyor</h2>
                <p>
                  Politika, {site.legalName} tarafından işletilen {site.domain} sitesini ve site
                  üzerinden başlayan randevu yazışmalarını kapsar. Stüdyoda yüz yüze yürüyen tasarım
                  görüşmeleri de aynı ilkelere tabidir: yalnızca işi yapabilmek için gereken bilgiyi
                  isteriz, gerekmeyeni saklamayız.
                </p>

                <h2 id="veriler">Topladığımız veriler</h2>
                <h3>Bize kendiniz ilettikleriniz</h3>
                <ul>
                  <li>Ad ve iletişim bilgisi: e-posta adresi, telefon numarası.</li>
                  <li>
                    Randevu talebinde yazdığınız fikir metni, düşündüğünüz bölge, yaklaşık ölçü ve
                    bütçe aralığı.
                  </li>
                  <li>Yüklediğiniz referans görselleri ve varsa mevcut dövmenizin fotoğrafı.</li>
                  <li>
                    Kendi isteğinizle paylaştığınız, uygulamayı etkileyebilecek sağlık notları
                    (örneğin alerji, kan sulandırıcı kullanımı, hamilelik).
                  </li>
                </ul>

                <h3>Ziyaret sırasında oluşanlar</h3>
                <p>
                  Site barındırma altyapısı, her ziyarette olağan sunucu kayıtları üretir: IP adresi,
                  tarayıcı ve cihaz bilgisi, istek zamanı ve görüntülenen adres. Bu kayıtlar
                  güvenlik ve hata takibi dışında bir amaçla kullanılmaz.
                </p>

                <h3>Toplamadıklarımız</h3>
                <p>
                  Site üzerinden ödeme alınmadığı için kart bilgisi hiçbir aşamada istenmez. Kimlik
                  belgesi fotokopisi talep etmeyiz; yaş teyidi stüdyoda, belge kaydı alınmadan yüz
                  yüze yapılır.
                </p>

                <h2 id="amac">Neden işliyoruz</h2>
                <ul>
                  <li>Randevu talebinizi değerlendirmek ve size {site.booking.responseTime} dönmek.</li>
                  <li>
                    Fikri değerlendirmek, tasarım ve revizyon sürecini yürütmek.
                  </li>
                  <li>Uygulama öncesi güvenlik ve uygunluk teyidini yapmak.</li>
                  <li>Seans sonrası bakım hatırlatması ve rötuş takibi göndermek.</li>
                  <li>
                    Fatura, muhasebe ve saklama gibi yasal yükümlülükleri yerine getirmek; olası bir
                    uyuşmazlıkta hakkımızı savunmak.
                  </li>
                </ul>
                <p>
                  Pazarlama amaçlı toplu e-posta göndermiyoruz. İleride bir bülten açılırsa, bu
                  yalnızca ayrıca onay veren kişilere gönderilir ve her iletide tek tıkla çıkış
                  bağlantısı bulunur.
                </p>

                <h2 id="sure">Ne kadar saklıyoruz</h2>
                <ul>
                  <li>
                    <strong>Sonuçlanmayan randevu talepleri:</strong> son yazışmadan itibaren 6 ay.
                    Fikir yeniden gündeme gelirse baştan anlatmak zorunda kalmayın diye.
                  </li>
                  <li>
                    <strong>Gerçekleşen çalışmalara ait kayıtlar:</strong> müşteri ilişkisi boyunca
                    ve sonrasında mevzuatın öngördüğü saklama süresi kadar.
                  </li>
                  <li>
                    <strong>Referans görselleri:</strong> tasarım kesinleştikten sonra arşivden
                    çıkarılır; talep ederseniz daha erken silinir.
                  </li>
                  <li>
                    <strong>Sunucu kayıtları:</strong> barındırma sağlayıcısının teknik saklama
                    süresi kadar, kısa vadeli.
                  </li>
                </ul>
                <p>
                  Süre dolduğunda kayıtlar silinir ya da kimliğinizle ilişkisi kurulamayacak hâle
                  getirilir.
                </p>

                <h2 id="paylasim">Kimlerle paylaşıyoruz</h2>
                <p>
                  Kişisel verilerinizi satmıyor, reklam ağlarıyla paylaşmıyoruz. Erişim yalnızca
                  aşağıdaki sınırlı hâllerde söz konusudur:
                </p>
                <ul>
                  <li>
                    Sitenin barındırıldığı ve e-postaların taşındığı teknik altyapı sağlayıcıları —
                    yalnızca hizmetin çalışması için gereken ölçüde.
                  </li>
                  <li>
                    Fatura düzenleyen mali müşavirlik hizmeti — yalnızca faturaya yansıyan bilgiler.
                  </li>
                  <li>
                    Yetkili kamu kurum ve kuruluşlarının hukuka uygun ve yazılı talebi hâlinde,
                    talep edilen kapsamda.
                  </li>
                </ul>
                <p>
                  Kullanılan altyapı sağlayıcılarının sunucuları yurt dışında bulunabilir. Bu
                  durumda aktarım, ilgili mevzuatın öngördüğü şartlara uygun şekilde yapılır.
                  Ayrıntılar için <Link href="/kvkk">KVKK Aydınlatma Metni</Link> sayfasına bakın.
                </p>

                <h2 id="gorseller">Çalışma görselleri</h2>
                <p>
                  Portfolyo, sosyal medya ve bu site için çekilen fotoğraflar yalnızca yazılı
                  izniniz varsa yayımlanır. İzin, çalışma başına verilir ve dilediğiniz zaman geri
                  alınabilir; geri aldığınızda görsel kendi kanallarımızdan kaldırılır. Yüzünüzün
                  göründüğü kareler için ayrı bir onay isteriz.
                </p>

                <h2 id="guvenlik">Güvenlik</h2>
                <p>
                  Randevu yazışmaları şifreli bağlantı üzerinden taşınır. Kayıtlara erişim, işi
                  yalnızca Emir Ketenci ile sınırlıdır; kullanılan cihazlar parola
                  ve disk şifrelemesiyle korunur. Buna rağmen hiçbir aktarım veya saklama yöntemi
                  mutlak güvenlik sağlamaz; bir sorun fark ettiğimizde etkilenen kişileri gecikmeden
                  bilgilendiririz.
                </p>

                <h2 id="haklar">Haklarınız</h2>
                <p>Bize yazarak her zaman şunları isteyebilirsiniz:</p>
                <ul>
                  <li>Hakkınızda hangi verilerin işlendiğini öğrenmek ve bir kopyasını almak.</li>
                  <li>Yanlış ya da eksik bilgilerin düzeltilmesini istemek.</li>
                  <li>Gereği kalmayan kayıtların silinmesini istemek.</li>
                  <li>Verdiğiniz onayı geri almak veya belirli bir işlemeye itiraz etmek.</li>
                </ul>
                <p>
                  Talebinizi <a href={mailLink}>{site.contact.email}</a> adresine iletin; kimliğinizi
                  teyit ettikten sonra en kısa sürede dönüş yaparız. Başvuru usulünün ayrıntısı{" "}
                  <Link href="/kvkk">KVKK Aydınlatma Metni</Link> sayfasındadır.
                </p>

                <h2 id="yas">Yaş sınırı</h2>
                <p>
                  {site.minimumAge} yaşından küçük kişilerden bilerek veri toplamıyor, bu kişilere
                  randevu vermiyoruz. Yaş sınırının altındaki bir kişiye ait bilgi bize ulaşırsa
                  kaydı siliyoruz.
                </p>

                <h2 id="degisiklik">Değişiklikler</h2>
                <p>
                  Politikayı, çalışma biçimimiz veya mevzuat değiştiğinde güncelleriz. Güncel sürüm
                  her zaman bu adreste yayımlanır ve sayfanın başındaki tarih yenilenir. Kapsamı
                  önemli ölçüde değiştiren bir güncellemede, aktif bir sürecin içindeyseniz size
                  ayrıca haber veririz.
                </p>

                <h2 id="iletisim">İletişim</h2>
                <p>
                  {site.legalName}
                  <br />
                  {fullAddress}
                  <br />
                  <a href={mailLink}>{site.contact.email}</a> · {site.contact.phoneDisplay}
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
