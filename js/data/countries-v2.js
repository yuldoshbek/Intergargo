/**
 * COUNTRY PILOT v2 - DATA LAYER
 * Core database for 6 pilot countries with multi-language metadata
 */

export const COUNTRIES_V2 = {
    "germany": {
        slug: "germany",
        eu: true,
        names: {
            ru: "Германия",
            en: "Germany",
            de: "Deutschland"
        },
        prepositions: {
            from: {
                ru: "Германии", // из Германии
                en: "Germany",
                de: "Deutschland"
            },
            to: {
                ru: "в Германию", // в Германию
                en: "to Germany",
                de: "nach Deutschland"
            }
        },
        currency: "EUR"
    },
    "spain": {
        slug: "spain",
        eu: true,
        names: {
            ru: "Испания",
            en: "Spain",
            de: "Spanien"
        },
        prepositions: {
            from: {
                ru: "Испании", // из Испании
                en: "Spain",
                de: "Spanien"
            },
            to: {
                ru: "в Испанию",
                en: "to Spain",
                de: "nach Spanien"
            }
        },
        currency: "EUR"
    },
    "italy": {
        slug: "italy",
        eu: true,
        names: {
            ru: "Италия",
            en: "Italy",
            de: "Italien"
        },
        prepositions: {
            from: {
                ru: "Италии",
                en: "Italy",
                de: "Italien"
            },
            to: {
                ru: "в Италию",
                en: "to Italy",
                de: "nach Italien"
            }
        },
        currency: "EUR"
    },
    "france": {
        slug: "france",
        eu: true,
        names: {
            ru: "Франция",
            en: "France",
            de: "Frankreich"
        },
        prepositions: {
            from: {
                ru: "Франции",
                en: "France",
                de: "Frankreich"
            },
            to: {
                ru: "во Францию",
                en: "to France",
                de: "nach Frankreich"
            }
        },
        currency: "EUR"
    },
    "united-kingdom": {
        slug: "united-kingdom",
        eu: false, // Brexit
        names: {
            ru: "Великобритания",
            en: "United Kingdom",
            de: "Vereinigtes Königreich"
        },
        prepositions: {
            from: {
                ru: "Великобритании",
                en: "UK",
                de: "Großbritannien"
            },
            to: {
                ru: "в Великобританию",
                en: "to UK",
                de: "nach Großbritannien"
            }
        },
        currency: "GBP"
    },
    "russia": {
        slug: "russia",
        eu: false,
        names: {
            ru: "Россия",
            en: "Russia",
            de: "Russland"
        },
        prepositions: {
            from: {
                ru: "России",
                en: "Russia",
                de: "Russland"
            },
            to: {
                ru: "в Россию",
                en: "to Russia",
                de: "nach Russland"
            }
        },
        currency: "RUB"
    }
};

// Helper: Get country by valid slug
export function getCountry(slug) {
    return COUNTRIES_V2[slug] || null;
}

// Helper: Get all countries array
export function getAllCountries() {
    return Object.values(COUNTRIES_V2);
}
