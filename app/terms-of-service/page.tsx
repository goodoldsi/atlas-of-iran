"use client";

import { useState } from "react";
import Link from "next/link";

const translations = {
  en: {
    dir: "ltr",
    toggleBtn: "فارسی",
    backArrow: "←",
    backBtn: "Back to home",
    title: "Terms of Service",
    subtitle: "Atlas of Iran",
    lastUpdated: "Last updated: January 2026",
    intro: "By accessing or using Atlas of Iran, you agree to the following Terms of Service.",
    
    h2_1: "Purpose of the Archive",
    p_purp1: "Atlas of Iran is a memorial and historical documentation project that records individuals who lost their lives during Revolution2026 in Iran.",
    p_purp2: "The archive seeks to preserve memory, support historical documentation, and make publicly available information that has been reported by journalists, human-rights researchers, and documented public sources.",
    
    h2_2: "Sources of Information",
    p_src1_1: "Many of the documented names and personal details in the archive originate from publicly available reporting, including broadcasts by Iranian journalist ",
    p_src1_strong1: "Morad Vaisi",
    p_src1_2: ", Senior Iran Analyst at ",
    p_src1_strong2: "Iran International",
    p_src1_3: ".",
    p_src2: "In his YouTube broadcasts and reporting, Vaisi has compiled and read lists of individuals killed during Revolution2026 in Iran, identifying each person as a \"child of Iran\" and providing available information such as:",
    li_src1: "Name",
    li_src2: "Age",
    li_src3: "Hometown",
    li_src4: "Occupation",
    li_src5: "Personal background",
    p_src3: "Atlas of Iran uses this and other publicly available documentation as reference material for historical archiving.",
    p_src4_1: "Atlas of Iran operates independently and is ",
    p_src4_strong: "not affiliated",
    p_src4_2: " with Iran International or with Morad Vaisi.",

    h2_3: "Acceptable Use",
    p_acc1: "Visitors agree to use the archive respectfully.",
    p_acc2: "Users must not:",
    li_acc1: "Submit false or misleading information",
    li_acc2: "Publish abusive or hateful content",
    li_acc3: "Attempt to disrupt the website or its data",
    li_acc4: "Use automated tools to spam submissions",

    h2_4: "User Contributions",
    p_con1: "Visitors may submit:",
    li_con1: "Memorial notes",
    li_con2: "Historical corrections",
    li_con3: "Additional documentation",
    p_con2: "By submitting information, users grant Atlas of Iran permission to review, store, and display the content within the archive.",
    p_con3: "All submissions are subject to moderation.",

    h2_5: "Accuracy and Historical Context",
    p_accu1: "Atlas of Iran aims to document events as accurately as possible based on available public reporting.",
    p_accu2: "Because information about historical events can evolve, some records may later be updated or expanded.",
    p_accu3_1: "The archive does ",
    p_accu3_strong: "not guarantee",
    p_accu3_2: " that all entries are complete or final.",

    h2_6: "Intellectual and Educational Use",
    p_edu1: "The archive is intended for:",
    li_edu1: "Historical documentation",
    li_edu2: "Education",
    li_edu3: "Public memory",
    li_edu4: "Research",
    p_edu2: "Use of archive material for scholarly or journalistic purposes is generally permitted with proper attribution.",
    p_edu3: "Commercial reuse of the archive without permission is prohibited.",

    h2_7: "Limitation of Liability",
    p_liab: "Atlas of Iran provides historical information for educational and memorial purposes. The archive is not responsible for how third parties interpret or use the information presented.",

    h2_8: "Changes to Terms",
    p_chg1: "These Terms of Service may be updated as the archive evolves.",
    p_chg2: "Continued use of the site constitutes acceptance of any updated terms.",
  },
  fa: {
    dir: "rtl",
    toggleBtn: "ENG",
    backArrow: "→",
    backBtn: "بازگشت به صفحه اصلی",
    title: "شرایط استفاده",
    subtitle: "اطلس ایران",
    lastUpdated: "آخرین به‌روزرسانی: ژانویه ۲۰۲۶",
    intro: "با دسترسی یا استفاده از اطلس ایران، شما با شرایط استفاده زیر موافقت می‌کنید.",
    
    h2_1: "هدف آرشیو",
    p_purp1: "اطلس ایران یک پروژه یادبود و مستندسازی تاریخی است که افراد کشته شده در انقلاب ۲۰۲۶ در ایران را ثبت می‌کند.",
    p_purp2: "این آرشیو به دنبال حفظ حافظه جمعی، حمایت از مستندسازی تاریخی و در دسترس قرار دادن اطلاعاتی است که توسط روزنامه‌نگاران، پژوهشگران حقوق بشر و منابع عمومی مستند گزارش شده‌اند.",
    
    h2_2: "منابع اطلاعاتی",
    p_src1_1: "بسیاری از نام‌ها و جزئیات شخصی مستند شده در این آرشیو برگرفته از گزارش‌های عمومی است، از جمله برنامه‌های روزنامه‌نگار ایرانی ",
    p_src1_strong1: "مراد ویسی",
    p_src1_2: "، تحلیل‌گر ارشد ایران در شبکه ",
    p_src1_strong2: "ایران اینترنشنال",
    p_src1_3: ".",
    p_src2: "آقای ویسی در برنامه‌های یوتیوب و گزارش‌های خود، فهرست‌هایی از افراد کشته شده در انقلاب ۲۰۲۶ ایران را گردآوری و قرائت کرده و هر فرد را به عنوان «فرزند ایران» معرفی کرده و اطلاعات زیر را ارائه داده است:",
    li_src1: "نام",
    li_src2: "سن",
    li_src3: "زادگاه / محل سکونت",
    li_src4: "شغل",
    li_src5: "پیشینه شخصی",
    p_src3: "اطلس ایران از این منابع و سایر مستنداتِ در دسترسِ عموم به عنوان مرجعی برای آرشیو تاریخی استفاده می‌کند.",
    p_src4_1: "اطلس ایران به صورت کاملاً مستقل فعالیت می‌کند و ",
    p_src4_strong: "هیچ‌گونه وابستگی",
    p_src4_2: " سازمانی به شبکه ایران اینترنشنال یا آقای مراد ویسی ندارد.",

    h2_3: "استفاده مجاز",
    p_acc1: "بازدیدکنندگان موافقت می‌کنند که از آرشیو با احترام استفاده کنند.",
    p_acc2: "کاربران نباید کارهای زیر را انجام دهند:",
    li_acc1: "ارسال اطلاعات نادرست یا گمراه‌کننده",
    li_acc2: "انتشار محتوای توهین‌آمیز یا نفرت‌پراکن",
    li_acc3: "تلاش برای اختلال در وب‌سایت یا داده‌های آن",
    li_acc4: "استفاده از ابزارهای خودکار برای ارسال هرزنامه",

    h2_4: "مشارکت کاربران",
    p_con1: "بازدیدکنندگان می‌توانند موارد زیر را ارسال کنند:",
    li_con1: "یادداشت‌های یادبود",
    li_con2: "اصلاحات تاریخی",
    li_con3: "مستندات تکمیلی",
    p_con2: "با ارسال اطلاعات، کاربران به اطلس ایران اجازه می‌دهند تا محتوا را بررسی، ذخیره و در آرشیو نمایش دهد.",
    p_con3: "تمام اطلاعات ارسالی پیش از انتشار بررسی می‌شوند.",

    h2_5: "دقت و زمینه تاریخی",
    p_accu1: "اطلس ایران تلاش می‌کند رویدادها را تا حد امکان بر اساس گزارش‌های عمومیِ موجود با دقت مستند کند.",
    p_accu2: "از آنجا که اطلاعات مربوط به رویدادهای تاریخی ممکن است تکامل یابند، برخی از سوابق ممکن است بعداً به‌روزرسانی یا تکمیل شوند.",
    p_accu3_1: "این آرشیو ",
    p_accu3_strong: "تضمین نمی‌کند",
    p_accu3_2: " که تمام ورودی‌ها کامل یا نهایی باشند.",

    h2_6: "استفاده علمی و آموزشی",
    p_edu1: "این آرشیو برای اهداف زیر ایجاد شده است:",
    li_edu1: "مستندسازی تاریخی",
    li_edu2: "آموزش",
    li_edu3: "حافظه جمعی",
    li_edu4: "پژوهش",
    p_edu2: "استفاده از مطالب آرشیو برای مقاصد علمی یا روزنامه‌نگاری به طور کلی با ذکر منبع مجاز است.",
    p_edu3: "استفاده تجاری از محتوای آرشیو بدون اجازه ممنوع است.",

    h2_7: "مسئولیت‌ها",
    p_liab: "اطلس ایران اطلاعات تاریخی را برای مقاصد آموزشی و یادبود ارائه می‌دهد. این آرشیو مسئولیتی در قبال نحوه تفسیر یا استفاده اشخاص ثالث از اطلاعات ارائه شده ندارد.",

    h2_8: "تغییرات در شرایط",
    p_chg1: "این شرایط استفاده ممکن است همزمان با تکامل آرشیو به‌روزرسانی شود.",
    p_chg2: "استفاده مستمر از سایت به منزله پذیرش شرایط به‌روزرسانی شده است.",
  }
};

export default function TermsOfServicePage() {
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

          <p className="font-semibold text-zinc-200 mt-8">
            {t.h2_1}
          </p>
          <p>{t.p_purp1}</p>
          <p>{t.p_purp2}</p>

          <p className="font-semibold text-zinc-200 mt-8">
            {t.h2_2}
          </p>
          <p>
            {t.p_src1_1}<strong>{t.p_src1_strong1}</strong>{t.p_src1_2}<strong>{t.p_src1_strong2}</strong>{t.p_src1_3}
          </p>
          <p>{t.p_src2}</p>
          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li_src1}</li>
            <li>{t.li_src2}</li>
            <li>{t.li_src3}</li>
            <li>{t.li_src4}</li>
            <li>{t.li_src5}</li>
          </ul>
          <p>{t.p_src3}</p>
          <p>
            {t.p_src4_1}<strong>{t.p_src4_strong}</strong>{t.p_src4_2}
          </p>

          <p className="font-semibold text-zinc-200 mt-8">
            {t.h2_3}
          </p>
          <p>{t.p_acc1}</p>
          <p>{t.p_acc2}</p>
          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li_acc1}</li>
            <li>{t.li_acc2}</li>
            <li>{t.li_acc3}</li>
            <li>{t.li_acc4}</li>
          </ul>

          <p className="font-semibold text-zinc-200 mt-8">
            {t.h2_4}
          </p>
          <p>{t.p_con1}</p>
          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li_con1}</li>
            <li>{t.li_con2}</li>
            <li>{t.li_con3}</li>
          </ul>
          <p>{t.p_con2}</p>
          <p>{t.p_con3}</p>

          <p className="font-semibold text-zinc-200 mt-8">
            {t.h2_5}
          </p>
          <p>{t.p_accu1}</p>
          <p>{t.p_accu2}</p>
          <p>
            {t.p_accu3_1}<strong>{t.p_accu3_strong}</strong>{t.p_accu3_2}
          </p>

          <p className="font-semibold text-zinc-200 mt-8">
            {t.h2_6}
          </p>
          <p>{t.p_edu1}</p>
          <ul className={`list-disc space-y-1 ${lang === 'fa' ? 'pr-6' : 'pl-6'}`}>
            <li>{t.li_edu1}</li>
            <li>{t.li_edu2}</li>
            <li>{t.li_edu3}</li>
            <li>{t.li_edu4}</li>
          </ul>
          <p>{t.p_edu2}</p>
          <p>{t.p_edu3}</p>

          <p className="font-semibold text-zinc-200 mt-8">
            {t.h2_7}
          </p>
          <p>{t.p_liab}</p>

          <p className="font-semibold text-zinc-200 mt-8">
            {t.h2_8}
          </p>
          <p>{t.p_chg1}</p>
          <p>{t.p_chg2}</p>

        </div>
      </div>
    </div>
  );
}