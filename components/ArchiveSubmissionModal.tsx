"use client";

import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: "missing" | "correction";
};

// A mini-dictionary for our two languages
const translations = {
  en: {
    missingTitle: "Submit a missing record",
    correctionTitle: "Suggest a correction",
    missingDesc: "Use this form to share information about someone who may be missing from the archive. Please enter text in Persian if possible.",
    correctionDesc: "Use this form to suggest a city or province correction for an unmatched case. Please enter text in Persian if possible.",
    fullName: "Full Name",
    age: "Age",
    occupation: "Occupation",
    city: "City",
    province: "Province",
    date: "Date of Death / Incident",
    notes: "Notes / Context",
    email: "Your Email",
    disclaimer: "Submissions are reviewed manually before anything is added or corrected in the archive.",
    send: "Send",
    sending: "Sending...",
    successTitle: "Thank you",
    successText: "Your submission has been securely sent to the archive team for manual review.",
    closeBtn: "Close Window",
    toggleBtn: "فارسی",
    dir: "ltr",
  },
  fa: {
    missingTitle: "ثبت فرد از قلم افتاده",
    correctionTitle: "پیشنهاد اصلاح اطلاعات",
    missingDesc: "از این فرم برای ارسال اطلاعات فردی که ممکن است در آرشیو نباشد استفاده کنید. لطفاً اطلاعات را به زبان فارسی وارد کنید.",
    correctionDesc: "از این فرم برای پیشنهاد اصلاح شهر یا استان استفاده کنید. لطفاً اطلاعات را به زبان فارسی وارد کنید.",
    fullName: "نام و نام خانوادگی",
    age: "سن",
    occupation: "شغل",
    city: "شهر",
    province: "استان",
    date: "تاریخ فوت / واقعه",
    notes: "سایر جزئیات / توضیحات",
    email: "ایمیل شما",
    disclaimer: "تمامی اطلاعات پیش از ثبت در آرشیو، توسط تیم ما بررسی می‌شوند.",
    send: "ارسال",
    sending: "در حال ارسال...",
    successTitle: "سپاسگزاریم",
    successText: "اطلاعات شما با موفقیت برای تیم آرشیو ارسال شد و پس از بررسی اضافه خواهد شد.",
    closeBtn: "بستن پنجره",
    toggleBtn: "ENG",
    dir: "rtl",
  },
};

export default function ArchiveSubmissionModal({ isOpen, onClose, mode }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lang, setLang] = useState<"en" | "fa">("fa"); // Default to Farsi

  const t = translations[lang];

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      setIsSuccess(false);
      setIsSubmitting(false);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert(lang === "en" ? "Something went wrong. Please try again." : "خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error(error);
      alert(lang === "en" ? "Network error. Please try again." : "خطای شبکه. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm" dir={t.dir}>
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0b0b0b] p-6 shadow-[0_0_60px_rgba(255,255,255,0.06)]">
        
        {/* Top Controls: Close & Language Toggle */}
        <div className={`absolute top-4 flex gap-2 ${lang === 'fa' ? 'left-4' : 'right-4'}`}>
          <button
            onClick={() => setLang(lang === "en" ? "fa" : "en")}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 transition hover:text-white"
          >
            {t.toggleBtn}
          </button>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-zinc-500 font-sans">
          Archive Submission
        </p>

        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white">
          {mode === "missing" ? t.missingTitle : t.correctionTitle}
        </h2>

        {isSuccess ? (
          <div className="py-12 text-center border border-green-500/20 bg-green-500/10 rounded-2xl">
            <h3 className="text-2xl font-semibold text-green-400 mb-2">{t.successTitle}</h3>
            <p className="text-zinc-400">{t.successText}</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              {t.closeBtn}
            </button>
          </div>
        ) : (
          <>
            <p className="mb-8 max-w-2xl text-zinc-400 leading-7">{mode === "missing" ? t.missingDesc : t.correctionDesc}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="submission_type" value={mode} />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">{t.fullName}</label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    dir="auto"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-300/30 focus:bg-white/10"
                  />
                </div>

                {/* NEW AGE FIELD */}
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">{t.age}</label>
                  <input
                    type="number"
                    name="age"
                    dir="auto"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-300/30 focus:bg-white/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">{t.city}</label>
                  <input
                    type="text"
                    name="city"
                    dir="auto"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-300/30 focus:bg-white/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">{t.province}</label>
                  <input
                    type="text"
                    name="province"
                    dir="auto"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-300/30 focus:bg-white/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">{t.occupation}</label>
                  <input
                    type="text"
                    name="occupation"
                    dir="auto"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-300/30 focus:bg-white/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">{t.date}</label>
                  <input
                    type="text"
                    name="date_of_death"
                    dir="auto"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-300/30 focus:bg-white/10"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-zinc-400">{t.notes}</label>
                  <textarea
                    name="notes"
                    rows={4}
                    dir="auto"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-300/30 focus:bg-white/10"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-zinc-400">{t.email}</label>
                  <input
                    type="email"
                    name="submitter_email"
                    dir="ltr"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-300/30 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse items-center justify-between gap-4 pt-3 md:flex-row">
                <p className="text-xs leading-6 text-zinc-500">{t.disclaimer}</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
                >
                  {isSubmitting ? t.sending : t.send}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}