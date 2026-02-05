/**
 * INTERCARGO - SEO Module
 * Dynamic Meta Tags & Schema.org Markup Generation
 */

/**
 * Helper: Resolve Name
 */
function getName(obj, lang) {
    if (!obj) return '';
    if (obj.names && obj.names[lang]) return obj.names[lang]; // V2
    return obj[lang] || obj.slug || 'Unknown'; // Legacy
}

/**
 * Helper: Resolve Preposition
 */
function getPreposition(obj, type, lang) {
    if (!obj) return '';
    if (obj.prepositions && obj.prepositions[type] && obj.prepositions[type][lang]) {
        return obj.prepositions[type][lang];
    }
    // Legacy fallback
    if (type === 'from') {
        if (lang === 'ru' && obj.from) return obj.from;
        if (lang === 'en') return obj.en;
    }
    if (type === 'to') {
        if (lang === 'ru' && obj.to) return obj.to;
        if (lang === 'en') return "to " + obj.en;
    }
    return getName(obj, lang);
}

/**
 * Update SEO meta tags based on route
 */
export function updateSEO(cityFrom, cityTo, language) {
    const fromName = getPreposition(cityFrom, 'from', language);
    const toName = getPreposition(cityTo, 'to', language);

    // Title
    let title;
    if (language === 'ru') {
        title = `Переезд из ${fromName} ${toName} под ключ | Intrelo`;
    } else {
        // English Names for generic format
        const fromEn = getName(cityFrom, 'en');
        const toEn = getName(cityTo, 'en');
        title = `Relocation from ${fromEn} to ${toEn} | Intrelo`;
    }

    document.title = title;

    // Meta Description
    let description;
    if (language === 'ru') {
        description = `Профессиональный переезд ${fromName} ${toName}. Упаковка, таможня, доставка door-to-door. 20 лет опыта в международных переездах.`;
    } else {
        const fromEn = getName(cityFrom, 'en');
        const toEn = getName(cityTo, 'en');
        description = `Professional relocation from ${fromEn} to ${toEn}. Packing, customs, door-to-door delivery. 20 years of international moving experience.`;
    }

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', description);
    }

    // Open Graph Tags
    updateOpenGraph(cityFrom, cityTo, title, description, language);
}

/**
 * Update Open Graph meta tags for social sharing
 */
function updateOpenGraph(cityFrom, cityTo, title, description, language) {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', description);
    if (ogUrl) {
        const url = `https://intrelo.com/${language}/international-moving/${cityFrom.slug}-${cityTo.slug}`;
        ogUrl.setAttribute('content', url);
    }
}

/**
 * Generate and inject Schema.org JSON-LD structured data
 */
export function injectSchemaOrg(cityFrom, cityTo, language) {
    const baseUrl = 'https://intrelo.com';

    const fromName = getName(cityFrom, language);
    const toName = getName(cityTo, language);
    const fromPrep = getPreposition(cityFrom, 'from', language);
    const toPrep = getPreposition(cityTo, 'to', language);

    // BreadcrumbList Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": language === 'ru' ? "Главная" : "Home",
                "item": baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": language === 'ru' ? "Международные переезды" : "International Moving",
                "item": `${baseUrl}/international-moving`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": `${fromName} → ${toName}`
            }
        ]
    };

    // Service Schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "International Relocation Service",
        "provider": {
            "@type": "Organization",
            "name": "Intrelo",
            "url": baseUrl,
            "logo": `${baseUrl}/assets/logo.png`,
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+7-495-480-48-48",
                "contactType": "Customer Service"
            }
        },
        "areaServed": [
            {
                "@type": "City",
                "name": getName(cityFrom, 'en')
            },
            {
                "@type": "City",
                "name": getName(cityTo, 'en')
            }
        ],
        "description": language === 'ru'
            ? `Переезд ${fromPrep} ${toPrep} под ключ`
            : `Turnkey relocation from ${getName(cityFrom, 'en')} to ${getName(cityTo, 'en')}`
    };

    // Remove existing schema scripts
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => script.remove());

    // Inject new schemas
    injectJSONLD(breadcrumbSchema);
    injectJSONLD(serviceSchema);
}

/**
 * Helper function to inject JSON-LD script
 */
function injectJSONLD(schemaObject) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaObject);
    document.head.appendChild(script);
}
