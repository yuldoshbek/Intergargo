/**
 * INTERCARGO - Germany → Russia Routes Content
 * All content for DE→RU direction
 */

export const ROUTES_DE_RU = {
    // City-Specific Overrides
    city_routes: {
        "berlin-moscow": {
            hero_subtitle: "Прямые рейсы Берлин → Москва. Полное сопровождение документов для возвращающихся соотечественников.",
            en_hero_subtitle: "Direct Berlin → Moscow flights. Full document support for returning residents.",
            cargo_subtitle: "С фокусом на электронику и бытовую технику из столицы Германии.",
            en_cargo_subtitle: "Focusing on electronics and appliances from the German capital."
        },
        "munich-moscow": {
            hero_subtitle: "Премиальный переезд из Баварии. Индивидуальная упаковка для дизайнерской мебели и техники.",
            en_hero_subtitle: "Premium relocation from Bavaria. Custom packing for designer furniture and appliances.",
            cargo_subtitle: "Особое внимание к мебели и хрупким предметам интерьера.",
            en_cargo_subtitle: "Special attention to furniture and fragile interior items."
        },
        "hamburg-moscow": {
            hero_subtitle: "Логистический узел Гамбург. Морские и наземные маршруты с консолидацией в порту.",
            en_hero_subtitle: "Hamburg logistics hub. Sea and land routes with consolidation at the port.",
            cargo_subtitle: "Эффективная перевозка крупногабаритных грузов и контейнеров.",
            en_cargo_subtitle: "Efficient transport of oversized cargo and containers."
        },
        "frankfurt-moscow": {
            hero_subtitle: "Бизнес-релокация из Франкфурта. Срочные авиаперевозки и VIP-сопровождение.",
            en_hero_subtitle: "Business relocation from Frankfurt. Urgent air freight and VIP handling.",
            cargo_subtitle: "Документы, архивы и премиальная электроника.",
            en_cargo_subtitle: "Documents, archives, and premium electronics."
        },
        "dusseldorf-moscow": {
            hero_subtitle: "Переезд из Дюссельдорфа. Оптимальные автомаршруты через Европу.",
            en_hero_subtitle: "Relocation from Dusseldorf. Optimized road routes through Europe.",
            cargo_subtitle: "Личные вещи, одежда и семейные коллекции.",
            en_cargo_subtitle: "Personal effects, clothing, and family collections."
        }
    },

    // Parent Logic (Country-level fallbacks)
    subtitles: {
        what_we_transport: { ru: "Личные вещи, мебель и техника с описью для таможни.", en: "Personal effects, furniture and appliances with customs inventory." },
        packaging: { ru: "Упаковка, выдерживающая до 4-х перегрузок на границах.", en: "Packing designed to withstand up to 4 transfers at borders." }
    },

    hero: {
        title: "Переезд из Германии <span>в Россию под ключ</span>",
        subtitle: "Безопасная доставка личных вещей с учетом санкций 2024-2025.",
        en_title: "Relocation from Germany <span>to Russia Turnkey</span>",
        en_subtitle: "Safe delivery of personal effects considering 2024-2025 sanctions."
    },

    customs: {
        logic: ["EU-REGULATIONS", "STRICT-INVENTORY", "SANCTIONS-CHECK"],
        ru: "Экспорт из Германии: точная опись, аудит чеков на электронику (>750€) и соблюдение экспортных квот ЕС.",
        en: "Germany Export: precise inventory, electronics receipt audit (>750€), and EU export quota compliance."
    },

    faq: [
        {
            q: "Какие вещи нельзя вывозить из Германии в Россию?",
            a: "Электроника дороже 750€, предметы роскоши, некоторые типы медицинского оборудования. Мы проверяем каждую позицию на соответствие санкционным спискам.",
            en_q: "What items are prohibited from Germany to Russia?",
            en_a: "Electronics >750€, luxury goods, certain medical equipment. We verify each item against sanctions lists."
        },
        {
            q: "Сколько времени занимает переезд?",
            a: "Автоперевозка занимает 7-10 дней с учетом таможенного оформления. Срочная доставка — от 3 дней.",
            en_q: "How long does relocation take?",
            en_a: "Road transport takes 7-10 days including customs clearance. Express delivery from 3 days."
        }
    ],

    cargo: {
        items: [
            { title: "Техника", en_title: "Appliances", icon: "assets/cargo/appliances.jpg" },
            { title: "Мебель", en_title: "Furniture", icon: "assets/cargo/furniture.jpg" },
            { title: "Одежда", en_title: "Clothing", icon: "assets/cargo/clothes.jpg" },
            { title: "Документы", en_title: "Documents", icon: "assets/cargo/documents.jpg" }
        ]
    },

    process: [
        { title: "Сбор и опись", desc: "Упаковка в 5-слойный картон. Детальная опись для таможни РФ.", en_title: "Collection & Inventory", en_desc: "5-layer cardboard packing. Detailed customs inventory for Russia." },
        { title: "Таможня ЕС", desc: "Декларирование экспорта и аудит по санкционным спискам.", en_title: "EU Customs", en_desc: "Export declaration and sanctions compliance audit." },
        { title: "Доставка в РФ", desc: "Транзит через границу, растаможка и доставка до двери.", en_title: "Delivery to Russia", en_desc: "Border transit, customs clearance, and door-to-door delivery." }
    ]
};
