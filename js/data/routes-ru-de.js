/**
 * INTERCARGO - Russia → Germany Routes Content
 * All content for RU→DE direction (НОВОЕ!)
 */

export const ROUTES_RU_DE = {
    // City-Specific Overrides
    city_routes: {
        "moscow-berlin": {
            hero_subtitle: "Переезд из Москвы в Берлин. Подготовка документов для ЕС и помощь с поиском квартиры.",
            en_hero_subtitle: "Relocation from Moscow to Berlin. Document preparation for EU and apartment search assistance.",
            cargo_subtitle: "Акцент на быструю доставку личных вещей в Германию.",
            en_cargo_subtitle: "Focus on fast delivery of personal items to Germany."
        },
        "moscow-munich": {
            hero_subtitle: "Релокация из Москвы в Баварию. Полный спектр услуг от двери до двери.",
            en_hero_subtitle: "Relocation from Moscow to Bavaria. Full door-to-door service range.",
            cargo_subtitle: "Дизайнерские аксессуары и домашняя библиотека.",
            en_cargo_subtitle: "Designer accessories and home library."
        },
        "saint-petersburg-hamburg": {
            hero_subtitle: "Морской переезд из Санкт-Петербурга в Гамбург. Регулярные рейсы и портовая логистика.",
            en_hero_subtitle: "Sea relocation from Saint Petersburg to Hamburg. Regular sailings and port logistics.",
            cargo_subtitle: "Крупногабаритная мебель и семейные архивы.",
            en_cargo_subtitle: "Large furniture and family archives."
        },
        "saint-petersburg-berlin": {
            hero_subtitle: "Автопереезд из СПб в Берлин. Быстрое прохождение границы и доставка до двери.",
            en_hero_subtitle: "Road relocation from SPb to Berlin. Fast border crossing and door-to-door delivery.",
            cargo_subtitle: "Личные вещи и музыкальные инструменты.",
            en_cargo_subtitle: "Personal effects and musical instruments."
        },
        "kazan-berlin": {
            hero_subtitle: "Переезд из Казани в Германию. Сборные грузы и индивидуальные решения.",
            en_hero_subtitle: "Relocation from Kazan to Germany. Consolidated cargo and custom solutions.",
            cargo_subtitle: "Предметы быта и электроника.",
            en_cargo_subtitle: "Household items and electronics."
        }
    },

    // Parent Logic (Country-level fallbacks)
    subtitles: {
        what_we_transport: { ru: "Личные вещи и семейные ценности для релокации в ЕС.", en: "Personal effects and family valuables for EU relocation." },
        packaging: { ru: "Европейские стандарты упаковки для безопасной доставки на запад.", en: "European packing standards for safe westbound delivery." }
    },

    hero: {
        title: "Переезд из России <span>в Германию</span>",
        subtitle: "Релокация в ЕС с полным юридическим сопровождением и подбором жилья.",
        en_title: "Relocation from Russia <span>to Germany</span>",
        en_subtitle: "EU relocation with full legal support and housing assistance."
    },

    customs: {
        logic: ["RU-EXPORT", "EU-IMPORT", "TAX-REFUND", "RESIDENCE-DOCS"],
        ru: "Экспорт из РФ: документы для вывоза личных вещей, возврат НДС, справки о смене места жительства.",
        en: "Russia Export: personal effects documentation, VAT refund, residence change certificates."
    },

    faq: [
        {
            q: "Какие документы нужны для вывоза вещей из России?",
            a: "Опись имущества, подтверждение места жительства за границей, справка о несудимости (для релокации). Мы помогаем собрать полный пакет.",
            en_q: "What documents are needed to export items from Russia?",
            en_a: "Property inventory, proof of foreign residence, certificate of no criminal record (for relocation). We help gather the full package."
        },
        {
            q: "Можно ли вернуть НДС при переезде в ЕС?",
            a: "Да, при вывозе новых вещей можно оформить Tax Free. Мы помогаем с документами на таможне.",
            en_q: "Can I get VAT refund when moving to EU?",
            en_a: "Yes, Tax Free is available for new items. We assist with customs documentation."
        },
        {
            q: "Помогаете ли с арендой жилья в Германии?",
            a: "Да, у нас есть партнеры-риелторы в Берлине, Мюнхене и других городах. Подбор квартиры включен в пакет 'Премиум'.",
            en_q: "Do you help with housing rental in Germany?",
            en_a: "Yes, we have partner realtors in Berlin, Munich and other cities. Apartment search is included in 'Premium' package."
        }
    ],

    cargo: {
        items: [
            { title: "Личные вещи", en_title: "Personal Items", icon: "assets/cargo/clothes.jpg" },
            { title: "Книги и документы", en_title: "Books & Documents", icon: "assets/cargo/documents.jpg" },
            { title: "Мебель", en_title: "Furniture", icon: "assets/cargo/furniture.jpg" },
            { title: "Семейные ценности", en_title: "Family Valuables", icon: "assets/cargo/decor.jpg" }
        ]
    },

    process: [
        { title: "Опись и декларация", desc: "Составление описи для вывоза из РФ. Подготовка документов для ЕС.", en_title: "Inventory & Declaration", en_desc: "Creating inventory for Russia export. EU document preparation." },
        { title: "Транзит через границу", desc: "Сопровождение груза через таможню. Документы для въезда в ЕС.", en_title: "Border Transit", en_desc: "Cargo escort through customs. EU entry documentation." },
        { title: "Доставка в Германию", desc: "Растаможка в ЕС и доставка до нового адреса. Помощь с распаковкой.", en_title: "Delivery to Germany", en_desc: "EU customs clearance and delivery to new address. Unpacking assistance." }
    ]
};
