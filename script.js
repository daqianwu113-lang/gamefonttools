const textInput = document.querySelector("#text-input");
const clearInput = document.querySelector("#clear-input");
const modeSelect = document.querySelector("#mode-select");
const fontSelect = document.querySelector("#font-select");
const languageSelect = document.querySelector("#language-select");
const fontResults = document.querySelector("#font-results");
const styleCount = document.querySelector("#style-count");
const fontPicker = document.querySelector("#font-picker");
const studioFontName = document.querySelector("#studio-font-name");
const studioPreviewText = document.querySelector("#studio-preview-text");
const codeOutput = document.querySelector("#code-output");
const copyCodeButton = document.querySelector("#copy-code");

const supportedLocales = ["en", "zh-CN"];

const messages = {
  en: {
    meta: {
      title: "Roblox Fonts Generator - Copy Text & Studio Font Code",
      description:
        "Create Roblox-style text, copy fancy fonts, preview Roblox Studio fonts, and generate Lua or rich text code for game UI.",
    },
    brand: {
      name: "Roblox Fonts",
      tagline: "Text and Studio code",
      homeLabel: "Roblox Fonts Generator home",
    },
    nav: {
      aria: "Primary",
      generator: "Generator",
      studio: "Studio Fonts",
      guide: "Font Guide",
      faq: "FAQ",
    },
    language: {
      label: "Language",
    },
    sidebar: {
      focusLabel: "MVP focus",
      focusTitle: "Copy-paste + Studio helper",
      focusBody:
        "Unicode styles are for bios and display text. Studio fonts generate usable Roblox UI code.",
    },
    hero: {
      eyebrow: "Roblox fonts generator",
      title: "Create Roblox-style text and Studio font code",
      body:
        "Type once, copy fancy text for Roblox bios or generate Lua snippets for TextLabel, TextButton, and rich text UI.",
      examplesLabel: "Quick examples",
    },
    tool: {
      aria: "Roblox fonts input",
      inputLabel: "Enter your Roblox text",
      clear: "Clear",
      resultType: "Result type",
      studioFont: "Studio font",
    },
    filters: {
      all: "All styles",
      safe: "More compatible",
      display: "Display names and bios",
    },
    tabs: {
      all: "All",
      safe: "Compatible",
      display: "Display",
    },
    results: {
      aria: "Generated output",
      eyebrow: "Copy-paste text",
      title: "Fancy Roblox text",
      filtersLabel: "Result filters",
    },
    studio: {
      eyebrow: "Roblox Studio",
      title: "Font preview and Lua code",
      copyCode: "Copy code",
      selectedFont: "Selected font",
      fontOptionsLabel: "Roblox Studio font options",
      richText: "Rich text",
    },
    guide: {
      eyebrow: "What are Roblox fonts?",
      title: "Roblox fonts can mean three different things",
      copyPaste:
        "Copy-paste Roblox fonts are usually Unicode characters that look styled. They can work in bios, profile text, and some display surfaces, but they are not real font files.",
      studio:
        "Roblox Studio fonts are the families available to UI objects like TextLabel, TextButton, and TextBox. Use FontFace or rich text tags when building game UI.",
      brand:
        "The Roblox brand and logo style is a separate topic. This MVP avoids font downloads and focuses on text generation plus Studio-safe code.",
    },
    seo: {
      eyebrow: "Page strategy",
      title: "SEO pages this MVP supports",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common Roblox font questions",
      username: {
        q: "Can I use these fonts in my Roblox username?",
        a: "Some Unicode characters may not be accepted in usernames. Use them mainly for bios, display text, group descriptions, or content outside strict username fields.",
      },
      work: {
        q: "Why do some Roblox fonts not work?",
        a: "Copy-paste styles depend on Unicode support and Roblox field rules. Studio fonts are more predictable because they use official UI font families.",
      },
      studio: {
        q: "How do I change fonts in Roblox Studio?",
        a: "Select a UI object such as TextLabel, then set FontFace in properties or paste the generated Lua code into a LocalScript.",
      },
      official: {
        q: "Are these official Roblox fonts?",
        a: "The Studio font list mirrors common Roblox UI font names. Fancy copy-paste styles are Unicode transformations and are not official Roblox font files.",
      },
    },
    footer: {
      disclaimer:
        "This site is not affiliated with Roblox Corporation. Roblox is a trademark of Roblox Corporation.",
    },
    styles: {
      count: "{count} styles",
      copy: "Copy",
      safeTag: "More compatible",
      displayTag: "Display style",
      fallbackText: "Roblox Text",
      copied: "Font text copied.",
      codeCopied: "Studio code copied.",
      bold: { name: "Bold Roblox Text", note: "Good for bios" },
      italic: { name: "Italic Display Text", note: "Best for display text" },
      boldItalic: { name: "Bold Italic Text", note: "Great for titles" },
      monospace: { name: "Monospace Code Style", note: "Clean and readable" },
      double: { name: "Double Struck", note: "May not work everywhere" },
      bubble: { name: "Bubble Text", note: "Fun for bios" },
      square: { name: "Square Text", note: "Strong game pass look" },
      smallCaps: { name: "Small Caps", note: "Readable style" },
      spaced: { name: "Spaced Text", note: "Most compatible" },
      bracketed: { name: "Bracketed Tag", note: "Group or game title" },
    },
  },
  "zh-CN": {
    meta: {
      title: "Roblox 字体生成器 - 复制花体字与 Studio 字体代码",
      description:
        "生成 Roblox 风格文字，复制花体字，预览 Roblox Studio 字体，并生成 Lua 或富文本 UI 代码。",
    },
    brand: {
      name: "Roblox Fonts",
      tagline: "文字与 Studio 代码",
      homeLabel: "Roblox 字体生成器首页",
    },
    nav: {
      aria: "主导航",
      generator: "生成器",
      studio: "Studio 字体",
      guide: "字体指南",
      faq: "常见问题",
    },
    language: {
      label: "语言",
    },
    sidebar: {
      focusLabel: "MVP 重点",
      focusTitle: "复制花体字 + Studio 助手",
      focusBody: "Unicode 样式适合简介和展示文本。Studio 字体会生成可用于 Roblox UI 的代码。",
    },
    hero: {
      eyebrow: "Roblox 字体生成器",
      title: "生成 Roblox 风格文字和 Studio 字体代码",
      body:
        "输入一次文本，即可复制 Roblox 简介花体字，或为 TextLabel、TextButton 和富文本 UI 生成 Lua 代码。",
      examplesLabel: "快速示例",
    },
    tool: {
      aria: "Roblox 字体输入",
      inputLabel: "输入你的 Roblox 文本",
      clear: "清空",
      resultType: "结果类型",
      studioFont: "Studio 字体",
    },
    filters: {
      all: "全部样式",
      safe: "兼容性更好",
      display: "展示名和简介",
    },
    tabs: {
      all: "全部",
      safe: "兼容",
      display: "展示",
    },
    results: {
      aria: "生成结果",
      eyebrow: "复制粘贴文字",
      title: "Roblox 花体字",
      filtersLabel: "结果筛选",
    },
    studio: {
      eyebrow: "Roblox Studio",
      title: "字体预览和 Lua 代码",
      copyCode: "复制代码",
      selectedFont: "已选字体",
      fontOptionsLabel: "Roblox Studio 字体选项",
      richText: "富文本",
    },
    guide: {
      eyebrow: "什么是 Roblox fonts？",
      title: "Roblox fonts 通常包含三类需求",
      copyPaste:
        "可复制的 Roblox 字体通常是看起来像字体的 Unicode 字符。它们可用于简介、资料文本和部分展示场景，但不是字体文件。",
      studio:
        "Roblox Studio 字体是 TextLabel、TextButton、TextBox 等 UI 对象可用的字体家族。制作游戏 UI 时可以使用 FontFace 或富文本标签。",
      brand:
        "Roblox 品牌和 Logo 字形是另一类问题。这个 MVP 不提供字体下载，而是聚焦文字生成和 Studio 可用代码。",
    },
    seo: {
      eyebrow: "页面策略",
      title: "这个 MVP 支持的 SEO 页面",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Roblox 字体常见问题",
      username: {
        q: "这些字体能用在 Roblox 用户名里吗？",
        a: "部分 Unicode 字符可能无法通过用户名规则。建议主要用于简介、展示文本、群组描述，或不严格限制字符的内容区域。",
      },
      work: {
        q: "为什么有些 Roblox 字体不能用？",
        a: "复制粘贴样式取决于 Unicode 支持和 Roblox 字段规则。Studio 字体更稳定，因为它们使用官方 UI 字体家族。",
      },
      studio: {
        q: "如何在 Roblox Studio 里更换字体？",
        a: "选择 TextLabel 等 UI 对象，在属性中设置 FontFace，或把生成的 Lua 代码粘贴到 LocalScript 中。",
      },
      official: {
        q: "这些是 Roblox 官方字体吗？",
        a: "Studio 字体列表对应常见 Roblox UI 字体名称。花体复制样式是 Unicode 转换，并不是 Roblox 官方字体文件。",
      },
    },
    footer: {
      disclaimer:
        "本站与 Roblox Corporation 没有关联。Roblox 是 Roblox Corporation 的商标。",
    },
    styles: {
      count: "{count} 种样式",
      copy: "复制",
      safeTag: "兼容性更好",
      displayTag: "展示样式",
      fallbackText: "Roblox 文本",
      copied: "字体文本已复制。",
      codeCopied: "Studio 代码已复制。",
      bold: { name: "Roblox 粗体字", note: "适合简介" },
      italic: { name: "斜体展示字", note: "适合展示文本" },
      boldItalic: { name: "粗斜体文字", note: "适合标题" },
      monospace: { name: "等宽代码风", note: "清晰易读" },
      double: { name: "双线字体", note: "部分场景可能不支持" },
      bubble: { name: "气泡文字", note: "适合简介" },
      square: { name: "方块文字", note: "适合 Game Pass 风格" },
      smallCaps: { name: "小型大写", note: "可读性好" },
      spaced: { name: "间隔文字", note: "兼容性最好" },
      bracketed: { name: "括号标签", note: "适合群组或游戏标题" },
    },
  },
};

const state = {
  filter: "all",
  codeMode: "lua",
  selectedFont: "BuilderSans",
  locale: resolveLocale(),
};

const studioFonts = [
  {
    name: "Builder Sans",
    value: "BuilderSans",
    family: "rbxasset://fonts/families/BuilderSans.json",
    css: "Inter, Arial, sans-serif",
  },
  {
    name: "Source Sans",
    value: "SourceSans",
    family: "rbxasset://fonts/families/SourceSansPro.json",
    css: "Arial, sans-serif",
  },
  {
    name: "Bangers",
    value: "Bangers",
    family: "rbxasset://fonts/families/Bangers.json",
    css: "Impact, fantasy",
  },
  {
    name: "Arcade",
    value: "Arcade",
    family: "rbxasset://fonts/families/PressStart2P.json",
    css: "'Courier New', monospace",
  },
  {
    name: "SciFi",
    value: "SciFi",
    family: "rbxasset://fonts/families/Zekton.json",
    css: "Trebuchet MS, sans-serif",
  },
  {
    name: "Cartoon",
    value: "Cartoon",
    family: "rbxasset://fonts/families/ComicNeueAngular.json",
    css: "Comic Sans MS, cursive",
  },
  {
    name: "Fantasy",
    value: "Fantasy",
    family: "rbxasset://fonts/families/Balthazar.json",
    css: "Georgia, serif",
  },
  {
    name: "Code",
    value: "Code",
    family: "rbxasset://fonts/families/Inconsolata.json",
    css: "ui-monospace, SFMono-Regular, Consolas, monospace",
  },
];

const styleTransforms = [
  {
    key: "bold",
    type: "safe",
    transform: (text) => mapText(text, "bold"),
  },
  {
    key: "italic",
    type: "display",
    transform: (text) => mapText(text, "italic"),
  },
  {
    key: "boldItalic",
    type: "display",
    transform: (text) => mapText(text, "boldItalic"),
  },
  {
    key: "monospace",
    type: "safe",
    transform: (text) => mapText(text, "monospace"),
  },
  {
    key: "double",
    type: "display",
    transform: (text) => mapText(text, "double"),
  },
  {
    key: "bubble",
    type: "display",
    transform: (text) => mapText(text, "bubble"),
  },
  {
    key: "square",
    type: "display",
    transform: (text) => mapText(text, "square"),
  },
  {
    key: "smallCaps",
    type: "safe",
    transform: smallCaps,
  },
  {
    key: "spaced",
    type: "safe",
    transform: (text) => text.toUpperCase().split("").join(" "),
  },
  {
    key: "bracketed",
    type: "safe",
    transform: (text) => `[ ${text.toUpperCase()} ]`,
  },
];

const maps = {
  bold: createAlphaNumericMap(0x1d400, 0x1d41a, 0x1d7ce),
  italic: createAlphaMap(0x1d434, 0x1d44e),
  boldItalic: createAlphaMap(0x1d468, 0x1d482),
  monospace: createAlphaNumericMap(0x1d670, 0x1d68a, 0x1d7f6),
  double: createAlphaNumericMap(0x1d538, 0x1d552, 0x1d7d8, {
    C: "ℂ",
    H: "ℍ",
    N: "ℕ",
    P: "ℙ",
    Q: "ℚ",
    R: "ℝ",
    Z: "ℤ",
  }),
  bubble: createBubbleMap(),
  square: createSquareMap(),
};

function resolveLocale() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang") || localStorage.getItem("gamefont_locale") || navigator.language;
  if (supportedLocales.includes(requested)) return requested;
  if (requested && requested.toLowerCase().startsWith("zh")) return "zh-CN";
  return "en";
}

function t(path, replacements = {}) {
  const value = path.split(".").reduce((current, key) => current?.[key], messages[state.locale]);
  const fallback = path.split(".").reduce((current, key) => current?.[key], messages.en) || path;
  return String(value || fallback).replace(/\{(\w+)\}/g, (_, key) => replacements[key] ?? "");
}

function createAlphaMap(upperStart, lowerStart) {
  const map = {};
  for (let index = 0; index < 26; index += 1) {
    map[String.fromCharCode(65 + index)] = String.fromCodePoint(upperStart + index);
    map[String.fromCharCode(97 + index)] = String.fromCodePoint(lowerStart + index);
  }
  return map;
}

function createAlphaNumericMap(upperStart, lowerStart, numberStart, overrides = {}) {
  const map = createAlphaMap(upperStart, lowerStart);
  for (let index = 0; index < 10; index += 1) {
    map[String(index)] = String.fromCodePoint(numberStart + index);
  }
  return { ...map, ...overrides };
}

function createBubbleMap() {
  const map = {};
  for (let index = 0; index < 26; index += 1) {
    const letter = String.fromCharCode(97 + index);
    map[letter] = String.fromCodePoint(0x24d0 + index);
    map[letter.toUpperCase()] = String.fromCodePoint(0x24b6 + index);
  }
  for (let index = 1; index < 10; index += 1) {
    map[String(index)] = String.fromCodePoint(0x2460 + index - 1);
  }
  map["0"] = "⓪";
  return map;
}

function createSquareMap() {
  const map = {};
  for (let index = 0; index < 26; index += 1) {
    const letter = String.fromCharCode(97 + index);
    const value = String.fromCodePoint(0x1f130 + index);
    map[letter] = value;
    map[letter.toUpperCase()] = value;
  }
  return map;
}

function mapText(text, mapName) {
  const map = maps[mapName];
  return Array.from(text)
    .map((character) => map[character] || character)
    .join("");
}

function smallCaps(text) {
  const caps = {
    a: "ᴀ",
    b: "ʙ",
    c: "ᴄ",
    d: "ᴅ",
    e: "ᴇ",
    f: "ꜰ",
    g: "ɢ",
    h: "ʜ",
    i: "ɪ",
    j: "ᴊ",
    k: "ᴋ",
    l: "ʟ",
    m: "ᴍ",
    n: "ɴ",
    o: "ᴏ",
    p: "ᴘ",
    q: "Q",
    r: "ʀ",
    s: "ꜱ",
    t: "ᴛ",
    u: "ᴜ",
    v: "ᴠ",
    w: "ᴡ",
    x: "x",
    y: "ʏ",
    z: "ᴢ",
  };
  return Array.from(text.toLowerCase())
    .map((character) => caps[character] || character)
    .join("");
}

function applyLocale() {
  document.documentElement.lang = state.locale;
  document.documentElement.dataset.locale = state.locale;
  document.title = t("meta.title");
  languageSelect.value = state.locale;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attribute, key] = pair.split(":");
      element.setAttribute(attribute, t(key));
    });
  });

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => {
    const locale = link.getAttribute("hreflang") === "x-default" ? "en" : link.getAttribute("hreflang");
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    link.href = url.pathname + url.search + url.hash;
  });

  renderAll();
}

function getInputText() {
  return textInput.value.trim() || t("styles.fallbackText");
}

function renderStyleResults() {
  const text = getInputText();
  const filter = state.filter === "all" ? modeSelect.value : state.filter;
  const styles = styleTransforms.filter((style) => filter === "all" || style.type === filter);

  styleCount.textContent = t("styles.count", { count: styles.length });
  fontResults.innerHTML = "";

  styles.forEach((style) => {
    const output = style.transform(text);
    const article = document.createElement("article");
    article.className = "style-card";
    article.innerHTML = `
      <div class="style-card-header">
        <span class="style-name">${t(`styles.${style.key}.name`)}</span>
        <button class="copy-button" type="button">${t("styles.copy")}</button>
      </div>
      <div class="style-preview">${escapeHtml(output)}</div>
      <div class="style-meta">
        <span class="tag ${style.type}">${style.type === "safe" ? t("styles.safeTag") : t("styles.displayTag")}</span>
        <span class="tag">${t(`styles.${style.key}.note`)}</span>
      </div>
    `;
    article
      .querySelector(".copy-button")
      .addEventListener("click", () => copyText(output, t("styles.copied")));
    fontResults.appendChild(article);
  });
}

function renderFontControls() {
  fontSelect.innerHTML = studioFonts
    .map((font) => `<option value="${font.value}">${font.name}</option>`)
    .join("");
  fontSelect.value = state.selectedFont;
  fontPicker.innerHTML = "";

  studioFonts.forEach((font) => {
    const button = document.createElement("button");
    button.className = `font-card${font.value === state.selectedFont ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <div>
        <strong>${font.name}</strong>
        <span>${font.value}</span>
      </div>
      <span aria-hidden="true">Aa</span>
    `;
    button.addEventListener("click", () => {
      state.selectedFont = font.value;
      fontSelect.value = font.value;
      renderStudio();
    });
    fontPicker.appendChild(button);
  });
}

function renderStudio() {
  const font = studioFonts.find((item) => item.value === state.selectedFont) || studioFonts[0];
  const text = getInputText();
  studioFontName.textContent = font.name;
  studioPreviewText.textContent = text;
  studioPreviewText.style.fontFamily = font.css;
  codeOutput.textContent = state.codeMode === "lua" ? buildLuaCode(text, font) : buildRichTextCode(text, font);

  document.querySelectorAll(".font-card").forEach((card) => {
    const value = card.querySelector("span").textContent;
    card.classList.toggle("active", value === state.selectedFont);
  });
}

function buildLuaCode(text, font) {
  return `local textLabel = script.Parent

textLabel.Text = "${escapeLua(text)}"
textLabel.FontFace = Font.fromName("${font.value}")
textLabel.TextScaled = true`;
}

function buildRichTextCode(text, font) {
  return `local textLabel = script.Parent

textLabel.RichText = true
textLabel.Text = '<font family="${font.family}">${escapeRichText(text)}</font>'`;
}

function escapeLua(text) {
  return text.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function escapeRichText(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
  }
  toast(message);
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const element = document.createElement("div");
  element.className = "toast";
  element.textContent = message;
  document.body.appendChild(element);
  setTimeout(() => element.remove(), 2200);
}

function renderAll() {
  renderStyleResults();
  renderStudio();
}

function setFilter(filter) {
  state.filter = filter;
  modeSelect.value = filter;
  document.querySelectorAll("[data-filter]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === filter);
  });
  renderStyleResults();
}

textInput.addEventListener("input", renderAll);
modeSelect.addEventListener("change", () => setFilter(modeSelect.value));
fontSelect.addEventListener("change", () => {
  state.selectedFont = fontSelect.value;
  renderStudio();
});

languageSelect.addEventListener("change", () => {
  state.locale = languageSelect.value;
  localStorage.setItem("gamefont_locale", state.locale);
  const url = new URL(window.location.href);
  url.searchParams.set("lang", state.locale);
  window.history.replaceState({}, "", url);
  applyLocale();
});

clearInput.addEventListener("click", () => {
  textInput.value = "";
  textInput.focus();
  renderAll();
});

document.querySelectorAll("[data-sample]").forEach((button) => {
  button.addEventListener("click", () => {
    textInput.value = button.dataset.sample;
    document.querySelectorAll("[data-sample]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderAll();
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
  });
});

document.querySelectorAll("[data-code-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    state.codeMode = button.dataset.codeMode;
    document.querySelectorAll("[data-code-mode]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderStudio();
  });
});

document.querySelectorAll("[data-nav-target]").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll("[data-nav-target]").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

copyCodeButton.addEventListener("click", () => copyText(codeOutput.textContent, t("styles.codeCopied")));

renderFontControls();
applyLocale();
