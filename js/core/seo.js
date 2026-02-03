/**
 * INTERCARGO - SEO Module
 * Dynamic Meta Tags & Schema.org Markup Generation
 */

/**
 * Update SEO meta tags based on route
 */
export function updateSEO(cityFrom, cityTo, language) {
    // Title
    const title = language === 'ru'
        ? `Переезд из ${cityFrom.from} ${cityTo.to} под ключ | Intrelo`
        : `Relocation from ${cityFrom.en} to ${cityTo.en} | Intrelo`;

    document.title = title;

    // Meta Description
    const description = language === 'ru'
        ? `Профессиональный переезд ${cityFrom.from} ${cityTo.to}. Упаковка, таможня, доставка door-to-door. 20 лет опыта в международных переездах.`
        : `Professional relocation from ${cityFrom.en} to ${cityTo.en}. Packing, customs, door-to-door delivery. 20 years of international moving experience.`;

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
        const url = `https://intrelo.com/international-moving/${cityFrom.slug}-${cityTo.slug}`;
        ogUrl.setAttribute('content', url);
    }
}

/**
 * Generate and inject Schema.org JSON-LD structured data
 */
export function injectSchemaOrg(cityFrom, cityTo, language) {
    const routeSlug = `${cityFrom.slug}-${cityTo.slug}`;
    const baseUrl = 'https://intrelo.com';

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
                "name": `${cityFrom[language]} → ${cityTo[language]}`
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
                "name": cityFrom.en
            },
            {
                "@type": "City",
                "name": cityTo.en
            }
        ],
        "description": language === 'ru'
            ? `Переезд ${cityFrom.from} ${cityTo.to} под ключ`
            : `Turnkey relocation from ${cityFrom.en} to ${cityTo.en}`
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
