/* =====================================================
   HCD-Vortrag · Behavior
   Module:
   1. Akkordion (UI/UX/HCD in Sektion 02)
   2. HCD-Kreislauf (Sektion 03)
   3. Persona-Karten (Sektion 04)
   4. Mini-Game (Sektion 05)
   5. Rollenmatrix (Sektion 06)
   6. Progress-Anzeige in der Nav
   ===================================================== */

(function () {
  'use strict';

  /* Hinweis zu Strings:
     Alle Texte sind in Double-Quotes geschrieben, weil deutsche
     Apostrophe (ihr's, geht's …) sonst den String beenden.
     Wenn du Texte änderst, bleibe bei "...". */


  /* 1. Akkordion (Single-Open: nur ein Panel gleichzeitig offen)
     --------------------------------------------------- */
  function initAccordion() {
    var items = document.querySelectorAll(".accordion-item");
    items.forEach(function (item) {
      var head = item.querySelector(".accordion-head");
      if (!head) return;
      head.addEventListener("click", function () {
        var isActive = item.classList.contains("active");
        items.forEach(function (i) { i.classList.remove("active"); });
        if (!isActive) item.classList.add("active");
      });
    });
  }


  /* 2. HCD-Kreislauf
     --------------------------------------------------- */
  var phases = {
    1: {
      title: "Nutzungskontext verstehen",
      body: "In dieser Aktivität wird beschrieben, wer die Benutzer sind, welche Ziele und Aufgaben sie haben, mit welchen Mitteln und in welcher Umgebung sie das System verwenden. Grundlage dafür sind Beobachtungen, Interviews und vorhandene Dokumente.",
      methods: "Nutzungskontextbeschreibung, Benutzergruppenprofile, Personas, Aufgabenmodelle, Ist-Szenarien, User Journey Maps."
    },
    2: {
      title: "Nutzungsanforderungen festlegen",
      body: "Aus dem Nutzungskontext werden Erfordernisse und daraus Nutzungsanforderungen abgeleitet. Eine Nutzungsanforderung beschreibt, was eine Benutzergruppe in einem definierten Nutzungskontext erreichen können muss, ohne die Lösung vorzugeben.",
      methods: "Erfordernisse, Nutzungsanforderungen."
    },
    3: {
      title: "Gestaltungslösungen entwerfen",
      body: "Auf Basis der Nutzungsanforderungen werden Gestaltungslösungen entwickelt. Sie reichen von der Informationsarchitektur und Navigationsstruktur über Wireframes bis zu interaktiven Prototypen unterschiedlicher Detailtiefe.",
      methods: "Informationsarchitektur, Navigationsstruktur, Styleguide, Wireframes, Low-Fidelity-Prototypen, High-Fidelity-Prototypen."
    },
    4: {
      title: "Gestaltungslösung evaluieren",
      body: "Die Gestaltungslösung wird gegen die Nutzungsanforderungen geprüft. Erkenntnisse fließen in den Nutzungskontext, die Anforderungen oder die Lösung zurück. Das Curriculum unterscheidet drei Formen: Usability-Test, Usability-Inspektion und Benutzerbefragung.",
      methods: "Usability-Test, Usability-Inspektion, Benutzerbefragung."
    }
  };

  function initCycle() {
    document.querySelectorAll(".cycle-node").forEach(function (node) {
      node.addEventListener("click", function () {
        var n = node.getAttribute("data-phase");

        document.querySelectorAll(".cycle-node").forEach(function (g) {
          g.classList.remove("active");
          var c = g.querySelector(".node-circle");
          c.setAttribute("fill", "#1a1a1a");
          c.setAttribute("stroke", "#6a6a67");
          g.querySelectorAll("text").forEach(function (t) {
            t.setAttribute("fill", "#f3f3f1");
          });
        });

        node.classList.add("active");
        var c = node.querySelector(".node-circle");
        c.setAttribute("fill", "#d4ff3a");
        c.setAttribute("stroke", "#0a0a0a");
        node.querySelectorAll("text").forEach(function (t) {
          t.setAttribute("fill", "#0a0a0a");
        });

        var p = phases[n];
        document.getElementById("cycle-detail").innerHTML =
          "<span class=\"num\">" + n + "</span>" +
          "<h3>" + p.title + "</h3>" +
          "<p>" + p.body + "</p>" +
          "<div class=\"methods\"><b>Methoden:</b> " + p.methods + "</div>";
      });
    });
  }


  /* 3. Persona-Karten
     --------------------------------------------------- */
  function initPersonas() {
    document.querySelectorAll(".persona-card").forEach(function (card) {
      card.addEventListener("click", function () {
        card.classList.toggle("flipped");
      });
    });
  }


  /* 4. Mini-Game
     --------------------------------------------------- */
  function initGame() {
    var foundFlaws = 0;
    document.querySelectorAll(".hotspot").forEach(function (hot) {
      hot.addEventListener("click", function () {
        if (hot.classList.contains("found")) return;
        hot.classList.add("found");
        foundFlaws++;
        var counter = document.getElementById("flaw-count");
        if (counter) counter.textContent = foundFlaws;
        var num = hot.getAttribute("data-flaw");
        var f = document.querySelector(".finding[data-flaw=\"" + num + "\"]");
        if (f) f.classList.add("revealed");
      });
    });
  }


  /* 5. Rollenmatrix
     --------------------------------------------------- */
  var roles = {
    pm: {
      title: "Projektmanagement",
      body: "Plant die menschzentrierte Gestaltung über den Projektverlauf hinweg. Verankert Iterationen, Nutzerbeteiligung und Usability-Evaluierung im Zeit- und Budgetplan. Vertritt die Nutzungsanforderungen gegenüber konkurrierenden Projektzielen und stellt sicher, dass die HCD-Aktivitäten aufeinander aufbauen."
    },
    dev: {
      title: "Entwicklung",
      body: "Überführt Gestaltungslösungen in funktionierende interaktive Systeme. Bringt technische Restriktionen und Möglichkeiten früh in die Aktivität „Gestalten von Lösungen“ ein. Trägt Verantwortung für Barrierefreiheit, Robustheit und das korrekte Umsetzen der Nutzungsanforderungen."
    },
    design: {
      title: "Design",
      body: "Übersetzt Nutzungsanforderungen in Informationsarchitektur, Navigationsstruktur, Wireframes und Prototypen. Bereitet Lösungen für die Usability-Evaluierung vor und arbeitet die Erkenntnisse in nachfolgende Iterationen ein. Stellt sicher, dass Gestaltungsentscheidungen auf den Nutzungskontext zurückführbar bleiben."
    },
    hr: {
      title: "HR",
      body: "Trägt Wissen über den Nutzungskontext interner und externer Benutzergruppen bei — etwa Bewerber, Mitarbeitende oder Bewerbungsverantwortliche. Liefert Beobachtungen aus dem direkten Kontakt mit diesen Zielgruppen, die in Personas, Aufgabenmodelle und User Journey Maps einfließen."
    },
    bo: {
      title: "Backoffice / Operations",
      body: "Vertritt die Perspektive interner Benutzer interner Systeme. Erkennt Brüche, Wartezeiten und Doppelarbeiten in alltäglichen Prozessen — wertvolle Hinweise auf nicht erfüllte Nutzungsanforderungen, die in der Aktivität „Verstehen und Festlegen des Nutzungskontextes“ gebraucht werden."
    },
    sales: {
      title: "Sales / Beratung",
      body: "Sammelt Erwartungen, Erfordernisse und Geschäftsziele aus Kundengesprächen. Identifiziert Interessenvertreter und Benutzergruppen, bevor die Gestaltungsphase beginnt. Verbindet Nutzungsanforderungen mit unternehmenszentrierter Qualität, damit beide Perspektiven im Projekt berücksichtigt werden."
    }
  };

  function initRoles() {
    document.querySelectorAll(".audience-pill").forEach(function (pill) {
      pill.addEventListener("click", function () {
        document.querySelectorAll(".audience-pill").forEach(function (p) {
          p.classList.remove("active");
        });
        pill.classList.add("active");
        var key = pill.getAttribute("data-role");
        var r = roles[key];
        if (!r) return;
        document.getElementById("role-result").innerHTML =
          "<h4>" + r.title + "</h4><p>" + r.body + "</p>";
      });
    });
  }


  /* 6. Progress in der Nav
     --------------------------------------------------- */
  function initProgress() {
    var sections = document.querySelectorAll(".section");
    var total = sections.length;
    var progressEl = document.getElementById("progress");
    if (!progressEl || !("IntersectionObserver" in window)) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var step = e.target.getAttribute("data-step");
          progressEl.textContent =
            String(step).padStart(2, "0") + " / " + String(total).padStart(2, "0");
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(function (s) { obs.observe(s); });
  }


  /* Init nach DOM-ready
     --------------------------------------------------- */
  function init() {
    initAccordion();
    initCycle();
    initPersonas();
    initGame();
    initRoles();
    initProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
