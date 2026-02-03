/**
 * CONTENT MANAGER
 * 
 * Pipeline: Check Store → Generate if Missing → Save → Return
 * 
 * Key principles:
 * 1. Single Source of Truth (content-store.json)
 * 2. Generate content ONCE, then cache forever
 * 3. Deterministic generation (same route = same text always)
 */

import { BLUEPRINTS, getBlueprintForRoute, getTimelineRange } from './blueprints.js';
import { EUROPE_COUNTRIES, GERMANY } from '../data/europe-countries.js';
import { PILOT_ROUTES } from '../data/routes-pilot.js';

/**
 * IN-MEMORY CONTENT STORE
 * In production, this would be loaded from content-store.json
 */
let contentStore = {};

/**
 * Main API: Get content for a route
 */
export async function getContent(routeSlug) {
    // 1. Check if content exists in store
    if (contentStore[routeSlug]) {
        console.log(`✅ Found cached content: ${routeSlug}`);
        return contentStore[routeSlug];
    }

    // 2. Generate new content
    console.log(`⚙️ Generating NEW content: ${routeSlug}`);
    const generated = await generateContent(routeSlug);

    // 3. Save to store
    contentStore[routeSlug] = generated;

    // 4. Persist to JSON (in real app, would write to file)
    // saveToFile(); // TODO: implement file writing

    return generated;
}

/**
 * Generate content for a route based on blueprints
 */
async function generateContent(routeSlug) {
    // Find route data
    const route = PILOT_ROUTES.find(r => r.slug === routeSlug);
    if (!route) {
        throw new Error(`Route not found: ${routeSlug}`);
    }

    // Get country objects
    const fromCountry = route.from === 'Germany' ? GERMANY : EUROPE_COUNTRIES[route.from];
    const toCountry = route.to === 'Germany' ? GERMANY : EUROPE_COUNTRIES[route.to];

    if (!fromCountry || !toCountry) {
        throw new Error(`Country not found for route: ${routeSlug}`);
    }

    const direction = route.direction;
    const isEU = toCountry.inEU !== false; // Assume EU if not explicitly set

    // Generate all blocks
    const content = {
        route_id: route.route_id,
        slug: routeSlug,
        direction: direction,

        // Hero block
        hero: generateHero(fromCountry, toCountry, direction),

        // Customs block
        customs: generateCustoms(fromCountry, toCountry, direction, isEU),

        // Timelines block
        timelines: generateTimelines(fromCountry, toCountry, isEU),

        // Internal Links block
        internal_links: generateInternalLinks(routeSlug, route),

        // FAQ block
        faq: generateFAQ(fromCountry, toCountry, direction),

        // Process block (same for all)
        process: generateProcess(fromCountry, toCountry),

        // Cargo block (same for all)
        cargo: generateCargo(),

        // SEO metadata
        seo: generateSEO(fromCountry, toCountry, direction)
    };

    return content;
}

/**
 * Generate Hero content
 */
function generateHero(fromCountry, toCountry, direction) {
    const blueprint = getBlueprintForRoute(direction, 'hero');

    // Deterministic text generation based on route
    const seed = hashString(`${fromCountry.slug}-${toCountry.slug}-hero`);

    const titleRu = `Переезд из ${fromCountry.from} <span>${toCountry.to}</span>`;
    const titleEn = `Relocation from ${fromCountry.en} <span>to ${toCountry.en}</span>`;

    // Generate subtitle with variations
    const subtitleVariations = {
        export: [
            `Профессиональная организация экспорта личных вещей из ${fromCountry.from} ${toCountry.to}. Полный комплекс услуг: упаковка, таможенное оформление, доставка door-to-door.`,
            `Организуем переезд из ${fromCountry.from} ${toCountry.to} под ключ. Экспорт с соблюдением всех немецких и европейских требований.`,
            `Комплексное решение для переезда: от упаковки в ${fromCountry.from} до доставки ${toCountry.to}. Таможня, логистика, страхование.`
        ],
        import: [
            `Организация переезда ${toCountry.to} под ключ. Помощь с таможней (Verzollung), оформлением документов и арендой жилья.`,
            `Переезд из ${fromCountry.from} в Германию без стресса. Растаможка, доставка, поддержка для новых резидентов.`,
            `Профессиональный импорт личных вещей ${toCountry.to}. Полное сопровождение: от упаковки до размещения в новом доме.`
        ]
    };

    const subtitleRu = selectDeterministic(subtitleVariations[direction], seed);
    const subtitleEn = direction === 'export'
        ? `Professional export of personal belongings from ${fromCountry.en} to ${toCountry.en}. Full service: packing, customs clearance, door-to-door delivery.`
        : `Relocation to ${toCountry.en} turnkey. Customs clearance (Verzollung), documentation, housing assistance.`;

    return {
        title: titleRu,
        en_title: titleEn,
        subtitle: subtitleRu,
        en_subtitle: subtitleEn
    };
}

/**
 * Generate Customs content
 */
function generateCustoms(fromCountry, toCountry, direction, isEU) {
    const blueprint = getBlueprintForRoute(direction, 'customs', isEU);
    const seed = hashString(`${fromCountry.slug}-${toCountry.slug}-customs`);

    const textVariations = {
        export: isEU ? [
            `Экспорт личных вещей из ${fromCountry.from} ${toCountry.to} требует оформления документов EX-1 или T1. Мы готовим полный пакет: детальную опись имущества, таможенную декларацию и все необходимые сертификаты. Для стран ЕС процедура упрощённая, груз проходит границу без задержек.`,
            `Оформляем экспорт из Германии с соблюдением всех регламентов. Документы EX-1, T1, полная опись — всё готовим за вас. Маршрут ${fromCountry.ru} → ${toCountry.ru} относится к внутриевропейским, что ускоряет прохождение таможни.`,
            `Таможенное оформление экспорта из ${fromCountry.from}: подготовка EX-1, инвентарной описи и деклараций. Для направления ${toCountry.to} применяются упрощённые правила ЕС — без лишних проверок и сборов.`
        ] : [
            `Экспорт из ${fromCountry.from} в ${toCountry.ru} (не входит в ЕС) требует полного таможенного оформления. Готовим документы EX-1, детальную опись и декларации. Учитываем специфику границы — ${toCountry.customsNote}.`,
            `Поскольку ${toCountry.ru} не является членом ЕС, экспорт требует прохождения полной таможни. Мы оформляем все документы (EX-1, T1, сертификаты) и контролируем процесс на границе.`
        ],
        import: isEU ? [
            `Ввоз личных вещей из ${fromCountry.from} в Германию (Verzollung) освобождён от пошлин при переезде на постоянное место жительства. Необходимо подтверждение статуса резидента или разрешение на проживание (Aufenthaltstitel). Мы оформляем все документы и помогаем с арендой жилья в Германии.`,
            `Растаможка при переезде из ${fromCountry.from} в Германию: если у вас есть вид на жительство, ввоз личных вещей беспошлинный. Мы готовим декларацию, подтверждаем резидентство и организуем возврат НДС.`,
            `Импорт ${toCountry.to} из стран ЕС — упрощённая процедура. При наличии Aufenthaltstitel ваши вещи проходят таможню без сборов. Консультируем по документам и помогаем с первыми шагами в Германии.`
        ] : [
            `Ввоз из ${fromCountry.from} (не ЕС) в Германию требует полной декларации. ${fromCountry.customsNote}. Мы оформляем импортные документы, помогаем с возвратом НДС и консультируем по правилам резидентства.`,
            `Поскольку ${fromCountry.ru} не входит в ЕС, при ввозе ${toCountry.to} применяется расширенная таможенная проверка. Готовим полный пакет документов, включая подтверждение переезда на ПМЖ.`
        ]
    };

    const textRu = selectDeterministic(textVariations[direction], seed);
    const textEn = direction === 'export'
        ? `Export from ${fromCountry.en} to ${toCountry.en} requires EX-1 or T1 documentation. We prepare complete inventory lists and customs declarations. ${isEU ? 'EU simplified procedure applies.' : toCountry.customsNote || 'Full customs clearance required.'}`
        : `Import to ${toCountry.en} from ${fromCountry.en}: ${isEU ? 'duty-free for residents with Aufenthaltstitel.' : 'full declaration required. ' + (fromCountry.customsNote || '')} We handle all documentation.`;

    return {
        logic: blueprint.logic_tags,
        ru: textRu,
        en: textEn
    };
}

/**
 * Generate Timelines content
 */
function generateTimelines(fromCountry, toCountry, isEU) {
    const timeRange = getTimelineRange(fromCountry.slug, toCountry.slug, isEU);
    const seed = hashString(`${fromCountry.slug}-${toCountry.slug}-timeline`);

    const variations = [
        `Доставка из ${fromCountry.from} ${toCountry.to} занимает ${timeRange}. ${isEU ? 'Прямой маршрут без таможенных остановок.' : 'Сроки учитывают прохождение таможни на границе.'} Точное время зависит от объёма груза и выбранного транспорта.`,
        `Ориентировочный срок для направления ${fromCountry.ru} → ${toCountry.ru}: ${timeRange}. ${isEU ? 'Груз идёт напрямую, без задержек на границе.' : 'Включено время на таможенное оформление.'} Рассчитаем точные сроки после оценки объёма.`,
        `Время в пути: ${timeRange}. Маршрут ${fromCountry.ru} — ${toCountry.ru} ${isEU ? 'проходит внутри ЕС, без дополнительных проверок' : 'требует таможенной остановки'}. Обновляем статус груза в режиме реального времени.`
    ];

    const textRu = selectDeterministic(variations, seed);
    const textEn = `Delivery from ${fromCountry.en} to ${toCountry.en} takes ${timeRange}. ${isEU ? 'Direct route within EU.' : 'Includes customs clearance time.'} Exact timing depends on cargo volume.`;

    return {
        ru: textRu,
        en: textEn,
        time_range: timeRange
    };
}

/**
 * Generate Internal Links
 */
function generateInternalLinks(currentSlug, route) {
    const links = [];
    const blueprint = BLUEPRINTS.internal_links;

    // 1. Reverse direction link
    const reverseSlug = route.direction === 'export'
        ? currentSlug.split('-').reverse().join('-')
        : currentSlug.split('-').reverse().join('-');

    const reverseRoute = PILOT_ROUTES.find(r => r.slug === reverseSlug);
    if (reverseRoute) {
        const fromCountry = reverseRoute.from === 'Germany' ? GERMANY : EUROPE_COUNTRIES[reverseRoute.from];
        const toCountry = reverseRoute.to === 'Germany' ? GERMANY : EUROPE_COUNTRIES[reverseRoute.to];

        links.push({
            label: `${fromCountry.ru} → ${toCountry.ru}`,
            url: `index.html?from_city=${reverseRoute.from}&to_city=${reverseRoute.to}`,
            type: 'reverse'
        });
    }

    // 2. Popular European routes (2-3 links)
    const popularRoutes = blueprint.popular_european_routes
        .filter(slug => slug !== currentSlug)
        .slice(0, 3);

    for (const slug of popularRoutes) {
        const popularRoute = PILOT_ROUTES.find(r => r.slug === slug);
        if (popularRoute) {
            const fromCountry = popularRoute.from === 'Germany' ? GERMANY : EUROPE_COUNTRIES[popularRoute.from];
            const toCountry = popularRoute.to === 'Germany' ? GERMANY : EUROPE_COUNTRIES[popularRoute.to];

            links.push({
                label: `${fromCountry.ru} → ${toCountry.ru}`,
                url: `index.html?from_city=${popularRoute.from}&to_city=${popularRoute.to}`,
                type: 'popular'
            });
        }
    }

    return links.slice(0, 4); // Max 4 links
}

/**
 * Generate FAQ
 */
function generateFAQ(fromCountry, toCountry, direction) {
    const blueprint = getBlueprintForRoute(direction, 'faq');
    const questions = blueprint.common_questions;

    const faq = questions.map(q => {
        return {
            q: generateQuestion(q.topic, fromCountry, toCountry, direction),
            a: generateAnswer(q.meaning, fromCountry, toCountry),
            en_q: generateQuestionEN(q.topic, fromCountry, toCountry, direction),
            en_a: q.meaning // Simplified for EN
        };
    });

    return faq;
}

function generateQuestion(topic, from, to, direction) {
    const templates = {
        cost: `Сколько стоит переезд из ${from.from} ${to.to}?`,
        documents: direction === 'export'
            ? `Какие документы нужны для экспорта из ${from.from}?`
            : `Какие документы требуются для ввоза ${to.to}?`,
        customs_presence: `Нужно ли моё присутствие при растаможке в Германии?`,
        time: `Сколько времени занимает доставка из ${from.from} ${to.to}?`,
        tax_free: `Можно ли ввезти вещи в Германию без пошлин?`,
        housing_help: `Помогаете ли с арендой жилья в Германии?`,
        insurance: `Включено ли страхование груза?`
    };
    return templates[topic] || templates.cost;
}

function generateAnswer(meaning, from, to) {
    return meaning; // Use blueprint meaning directly (can add variations later)
}

function generateQuestionEN(topic, from, to, direction) {
    const templates = {
        cost: `How much does moving from ${from.en} to ${to.en} cost?`,
        documents: `What documents are required for ${direction === 'export' ? 'export from' : 'import to'} ${direction === 'export' ? from.en : to.en}?`,
        customs_presence: `Do I need to be present for customs clearance?`,
        time: `How long does delivery from ${from.en} to ${to.en} take?`,
        tax_free: `Can I import items to Germany duty-free?`,
        housing_help: `Do you assist with housing in Germany?`,
        insurance: `Is cargo insurance included?`
    };
    return templates[topic] || templates.cost;
}

/**
 * Generate Process (same for all routes)
 */
function generateProcess(from, to) {
    return [
        { title: "Оценка и договор", desc: "Бесплатный расчёт стоимости и подписание договора.", en_title: "Quote & Contract", en_desc: "Free cost estimation and contract signing." },
        { title: "Упаковка", desc: "Профессиональная упаковка ваших вещей.", en_title: "Packing", en_desc: "Professional packing of your belongings." },
        { title: "Таможня", desc: "Оформление всех документов.", en_title: "Customs", en_desc: "Handling all documentation." },
        { title: "Доставка", desc: `Транспортировка ${to.to} и разгрузка.`, en_title: "Delivery", en_desc: `Transport to ${to.en} and unloading.` }
    ];
}

/**
 * Generate Cargo (same for all routes)
 */
function generateCargo() {
    return {
        items: [
            { icon: "assets/img/icons/furniture.svg", title: "Мебель", en_title: "Furniture" },
            { icon: "assets/img/icons/electronics.svg", title: "Техника", en_title: "Electronics" },
            { icon: "assets/img/icons/boxes.svg", title: "Личные вещи", en_title: "Personal Items" },
            { icon: "assets/img/icons/fragile.svg", title: "Хрупкое", en_title: "Fragile" }
        ]
    };
}

/**
 * Generate SEO metadata
 */
function generateSEO(from, to, direction) {
    const blueprint = BLUEPRINTS.seo[direction];

    const title = blueprint.title_template
        .replace('[COUNTRY]', to.ru);

    const description = blueprint.description_meaning
        .replace('[COUNTRY]', to.ru);

    return {
        title,
        description,
        en_title: direction === 'export'
            ? `Relocation from Germany to ${to.en} | Intrelo`
            : `Relocation from ${from.en} to Germany | Intrelo`,
        en_description: description, // Can add EN variations later
        schema_description: `International moving service from ${from.en} to ${to.en}`
    };
}

/**
 * HELPERS
 */

// Simple hash function for deterministic seed
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// Select item from array deterministically based on seed
function selectDeterministic(array, seed) {
    const index = seed % array.length;
    return array[index];
}

/**
 * Export content store (for saving to file)
 */
export function getContentStore() {
    return contentStore;
}

/**
 * Load content store (from file)
 */
export function loadContentStore(data) {
    contentStore = data;
}
