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
    title: "Donate",
    donateBtn: "Support the Archive on Ko-fi", 
    h2_1: "Support the Archive",
    p1: "Atlas of Iran is an independent memorial archive documenting individuals who lost their lives during Revolution2026 in Iran.",
    p2: "Maintaining the archive requires ongoing work including:",
    li1_1: "Reviewing documentation sources",
    li1_2: "Verifying information",
    li1_3: "Maintaining the technical infrastructure",
    li1_4: "Ensuring long-term accessibility of the archive",
    p3: "Support helps ensure that these lives and stories are not forgotten.",
    h2_2: "Ways to Support",
    p4: "Support may include:",
    li2_1: "Financial contributions",
    li2_2: "Research collaboration",
    li2_3: "Historical documentation",
    li2_4: "Archival assistance",
    p5: "Future donation methods may include online contributions or institutional partnerships.",
    h2_3: "Transparency",
    p6: "Any support received will be used exclusively to maintain, expand, and preserve the archive.",
    h2_4: "Contact",
    p7: "For inquiries regarding supporting the archive:",
  },
  fa: {
    dir: "rtl",
    toggleBtn: "ENG",
    backArrow: "→",
    backBtn: "بازگشت به صفحه اصلی",
    subtitle: "اطلس ایران",
    title: "حمایت مالی",
    donateBtn: "حمایت از آرشیو از طریق Ko-fi",
    h2_1: "حمایت از آرشیو",
    p1: "اطلس ایران یک آرشیو یادبود مستقل است که افراد جان‌باخته در انقلاب ۲۰۲۶ ایران را مستند می‌کند.",
    p2: "نگهداری این آرشیو نیازمند کارهای مستمر از جمله موارد زیر است:",
    li1_1: "بررسی منابع مستندات",
    li1_2: "راستی‌آزمایی اطلاعات",
    li1_3: "نگهداری زیرساخت‌های فنی",
    li1_4: "اطمینان از دسترسی بلندمدت به آرشیو",
    p3: "حمایت شما کمک می‌کند تا اطمینان حاصل کنیم که این زندگی‌ها و داستان‌ها فراموش نمی‌شوند.",
    h2_2: "روش‌های حمایت",
    p4: "حمایت می‌تواند شامل موارد زیر باشد:",
    li2_1: "کمک‌های مالی",
    li2_2: "همکاری پژوهشی",
    li2_3: "مستندسازی تاریخی",
    li2_4: "کمک در امور آرشیوی",
    p5: "روش‌های آینده برای کمک مالی ممکن است شامل پرداخت‌های آنلاین یا مشارکت‌های نهادی باشد.",
    h2_3: "شفافیت",
    p6: "هرگونه حمایت دریافتی منحصراً برای نگهداری، گسترش و حفظ این آرشیو استفاده خواهد شد.",
    h2_4: "تماس با ما",
    p7: "برای سوالات مربوط به حمایت از آرشیو:",
  }
};

export default function DonatePage() {
  const [lang, setLang] = useState<"en" | "fa">("en");
  const t = translations[lang];

  // This links directly to your live Ko-fi page
  const kofiUrl = "https://ko-fi.com/atlasofiran";

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-16 text-white relative" dir={t.dir}>
      
      {/* Language Toggle */}
      <div className={`absolute top-6 ${lang === 'fa' ? 'left-6 md:left-12' : 'right-6 md:right-12'}`}>
        <button
          onClick={() => setLang(lang === "en" ? "fa" : "en")}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition hover:text-white hover:bg-white/10"
        >
          {t.toggleBtn}
        </button>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
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
          <p className="font-semibold text-zinc-200 mt-8">{t.h2_1}</p>
          <p>{t.p1}</p>

          {/* --- KO-FI BUTTON START --- */}
          <div className="py-6">
            <a 
              href={kofiUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Ko-fi Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.724c-.304 0-.551.247-.551.551v15.846c0 .304.247.551.551.551h14.331c4.545 0 8.328-3.783 8.328-8.328 0 0 .237-2.126-.402-4.027z" fill="#FF5E5B"/>
                <path d="M11.838 7.337c-1.444-1.63-3.83-1.63-5.274 0-1.332 1.503-1.332 3.939 0 5.442l2.637 2.977 2.637-2.977c1.332-1.503 1.332-3.939 0-5.442z" fill="#fff"/>
              </svg>
              <span>{t.donateBtn}</span>
            </a>
          </div>
          {/* --- KO-FI BUTTON END --- */}

          <p>{t.p2}</p>
          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li1_1}</li>
            <li>{t.li1_2}</li>
            <li>{t.li1_3}</li>
            <li>{t.li1_4}</li>
          </ul>
          <p>{t.p3}</p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_2}</p>
          <p>{t.p4}</p>
          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li2_1}</li>
            <li>{t.li2_2}</li>
            <li>{t.li2_3}</li>
            <li>{t.li2_4}</li>
          </ul>
          <p>{t.p5}</p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_3}</p>
          <p>{t.p6}</p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_4}</p>
          <p>{t.p7}</p>
          <p className={`font-medium text-white ${lang === 'fa' ? 'text-left' : ''}`} dir="ltr">
            contact@atlasofiran.org
          </p>
        </div>
      </div>
    </div>
  );
}