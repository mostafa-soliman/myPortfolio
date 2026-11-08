/**
 * Project catalogue. Descriptions are copied verbatim from the approved
 * copy deck; roles and periods come straight from the CV — do not invent
 * new facts here.
 *
 * images  : published WebP files (see readme → "Converting the screenshots")
 * links   : a control only renders when its value is a non-empty string
 * blur    : true keeps the screenshots softened until the client approves
 */
export const projects = [
  {
    id: "flod",
    title: "FLOD",
    role: "React Native Developer",
    description: {
      en: "Restaurant subscription app for the Saudi market: plan selection, branches, payment summary, confirmation and subscription freezing.",
      ar: "تطبيق اشتراكات مطاعم للسوق السعودي: اختيار الباقة والفرع وملخص الدفع والتأكيد وتجميد الاشتراك.",
    },
    tech: ["React Native", "Expo", "TypeScript"],
    period: "Nov 2025 — Present",
    status: "live",
    images: [
      "assets/projects/flod-1.webp",
      "assets/projects/flod-2.webp",
      "assets/projects/flod-3.webp",
    ],
    links: {
      appStore: "https://apps.apple.com/sa/app/flod/id6754557459",
      playStore:
        "https://play.google.com/store/apps/details?id=com.fodek.flod",
      site: "",
      repo: "",
    },
    blur: false,
  },

  {
    id: "macrohub",
    title: "MacroHub",
    role: "React Native Developer",
    description: {
      en: "Production cross-platform app for the Saudi market, built with Fodek.",
      ar: "تطبيق cross-platform للسوق السعودي، تم تنفيذه ضمن فريق Fodek.",
    },
    tech: ["React Native", "Expo", "TypeScript"],
    period: "Nov 2025 — Present",
    status: "",
    images: [],
    links: { appStore: "", playStore: "", site: "", repo: "" },
    blur: false,
  },

  {
    id: "tams",
    title: "TAMS",
    role: "",
    description: {
      en: "Service request management app: request creation, details, status tracking, API integration and location features.",
      ar: "تطبيق إدارة طلبات الخدمة: إنشاء الطلبات والتفاصيل وتتبع الحالة وتكامل API وخصائص الموقع.",
    },
    tech: ["React Native", "Expo", "TypeScript"],
    period: "",
    status: "dev",
    images: [
      "assets/projects/tams-1.webp",
      "assets/projects/tams-2.webp",
      "assets/projects/tams-3.webp",
      "assets/projects/tams-4.webp",
      "assets/projects/tams-5.webp",
      "assets/projects/tams-6.webp",
    ],
    links: { appStore: "", playStore: "", site: "", repo: "" },
    blur: true,
  },

  {
    id: "mini-market",
    title: "Mini Market",
    role: "Android Developer",
    description: {
      en: "E-commerce Android app where users create stores, manage inventory and track sales.",
      ar: "تطبيق متجر Android لإنشاء المتاجر وإدارة المخزون وتتبع المبيعات.",
    },
    tech: ["Kotlin", "MVVM", "Retrofit"],
    period: "Jan 2024 — Nov 2024",
    status: "",
    images: [
      "assets/projects/mini-1.webp",
      "assets/projects/mini-2.webp",
      "assets/projects/mini-3.webp",
      "assets/projects/mini-4.webp",
      "assets/projects/mini-5.webp",
      "assets/projects/mini-6.webp",
      "assets/projects/mini-7.webp",
    ],
    links: { appStore: "", playStore: "", site: "", repo: "" },
    blur: false,
  },

  {
    id: "hajjij",
    title: "Hajjij",
    role: "Android Developer",
    description: {
      en: "Hajj educational app with learning material, multimedia content and quizzes.",
      ar: "تطبيق تعليمي عن الحج بمواد تعليمية ووسائط واختبارات.",
    },
    tech: ["Kotlin", "MVVM", "Retrofit"],
    period: "Apr 2024 — Sep 2024",
    status: "live",
    images: [
      "assets/projects/hajjij-1.webp",
      "assets/projects/hajjij-2.webp",
      "assets/projects/hajjij-3.webp",
      "assets/projects/hajjij-4.webp",
    ],
    links: {
      appStore: "",
      playStore:
        "https://play.google.com/store/apps/details?id=com.boniantech.hajij",
      site: "",
      repo: "",
    },
    blur: false,
  },

  {
    id: "prophets-call",
    title: "Prophets Call",
    role: "Frontend Developer",
    description: {
      en: "Enhanced and debugged the front-end of a religious content website with a responsive UI.",
      ar: "تحسين وإصلاح الـ front-end لموقع دعوة الأنبياء مع واجهة responsive.",
    },
    tech: ["HTML", "CSS", "AngularJS"],
    period: "Oct 2023 — Dec 2023",
    status: "web",
    images: [],
    links: {
      appStore: "",
      playStore: "",
      site: "https://callprophets.com/",
      repo: "",
    },
    blur: false,
  },
];

/** Link key → i18n key used for the button label. */
export const LINK_LABELS = {
  appStore: "store",
  playStore: "play",
  site: "site",
  repo: "repo",
};
