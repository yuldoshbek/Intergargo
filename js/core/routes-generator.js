/**
 * INTERCARGO - Dynamic Route Generator
 * Generates deterministic content based on blueprints and route data.
 */

import { getBlueprintForRoute, getTimelineRange } from './blueprints.js';
import { getCountryName, getCountryPreposition } from './engine.js';

// Simple deterministic RNG
function getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

function selectDeterministically(array, seed) {
    if (!array || array.length === 0) return "";
    const index = seed % array.length;
    return array[index];
}

export function generateRouteContent(cityFrom, cityTo, language) {
    const routeSlug = `${cityFrom.slug}-${cityTo.slug}`;
    const seed = getHash(routeSlug);

    // Determine Logic/Direction
    // Germany -> X (Export) if From is Germany
    // X -> Germany (Import) if To is Germany
    // Generic otherwise
    let direction = 'generic';
    if (cityFrom.slug === 'germany') direction = 'export';
    else if (cityTo.slug === 'germany') direction = 'import';

    const isEU = (cityFrom.eu !== false) && (cityTo.eu !== false);

    // --- 1. HERO ---
    const fromName = getCountryPreposition(cityFrom, 'from', language);
    const toName = getCountryPreposition(cityTo, 'to', language);

    // Fallback strings if blueprints miss
    const heroTitle = language === 'ru'
        ? `Переезд из ${fromName} ${toName}`
        : `Relocation from ${getCountryName(cityFrom, 'en')} to ${getCountryName(cityTo, 'en')}`;

    // --- 2. CUSTOMS ---
    const customsBP = getBlueprintForRoute(direction, 'customs', isEU);
    let customsText = "";
    let logicTags = [];

    if (customsBP) {
        const textOptions = customsBP.meaning[language] || customsBP.meaning.ru;
        customsText = selectDeterministically(textOptions, seed);
        logicTags = customsBP.logic_tags || [];
    }

    const customs = {
        text: customsText,
        logic: logicTags,
        [language]: customsText // Legacy compat
    };

    // --- 3. TIMELINES ---
    const timelinesBP = getBlueprintForRoute(direction, 'timelines');
    let timelineText = "";
    if (timelinesBP) {
        const tOptions = timelinesBP.meaning[language] || timelinesBP.meaning.ru;
        timelineText = selectDeterministically(tOptions, seed + 1);
    }
    const timeRange = getTimelineRange(cityFrom.slug, cityTo.slug, isEU);

    const timelines = {
        text: timelineText,
        time_range: timeRange,
        [language]: timelineText
    };

    // --- 4. PROCESS ---
    const processBP = getBlueprintForRoute(direction, 'process');
    const processSteps = (processBP && processBP.meaning[language])
        ? processBP.meaning[language].map((step, i) => {
            // Split "1. Title" from text if formatted like that, or just use as desc
            // Current blueprint has "1. Title" strings.
            return { title: step, desc: "" }; // Simplified
        })
        : [];

    // --- 5. FAQ ---
    // FAQ is structure differently in new blueprints (questions: [{q:{ru...}, a:{ru...}}])
    const faqBP = getBlueprintForRoute(direction, 'faq'); // might be nested under export/import
    const faqData = [];
    if (faqBP && faqBP.questions) {
        faqBP.questions.forEach(qObj => {
            faqData.push({
                q: qObj.q[language] || qObj.q.ru,
                a: qObj.a[language] || qObj.a.ru
            });
        });
    }

    // --- 6. CARGO ---
    // Using static list from legacy generator logic but localized
    // We can add this to blueprints later if needed
    const cargoItems = [
        { icon: "assets/img/icons/furniture.svg", title: { ru: "Мебель", en: "Furniture", de: "Möbel" } },
        { icon: "assets/img/icons/electronics.svg", title: { ru: "Техника", en: "Electronics", de: "Elektronik" } },
        { icon: "assets/img/icons/boxes.svg", title: { ru: "Личные вещи", en: "Personal Items", de: "Persönliche Sachen" } },
        { icon: "assets/img/icons/fragile.svg", title: { ru: "Хрупкое", en: "Fragile", de: "Zerbrechliches" } }
    ];

    const cargo = {
        items: cargoItems.map(item => ({
            icon: item.icon,
            title: item.title[language] || item.title.ru
        }))
    };

    // --- 7. SEO ---
    // Construct SEO based on route
    // Could use blueprints if defined, for now use logic from seo.js concept
    // But route-generator creates content object, which might be used by engine.js to set SEO.
    // Engine lines 58: updateSEO(cityFrom, cityTo, language). it ignores routeContent.seo for Dynamic routes?
    // Wait, updateSEOFromContent (line 409) is used for STORE content.
    // Standard updatePageContent uses updateSEO(cityFrom, cityTo, language) which generates it.
    // So we don't strictly need to return fancy SEO here for dynamic routes, but good to have.

    return {
        hero: {
            title: heroTitle,
            subtitle: "..." // Can add blueprint selection here
        },
        customs,
        timelines,
        process: processSteps,
        faq: faqData,
        cargo,
        internal_links: [] // Generated by helper in engine or omitted
    };
}
