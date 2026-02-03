/**
 * INTERCARGO - Dynamic Route Generator
 * Generates content for arbitrary city pairs on the fly.
 */

export function generateRouteContent(cityFrom, cityTo, language) {
    const isRu = language === 'ru';

    // 1. Generate SEO & Hero Data
    const hero = {
        title: isRu
            ? `Переезд из ${cityFrom.from} <span>${cityTo.to}</span>`
            : `Relocation from ${cityFrom.en} <span>to ${cityTo.en}</span>`,
        subtitle: isRu
            ? `Полный комплекс услуг по международному переезду: таможенное оформление, упаковка и доставка «от двери до двери».`
            : `Full international moving services: customs clearance, professional packing, and door-to-door delivery.`,
        en_subtitle: `Full international moving services: customs clearance, professional packing, and door-to-door delivery.`
    };

    // 2. Generate Customs Data
    const customs = {
        logic: ["EXPORT-DOCS", "TRANSIT", "IMPORT-Rules"],
        ru: `Оформление экспорта из страны выбытия (${cityFrom.ru}) и импорта в страну назначения (${cityTo.ru}). Мы готовим полный пакет документов, включая опись имущества и таможенные декларации, чтобы ваш груз прошел границу без задержек.`,
        en: `Export clearance from ${cityFrom.en} and import into ${cityTo.en}. We prepare the full export/import documentation package, including detailed inventory lists and customs declarations, ensuring your cargo crosses borders without delays.`
    };

    // 3. Generate FAQ Data
    const faq = [
        {
            q: `Сколько стоит переезд из ${cityFrom.from} ${cityTo.to}?`,
            a: `Стоимость зависит от объема груза (м³) и выбранного типа транспорта. Оставьте заявку, и мы рассчитаем точную смету в течение 24 часов.`,
            en_q: `How much does moving from ${cityFrom.en} to ${cityTo.en} cost?`,
            en_a: `The cost depends on the cargo volume (cbm) and transport mode. Request a quote, and we will provide a precise estimate within 24 hours.`
        },
        {
            q: `Нужно ли мне присутствовать при растаможке?`,
            a: `В большинстве случаев ваше личное присутствие на таможне не требуется. Мы выступаем вашим таможенным представителем по доверенности.`,
            en_q: `Do I need to be present for customs clearance?`,
            en_a: `In most cases, your personal presence is not required. We act as your customs broker via power of attorney.`
        },
        {
            q: `Сколько времени занимает доставка?`,
            a: `Сроки зависят от маршрута. Для направления ${cityFrom.ru} — ${cityTo.ru} ориентировочное время составляет от 7 до 21 дня.`,
            en_q: `How long does delivery take?`,
            en_a: `Transit times depend on the route. For ${cityFrom.en} — ${cityTo.en}, estimated delivery time is between 7 to 21 days.`
        }
    ];

    // 4. Generate Process Steps
    const process = [
        {
            title: "Оценка и договор",
            desc: "Бесплатный расчет стоимости и подписание договора.",
            en_title: "Quote & Contract",
            en_desc: "Free cost estimation and contract signing."
        },
        {
            title: "Упаковка",
            desc: "Профессиональная упаковка ваших вещей.",
            en_title: "Packing",
            en_desc: "Professional packing of your belongings."
        },
        {
            title: "Таможня",
            desc: "Оформление всех документов.",
            en_title: "Customs",
            en_desc: "Handling all documentation."
        },
        {
            title: "Доставка",
            desc: `Транспортировка ${cityTo.to} и разгрузка.`,
            en_title: "Delivery",
            en_desc: `Transport to ${cityTo.en} and unloading.`
        }
    ];

    // 5. Generate Cargo Types
    const cargo = {
        items: [
            { icon: "assets/img/icons/furniture.svg", title: "Мебель", en_title: "Furniture" },
            { icon: "assets/img/icons/electronics.svg", title: "Техника", en_title: "Electronics" },
            { icon: "assets/img/icons/boxes.svg", title: "Личные вещи", en_title: "Personal Items" },
            { icon: "assets/img/icons/fragile.svg", title: "Хрупкое", en_title: "Fragile" }
        ]
    };

    return {
        hero,
        customs,
        faq,
        process,
        cargo,
        subtitles: {
            what_we_transport: { ru: "Что мы перевозим", en: "What We Transport" },
            packaging: { ru: "Упаковка", en: "Packaging" }
        }
    };
}
