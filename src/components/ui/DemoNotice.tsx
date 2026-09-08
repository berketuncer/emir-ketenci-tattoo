import { Shield } from "@/components/ui/Icons";

/**
 * Yasal sayfalarda kullanılan uyarı. Bu metinlerin gerçek hukuki içerik
 * olmadığını açıkça belirtir.
 */
export default function DemoNotice({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex gap-4 border border-warn/25 bg-warn/[0.05] p-5">
      <Shield className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
      <p className="text-[0.875rem] leading-relaxed text-ash">
        {children ?? (
          <>
            <strong className="font-medium text-bone">Demo metin.</strong> Bu sayfa, sitenin yapısını
            göstermek için hazırlanmış örnek bir taslaktır ve hukuki bağlayıcılığı yoktur. Yayına
            geçmeden önce bir hukuk danışmanı tarafından hazırlanacak asıl metinle değiştirilmelidir.
          </>
        )}
      </p>
    </div>
  );
}
