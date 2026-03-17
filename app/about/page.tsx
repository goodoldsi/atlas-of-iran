"use client";

import { useState } from "react";
import Link from "next/link";

const translations = {
  en: {
    dir: "ltr",
    toggleBtn: "فارسی",
    backArrow: "←",
    backBtn: "Back to home",
    title: "About This Archive",
    p1_1: "Atlas of Iran",
    p1_2: " is an independent digital memorial archive dedicated to preserving the memory of individuals who lost their lives during Revolution2026 in Iran.",
    p2: "The project seeks to document names, ages, hometowns, and personal details of those who were killed while participating in or affected by protests calling for freedom, dignity, and basic human rights. By preserving these records, the archive aims to ensure that the lives behind the statistics remain visible in historical memory.",
    p3: "Each individual documented in the archive represents a life with aspirations, families, professions, and personal stories. The goal of this project is to restore that human dimension and protect these memories from disappearance or historical erasure.",
    
    h2_sources: "Sources and Documentation",
    p4: "Much of the information compiled in the archive is derived from publicly available reporting and documentation produced by journalists, researchers, and human-rights investigators.",
    p5_1: "One of the primary reference sources includes broadcasts by ",
    p5_2: "Morad Vaisi",
    p5_3: ", an Iranian journalist and political analyst who serves as Senior Iran Analyst at ",
    p5_4: "Iran International",
    p5_5: ".",
    p6_1: "In several public YouTube broadcasts, Vaisi has read and documented lists of individuals killed during Revolution2026 in Iran, identifying each person as a ",
    p6_2: "“child of Iran”",
    p6_3: " and presenting available information such as:",
    ul1_1: "Name",
    ul1_2: "Age",
    ul1_3: "Hometown",
    ul1_4: "Occupation",
    ul1_5: "Personal background",
    p7: "Atlas of Iran uses this and other publicly available documentation as reference material for historical archiving.",
    p8: "This project operates independently and is not affiliated with Iran International or with Morad Vaisi.",

    h2_purpose: "Purpose of the Project",
    p9: "The archive exists to serve several purposes:",
    ul2_1: "Preserving historical memory",
    ul2_2: "Supporting human-rights documentation",
    ul2_3: "Providing a structured historical record",
    ul2_4: "Ensuring that victims are remembered as individuals",
    p10: "By compiling these records in a single archive, the project aims to contribute to long-term historical documentation and collective remembrance.",

    h2_creator: "Project Creator",
    p11_1: "Atlas of Iran was conceived, designed, and developed by ",
    p11_2: "Sina Sadeghzadeh",
    p11_3: ".",
    p12: "Sina is a computational scientist and researcher who created this project as an independent initiative to preserve the memory of individuals who lost their lives during periods of political unrest in Iran.",
    p13: "The archive combines historical documentation with modern web technologies in order to create a permanent and accessible digital memorial.",
    p14: "The project’s design, development, and data curation were carried out independently with the goal of producing a respectful and reliable historical archive.",

    h2_ongoing: "Ongoing Development",
    p15: "Atlas of Iran is an evolving archive. Additional records, documentation, and contextual information may be added as new information becomes available.",
    p16: "Visitors are encouraged to contribute responsibly by submitting corrections, documentation, or memorial notes through the archive.",
  },
  fa: {
    dir: "rtl",
    toggleBtn: "ENG",
    backArrow: "→",
    backBtn: "بازگشت به صفحه اصلی",
    title: "درباره این آرشیو",
    p1_1: "اطلس ایران",
    p1_2: " یک آرشیو یادبود دیجیتال و مستقل است که با هدف حفظ یاد و نام افرادی که جان خود را در انقلاب ۲۰۲۶ ایران از دست داده‌اند، ایجاد شده است.",
    p2: "این پروژه به دنبال مستندسازی نام، سن، زادگاه و اطلاعات شخصی کسانی است که در جریان یا در حاشیه اعتراضاتی با هدف آزادی، کرامت و حقوق بنیادین بشر کشته شده‌اند. با حفظ این سوابق، این آرشیو تلاش می‌کند تا اطمینان حاصل کند که زندگی‌های پنهان در پس آمارها، در حافظه تاریخی نمایان و زنده باقی بمانند.",
    p3: "هر فرد مستند شده در این آرشیو نمایانگر یک زندگی با آرزوها، خانواده‌، حرفه‌ و داستان‌های شخصی است. هدف این پروژه بازیابی این بعد انسانی و محافظت از این خاطرات در برابر محو شدن یا فراموشی تاریخی است.",
    
    h2_sources: "منابع و مستندات",
    p4: "بخش عمده‌ای از اطلاعات گردآوری شده در این آرشیو از گزارش‌ها و مستندات عمومی تهیه شده توسط روزنامه‌نگاران، پژوهشگران و محققان حقوق بشر استخراج شده است.",
    p5_1: "یکی از منابع اصلی ارجاع، برنامه‌های ",
    p5_2: "مراد ویسی",
    p5_3: "، روزنامه‌نگار و تحلیل‌گر سیاسی ایرانی و تحلیل‌گر ارشد ایران در شبکه ",
    p5_4: "ایران اینترنشنال",
    p5_5: " است.",
    p6_1: "در چندین برنامه عمومی در یوتیوب، آقای ویسی فهرست‌هایی از افراد کشته شده در انقلاب ۲۰۲۶ ایران را خوانده و مستند کرده است و هر فرد را به عنوان ",
    p6_2: "«فرزند ایران»",
    p6_3: " معرفی کرده و اطلاعات موجود زیر را ارائه داده است:",
    ul1_1: "نام",
    ul1_2: "سن",
    ul1_3: "زادگاه / محل سکونت",
    ul1_4: "شغل",
    ul1_5: "پیشینه شخصی / سایر جزئیات",
    p7: "اطلس ایران از این منابع و سایر مستنداتِ در دسترسِ عموم به عنوان مرجعی برای آرشیو تاریخی استفاده می‌کند.",
    p8: "این پروژه به صورت کاملاً مستقل فعالیت می‌کند و هیچ‌گونه وابستگی سازمانی به شبکه ایران اینترنشنال یا آقای مراد ویسی ندارد.",

    h2_purpose: "اهداف پروژه",
    p9: "این آرشیو با چندین هدف ایجاد شده است:",
    ul2_1: "حفظ حافظه تاریخی",
    ul2_2: "حمایت از مستندسازی حقوق بشر",
    ul2_3: "ارائه یک سابقه تاریخی ساختاریافته و منسجم",
    ul2_4: "اطمینان از اینکه قربانیان به عنوان یک انسان (و نه صرفاً یک عدد) به یاد آورده می‌شوند",
    p10: "با گردآوری این سوابق در یک آرشیو واحد، این پروژه قصد دارد به مستندسازی تاریخی بلندمدت و یادبود جمعی کمک کند.",

    h2_creator: "سازنده پروژه",
    p11_1: "اطلس ایران توسط ",
    p11_2: "سینا صادق‌زاده",
    p11_3: " ایده‌پردازی، طراحی و توسعه یافته است.",
    p12: "سینا یک دانشمند محاسباتی و پژوهشگر است که این پروژه را به عنوان یک ابتکار مستقل برای حفظ یاد افرادی که جان خود را در دوران ناآرامی‌های سیاسی در ایران از دست داده‌اند، خلق کرده است.",
    p13: "این آرشیو مستندات تاریخی را با فناوری‌های نوین وب ترکیب می‌کند تا یک یادبود دیجیتال دائمی، امن و در دسترس ایجاد کند.",
    p14: "طراحی، توسعه و گردآوری داده‌های این پروژه به صورت کاملاً مستقل و با هدف ایجاد یک آرشیو تاریخی محترمانه و قابل اتکا انجام شده است.",

    h2_ongoing: "توسعه مستمر",
    p15: "اطلس ایران یک آرشیو در حال تکامل است. سوابق، مستندات و اطلاعات زمینه‌ای بیشتر ممکن است با در دسترس قرار گرفتن اطلاعات جدید و موثق به آن اضافه شوند.",
    p16: "از بازدیدکنندگان دعوت می‌شود تا با ارائه مسئولانه اصلاحات، مستندات یا یادداشت‌های یادبود از طریق فرم‌های موجود در آرشیو، در این پروژه مشارکت کنند.",
  }
};

export default function AboutPage() {
  const [lang, setLang] = useState<"en" | "fa">("en");
  const t = translations[lang];

  return (
    <main 
      className="min-h-screen bg-[#050505] text-white px-6 py-20 relative" 
      dir={t.dir}
    >
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
          className={`mb-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white ${lang === 'fa' ? 'flex-row-reverse self-start' : ''}`}
        >
          <span>{t.backArrow}</span>
          <span>{t.backBtn}</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-semibold mb-10 text-center">
          {t.title}
        </h1>

        <div className={`space-y-8 text-zinc-400 leading-8 text-base ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          <p>
            <strong>{t.p1_1}</strong>{t.p1_2}
          </p>

          <p>{t.p2}</p>
          <p>{t.p3}</p>

          <h2 className="text-2xl font-semibold text-zinc-200 mt-10">
            {t.h2_sources}
          </h2>

          <p>{t.p4}</p>

          <p>
            {t.p5_1}
            <strong>{t.p5_2}</strong>
            {t.p5_3}
            <strong>{t.p5_4}</strong>
            {t.p5_5}
          </p>

          <p>
            {t.p6_1}
            <em>{t.p6_2}</em>
            {t.p6_3}
          </p>

          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.ul1_1}</li>
            <li>{t.ul1_2}</li>
            <li>{t.ul1_3}</li>
            <li>{t.ul1_4}</li>
            <li>{t.ul1_5}</li>
          </ul>

          <p>{t.p7}</p>
          <p>{t.p8}</p>

          <h2 className="text-2xl font-semibold text-zinc-200 mt-10">
            {t.h2_purpose}
          </h2>

          <p>{t.p9}</p>

          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.ul2_1}</li>
            <li>{t.ul2_2}</li>
            <li>{t.ul2_3}</li>
            <li>{t.ul2_4}</li>
          </ul>

          <p>{t.p10}</p>

          <h2 className="text-2xl font-semibold text-zinc-200 mt-10">
            {t.h2_creator}
          </h2>

          <p>
            {t.p11_1}
            <strong>{t.p11_2}</strong>
            {t.p11_3}
          </p>

          <p>{t.p12}</p>
          <p>{t.p13}</p>
          <p>{t.p14}</p>

          <h2 className="text-2xl font-semibold text-zinc-200 mt-10">
            {t.h2_ongoing}
          </h2>

          <p>{t.p15}</p>
          <p>{t.p16}</p>

        </div>
      </div>
    </main>
  );
}