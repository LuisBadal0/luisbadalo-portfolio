(() => {
  const STRINGS = {
    en: {
      "meta.title": "Luís Badalo — Middleware Consultant & MuleSoft Developer",
      "skip": "Skip to content",
      "brand.aria": "Luís Badalo, back to top",
      "nav.aria": "Primary",
      "nav.work": "Work",
      "nav.experience": "Experience",
      "nav.skills": "Skills",
      "nav.about": "About",
      "nav.contact": "Contact",
      "lang.toggleLabel": "Switch to Portuguese",
      "theme.dark": "Switch to dark mode",
      "theme.light": "Switch to light mode",
      "hero.meta": "Lisbon · Middleware · MuleSoft",
      "hero.lede": "I make enterprise systems talk to each other.",
      "hero.ledeEm": " Middleware consultant and certified MuleSoft developer — currently shipping APIs for banking processes at Banco CTT.",
      "hero.ctaWork": "See selected work",
      "hero.ctaTalk": "Start a conversation",
      "hero.ctaCv": "Download CV",
      "hero.fact.now": "Now",
      "hero.fact.nowVal": "Middleware Consultant, Glintt Global",
      "hero.fact.client": "Client",
      "hero.fact.cert": "Certified",
      "work.eyebrow": "01 — Selected work",
      "work.title": "Systems that had to agree.",
      "work.intro": "Named programmes from the CV — retail operations at scale, then banking integrations. No case-study theatre, just the work.",
      "work.case1.kicker": "Glintt Global · Lisbon · Feb 2025 — Present",
      "work.case1.title": "Banking APIs for Banco CTT",
      "work.case1.body": "End-to-end MuleSoft work for a Portuguese bank: design the contract, implement the flow, then keep it alive in production.",
      "work.case1.l1": "API design in RAML via Design Center",
      "work.case1.l2": "Implementation in Anypoint Studio",
      "work.case1.l3": "Governance through API Manager and Runtime Manager",
      "work.case1.l4": "SQL Server procedures and functions behind the integrations",
      "work.case1.l5": "CI/CD on Azure DevOps, delivered in Agile teams",
      "work.case1.tag1": "Integration",
      "work.case1.tag3": "Banking",
      "work.case1.note": "Current focus. The whole Anypoint lifecycle, not just the happy-path demo.",
      "work.case2.kicker": "Softinsa · IKEA spaces · 2020 — 2022",
      "work.case2.body": "Check-in and check-out for children in IKEA spaces across countries. Backend, cloud, and the pipelines that made new environments boring — in a good way.",
      "work.case2.l1": "Backend services and multi-environment CI/CD on Azure DevOps",
      "work.case2.l2": "Pre-production on Azure App Services, Storage, Logic Apps, Function Apps",
      "work.case2.l3": "SQL Server for application data; TLS certificates in Azure",
      "work.case2.l4": "Jira, Black Duck, and Polaris in the delivery path",
      "work.case3.kicker": "Softinsa · IKEA stores · 2020 — 2022",
      "work.case3.body": "A store-audit companion used across IKEA countries. Same discipline as Kiddyland, different data shape: stores, audits, documents.",
      "work.case3.l1": "Backend development and Azure DevOps pipelines",
      "work.case3.l2": "Pre-production environments and deployment support",
      "work.case3.l4": "MongoDB for stores, audits, and documentation",
      "exp.eyebrow": "02 — Experience",
      "exp.title": "A short flow, two processors.",
      "exp.intro": "Reverse chronological, the way a recruiter actually scans it. Titles and employers as written.",
      "exp.t1.when": "Feb 2025",
      "exp.t1.present": "Present",
      "exp.t1.where": "Lisbon",
      "exp.t1.title": "Middleware Consultant",
      "exp.t1.org": "Glintt Global · assignment at Banco CTT",
      "exp.t1.body": "MuleSoft-based integration and API development for banking and business processes. Comfortable across the full lifecycle: RAML, Anypoint Studio, API Manager, Runtime Manager. SQL Server when the payload has to land somewhere durable. Azure DevOps for the path to runtime. Agile, with both engineering and business in the room.",
      "exp.t2.end": "Sep 2022",
      "exp.t2.body": "Two production programmes — Kiddyland and MobileAuditing — spanning backend development, Azure infrastructure, and CI/CD. App Services, Storage, Logic Apps, Function Apps, SQL and MongoDB, TLS, plus the unglamorous glue of Jira and security scanning.",
      "skills.eyebrow": "03 — Skills",
      "skills.title": "Tools I actually use.",
      "skills.intro": "Grouped the way the work groups them. No percentage bars. Certification sits with the platform it belongs to.",
      "skills.group1": "Integration",
      "skills.group2": "Cloud & delivery",
      "skills.group3": "Backend",
      "skills.raml": "Contract-first API design",
      "skills.issued": "Issued April 2025",
      "skills.cicd": "CI/CD, multi-environment releases",
      "skills.devopsTraining": "From formal DevOps training, 2023",
      "skills.deliveryTools": "Listed among delivery tools",
      "skills.sql": "Stored procedures and functions",
      "skills.mongo": "Document stores for operational data",
      "skills.backend": "Backend delivery",
      "about.eyebrow": "04 — About",
      "about.title": "A connector by trade.",
      "about.p1": "I’m a Portuguese middleware consultant. The job, stripped of jargon: take systems that were never introduced and give them a reliable way to speak — contracts, mappings, runtime, the unglamorous bits that keep a bank’s processes moving on a Tuesday.",
      "about.p2": "I trained in computer engineering at the Instituto Politécnico de Tomar, then spent two years at Softinsa building Azure-backed services for international IKEA programmes. The through-line was already there: backends, environments, pipelines, certificates. The current chapter is MuleSoft, in Lisbon with Glintt Global, inside Banco CTT.",
      "about.p3": "I care about the whole path — RAML to runtime, procedure to payload — because integrations fail in the seams, not in the slide deck.",
      "about.photoAlt": "Portrait of Luís Badalo",
      "about.fact.based": "Based",
      "about.fact.basedVal": "Portugal · working in Lisbon",
      "about.fact.lang": "Languages",
      "about.fact.langVal1": "Portuguese (native)",
      "about.fact.langVal2": "English — C1 writing, B2 listening, reading & speaking",
      "about.fact.edu": "Education",
      "about.fact.eduVal1": "BSc Computer Engineering",
      "about.fact.extra": "Also studied",
      "about.fact.extraVal2": "Azure Fundamentals prep · DevOps (Docker, Kubernetes, Terraform, Azure DevOps)",
      "cred.eyebrow": "05 — Proof",
      "cred.title": "On the record.",
      "cred1.kind": "Certification",
      "cred1.line": "15 April 2025 · Verify on Trailblazer",
      "cred2.kind": "Course",
      "cred2.line": "Udemy · October 2021",
      "cred3.line": "Udemy · October 2023",
      "contact.eyebrow": "06 — Contact",
      "contact.title": "If your systems need a diplomat.",
      "contact.intro": "Recruiters, engineering leads, former colleagues — the inbox is the shortest route.",
      "whoami.send": "Send",
      "whoami.hint1": "// Press Send, or type ",
      "whoami.hint2": " anywhere on the page.",
      "whoami.role": "Middleware Consultant",
      "whoami.based": "Portugal",
      "whoami.lang1": "Portuguese",
      "whoami.lang2": "English",
      "whoami.message": "Ready to integrate.",
      "footer.top": "Back to top",
      "egg": "Five clicks on the mark. You found the other endpoint."
    },
    pt: {
      "meta.title": "Luís Badalo — Consultor de Middleware e Desenvolvedor MuleSoft",
      "skip": "Saltar para o conteúdo",
      "brand.aria": "Luís Badalo, voltar ao topo",
      "nav.aria": "Navegação",
      "nav.work": "Trabalho",
      "nav.experience": "Experiência",
      "nav.skills": "Competências",
      "nav.about": "Sobre",
      "nav.contact": "Contacto",
      "lang.toggleLabel": "Mudar para inglês",
      "theme.dark": "Mudar para o modo escuro",
      "theme.light": "Mudar para o modo claro",
      "hero.meta": "Lisboa · Middleware · MuleSoft",
      "hero.lede": "Faço sistemas empresariais falarem entre si.",
      "hero.ledeEm": " Consultor de middleware e Desenvolvedor MuleSoft certificado — atualmente a desenvolver APIs para processos bancários no Banco CTT.",
      "hero.ctaWork": "Ver trabalho selecionado",
      "hero.ctaTalk": "Iniciar uma conversa",
      "hero.ctaCv": "Descarregar CV",
      "hero.fact.now": "Agora",
      "hero.fact.nowVal": "Consultor de Middleware, Glintt Global",
      "hero.fact.client": "Cliente",
      "hero.fact.cert": "Certificação",
      "work.eyebrow": "01 — Trabalho selecionado",
      "work.title": "Sistemas que tiveram de se entender.",
      "work.intro": "Programas nomeados do CV — operações de retalho em grande escala e, depois, integrações bancárias. Sem teatro de estudos de caso, apenas o trabalho.",
      "work.case1.kicker": "Glintt Global · Lisboa · Fev 2025 — Presente",
      "work.case1.title": "APIs bancárias para o Banco CTT",
      "work.case1.body": "Trabalho MuleSoft de ponta a ponta para um banco português: desenhar o contrato, implementar o fluxo e mantê-lo vivo em produção.",
      "work.case1.l1": "Desenho de APIs em RAML via Design Center",
      "work.case1.l2": "Implementação no Anypoint Studio",
      "work.case1.l3": "Gestão através do API Manager e do Runtime Manager",
      "work.case1.l4": "Stored procedures e functions SQL Server por trás das integrações",
      "work.case1.l5": "CI/CD no Azure DevOps, entregue em equipas Agile",
      "work.case1.tag1": "Integração",
      "work.case1.tag3": "Banca",
      "work.case1.note": "Foco atual. Todo o ciclo de vida do Anypoint, não apenas a demo do caminho feliz.",
      "work.case2.kicker": "Softinsa · espaços IKEA · 2020 — 2022",
      "work.case2.body": "Check-in e check-out de crianças em espaços IKEA em vários países. Backend, cloud e os pipelines que tornaram a criação de novos ambientes uma rotina — no bom sentido.",
      "work.case2.l1": "Serviços backend e CI/CD multi-ambiente no Azure DevOps",
      "work.case2.l2": "Pré-produção em Azure App Services, Storage, Logic Apps e Function Apps",
      "work.case2.l3": "SQL Server para os dados da aplicação; certificados TLS no Azure",
      "work.case2.l4": "Jira, Black Duck e Polaris nos processos de desenvolvimento e de deployment",
      "work.case3.kicker": "Softinsa · lojas IKEA · 2020 — 2022",
      "work.case3.body": "Uma solução de apoio a auditorias de lojas IKEA, usada em vários países. A mesma disciplina do Kiddyland, com outra forma de dados: lojas, auditorias e documentação.",
      "work.case3.l1": "Desenvolvimento backend e implementação de pipelines CI/CD no Azure DevOps",
      "work.case3.l2": "Ambientes de pré-produção e suporte aos processos de deployment",
      "work.case3.l4": "MongoDB para armazenamento de dados relacionados com lojas, auditorias e documentação",
      "exp.eyebrow": "02 — Experiência",
      "exp.title": "Um fluxo curto, dois processadores.",
      "exp.intro": "Ordem cronológica inversa, como um recrutador a lê na prática. Títulos e empregadores tal como constam.",
      "exp.t1.when": "Fev 2025",
      "exp.t1.present": "Presente",
      "exp.t1.where": "Lisboa",
      "exp.t1.title": "Consultor de Middleware",
      "exp.t1.org": "Glintt Global · projeto no Banco CTT",
      "exp.t1.body": "Integração baseada em MuleSoft e desenvolvimento de APIs para processos empresariais e bancários. À vontade em todo o ciclo de vida: RAML, Anypoint Studio, API Manager, Runtime Manager. SQL Server quando o payload tem de aterrar num sítio durável. Azure DevOps para o caminho até ao runtime. Agile, com engenharia e negócio na mesma sala.",
      "exp.t2.end": "Set 2022",
      "exp.t2.body": "Dois projetos em produção — Kiddyland e MobileAuditing — abrangendo desenvolvimento backend, infraestrutura Azure e CI/CD. App Services, Storage, Logic Apps, Function Apps, SQL e MongoDB, TLS, além da cola inglória de Jira e do scanning de segurança.",
      "skills.eyebrow": "03 — Competências",
      "skills.title": "As ferramentas que realmente uso.",
      "skills.intro": "Agrupadas como o trabalho as agrupa. Sem barras de percentagem. A certificação fica junto da plataforma a que pertence.",
      "skills.group1": "Integração",
      "skills.group2": "Cloud e entrega",
      "skills.group3": "Backend",
      "skills.raml": "Design de API orientado a contrato",
      "skills.issued": "Emitido em abril de 2025",
      "skills.cicd": "CI/CD, releases multi-ambiente",
      "skills.devopsTraining": "Formação formal em DevOps, 2023",
      "skills.deliveryTools": "Listada entre as ferramentas de entrega",
      "skills.sql": "Stored procedures e functions",
      "skills.mongo": "Armazenamento documental para dados operacionais",
      "skills.backend": "Desenvolvimento backend",
      "about.eyebrow": "04 — Sobre",
      "about.title": "Um conetor por profissão.",
      "about.p1": "Sou consultor de middleware português. O trabalho, sem jargão: pegar em sistemas que nunca foram apresentados uns aos outros e dar-lhes uma forma fiável de comunicar — contratos, mapeamentos, runtime, os aspetos menos glamorosos que mantêm os processos de um banco a funcionar numa terça-feira.",
      "about.p2": "Licenciei-me em Engenharia Informática no Instituto Politécnico de Tomar e, depois, passei dois anos na Softinsa a criar serviços suportados em Azure para programas internacionais da IKEA. O fio condutor já lá estava: backends, ambientes, pipelines, certificados. O capítulo atual é MuleSoft, em Lisboa, com a Glintt Global, no Banco CTT.",
      "about.p3": "Preocupo-me com todo o percurso — do RAML ao runtime, da procedure ao payload — porque as integrações falham nas costuras, não na apresentação.",
      "about.photoAlt": "Retrato de Luís Badalo",
      "about.fact.based": "Residência",
      "about.fact.basedVal": "Portugal · a trabalhar em Lisboa",
      "about.fact.lang": "Idiomas",
      "about.fact.langVal1": "Português (língua materna)",
      "about.fact.langVal2": "Inglês — C1 escrita, B2 compreensão oral, leitura e oralidade",
      "about.fact.edu": "Formação",
      "about.fact.eduVal1": "Licenciatura em Engenharia Informática",
      "about.fact.extra": "Formação adicional",
      "about.fact.extraVal2": "Preparação para Azure Fundamentals · DevOps (Docker, Kubernetes, Terraform, Azure DevOps)",
      "cred.eyebrow": "05 — Comprovativos",
      "cred.title": "Tudo documentado.",
      "cred1.kind": "Certificação",
      "cred1.line": "15 de abril de 2025 · Verificar no Trailblazer",
      "cred2.kind": "Curso",
      "cred2.line": "Udemy · outubro de 2021",
      "cred3.line": "Udemy · outubro de 2023",
      "contact.eyebrow": "06 — Contacto",
      "contact.title": "Se os seus sistemas precisam de um diplomata.",
      "contact.intro": "Recrutadores, lideranças de engenharia, ex-colegas — a caixa de entrada é o caminho mais curto.",
      "whoami.send": "Enviar",
      "whoami.hint1": "// Carrega em Enviar, ou escreve ",
      "whoami.hint2": " em qualquer parte da página.",
      "whoami.role": "Consultor de Middleware",
      "whoami.based": "Portugal",
      "whoami.lang1": "Português",
      "whoami.lang2": "Inglês",
      "whoami.message": "Pronto a integrar.",
      "footer.top": "Voltar ao topo",
      "egg": "Cinco cliques na marca. Encontraste o outro endpoint."
    }
  };

  const readStored = () => {
    try { return localStorage.getItem("lang"); } catch (e) { return null; }
  };

  const detect = () => {
    const stored = readStored();
    if (stored === "pt" || stored === "en") return stored;
    return (navigator.language || "en").slice(0, 2).toLowerCase() === "pt" ? "pt" : "en";
  };

  let current = detect();

  const apply = (lang) => {
    current = lang;
    const dict = STRINGS[lang];
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
    document.documentElement.dataset.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = dict[el.dataset.i18n] ?? "";
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(",").forEach((pair) => {
        const sep = pair.indexOf(":");
        const attr = pair.slice(0, sep).trim();
        const value = dict[pair.slice(sep + 1).trim()];
        if (value !== undefined) el.setAttribute(attr, value);
      });
    });

    const cvLink = document.querySelector('a[href^="cv/luis_badalo_cv_"]');
    if (cvLink) {
      cvLink.setAttribute("href", lang === "pt" ? "cv/luis_badalo_cv_PT.pdf" : "cv/luis_badalo_cv_EN.pdf");
    }

    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.textContent = lang === "pt" ? "PT" : "EN";
      langBtn.setAttribute("aria-label", dict["lang.toggleLabel"]);
    }

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      const dark = document.documentElement.dataset.theme === "dark";
      themeBtn.setAttribute("aria-label", dict[dark ? "theme.light" : "theme.dark"]);
    }

    document.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang } }));
  };

  const toggle = document.getElementById("lang-toggle");
  toggle?.addEventListener("click", () => {
    const next = current === "pt" ? "en" : "pt";
    try { localStorage.setItem("lang", next); } catch (e) {}
    apply(next);
  });

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn && "MutationObserver" in window) {
    new MutationObserver(() => {
      const dict = STRINGS[current];
      const dark = document.documentElement.dataset.theme === "dark";
      themeBtn.setAttribute("aria-label", dict[dark ? "theme.light" : "theme.dark"]);
    }).observe(themeBtn, { attributes: true, attributeFilter: ["aria-pressed"] });
  }

  window.I18N = {
    get lang() { return current; },
    s: (key) => STRINGS[current][key]
  };

  apply(current);
})();