/**
 * MEANING BLUEPRINTS
 * 
 * Core concept: These define WHAT to say (meaning), not HOW to say it (exact words).
 * Each blueprint contains 2-3 key points that MUST be conveyed in the generated text.
 * 
 * The content generator will:
 * 1. Read the blueprint for a block
 * 2. Generate unique text that preserves these core meanings
 * 3. Use deterministic variation (same route = same text)
 */

export const BLUEPRINTS = {
    /**
     * CUSTOMS BLOCK
     * Different logic for export vs import
     */
    customs: {
        // Germany -> EU Country (Export)
        export: {
            meaning: [
                "Экспорт личных вещей из Германии требует оформления документов EX-1 или T1",
                "Мы готовим полный пакет документов: детальную опись имущества и таможенную декларацию",
                "Для стран ЕС процедура упрощённая, для не-ЕС стран (Великобритания, Швейцария, Сербия) — полная таможня"
            ],
            logic_tags_eu: ["EX-1", "T1", "EU-SIMPLIFIED"],
            logic_tags_non_eu: ["EX-1", "FULL-CUSTOMS", "BORDER-CONTROL"]
        },

        // EU Country -> Germany (Import)
        import: {
            meaning: [
                "Ввоз личных вещей в Германию (Verzollung) освобождён от пошлин при переезде на постоянное место жительства",
                "Необходимо подтверждение статуса резидента или разрешение на проживание (Aufenthaltstitel)",
                "Мы оформляем возврат НДС для граждан, выезжающих из стран ЕС, и помогаем с арендой жилья в Германии"
            ],
            logic_tags_eu: ["VERZOLLUNG", "TAX-FREE", "RESIDENCE-PERMIT"],
            logic_tags_non_eu: ["IMPORT-DUTIES", "FULL-DECLARATION", "VAT-REFUND"]
        }
    },

    /**
     * TIMELINES BLOCK
     * Delivery time estimates based on route and EU status
     */
    timelines: {
        meaning: [
            "Срок доставки зависит от маршрута и выбранного транспорта",
            "Для стран ЕС — прямой маршрут без таможенных остановок (3-7 дней)",
            "Для не-ЕС стран (Великобритания после Brexit, Швейцария, Сербия) — с учётом таможни (7-14 дней)"
        ],
        // Time ranges by route type
        time_ranges: {
            eu_core: "3-5 дней",          // Germany <-> FR, ES, IT, NL, BE, AT, PL
            eu_nordic: "5-7 дней",        // Germany <-> SE, DK, FI
            eu_eastern: "4-6 дней",       // Germany <-> HU, CZ, SK, SI
            eu_southern: "5-8 дней",      // Germany <-> GR, PT, Cyprus, Malta
            non_eu_uk: "7-10 дней",       // Germany <-> UK (Brexit customs)
            non_eu_balkan: "10-14 дней",  // Germany <-> RS, ME, AL, MK
            non_eu_switzerland: "5-7 дней" // Germany <-> CH (special rules)
        }
    },

    /**
     * INTERNAL LINKS BLOCK
     * Cross-linking between related routes for SEO
     */
    internal_links: {
        meaning: [
            "Ссылки на популярные маршруты из той же страны отправления",
            "Ссылка на обратное направление (экспорт ↔ импорт)",
            "Ссылки на соседние страны или альтернативные направления"
        ],
        // Link generation rules
        rules: {
            same_origin: 3,      // 3 links to routes with same origin country
            reverse_direction: 1, // 1 link to reverse route (DE->FR links to FR->DE)
            popular_routes: 2    // 2 links to most popular European routes
        },
        popular_european_routes: [
            "germany-france",
            "germany-spain",
            "germany-italy",
            "france-germany",
            "spain-germany",
            "italy-germany"
        ]
    },

    /**
     * HERO BLOCK
     * Title and subtitle for each route
     */
    hero: {
        export: {
            meaning: [
                "Профессиональная организация переезда из Германии",
                "Полный комплекс услуг: упаковка, таможня, доставка door-to-door",
                "Экспорт личных вещей с соблюдением всех немецких и европейских требований"
            ]
        },
        import: {
            meaning: [
                "Организация переезда в Германию под ключ",
                "Помощь с таможней (Verzollung), растаможкой и оформлением документов",
                "Поддержка в аренде жилья и адаптации для новых резидентов Германии"
            ]
        }
    },

    /**
     * FAQ BLOCK
     * Common questions, different for export vs import
     */
    faq: {
        export: {
            common_questions: [
                {
                    topic: "cost",
                    meaning: "Стоимость зависит от объёма груза (м³) и транспорта. Бесплатный расчёт за 24 часа."
                },
                {
                    topic: "documents",
                    meaning: "Какие документы нужны для экспорта из Германии? EX-1, опись имущества, договор."
                },
                {
                    topic: "time",
                    meaning: "Сроки зависят от направления: ЕС быстрее (3-7 дней), не-ЕС дольше (7-14 дней)."
                },
                {
                    topic: "insurance",
                    meaning: "Страхование груза включено. Полная компенсация при повреждении."
                }
            ]
        },
        import: {
            common_questions: [
                {
                    topic: "cost",
                    meaning: "Стоимость зависит от объёма и маршрута. Бесплатная оценка за 24 часа."
                },
                {
                    topic: "customs_presence",
                    meaning: "Нужно ли моё присутствие при растаможке? Нет, мы представляем вас по доверенности."
                },
                {
                    topic: "tax_free",
                    meaning: "Можно ли ввезти вещи в Германию без пошлин? Да, при переезде на ПМЖ и наличии резидентства."
                },
                {
                    topic: "housing_help",
                    meaning: "Помогаете ли с арендой жилья в Германии? Да, консультируем по районам и агентствам."
                }
            ]
        }
    },

    /**
     * PROCESS BLOCK
     * Step-by-step process, same for both directions
     */
    process: {
        meaning: [
            "Шаг 1: Бесплатная оценка стоимости и подписание договора",
            "Шаг 2: Профессиональная упаковка ваших вещей",
            "Шаг 3: Оформление таможенных документов",
            "Шаг 4: Доставка door-to-door и разгрузка"
        ]
    },

    /**
     * CARGO TYPES
     * What we transport (same for all routes)
     */
    cargo: {
        items: [
            { type: "furniture", meaning: "Мебель любых габаритов" },
            { type: "electronics", meaning: "Техника и электроника" },
            { type: "personal", meaning: "Личные вещи и документы" },
            { type: "fragile", meaning: "Хрупкие предметы (посуда, антиквариат)" }
        ]
    },

    /**
     * SEO META TAGS
     * Title and description templates
     */
    seo: {
        export: {
            title_template: "Переезд из Германии в [COUNTRY] под ключ | Intrelo",
            description_meaning: "Профессиональный экспорт личных вещей из Германии. Упаковка, таможня, доставка door-to-door. Опыт работы с [COUNTRY]."
        },
        import: {
            title_template: "Переезд из [COUNTRY] в Германию под ключ | Intrelo",
            description_meaning: "Организация переезда в Германию: растаможка (Verzollung), оформление документов, помощь с жильём. Переезд из [COUNTRY] без стресса."
        }
    }
};

/**
 * Helper: Get blueprint for specific route
 */
export function getBlueprintForRoute(direction, block, isEU = true) {
    const blueprint = BLUEPRINTS[block];
    if (!blueprint) return null;

    // Handle direction-specific blueprints
    if (blueprint[direction]) {
        const directionBlueprint = blueprint[direction];

        // For customs, return appropriate logic tags
        if (block === 'customs') {
            return {
                meaning: directionBlueprint.meaning,
                logic_tags: isEU ? directionBlueprint.logic_tags_eu : directionBlueprint.logic_tags_non_eu
            };
        }

        return directionBlueprint;
    }

    // Return generic blueprint if no direction specified
    return blueprint;
}

/**
 * Helper: Get timeline range for route
 */
export function getTimelineRange(fromCountry, toCountry, isEU) {
    if (!isEU) {
        if (fromCountry === 'UnitedKingdom' || toCountry === 'UnitedKingdom') {
            return BLUEPRINTS.timelines.time_ranges.non_eu_uk;
        }
        if (['Serbia', 'Montenegro', 'Albania', 'NorthMacedonia'].includes(fromCountry) ||
            ['Serbia', 'Montenegro', 'Albania', 'NorthMacedonia'].includes(toCountry)) {
            return BLUEPRINTS.timelines.time_ranges.non_eu_balkan;
        }
        if (fromCountry === 'Switzerland' || toCountry === 'Switzerland') {
            return BLUEPRINTS.timelines.time_ranges.non_eu_switzerland;
        }
    }

    // EU routes
    const nordic = ['Sweden', 'Denmark', 'Finland', 'Norway', 'Iceland'];
    const eastern = ['Poland', 'CzechRepublic', 'Hungary', 'Slovakia', 'Slovenia'];
    const southern = ['Greece', 'Portugal', 'Cyprus', 'Malta'];

    if (nordic.includes(fromCountry) || nordic.includes(toCountry)) {
        return BLUEPRINTS.timelines.time_ranges.eu_nordic;
    }
    if (eastern.includes(fromCountry) || eastern.includes(toCountry)) {
        return BLUEPRINTS.timelines.time_ranges.eu_eastern;
    }
    if (southern.includes(fromCountry) || southern.includes(toCountry)) {
        return BLUEPRINTS.timelines.time_ranges.eu_southern;
    }

    return BLUEPRINTS.timelines.time_ranges.eu_core;
}
