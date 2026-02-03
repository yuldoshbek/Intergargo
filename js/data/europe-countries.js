/**
 * EUROPE COUNTRIES DATABASE
 * Contains 40 European countries with grammatical forms for dynamic content generation
 * Includes: Core EU, Extended (UK, Switzerland, Serbia, etc.), and Additional countries
 */

export const EUROPE_COUNTRIES = {
    // CORE EU COUNTRIES
    "France": {
        ru: "Франция",
        from: "Франции",  // из Франции
        to: "во Францию", // во Францию
        en: "France",
        slug: "france",
        iso: "FR",
        inEU: true
    },
    "Spain": {
        ru: "Испания",
        from: "Испании",
        to: "в Испанию",
        en: "Spain",
        slug: "spain",
        iso: "ES",
        inEU: true
    },
    "Italy": {
        ru: "Италия",
        from: "Италии",
        to: "в Италию",
        en: "Italy",
        slug: "italy",
        iso: "IT",
        inEU: true
    },
    "Poland": {
        ru: "Польша",
        from: "Польши",
        to: "в Польшу",
        en: "Poland",
        slug: "poland",
        iso: "PL",
        inEU: true
    },
    "Netherlands": {
        ru: "Нидерланды",
        from: "Нидерландов",
        to: "в Нидерланды",
        en: "Netherlands",
        slug: "netherlands",
        iso: "NL",
        inEU: true
    },
    "Belgium": {
        ru: "Бельгия",
        from: "Бельгии",
        to: "в Бельгию",
        en: "Belgium",
        slug: "belgium",
        iso: "BE",
        inEU: true
    },
    "Austria": {
        ru: "Австрия",
        from: "Австрии",
        to: "в Австрию",
        en: "Austria",
        slug: "austria",
        iso: "AT",
        inEU: true
    },
    "CzechRepublic": {
        ru: "Чехия",
        from: "Чехии",
        to: "в Чехию",
        en: "Czech Republic",
        slug: "czech-republic",
        iso: "CZ",
        inEU: true
    },
    "Portugal": {
        ru: "Португалия",
        from: "Португалии",
        to: "в Португалию",
        en: "Portugal",
        slug: "portugal",
        iso: "PT",
        inEU: true
    },
    "Greece": {
        ru: "Греция",
        from: "Греции",
        to: "в Грецию",
        en: "Greece",
        slug: "greece",
        iso: "GR",
        inEU: true
    },
    "Hungary": {
        ru: "Венгрия",
        from: "Венгрии",
        to: "в Венгрию",
        en: "Hungary",
        slug: "hungary",
        iso: "HU",
        inEU: true
    },
    "Sweden": {
        ru: "Швеция",
        from: "Швеции",
        to: "в Швецию",
        en: "Sweden",
        slug: "sweden",
        iso: "SE",
        inEU: true
    },
    "Denmark": {
        ru: "Дания",
        from: "Дании",
        to: "в Данию",
        en: "Denmark",
        slug: "denmark",
        iso: "DK",
        inEU: true
    },
    "Finland": {
        ru: "Финляндия",
        from: "Финляндии",
        to: "в Финляндию",
        en: "Finland",
        slug: "finland",
        iso: "FI",
        inEU: true
    },
    "Romania": {
        ru: "Румыния",
        from: "Румынии",
        to: "в Румынию",
        en: "Romania",
        slug: "romania",
        iso: "RO",
        inEU: true
    },
    "Bulgaria": {
        ru: "Болгария",
        from: "Болгарии",
        to: "в Болгарию",
        en: "Bulgaria",
        slug: "bulgaria",
        iso: "BG",
        inEU: true
    },
    "Croatia": {
        ru: "Хорватия",
        from: "Хорватии",
        to: "в Хорватию",
        en: "Croatia",
        slug: "croatia",
        iso: "HR",
        inEU: true
    },
    "Slovakia": {
        ru: "Словакия",
        from: "Словакии",
        to: "в Словакию",
        en: "Slovakia",
        slug: "slovakia",
        iso: "SK",
        inEU: true
    },
    "Slovenia": {
        ru: "Словения",
        from: "Словении",
        to: "в Словению",
        en: "Slovenia",
        slug: "slovenia",
        iso: "SI",
        inEU: true
    },
    "Estonia": {
        ru: "Эстония",
        from: "Эстонии",
        to: "в Эстонию",
        en: "Estonia",
        slug: "estonia",
        iso: "EE",
        inEU: true
    },
    "Latvia": {
        ru: "Латвия",
        from: "Латвии",
        to: "в Латвию",
        en: "Latvia",
        slug: "latvia",
        iso: "LV",
        inEU: true
    },
    "Lithuania": {
        ru: "Литва",
        from: "Литвы",
        to: "в Литву",
        en: "Lithuania",
        slug: "lithuania",
        iso: "LT",
        inEU: true
    },
    "Luxembourg": {
        ru: "Люксембург",
        from: "Люксембурга",
        to: "в Люксембург",
        en: "Luxembourg",
        slug: "luxembourg",
        iso: "LU",
        inEU: true
    },
    "Ireland": {
        ru: "Ирландия",
        from: "Ирландии",
        to: "в Ирландию",
        en: "Ireland",
        slug: "ireland",
        iso: "IE",
        inEU: true
    },
    "Cyprus": {
        ru: "Кипр",
        from: "Кипра",
        to: "на Кипр",
        en: "Cyprus",
        slug: "cyprus",
        iso: "CY",
        inEU: true
    },
    "Malta": {
        ru: "Мальта",
        from: "Мальты",
        to: "на Мальту",
        en: "Malta",
        slug: "malta",
        iso: "MT",
        inEU: true
    },

    // EXTENDED EUROPE (from Kirill's request)
    "UnitedKingdom": {
        ru: "Великобритания",
        from: "Великобритании",
        to: "в Великобританию",
        en: "United Kingdom",
        slug: "united-kingdom",
        iso: "GB",
        inEU: false,
        customsNote: "Brexit - дополнительные таможенные процедуры"
    },
    "Switzerland": {
        ru: "Швейцария",
        from: "Швейцарии",
        to: "в Швейцарию",
        en: "Switzerland",
        slug: "switzerland",
        iso: "CH",
        inEU: false,
        customsNote: "Не входит в ЕС - особые правила"
    },
    "Norway": {
        ru: "Норвегия",
        from: "Норвегии",
        to: "в Норвегию",
        en: "Norway",
        slug: "norway",
        iso: "NO",
        inEU: false,
        customsNote: "EEA member - упрощённые процедуры"
    },
    "Iceland": {
        ru: "Исландия",
        from: "Исландии",
        to: "в Исландию",
        en: "Iceland",
        slug: "iceland",
        iso: "IS",
        inEU: false,
        customsNote: "EEA member"
    },
    "Serbia": {
        ru: "Сербия",
        from: "Сербии",
        to: "в Сербию",
        en: "Serbia",
        slug: "serbia",
        iso: "RS",
        inEU: false,
        customsNote: "Кандидат в ЕС - полная таможня"
    },
    "Montenegro": {
        ru: "Черногория",
        from: "Черногории",
        to: "в Черногорию",
        en: "Montenegro",
        slug: "montenegro",
        iso: "ME",
        inEU: false,
        customsNote: "Кандидат в ЕС"
    },
    "Albania": {
        ru: "Албания",
        from: "Албании",
        to: "в Албанию",
        en: "Albania",
        slug: "albania",
        iso: "AL",
        inEU: false,
        customsNote: "Кандидат в ЕС"
    },
    "NorthMacedonia": {
        ru: "Северная Македония",
        from: "Северной Македонии",
        to: "в Северную Македонию",
        en: "North Macedonia",
        slug: "north-macedonia",
        iso: "MK",
        inEU: false,
        customsNote: "Кандидат в ЕС"
    },
    "Monaco": {
        ru: "Монако",
        from: "Монако",
        to: "в Монако",
        en: "Monaco",
        slug: "monaco",
        iso: "MC",
        inEU: false,
        customsNote: "Таможенный союз с Францией"
    },
    "Liechtenstein": {
        ru: "Лихтенштейн",
        from: "Лихтенштейна",
        to: "в Лихтенштейн",
        en: "Liechtenstein",
        slug: "liechtenstein",
        iso: "LI",
        inEU: false,
        customsNote: "EEA member"
    }
};

/**
 * Germany data for reference (from cities.js)
 */
export const GERMANY = {
    ru: "Германия",
    from: "Германии",
    to: "в Германию",
    en: "Germany",
    slug: "germany",
    iso: "DE",
    inEU: true
};

/**
 * Helper: Get all country slugs
 */
export function getAllCountrySlugs() {
    return Object.values(EUROPE_COUNTRIES).map(country => country.slug);
}

/**
 * Helper: Find country by slug
 */
export function getCountryBySlug(slug) {
    for (const country of Object.values(EUROPE_COUNTRIES)) {
        if (country.slug === slug) return country;
    }
    return null;
}
