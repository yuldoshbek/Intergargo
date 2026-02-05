/**
 * MEANING BLUEPRINTS
 * 
 * Core concept: Each blueprint defines WHAT to say in 3 languages.
 * The generator deterministicly selects variations.
 */

export const BLUEPRINTS = {
    /**
     * CUSTOMS BLOCK
     */
    customs: {
        // Export (Germany -> Out)
        export: {
            meaning: {
                ru: [
                    "Экспорт личных вещей из Германии требует оформления документов EX-1 или T1.",
                    "Мы готовим полный пакет документов: детальную опись имущества и таможенную декларацию.",
                    "Для стран ЕС процедура упрощённая, для не-ЕС (Великобритания, РФ) — полная таможенная очистка."
                ],
                en: [
                    "Exporting personal effects from Germany requires EX-1 or T1 documentation.",
                    "We prepare the full package: detailed inventory list and customs declaration.",
                    "Simplified procedure for EU; full customs clearance for non-EU (UK, Russia)."
                ],
                de: [
                    "Der Export von Umzugsgut aus Deutschland erfordert EX-1 oder T1 Dokumente.",
                    "Wir erstellen alle Unterlagen: detaillierte Inventarliste und Ausfuhranmeldung.",
                    "Vereinfachtes Verfahren für EU; volle Zollabfertigung für Nicht-EU (UK, Russland)."
                ]
            },
            logic_tags_eu: ["EX-1", "T1", "EU-SIMPLIFIED"],
            logic_tags_non_eu: ["EX-1", "FULL-CUSTOMS", "BORDER-CONTROL"]
        },

        // Import (In -> Germany)
        import: {
            meaning: {
                ru: [
                    "Ввоз личных вещей в Германию (Verzollung) освобождён от пошлин при переезде на ПМЖ.",
                    "Необходимо подтверждение статуса резидента или разрешение на проживание (Aufenthaltstitel).",
                    "Мы оформляем растаможку и помогаем с бюрократией."
                ],
                en: [
                    "Importing personal effects into Germany (Verzollung) is duty-free for relocation.",
                    "Proof of residence or residence permit (Aufenthaltstitel) is required.",
                    "We handle customs clearance and assist with bureaucracy."
                ],
                de: [
                    "Die Einfuhr von Umzugsgut nach Deutschland ist bei Wohnsitzwechsel zollfrei.",
                    "Aufenthaltstitel oder Meldebescheinigung ist erforderlich.",
                    "Wir kümmern uns um die Verzollung und Formalitäten."
                ]
            },
            logic_tags_eu: ["VERZOLLUNG", "TAX-FREE", "RESIDENCE-PERMIT"],
            logic_tags_non_eu: ["IMPORT-DUTIES", "FULL-DECLARATION", "VAT-REFUND"]
        }
    },

    /**
     * TIMELINES
     */
    timelines: {
        meaning: {
            ru: [
                "Срок доставки зависит от маршрута и выбранного транспорта.",
                "Прямые рейсы по Европе занимают 3-7 дней.",
                "Маршруты с таможней (РФ, UK) занимают 7-14 дней."
            ],
            en: [
                "Delivery time depends on the route and transport mode.",
                "Direct shipments within Europe take 3-7 days.",
                "Routes with customs (Russia, UK) take 7-14 days."
            ],
            de: [
                "Die Lieferzeit hängt von der Route und dem Transportmittel ab.",
                "Direktfahrten in Europa dauern 3-7 Tage.",
                "Routen mit Zollabfertigung (Russland, UK) dauern 7-14 Tage."
            ]
        },
        time_ranges: {
            eu_core: "3-5 days",
            eu_nordic: "5-7 days",
            eu_eastern: "4-6 days",
            eu_southern: "5-8 days",
            non_eu_uk: "7-10 days",
            non_eu_balkan: "10-14 days",
            non_eu_switzerland: "5-7 days",
            non_eu_russia: "14-21 days"
        }
    },

    /**
     * PROCESS
     */
    process: {
        meaning: {
            ru: [
                "1. Оценка и договор",
                "2. Упаковка вещей",
                "3. Таможенное оформление",
                "4. Доставка и разгрузка"
            ],
            en: [
                "1. Quote & Contract",
                "2. Professional Packing",
                "3. Customs Clearance",
                "4. Delivery & Unloading"
            ],
            de: [
                "1. Angebot & Vertrag",
                "2. Professionelle Verpackung",
                "3. Zollabwicklung",
                "4. Lieferung & Entladen"
            ]
        }
    },

    /**
     * FAQ Templates
     */
    faq: {
        export: {
            // Arrays of Question Objects per language? 
            // Better structure: list of topics, each has translations
            questions: [
                {
                    id: "cost",
                    q: {
                        ru: "Сколько стоит переезд?",
                        en: "How much does the move cost?",
                        de: "Was kostet der Umzug?"
                    },
                    a: {
                        ru: "Стоимость зависит от объёма. Запросите бесплатную смету.",
                        en: "Cost depends on volume. Request a free quote.",
                        de: "Die Kosten hängen vom Volumen ab. Fragen Sie ein kostenloses Angebot an."
                    }
                },
                {
                    id: "docs",
                    q: {
                        ru: "Какие документы нужны?",
                        en: "What documents are needed?",
                        de: "Welche Dokumente werden benötigt?"
                    },
                    a: {
                        ru: "Паспорт, виза/ВНЖ, опись имущества, доверенность.",
                        en: "Passport, Visa/Residence permit, Inventory list, Power of Attorney.",
                        de: "Reisepass, Visum/Aufenthaltstitel, Inventarliste, Vollmacht."
                    }
                }
            ]
        }
    }
};

/**
 * Helper: Get Blueprint
 */
export function getBlueprintForRoute(direction, block, isEU = true) {
    const bp = BLUEPRINTS[block];
    if (!bp) return null;
    return bp[direction] || bp; // Directional or Generic
}

export function getTimelineRange(fromSlug, toSlug, isEU) {
    // Simplified logic
    if (toSlug === 'russia' || fromSlug === 'russia') return BLUEPRINTS.timelines.time_ranges.non_eu_russia;
    if (toSlug === 'united-kingdom' || fromSlug === 'united-kingdom') return BLUEPRINTS.timelines.time_ranges.non_eu_uk;
    return BLUEPRINTS.timelines.time_ranges.eu_core; // Default
}
