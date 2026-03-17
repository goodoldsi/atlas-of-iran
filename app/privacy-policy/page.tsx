"use client";

import { useState } from "react";
import Link from "next/link";

const translations = {
  en: {
    dir: "ltr",
    toggleBtn: "فارسی",
    backArrow: "←",
    backBtn: "Back to home",
    title: "Privacy Policy",
    subtitle: "Atlas of Iran",
    lastUpdated: "Last updated: January 2026",
    intro: "Atlas of Iran is an independent memorial archive dedicated to preserving the memory of individuals who lost their lives during Revolution2026 in Iran. This Privacy Policy explains how information may be collected, used, and protected when visiting or interacting with the website.",
    h2_1: "Information We Collect",
    p_info: "Atlas of Iran collects only limited information necessary to operate the archive.",
    h2_2: "Voluntary Submissions",
    p_vol: "Visitors may voluntarily submit information through features such as:",
    li_vol1: "Memorial notes",
    li_vol2: "Correction requests",
    li_vol3: "Contact messages",
    li_vol4: "Documentation contributions",
    p_vol2: "Submitted information may include written text or contextual information related to individuals documented in the archive.",
    p_vol3: "Visitors should avoid submitting sensitive personal information unrelated to historical documentation.",
    h2_3: "Technical Information",
    p_tech: "Like most websites, Atlas of Iran may automatically collect limited technical data including:",
    li_tech1: "Browser type",
    li_tech2: "Device type",
    li_tech3: "Approximate geographic region",
    li_tech4: "Anonymous usage statistics",
    p_tech2: "This information helps improve site performance and security.",
    p_tech3_1: "Atlas of Iran ",
    p_tech3_strong: "does not sell or commercially distribute personal data.",
  },
  fa: {
    dir: "rtl",
    toggleBtn: "ENG",
    backArrow: "→",
    backBtn: "بازگشت به صفحه اصلی",
    title: "سیاست حریم خصوصی",
    subtitle: "اطلس ایران",
    lastUpdated: "آخرین به‌روزرسانی: ژانویه ۲۰۲۶",
    intro: "اطلس ایران یک آرشیو یادبود مستقل است که به حفظ یاد افرادی که جان خود را در انقلاب ۲۰۲۶ ایران از دست داده‌اند، اختصاص دارد. این سیاست حریم خصوصی توضیح می‌دهد که هنگام بازدید یا تعامل با این وب‌سایت، چگونه اطلاعات ممکن است جمع‌آوری، استفاده و محافظت شوند.",
    h2_1: "اطلاعاتی که ما جمع‌آوری می‌کنیم",
    p_info: "اطلس ایران تنها اطلاعات محدودی را که برای مدیریت و فعالیت آرشیو ضروری است، جمع‌آوری می‌کند.",
    h2_2: "اطلاعات ارسالی داوطلبانه",
    p_vol: "بازدیدکنندگان می‌توانند به صورت داوطلبانه از طریق امکانات زیر اطلاعاتی را ارسال کنند:",
    li_vol1: "یادداشت‌های یادبود",
    li_vol2: "درخواست‌های اصلاح اطلاعات",
    li_vol3: "پیام‌های ارتباطی",
    li_vol4: "ارسال مستندات",
    p_vol2: "اطلاعات ارسال شده ممکن است شامل متن‌های نوشته شده یا اطلاعات زمینه‌ای مرتبط با افراد مستند شده در آرشیو باشد.",
    p_vol3: "بازدیدکنندگان باید از ارسال اطلاعات حساس شخصی که ارتباطی با مستندسازی تاریخی ندارند، خودداری کنند.",
    h2_3: "اطلاعات فنی",
    p_tech: "مانند بیشتر وب‌سایت‌ها، اطلس ایران ممکن است به طور خودکار داده‌های فنی محدودی را جمع‌آوری کند، از جمله:",
    li_tech1: "نوع مرورگر",
    li_tech2: "نوع دستگاه",
    li_tech3: "منطقه جغرافیایی تقریبی",
    li_tech4: "آمار استفاده ناشناس",
    p_tech2: "این اطلاعات به بهبود عملکرد و امنیت سایت کمک می‌کند.",
    p_tech3_1: "اطلس ایران ",
    p_tech3_strong: "داده‌های شخصی را نمی‌فروشد و به صورت تجاری توزیع نمی‌کند.",
  }
};

export default function PrivacyPolicyPage() {
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
          <p>
            <strong>{t.lastUpdated}</strong>
          </p>

          <p>{t.intro}</p>

          <p className="font-semibold text-white mt-8">
            {t.h2_1}
          </p>

          <p>{t.p_info}</p>

          <p className="font-semibold text-white mt-8">
            {t.h2_2}
          </p>

          <p>{t.p_vol}</p>

          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li_vol1}</li>
            <li>{t.li_vol2}</li>
            <li>{t.li_vol3}</li>
            <li>{t.li_vol4}</li>
          </ul>

          <p>{t.p_vol2}</p>
          <p>{t.p_vol3}</p>

          <p className="font-semibold text-white mt-8">
            {t.h2_3}
          </p>

          <p>{t.p_tech}</p>

          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li_tech1}</li>
            <li>{t.li_tech2}</li>
            <li>{t.li_tech3}</li>
            <li>{t.li_tech4}</li>
          </ul>

          <p>{t.p_tech2}</p>

          <p>
            {t.p_tech3_1}
            <strong>{t.p_tech3_strong}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}