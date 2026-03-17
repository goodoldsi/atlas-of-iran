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
    title: "Contact",
    p1: "Atlas of Iran welcomes communication from researchers, journalists, and members of the public.",
    p2: "You may contact the archive regarding:",
    li1_1: "Corrections to documented records",
    li1_2: "Submission of additional documentation",
    li1_3: "Historical research inquiries",
    li1_4: "Media requests",
    li1_5: "Technical issues related to the archive",
    h2_1: "Email",
    h2_2: "Collaboration",
    p3: "Atlas of Iran welcomes collaboration with historians, researchers, journalists, and organizations working to document historical events and preserve collective memory.",
    h2_3: "Response Time",
    p4: "Because submissions are reviewed carefully, responses may take several days.",
  },
  fa: {
    dir: "rtl",
    toggleBtn: "ENG",
    backArrow: "→",
    backBtn: "بازگشت به صفحه اصلی",
    subtitle: "اطلس ایران",
    title: "تماس با ما",
    p1: "اطلس ایران از ارتباط با پژوهشگران، روزنامه‌نگاران و عموم مردم استقبال می‌کند.",
    p2: "شما می‌توانید در موارد زیر با آرشیو تماس بگیرید:",
    li1_1: "اصلاحات در سوابق مستند شده",
    li1_2: "ارسال مستندات تکمیلی",
    li1_3: "پرسش‌های مربوط به پژوهش‌های تاریخی",
    li1_4: "درخواست‌های رسانه‌ای",
    li1_5: "مشکلات فنی مربوط به آرشیو",
    h2_1: "ایمیل",
    h2_2: "همکاری",
    p3: "اطلس ایران از همکاری با مورخان، پژوهشگران، روزنامه‌نگاران و سازمان‌هایی که در زمینه مستندسازی رویدادهای تاریخی و حفظ حافظه جمعی فعالیت می‌کنند، استقبال می‌کند.",
    h2_3: "زمان پاسخگویی",
    p4: "از آنجا که پیام‌های ارسالی با دقت بررسی می‌شوند، پاسخگویی ممکن است چند روز زمان ببرد.",
  }
};

export default function ContactPage() {
  const [lang, setLang] = useState<"en" | "fa">("en");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-16 text-white relative" dir={t.dir}>
      
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
          <p>{t.p2}</p>
          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li1_1}</li>
            <li>{t.li1_2}</li>
            <li>{t.li1_3}</li>
            <li>{t.li1_4}</li>
            <li>{t.li1_5}</li>
          </ul>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_1}</p>
          <p className={`font-medium text-white ${lang === 'fa' ? 'text-left' : ''}`} dir="ltr">
            contact@atlasofiran.org
          </p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_2}</p>
          <p>{t.p3}</p>

          <p className="font-semibold text-zinc-200 mt-8">{t.h2_3}</p>
          <p>{t.p4}</p>

        </div>
      </div>
    </div>
  );
}