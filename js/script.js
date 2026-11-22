/* =====================================================
   OdysseyBlue – small, JavaScript
   Each block below does ONE job.
   ===================================================== */

// 1. Mobile menu: show/hide the links when the ☰ button is clicked
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });
}

// 2. Scroll reveal: fade elements in when they enter the screen
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);   // only animate once
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(function (el) { observer.observe(el); });
} else {
  revealItems.forEach(function (el) { el.classList.add("show"); });
}

// 3. Back-to-top button
const toTop = document.getElementById("toTop");
if (toTop) {
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("show", window.scrollY > 400);
  });
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 4. Animated number counters (home page)
const counters = document.querySelectorAll("[data-count]");
counters.forEach(function (counter) {
  const target = Number(counter.dataset.count);
  let started = false;
  const watcher = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !started) {
      started = true;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        counter.textContent = current.toLocaleString();
      }, 25);
    }
  });
  watcher.observe(counter);
});

// 5. Greek phrase of the day (home page – our extra feature)
const phrases = [
  { greek: "Καλημέρα",       say: "kah-lee-MEH-rah",   english: "Good morning" },
  { greek: "Ευχαριστώ",      say: "ef-hah-ree-STOH",   english: "Thank you" },
  { greek: "Γεια σου",       say: "YAH soo",           english: "Hello / Goodbye" },
  { greek: "Παρακαλώ",       say: "pah-rah-kah-LOH",   english: "Please / You're welcome" },
  { greek: "Στην υγειά μας!", say: "steen ee-YAH mas",  english: "Cheers!" },
  { greek: "Πόσο κάνει;",    say: "POH-so KAH-nee",    english: "How much is it?" },
  { greek: "Ναι / Όχι",      say: "neh / OH-hee",      english: "Yes / No" }
];
const phraseBtn = document.getElementById("phraseBtn");
if (phraseBtn) {
  let index = 0;
  const showPhrase = function () {
    const p = phrases[index];
    document.getElementById("phraseGreek").textContent = p.greek;
    document.getElementById("phraseSay").textContent = "Say it: " + p.say;
    document.getElementById("phraseEnglish").textContent = p.english;
    index = (index + 1) % phrases.length;
  };
  phraseBtn.addEventListener("click", showPhrase);
  index = new Date().getDate() % phrases.length;   // a different one each day
  showPhrase();
}

// 6. Transport tabs (transport page)
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
tabButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    tabButtons.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
    tabPanels.forEach(function (p) { p.classList.remove("active"); });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    document.getElementById(btn.dataset.target).classList.add("active");
  });
});

// 7. Contact form: show a message after Submit
const form = document.getElementById("contactForm");
if (form) {
  const budget = document.getElementById("budget");
  const budgetOut = document.getElementById("budgetOut");
  if (budget) {
    budget.addEventListener("input", function () { budgetOut.textContent = "€" + Number(budget.value).toLocaleString(); });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();                       // stop the page from reloading
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value;
    const date = document.getElementById("date").value;

    document.getElementById("thanksName").textContent = name;
    document.getElementById("thanksEmail").textContent = email;
    document.getElementById("thanksTopic").textContent = topic;
    document.getElementById("thanksDate").textContent = date || "Not decided yet";

    form.style.display = "none";                  // hide the form
    const box = document.getElementById("success");
    box.classList.add("show");                    // show the thank-you message
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  const again = document.getElementById("againBtn");
  if (again) {
    again.addEventListener("click", function () {
      form.reset();
      budgetOut.textContent = "€1,500";
      form.style.display = "grid";
      document.getElementById("success").classList.remove("show");
    });
  }
}