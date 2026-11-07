export const nl = {
  common: {
    login: 'Aanmelden',
    logout: 'Afmelden',
  },
  navigation: {
    dashboard: 'Overzicht',
    details: 'Aankoopdetails',
  },
  landing: {
    eyebrow: 'EEN DUIDELIJK OVERZICHT VAN JE GAME-UITGAVEN',
    title: 'Volg elke gameaankoop. Vergelijk elke regio.',
    description:
      'Lavish Gamers helpt je games, microtransacties en abonnementen te registreren, prijzen in verschillende valuta te vergelijken en je uitgaven te begrijpen.',
    loginCta: 'Meld je aan om te beginnen',
    footer: 'Gemaakt voor spelers die bewustere keuzes willen maken over hun uitgaven.',
    features: {
      track: {
        eyebrow: 'BIJHOUDEN',
        title: 'Zie waar je geld naartoe gaat',
        description:
          'Hou games, microtransacties, downloadbare content en abonnementen samen in één duidelijk overzicht.',
      },
      compare: {
        eyebrow: 'VERGELIJKEN',
        title: 'Vergelijk regionale prijzen',
        description:
          'Zet prijzen om naar één valuta en ontdek of dezelfde aankoop in een andere regio goedkoper is.',
      },
      understand: {
        eyebrow: 'BEGRIJPEN',
        title: 'Zet aankopen om in inzichten',
        description:
          'Gebruik uitgaventotalen en categorieën om je gamegewoonten doorheen de tijd te begrijpen.',
      },
    },
  },
  login: {
    title: 'Welkom terug',
    emailLabel: 'E-mailadres',
    emailPlaceholder: 'jij@voorbeeld.be',
    passwordLabel: 'Wachtwoord',
    errorFallback: 'Aanmelden mislukt. Controleer je gegevens.',
  },
  dashboard: {
    welcome: 'Welkom, {{name}}',
    welcomeFallback: 'Welkom',
    description: 'Je uitgavenoverzicht verschijnt hier.',
    emptyTitle: 'Nog geen aankopen',
    emptyDescription:
      'Voeg je eerste gameaankoop toe om je uitgavenoverzicht op te bouwen.',
  },
  details: {
    title: 'Aankoopdetails',
    id: 'ID: {{id}}',
    placeholder: 'De aankoopgegevens verschijnen hier.',
  },
} as const;
