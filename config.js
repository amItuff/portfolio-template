/* ==========================================================================
   PORTFOLIO CONFIG  —  this is the ONLY file you need to edit.
   Save it and refresh the page. No build step, no install.

   Text fields accept either a plain string  "Hello"
   or one string per language               { en: "Hello", vi: "Xin chào" }
   ========================================================================== */
window.SITE = {

  /* ---------- Site / SEO ------------------------------------------------- */
  site: {
    url: "https://your-name.vercel.app",          // your final URL (used for share previews)
    title: "Alex Rivera — Portfolio",
    description: "Full-stack developer building fast, minimal and delightful web apps.",
    favicon: "assets/img/favicon.svg",            // any image path or URL
    shareImage: "assets/img/og-image.png",        // 1200x630, shown when you share the link
    themeColor: "#f3f0e8",
    language: "en",                               // default language: "en" or "vi"
    languages: ["en", "vi"],                      // remove one to hide the language switch
  },

  /* ---------- Look & feel -------------------------------------------------- */
  appearance: {
    /* THEME: "auto" follows the visitor's light/dark setting (paper + ink).
       Or pick one: "paper" "ink" "blueprint" "terminal" "mono" "rose"
       Add your own in assets/js/themes.js */
    theme: "auto",
    themeLight: "paper",                  // used by "auto"
    themeDark: "ink",                     // used by "auto"

    /* COLOURS: override any part of the theme. Remove the lines you do not need.
       keys: bg surface text muted line accent accentInk                           */
    colors: {
      // accent: "#ff5a1f",
      // bg: "#fffdf7",
    },

    displayFont: "serif",                 // headings: "serif" | "sans" | "mono"
    corners: "sharp",                     // "sharp" | "round"
    themePicker: true,                    // little palette button so you (and visitors) can try colours live

    /* BANNER / BACKGROUND: image, GIF or video (.mp4/.webm) path or URL.
       "" = clean solid colour with a faint dot grid.  Example: "assets/img/banner-sample.jpg" */
    background: "",
    backgroundDim: 0.6,                   // how strongly the theme colour covers your image: 0 … 1

    intro: true,                          // full-screen "enter" splash
    introKicker: { en: "Personal portfolio", vi: "Portfolio cá nhân" },
  },

  /* ---------- You --------------------------------------------------------- */
  profile: {
    name: "Alex Rivera",
    handle: "@alexrivera",
    avatar: "assets/img/avatar.svg",      // square image, 400x400 or larger
    tagline: { en: "Full-stack developer & designer", vi: "Lập trình viên & thiết kế" },
    location: "Ho Chi Minh City, VN",
    timezone: "Asia/Ho_Chi_Minh",         // shows a live local clock. "" = hide
    status: {                             // green "available" pill. show:false to hide
      show: true,
      text: { en: "Open to freelance", vi: "Nhận làm freelance" },
    },
    about: {
      en: "I build products end to end — from the pixel to the database. I care about speed, accessibility and details nobody notices until they are missing.",
      vi: "Mình làm sản phẩm từ A đến Z — từ từng pixel đến cơ sở dữ liệu. Mình quan tâm tốc độ, khả năng truy cập và những chi tiết nhỏ.",
    },
    email: "hello@example.com",           // "" = hide the email button
    cta: { label: { en: "Get in touch", vi: "Liên hệ" }, url: "mailto:hello@example.com" },
  },

  /* ---------- Social links ------------------------------------------------
     icon: github discord x linkedin facebook instagram youtube telegram tiktok
           spotify soundcloud twitch reddit medium codepen behance dribbble npm
           gitlab mastodon threads bluesky zalo stackoverflow buymeacoffee kofi
           patreon devdotto   (or "link" for a generic icon)                    */
  social: [
    { icon: "github",   label: "GitHub",   url: "https://github.com/your-username" },
    { icon: "x",        label: "X",        url: "https://x.com/your-username" },
    { icon: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/your-username" },
    { icon: "discord",  label: "Discord",  url: "https://discord.com/users/000000000000000000" },
  ],

  /* ---------- Projects ----------------------------------------------------- */
  projects: {
    title: { en: "Selected work", vi: "Dự án nổi bật" },
    items: [
      {
        title: "Orbit",
        description: { en: "Realtime analytics dashboard with sub-second queries.", vi: "Dashboard phân tích thời gian thực, truy vấn dưới một giây." },
        url: "https://github.com/your-username/orbit",
        tags: ["TypeScript", "ClickHouse", "React"],
        icon: "github",
      },
      {
        title: "Pocket CLI",
        description: { en: "A tiny command-line tool that tames your dotfiles.", vi: "Công cụ dòng lệnh nhỏ giúp quản lý dotfiles gọn gàng." },
        url: "https://github.com/your-username/pocket",
        tags: ["Rust", "CLI"],
        icon: "github",
      },
      {
        title: "Lumen UI",
        description: { en: "Accessible component library, 4 kB gzipped.", vi: "Thư viện component dễ truy cập, chỉ 4 kB gzip." },
        url: "https://your-username.github.io/lumen",
        tags: ["Design system", "CSS"],
        icon: "link",
      },
    ],
  },

  /* ---------- Skills (chips). Set to [] to hide. -------------------------- */
  skills: {
    title: { en: "Stack", vi: "Công nghệ" },
    items: ["TypeScript", "React", "Node.js", "Python", "PostgreSQL", "Docker", "Figma", "Rust"],
  },

  /* ---------- Live Discord status (free, via lanyard.rest) ---------------
     1. Join https://discord.gg/lanyard   2. Set userId to your Discord ID.   */
  discord: { enabled: false, userId: "000000000000000000" },

  /* ---------- Music player (optional) -------------------------------------
     Drop .mp3 files in assets/audio/ (or use direct URLs).                   */
  music: {
    enabled: false,
    autoplayOnEnter: true,   // starts when visitors click "Enter"
    volume: 0.6,
    tracks: [
      // { title: "Song name", artist: "Artist", src: "assets/audio/song.mp3", cover: "assets/img/avatar.svg" },
    ],
  },

  /* ---------- Footer ------------------------------------------------------ */
  footer: {
    text: { en: "Built with portfolio-template", vi: "Làm bằng portfolio-template" },
    showCredit: true,        // small link back to the template. Thank you ♥
  },
};
