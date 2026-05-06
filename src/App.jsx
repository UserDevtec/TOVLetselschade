import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  FileText,
  Mail,
  Menu,
  MapPin,
  X,
  Phone,
  Scale,
  SearchCheck,
  ShieldCheck,
  Target,
} from "lucide-react";

const services = [
  {
    slug: "letselschadedossier",
    icon: ClipboardCheck,
    title: "Integrale behandeling van een letselschadedossier",
    short: "Regie, voortgang en zorgvuldige afwikkeling in een helder dossier.",
    text: "De behandeling gebeurt in nauw overleg met de opdrachtgever. U blijft steeds op de hoogte van gebeurtenissen, voortgang en de laatste stand van zaken.",
    detail:
      "TOV brengt letselschadedossiers terug tot de kern: wat is er gebeurd, welke schade speelt, welke belangen zijn er en welke vervolgstappen zijn nodig. De behandeling is zorgvuldig, praktisch en steeds gericht op een juridisch verantwoorde oplossing voor alle partijen.",
  },
  {
    slug: "eenmalig-bezoek",
    icon: BriefcaseBusiness,
    title: "Eenmalig bezoek in lopende zaken",
    short: "Een scherp bezoek wanneer een lopend dossier opnieuw richting vraagt.",
    text: "Een zorgvuldig bezoek aan de ongevalslocatie of het slachtoffer brengt feiten, context en vervolgstappen opnieuw helder in beeld.",
    detail:
      "In langer lopende zaken kan een goed voorbereid bezoek veel duidelijkheid geven. TOV inventariseert de situatie, luistert naar betrokkenen en vertaalt de bevindingen naar concrete aandachtspunten voor de verdere behandeling.",
  },
  {
    slug: "analyse-vastgelopen-zaken",
    icon: Target,
    title: "Analyse in vastgelopen zaken",
    short: "Complexe dossiers terug naar feiten, kernvragen en besluitvorming.",
    text: "Complexe dossiers worden teruggebracht tot de kern, met een realistische blik op bewijs, schade, aansprakelijkheid en oplossing.",
    detail:
      "Wanneer een dossier vastloopt, helpt een nuchtere analyse. TOV kijkt naar de stukken, de discussiepunten, de bewijspositie en de juridische haalbaarheid. Het resultaat is een heldere route om het dossier weer in beweging te krijgen.",
  },
  {
    slug: "toedrachtonderzoek",
    icon: SearchCheck,
    title: "Toedrachtonderzoek",
    short: "Feitelijk onderzoek bij ongevallen, bedrijven en complexe situaties.",
    text: "Onderzoek bij bedrijven voor aansprakelijkheidsverzekeraars of bedrijven met een hoog eigen risico, met aandacht voor detail en feitelijke onderbouwing.",
    detail:
      "TOV onderzoekt de toedracht van een gebeurtenis zorgvuldig. Dat kan gaan om een bezoek aan de ongevalslocatie, het verzamelen van informatie, het horen van betrokkenen of het vastleggen van omstandigheden die relevant zijn voor de aansprakelijkheidsvraag.",
  },
  {
    slug: "aansprakelijkheidsadvies",
    icon: Scale,
    title: "Advies in aansprakelijkheidsvraagstukken",
    short: "Juridisch toepasbaar advies over aansprakelijkheid, schuldvraag en vervolg.",
    text: "De feiten worden getoetst aan relevante wetgeving en jurisprudentie, waarna een juridisch onderbouwd advies volgt.",
    detail:
      "Aansprakelijkheid vraagt om een combinatie van feiten, recht en realisme. TOV toetst het dossier aan wetgeving en relevante jurisprudentie en geeft een advies dat praktisch bruikbaar is voor verdere besluitvorming.",
  },
  {
    slug: "rapportage-plan-van-aanpak",
    icon: FileText,
    title: "Rapportage en plan van aanpak",
    short: "Een helder rapport met advies en concrete vervolgstappen.",
    text: "Van onderzoek of inventarisatie wordt een uitgebreid rapport opgemaakt, inclusief advies en een plan voor het vervolgtraject.",
    detail:
      "Een goed rapport maakt besluitvorming eenvoudiger. TOV rapporteert zakelijk, helder en bruikbaar: met bevindingen, juridische duiding waar relevant, advies en een praktisch plan voor het vervolg.",
  },
];

const values = [
  ["Pragmatisch", "Gericht op oplossingen die echt werken."],
  ["Doelgericht", "Met focus op feiten, duidelijkheid en voortgang."],
  ["Menselijk", "Met aandacht voor alle betrokkenen."],
];

const quality = [
  "NiVRE-expert",
  "Werkt volgens de GBL",
  "First time right als uitgangspunt",
  "Landelijk actief, geworteld in de Alblasserwaard",
  "Gedegen onderzoek met oog voor detail",
  "Juridisch verantwoord advies",
];

const routes = {
  "/": HomePage,
  "/over": AboutPage,
  "/diensten": ServicesPage,
  "/werkwijze": ProcessPage,
  "/contact": ContactPage,
};

const routeRoots = ["over", "diensten", "werkwijze", "contact"];

function App() {
  const [path, setPath] = useState(getInitialAppPath());

  useEffect(() => {
    const onPopState = () => setPath(getCurrentAppPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const redirectedPath = getRedirectedPathFromQuery();

    if (redirectedPath) {
      window.history.replaceState({}, "", toBrowserPath(redirectedPath));
    }
  }, []);

  const service = useMemo(() => {
    const match = path.match(/^\/diensten\/(.+)$/);
    return match ? services.find((item) => item.slug === match[1]) : null;
  }, [path]);

  const Page = service ? ServiceDetailPage : routes[path] || HomePage;

  useEffect(() => {
    const titles = {
      "/": "Home | TOV Letselschade",
      "/over": "Over TOV | TOV Letselschade",
      "/diensten": "Diensten | TOV Letselschade",
      "/werkwijze": "Werkwijze | TOV Letselschade",
      "/contact": "Contact | TOV Letselschade",
    };

    document.title = service
      ? `${service.title} | TOV Letselschade`
      : titles[path] || "TOV Letselschade";
  }, [path, service]);

  useEffect(() => {
    const selector = [
      ".hero",
      ".page-hero",
      ".section",
      ".home-process",
      ".about-founder",
      ".process-section",
      ".contact-section",
      ".quote-section",
      ".hero-panel",
      ".feature-card",
      ".service-card",
      ".proof-item",
      ".detail-card",
      ".contact-card",
      ".founder-mark",
      ".step",
    ].join(",");

    const elements = Array.from(document.querySelectorAll(selector));
    elements.forEach((element) => element.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.16,
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path, service]);

  function navigate(to) {
    const nextPath = normalizePath(to);
    window.history.pushState({}, "", toBrowserPath(nextPath));
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      <Header navigate={navigate} path={path} />
      <Page navigate={navigate} service={service} />
      <Footer navigate={navigate} />
    </main>
  );
}

function normalizePath(path) {
  if (!path || path === "/index.html") return "/";
  return path.replace(/\/$/, "") || "/";
}

function getRouteInfo(pathname = window.location.pathname) {
  const withoutIndex = pathname.replace(/\/index\.html$/, "/");
  const clean = withoutIndex.replace(/\/+$/, "") || "/";
  const parts = clean.split("/").filter(Boolean);
  const routeIndex = parts.findIndex((part) => routeRoots.includes(part));

  if (routeIndex === -1) {
    return {
      appPath: "/",
      basePath: withoutIndex.endsWith("/") ? withoutIndex : `${withoutIndex}/`,
    };
  }

  const baseParts = parts.slice(0, routeIndex);
  const appParts = parts.slice(routeIndex);

  return {
    appPath: normalizePath(`/${appParts.join("/")}`),
    basePath: baseParts.length ? `/${baseParts.join("/")}/` : "/",
  };
}

function getCurrentAppPath() {
  return getRouteInfo().appPath;
}

function getRedirectedPathFromQuery() {
  const redirectedPath = new URLSearchParams(window.location.search).get("p");
  return redirectedPath ? normalizePath(redirectedPath) : null;
}

function getInitialAppPath() {
  return getRedirectedPathFromQuery() || getCurrentAppPath();
}

function toBrowserPath(appPath) {
  const { basePath } = getRouteInfo();
  const normalizedAppPath = normalizePath(appPath);
  const normalizedBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

  return normalizedAppPath === "/"
    ? basePath
    : `${normalizedBase}${normalizedAppPath}`;
}

function asset(path) {
  return `${getRouteInfo().basePath}${path.replace(/^\/+/, "")}`;
}

function Link({ to, navigate, children, className, ariaLabel }) {
  return (
    <a
      href={toBrowserPath(to)}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

function Header({ navigate, path }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function go(to) {
    setMenuOpen(false);
    navigate(to);
  }

  function isActive(to) {
    return to === "/diensten" ? path.startsWith("/diensten") : path === to;
  }

  return (
    <header
      className={[
        "site-header",
        path === "/" ? "is-home" : "",
        scrolled ? "is-scrolled" : "",
        menuOpen ? "is-menu-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="header-inner">
        <Link to="/" navigate={go} className="brand" ariaLabel="TOV Letselschade home">
          <img src={asset("/assets/tov-logo.svg")} alt="TOV Letselschade" />
        </Link>
        <nav className="desktop-nav" aria-label="Hoofdnavigatie">
          <Link to="/" navigate={navigate} className={isActive("/") ? "is-active" : ""}>Home</Link>
          <Link to="/over" navigate={navigate} className={isActive("/over") ? "is-active" : ""}>Over TOV</Link>
          <Link to="/diensten" navigate={navigate} className={isActive("/diensten") ? "is-active" : ""}>Diensten</Link>
          <Link to="/werkwijze" navigate={navigate} className={isActive("/werkwijze") ? "is-active" : ""}>Werkwijze</Link>
          <Link to="/contact" navigate={navigate} className={isActive("/contact") ? "is-active" : ""}>Contact</Link>
        </nav>
        <a className="nav-cta" href="mailto:info@tovletselschade.nl">
          <Mail size={16} />
          Contact
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobiele navigatie">
          <Link to="/" navigate={go} className={isActive("/") ? "is-active" : ""}>Home</Link>
          <Link to="/over" navigate={go} className={isActive("/over") ? "is-active" : ""}>Over TOV</Link>
          <Link to="/diensten" navigate={go} className={isActive("/diensten") ? "is-active" : ""}>Diensten</Link>
          <Link to="/werkwijze" navigate={go} className={isActive("/werkwijze") ? "is-active" : ""}>Werkwijze</Link>
          <Link to="/contact" navigate={go} className={isActive("/contact") ? "is-active" : ""}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero home-hero fluid-hero">
        <BubbleField />
        <div className="hero-copy">
          <p className="eyebrow">Letselschade & toedrachtonderzoek</p>
          <h1>
            Helderheid in <em>letsel</em>, schade en aansprakelijkheid
          </h1>
          <p className="hero-intro">
            TOV staat voor zeer goed, uitstekend en buitengewoon functioneel.
            Vanuit die maatstaf werkt Jolien van Horssen aan zorgvuldige
            dossiers, nuchter onderzoek en juridisch verantwoord advies.
          </p>
        </div>

        <div className="fluid-hero-footer">
          <div className="fluid-hero-footer-inner">
            <p>
              Zorgvuldige behandeling van letselschadedossiers, scherp
              toedrachtonderzoek en juridisch verantwoord advies bij
              aansprakelijkheidskwesties.
            </p>
            <div className="hero-actions">
              <Link to="/contact" navigate={navigate} className="primary-button light-button">
                Maak kennis
                <ArrowRight size={18} />
              </Link>
              <Link to="/diensten" navigate={navigate} className="secondary-link light-link">
                Bekijk diensten
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section compact-section">
        <div className="section-heading">
          <p className="eyebrow">Waarvoor</p>
          <h2>Drie duidelijke ingangen</h2>
        </div>
        <div className="feature-grid">
          <FeatureLink
            title="Over TOV"
            text="De achtergrond, mentaliteit en ervaring van Jolien van Horssen."
            to="/over"
            navigate={navigate}
          />
          <FeatureLink
            title="Diensten"
            text="Letselschade, toedrachtonderzoek, analyse en aansprakelijkheidsadvies."
            to="/diensten"
            navigate={navigate}
          />
          <FeatureLink
            title="Werkwijze"
            text="Van locatiebezoek naar analyse, rapportage en plan van aanpak."
            to="/werkwijze"
            navigate={navigate}
          />
        </div>
      </section>

      <section className="home-process">
        <div className="home-process-copy">
          <p className="eyebrow">Werkwijze</p>
          <h2>Rust in het dossier, scherpte in de analyse</h2>
          <p>
            De behandeling start met het helder krijgen van de feiten. Waar
            nodig volgt een bezoek aan de ongevalslocatie of het slachtoffer.
            Daarna worden de bevindingen juridisch getoetst en vertaald naar
            een bruikbaar rapport met advies en een plan van aanpak.
          </p>
          <Link to="/werkwijze" navigate={navigate} className="secondary-link">
            Lees meer over de werkwijze
          </Link>
        </div>
        <div className="mini-steps">
          <Step number="01" title="Inventariseren">
            Feiten, stukken en omstandigheden zorgvuldig in beeld.
          </Step>
          <Step number="02" title="Toetsen">
            Analyse aan de hand van wetgeving en jurisprudentie.
          </Step>
          <Step number="03" title="Adviseren">
            Heldere rapportage met concrete vervolgstappen.
          </Step>
        </div>
      </section>
    </>
  );
}

function FeatureLink({ title, text, to, navigate }) {
  return (
    <Link to={to} navigate={navigate} className="feature-card">
      <span>{title}</span>
      <p>{text}</p>
      <ArrowRight size={20} />
    </Link>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Over TOV"
        title={
          <>
            Nuchter, <em>daadkrachtig</em> en met aandacht voor de mens achter
            het dossier
          </>
        }
        text="TOV Letselschade & Toedrachtonderzoek werkt landelijk, met wortels in de Alblasserwaard."
      />

      <section className="section intro-section">
        <div className="intro-grid">
          <div className="intro-copy">
            <p>
              Het woord TOV staat voor zeer goed, uitstekend of buitengewoon
              functioneel. Dat is de basis van deze onderneming en de maatstaf
              in alles wat TOV doet.
            </p>
            <p>
              De Alblasserwaard staat bekend om nuchterheid,
              doorzettingsvermogen en sterke gemeenschapszin. Die mentaliteit
              ziet u terug in de manier van werken: realistisch, zorgvuldig en
              gericht op oplossingen.
            </p>
          </div>
          <div className="value-list">
            {values.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-founder">
        <div className="founder-mark">
          <img src={asset("/assets/Jolien.jpeg")} alt="Jolien van Horssen" />
        </div>
        <div>
          <p className="eyebrow">Over mij</p>
          <h2>
            Ik ben <em>Jolien van Horssen</em>
          </h2>
          <p>
            Al jarenlang ben ik werkzaam in de letselschade. Eerst werkte ik
            voor een grote verzekeraar als letselschadebehandelaar in de
            binnendienst. Daar leerde ik complexe letselschades analyseren,
            terugbrengen tot de kern en oplossen naar tevredenheid van alle
            partijen.
          </p>
          <p>
            Daarna werkte ik als expert voor een toonaangevend expertisebureau
            op het gebied van personenschade en toedrachtonderzoek. Mijn
            onderzoek is gedegen, met oog voor detail, en mijn
            aansprakelijkheidsadvies sluit aan op de toepasselijke
            jurisprudentie.
          </p>
        </div>
      </section>
    </>
  );
}

function ServicesPage({ navigate }) {
  return (
    <>
      <PageHero
        eyebrow="Diensten"
        title={
          <>
            Ondersteuning waar <em>feiten</em>, <em>schade</em> en
            aansprakelijkheid samenkomen
          </>
        }
        text="TOV is gespecialiseerd in letselschadedossiers, toedrachtonderzoek, analyse van vastgelopen zaken en aansprakelijkheidsadvies."
      />
      <section className="section services-section">
        <div className="services-grid">
          {services.map(({ icon: Icon, title, text, slug }) => (
            <Link to={`/diensten/${slug}`} navigate={navigate} className="service-card" key={title}>
              <div className="service-icon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <span>{text}</span>
              <b>
                Lees meer
                <ArrowRight size={15} />
              </b>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function ServiceDetailPage({ service, navigate }) {
  const Icon = service.icon;

  return (
    <>
      <PageHero eyebrow="Dienst" title={service.title} text={service.short} />
      <section className="section detail-section">
        <div className="detail-card">
          <div className="service-icon">
            <Icon size={24} />
          </div>
          <p>{service.detail}</p>
          <p>
            De uitkomst is een helder beeld van de feiten, de juridische
            aandachtspunten en de praktische route voor het vervolg.
          </p>
          <div className="hero-actions">
            <Link to="/contact" navigate={navigate} className="primary-button">
              Bespreek dit onderdeel
              <ArrowRight size={18} />
            </Link>
            <Link to="/diensten" navigate={navigate} className="secondary-link">
              Terug naar diensten
            </Link>
          </div>
        </div>
        <div className="proof-grid">
          {quality.slice(0, 4).map((item) => (
            <div className="proof-item" key={item}>
              <BadgeCheck size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Werkwijze"
        title={
          <>
            First time right: feiten zorgvuldig analyseren, <em>helder</em>{" "}
            adviseren
          </>
        }
        text="De behandeling van elke zaak start in principe met een bezoek aan de ongevalslocatie of het slachtoffer."
      />
      <section className="process-section process-page">
        <BubbleField variant="process" />
        <div className="process-media">
          <img src={asset("/assets/tov-logo.svg")} alt="TOV Letselschade beeldmerk" />
        </div>
        <div className="process-content">
          <p>
            Na het bezoek volgt een zorgvuldige analyse van de feiten. Die
            feiten worden getoetst aan relevante wetgeving en van het onderzoek
            of de inventarisatie wordt een uitgebreid rapport opgemaakt.
          </p>
          <div className="step-list">
            <Step number="01" title="Feiten inventariseren">
              De locatie, omstandigheden, betrokkenen en beschikbare stukken
              worden zorgvuldig in kaart gebracht.
            </Step>
            <Step number="02" title="Juridisch toetsen">
              De feiten worden beoordeeld aan de hand van wetgeving,
              aansprakelijkheidsvragen en relevante jurisprudentie.
            </Step>
            <Step number="03" title="Rapporteren en sturen">
              Het rapport bevat een gedegen advies en een praktisch plan van
              aanpak voor het vervolgtraject.
            </Step>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ number, title, children }) {
  return (
    <article className="step">
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        className="contact-hero"
        eyebrow="Contact"
        title={
          <>
            Een dossier bespreken of <em>advies</em>{" "}nodig?
          </>
        }
        text="Neem contact op voor letselschade, toedrachtonderzoek of advies in aansprakelijkheidsvraagstukken."
      />
      <ContactBlock />
    </>
  );
}

function ContactBlock() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="contact-section">
      <div>
        <p className="eyebrow">Maak kennis</p>
        <h2>
          Graag kijk ik wat ik voor uw <em>bedrijf</em>{" "}kan betekenen
        </h2>
        <p>
          TOV werkt landelijk en is inzetbaar voor verzekeraars, bedrijven en
          opdrachtgevers met complexe dossiers.
        </p>
        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="form-row">
            <label>
              Naam
              <input name="naam" type="text" autoComplete="name" required />
            </label>
            <label>
              Organisatie
              <input name="organisatie" type="text" autoComplete="organization" />
            </label>
          </div>
          <div className="form-row">
            <label>
              E-mailadres
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Telefoon
              <input name="telefoon" type="tel" autoComplete="tel" />
            </label>
          </div>
          <label>
            Waar gaat het om?
            <select name="onderwerp" defaultValue="letselschade">
              <option value="letselschade">Letselschadedossier</option>
              <option value="toedracht">Toedrachtonderzoek</option>
              <option value="aansprakelijkheid">Aansprakelijkheidsadvies</option>
              <option value="anders">Anders</option>
            </select>
          </label>
          <label>
            Bericht
            <textarea name="bericht" rows="5" required />
          </label>
          <button className="primary-button form-submit" type="submit">
            AANVRAAG VERSTUREN
            <ArrowRight size={18} />
          </button>
          {submitted && (
            <p className="form-note">
              Bedankt. Het formulier staat klaar in de interface; koppel later
              een backend of formulierdienst om berichten daadwerkelijk te
              verzenden.
            </p>
          )}
        </form>
      </div>
      <div className="contact-card">
        <a href="tel:+31612345678">
          <Phone size={19} />
          06-12345678
        </a>
        <a href="mailto:info@tovletselschade.nl">
          <Mail size={19} />
          info@tovletselschade.nl
        </a>
        <p>
          <MapPin size={19} />
          Landelijk inzetbaar, geworteld in de Alblasserwaard
        </p>
        <p>
          <BriefcaseBusiness size={19} />
          Voor verzekeraars, bedrijven en opdrachtgevers met complexe dossiers
        </p>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, text, className = "" }) {
  const hasLongTitle =
    typeof title === "string" &&
    title
      .split(/\s+/)
      .some((word) => word.replace(/[^\p{L}\p{N}]/gu, "").length > 16);
  const heroClassName = ["page-hero", hasLongTitle ? "long-title" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={heroClassName}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-intro">{text}</p>
      </div>
      <img src={asset("/assets/Vector.svg")} alt="" aria-hidden="true" />
    </section>
  );
}

function BubbleField({ variant = "" }) {
  return (
    <div className={`bubble-field ${variant ? `bubble-field-${variant}` : ""}`} aria-hidden="true">
      {Array.from({ length: 22 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function Footer({ navigate }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" navigate={navigate}>
              <img src={asset("/assets/tov-logo.svg")} alt="TOV Letselschade" />
            </Link>
            <p>
              Heldere behandeling van letselschade, toedrachtonderzoek en
              advies in aansprakelijkheidskwesties.
            </p>
            <div className="footer-badges">
              <span>NIS</span>
              <span>NiVRE-expert</span>
              <span>Werkt volgens de GBL</span>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer navigatie">
            <p className="footer-title">Navigatie</p>
            <Link to="/" navigate={navigate}>Home</Link>
            <Link to="/over" navigate={navigate}>Over TOV</Link>
            <Link to="/diensten" navigate={navigate}>Diensten</Link>
            <Link to="/werkwijze" navigate={navigate}>Werkwijze</Link>
            <Link to="/contact" navigate={navigate}>Contact</Link>
          </nav>

          <div className="footer-contact">
            <p className="footer-title">Contact</p>
            <a href="tel:+31612345678">
              <Phone size={16} />
              06-12345678
            </a>
            <a href="mailto:info@tovletselschade.nl">
              <Mail size={16} />
              info@tovletselschade.nl
            </a>
            <p>
              <MapPin size={16} />
              Landelijk inzetbaar, werkt vanuit de Randstad
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} TOV Letselschade. Alle rechten voorbehouden.</p>
          <p>
            Gemaakt door{" "}
            <a href="https://devtec.nl" target="_blank" rel="noreferrer">
              Devtec
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default App;
