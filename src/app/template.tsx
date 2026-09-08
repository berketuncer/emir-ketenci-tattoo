/**
 * Sayfalar arası geçiş. Her gezinmede yeniden bağlandığı için içerik yumuşak
 * bir şekilde belirir; azaltılmış hareket tercihinde animasyon devre dışı kalır.
 */
export default function Template({ children }: LayoutProps<"/">) {
  return <div className="animate-fade-in">{children}</div>;
}
