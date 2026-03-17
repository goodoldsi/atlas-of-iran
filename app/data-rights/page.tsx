"use client";

import { useState } from "react";
import Link from "next/link";

const translations = {
  en: {
    dir: "ltr",
    toggleBtn: "فارسی",
    backArrow: "←",
    backBtn: "Back to home",
    subtitle: "Atlas of Iran",
    title: "Your Data Rights",
    p1: "Atlas of Iran recognizes that historical documentation must balance public record with ethical responsibility.",
    h2_1: "Correction Requests",
    p2: "If you believe a record in the archive contains incorrect information, you may submit a correction request.",
    p3: "Requests should include:",
    li1_1: "The name of the individual",
    li1_2: "The information believed to be inaccurate",
    li1_3: "Supporting documentation if available",
    p4: "All correction requests are reviewed carefully.",
    h2_2: "Removal or Review Requests",
    p5: "Requests to review or remove specific information may be submitted.",
    p6: "Each request will be evaluated while considering:",
    li2_1: "Historical documentation",
    li2_2: "Public interest",
    li2_3: "Ethical considerations",
    li2_4: "Source reliability",
    p7: "Not all requests may result in removal if the information reflects documented public reporting.",
    h2_3: "Memorial Notes",
    p8: "Memorial notes submitted by visitors are reviewed before publication.",
    p9: "If a note violates the respectful purpose of the archive, it may be removed.",
    h2_4: "Responsible Documentation",
    p10: "Atlas of Iran aims to preserve memory while maintaining responsible documentation standards.",
    p11: "Community feedback plays an important role in improving the archive.",
    h2_5: "Contact",
    p12: "Requests regarding data corrections or documentation concerns may be submitted to:",
  },
  fa: {
    dir: "rtl",
    toggleBtn: "ENG",
    backArrow: "→",
    backBtn: "بازگشت به صفحه اصلی",
    subtitle: "اطلس ایران",
    title: "حقوق داده‌های شما",
    p1: "اطلس ایران می‌پذیرد که مستندسازی تاریخی باید بین ثبت عمومی و مسئولیت اخلاقی تعادل برقرار کند.",
    h2_1: "درخواست‌های اصلاح",
    p2: "اگر معتقدید که یک رکورد در آرشیو حاوی اطلاعات نادرست است، می‌توانید درخواست اصلاح ثبت کنید.",
    p3: "درخواست‌ها باید شامل موارد زیر باشند:",
    li1_1: "نام فرد",
    li1_2: "اطلاعاتی که گمان می‌رود نادرست است",
    li1_3: "مستندات پشتیبان در صورت وجود",
    p4: "تمامی درخواست‌های اصلاح به دقت بررسی می‌شوند.",
    h2_2: "درخواست‌های حذف یا بازبینی",
    p5: "درخواست‌های بازبینی یا حذف اطلاعات خاص می‌توانند ارسال شوند.",
    p6: "هر درخواست با در نظر گرفتن موارد زیر ارزیابی خواهد شد:",
    li2_1: "مستندسازی تاریخی",
    li2_2: "منفعت عمومی",
    li2_3: "ملاحظات اخلاقی",
    li2_4: "اعتبار منبع",
    p7: "در صورتی که اطلاعات بازتاب‌دهنده گزارش‌های عمومی و مستند باشد، ممکن است همه درخواست‌ها به حذف منجر نشوند.",
    h2_3: "یادداشت‌های یادبود",
    p8: "یادداشت‌های یادبود ارسالی توسط بازدیدکنندگان پیش از انتشار بررسی می‌شوند.",
    p9: "اگر یادداشتی هدف محترمانه آرشیو را نقض کند، ممکن است حذف شود.",
    h2_4: "مستندسازی مسئولانه",
    p10: "اطلس ایران با حفظ استانداردهای مستندسازی مسئولانه، قصد دارد یاد و خاطره‌ها را زنده نگه دارد.",
    p11: "بازخورد جامعه نقش مهمی در بهبود این آرشیو ایفا می‌کند.",
    h2_5: "تماس با ما",
    p12: "درخواست‌های مربوط به اصلاح داده‌ها یا نگرانی‌های مربوط به مستندسازی می‌توانند به آدرس زیر ارسال شوند:",
  }
};

export default function DataRightsPage() {
  const [lang, setLang] = useState<"en" | "fa">("en");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-16 text-white relative" dir={t.dir}>
      
      {/* Language Toggle Button */}
      <div className={`absolute top-6 ${lang === 'fa' ? 'left-6 md:left-12' : 'right-6 md:right-12'}`}>
        <button
          onClick={() => setLang(lang === "en" ? "fa" : "en")}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition hover:text-white hover:bg-white/10"
        >
          {t.toggleBtn}
        </button>
      </div>

      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white ${lang === 'fa' ? 'flex-row-reverse self-start' : ''}`}
        >
          <span>{t.backArrow}</span>
          <span>{t.backBtn}</span>
        </Link>

        <p className={`mt-10 mb-4 text-xs uppercase tracking-[0.35em] text-zinc-500 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          {t.subtitle}
        </p>

        <h1 className={`text-4xl font-semibold tracking-tight text-white md:text-6xl ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          {t.title}
        </h1>

        <div className={`mt-10 space-y-6 text-base leading-8 text-zinc-400 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          <p>{t.p1}</p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li1_1}</li>
            <li>{t.li1_2}</li>
            <li>{t.li1_3}</li>
          </ul>
          <p>{t.p4}</p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_2}</p>
          <p>{t.p5}</p>
          <p>{t.p6}</p>
          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li2_1}</li>
            <li>{t.li2_2}</li>
            <li>{t.li2_3}</li>
            <li>{t.li2_4}</li>
          </ul>
          <p>{t.p7}</p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_3}</p>
          <p>{t.p8}</p>
          <p>{t.p9}</p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_4}</p>
          <p>{t.p10}</p>
          <p>{t.p11}</p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_5}</p>
          <p>{t.p12}</p>
          <p className={`font-medium text-white ${lang === 'fa' ? 'text-left' : ''}`} dir="ltr">
            contact@atlasofiran.org
          </p>
        </div>
      </div>
    </div>
  );
}