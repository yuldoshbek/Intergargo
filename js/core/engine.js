/**
 * INTERCARGO - Core Engine
 * Main rendering logic for dynamic content generation
 */

import { updateSEO, injectSchemaOrg } from './seo.js';
import { generateRouteContent } from './routes-generator.js';
import { getContent } from './content-manager.js';
import { EUROPE_COUNTRIES, GERMANY } from '../data/europe-countries.js';
import { PILOT_ROUTES } from '../data/routes-pilot.js';

/**
 * Main page content updater
 */
export function updatePageContent(params, citiesDB, routesData) {
    const { from_city, to_city, language } = params;

    // Find city objects
    let cityFromObj, cityToObj, countryFrom, countryTo;

    for (const country in citiesDB) {
        if (citiesDB[country][from_city]) {
            cityFromObj = citiesDB[country][from_city];
            countryFrom = country;
        }
        if (citiesDB[country][to_city]) {
            cityToObj = citiesDB[country][to_city];
            countryTo = country;
        }
    }

    if (!cityFromObj || !cityToObj) return;

    const routeSlug = `${cityFromObj.slug}-${cityToObj.slug}`;
    const countryRouteKey = `${countryFrom}_${countryTo}`;

    // Check if this is a Europe Pilot route
    const pilotRoute = PILOT_ROUTES.find(r => r.slug === routeSlug);
    let routeContent;

    if (pilotRoute) {
        // Use Content Manager for pilot routes (Content Platform architecture)
        console.log(`📦 Loading from Content Platform: ${routeSlug}`);
        getContent(routeSlug).then(content => {
            // Render all blocks with content from store
            renderFromContentStore(content, cityFromObj, cityToObj, language);
        });
        return; // Exit early, rendering happens async
    }

    // Fallback for non-pilot routes: use old dynamic generation
    routeContent = routesData[countryRouteKey];
    if (!routeContent) {
        console.log(`Generating dynamic content for: ${routeSlug}`);
        routeContent = generateRouteContent(cityFromObj, cityToObj, language);
    }

    // 1. Update SEO
    updateSEO(cityFromObj, cityToObj, language);
    injectSchemaOrg(cityFromObj, cityToObj, language);

    // 2. Update Breadcrumbs
    renderBreadcrumbs(cityFromObj, cityToObj, language);

    // 3. Update Hero
    renderHero(cityFromObj, cityToObj, language, routeContent, routeSlug);

    // 4. Update Subtitles
    renderSubtitles(language, routeContent, countryRouteKey);

    // 5. Update Customs
    renderCustoms(cityFromObj, cityToObj, language, routeContent);

    // 6. Update FAQ
    renderFAQ(language, routeContent);

    // 7. Update Cargo Cards
    renderCargo(language, routeContent, routeSlug);

    // 8. Update Process
    renderProcess(language, routeContent);

    // 9. Update Timelines (NEW)
    renderTimelines(language, routeContent);

    // 10. Update Internal Links (NEW)
    renderInternalLinks(routeContent);
}

/**
 * Render Breadcrumbs
 */
/**
 * Render Breadcrumbs
 */
function renderBreadcrumbs(cityFrom, cityTo, language) {
    const bcContainer = document.getElementById('breadcrumbs-container');
    if (!bcContainer) return;

    const homeLabel = language === 'ru' ? "Главная" : "Home";
    const categoryLabel = language === 'ru' ? "Международные переезды" : "International Moving";
    const currentLabel = `${cityFrom[language]} → ${cityTo[language]}`;

    // SEO-friendly URL
    const routeUrl = `/international-moving/${cityFrom.slug}-${cityTo.slug}`;

    bcContainer.innerHTML = `
        <div class="breadcrumbs__container">
            <a href="/" class="breadcrumbs__link">${homeLabel}</a>
            <span class="breadcrumbs__separator">/</span>
            <a href="/international-moving" class="breadcrumbs__link">${categoryLabel}</a>
            <span class="breadcrumbs__separator">/</span>
            <a href="${routeUrl}" class="breadcrumbs__current" onclick="event.preventDefault();">${currentLabel}</a>
        </div>
    `;
}

/**
 * Render Hero Section
 */
function renderHero(cityFrom, cityTo, language, routeContent, routeSlug) {
    const hTitle = document.getElementById('hero-title');
    const hSub = document.getElementById('hero-subtitle');

    if (hTitle) {
        const titleText = language === 'ru'
            ? `Переезд из ${cityFrom.from} <span>${cityTo.to}</span>`
            : `Relocation from ${cityFrom.en} <span>to ${cityTo.en}</span>`;
        hTitle.innerHTML = titleText;
    }

    if (hSub) {
        const cityOverride = routeContent.city_routes?.[routeSlug];
        const subText = cityOverride
            ? (language === 'ru' ? cityOverride.hero_subtitle : cityOverride.en_hero_subtitle)
            : (language === 'ru' ? routeContent.hero.subtitle : routeContent.hero.en_subtitle);
        hSub.innerHTML = subText;
    }
}

/**
 * Render Subtitles
 */
function renderSubtitles(language, routeContent) {
    const sections = ['what_we_transport', 'packaging'];
    sections.forEach(secId => {
        const elId = `subtitle-${secId.replace(/_/g, '-')}`;
        const el = document.getElementById(elId);
        if (el && routeContent.subtitles?.[secId]) {
            el.innerHTML = routeContent.subtitles[secId][language];
        }
    });
}

/**
 * Render Customs Block
 */
function renderCustoms(cityFrom, cityTo, language, routeContent) {
    const customsBlock = document.getElementById('customs-dynamic-content');
    if (!customsBlock || !routeContent.customs) return;

    const customs = routeContent.customs;
    customsBlock.innerHTML = `
        <div class="customs-content">
            <div class="customs-header-row">
                <div class="customs-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                </div>
                <div class="customs-logic-tags">
                    ${customs.logic.map(tag => `<span class="logic-tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <p class="customs-text">${customs[language]}</p>
            <div class="customs-meta">
                <span class="meta-item">
                    <strong>Route:</strong> ${cityFrom.slug} → ${cityTo.slug}
                </span>
                <span class="meta-item">
                    <strong>Status:</strong> Verified 2024-2025
                </span>
            </div>
        </div>
    `;
}

/**
 * Render FAQ
 */
function renderFAQ(language, routeContent) {
    const faqContainer = document.getElementById('faq-dynamic-container');
    if (!faqContainer || !routeContent.faq) return;

    faqContainer.innerHTML = routeContent.faq.map(item => `
        <div class="faq__item">
            <button class="faq__question">
                <span>${language === 'ru' ? item.q : item.en_q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div class="faq__answer"><p>${language === 'ru' ? item.a : item.en_a}</p></div>
        </div>
    `).join('');

    if (typeof initFaqAccordion === 'function') initFaqAccordion();
}

/**
 * Render Cargo Cards
 */
function renderCargo(language, routeContent, routeSlug) {
    const cargoGrid = document.getElementById('cargo-grid');
    const cargoSub = document.getElementById('subtitle-cargo');

    if (!routeContent.cargo) return;

    if (cargoSub) {
        const cityOverride = routeContent.city_routes?.[routeSlug];
        const subText = cityOverride
            ? (language === 'ru' ? cityOverride.cargo_subtitle : cityOverride.en_cargo_subtitle)
            : (language === 'ru' ? "Любые личные вещи с профессиональной упаковкой." : "Any personal items with professional packing.");
        cargoSub.innerHTML = subText;
    }

    if (cargoGrid) {
        cargoGrid.innerHTML = routeContent.cargo.items.map(item => `
            <div class="cargo__item">
                <div class="cargo__item-image"><img src="${item.icon}" alt="${language === 'ru' ? item.title : item.en_title}"></div>
                <h3 class="cargo__item-title">${language === 'ru' ? item.title : item.en_title}</h3>
            </div>
        `).join('');
    }
}

/**
 * Render Process Steps
 */
function renderProcess(language, routeContent) {
    const processGrid = document.getElementById('process-grid');
    if (!processGrid || !routeContent.process) return;

    processGrid.innerHTML = routeContent.process.map((step, idx) => `
        <div class="process-card">
            <h3 class="process-card__title">${idx + 1}. ${language === 'ru' ? step.title : step.en_title}</h3>
            <p class="process-card__text">${language === 'ru' ? step.desc : step.en_desc}</p>
        </div>
    `).join('');
}

/**
 * Render from Content Store (for pilot routes)
 */
function renderFromContentStore(content, cityFrom, cityTo, language) {
    // 1. Update SEO
    updateSEOFromContent(content, language);

    // 2. Update Breadcrumbs
    renderBreadcrumbs(cityFrom, cityTo, language);

    // 3. Hero
    const hTitle = document.getElementById('hero-title');
    const hSub = document.getElementById('hero-subtitle');
    if (hTitle) hTitle.innerHTML = content.hero.title;
    if (hSub) hSub.innerHTML = content.hero.subtitle;

    // 4. Customs
    renderCustomsFromStore(content.customs, language);

    // 5. Timelines
    renderTimelinesFromStore(content.timelines, language);

    // 6. Internal Links
    renderInternalLinksFromStore(content.internal_links);

    // 7. FAQ
    renderFAQFromStore(content.faq, language);

    // 8. Process
    const processGrid = document.getElementById('process-grid');
    if (processGrid) {
        processGrid.innerHTML = content.process.map((step, idx) => `
            <div class="process-card">
                <h3 class="process-card__title">${idx + 1}. ${language === 'ru' ? step.title : step.en_title}</h3>
                <p class="process-card__text">${language === 'ru' ? step.desc : step.en_desc}</p>
            </div>
        `).join('');
    }

    // 9. Cargo
    const cargoGrid = document.getElementById('cargo-grid');
    if (cargoGrid) {
        cargoGrid.innerHTML = content.cargo.items.map(item => `
            <div class="cargo__item">
                <div class="cargo__item-image"><img src="${item.icon}" alt="${language === 'ru' ? item.title : item.en_title}"></div>
                <h3 class="cargo__item-title">${language === 'ru' ? item.title : item.en_title}</h3>
            </div>
        `).join('');
    }
}

/**
 * Render Timelines Block
 */
function renderTimelines(language, routeContent) {
    const container = document.getElementById('timelines-dynamic-content');
    if (!container) return;

    // Fallback for non-store content (placeholder)
    const text = routeContent?.timelines?.[language] || "Ориентировочные сроки доставки: 7-14 дней.";
    container.innerHTML = `<p class="timelines-text">${text}</p>`;
}

function renderTimelinesFromStore(timelinesData, language) {
    const container = document.getElementById('timelines-dynamic-content');
    if (!container || !timelinesData) return;

    container.innerHTML = `
        <div class="timelines-content">
            <div class="timelines-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            </div>
            <p class="timelines-text">${language === 'ru' ? timelinesData.ru : timelinesData.en}</p>
            <span class="timelines-badge">${timelinesData.time_range}</span>
        </div>
    `;
}

/**
 * Render Internal Links Block
 */
function renderInternalLinks(routeContent) {
    const container = document.getElementById('internal-links-dynamic-content');
    if (!container) return;

    // Placeholder for non-store content
    container.innerHTML = '<p>Популярные направления...</p>';
}

function renderInternalLinksFromStore(linksData) {
    const container = document.getElementById('internal-links-dynamic-content');
    if (!container || !linksData || linksData.length === 0) return;

    container.innerHTML = linksData.map(link => `
        <a href="${link.url}" class="internal-link-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>${link.label}</span>
        </a>
    `).join('');
}

/**
 * Render Customs from Store
 */
function renderCustomsFromStore(customsData, language) {
    const customsBlock = document.getElementById('customs-dynamic-content');
    if (!customsBlock || !customsData) return;

    customsBlock.innerHTML = `
        <div class="customs-content">
            <div class="customs-header-row">
                <div class="customs-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                </div>
                <div class="customs-logic-tags">
                    ${customsData.logic.map(tag => `<span class="logic-tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <p class="customs-text">${customsData[language]}</p>
        </div>
    `;
}

/**
 * Render FAQ from Store
 */
function renderFAQFromStore(faqData, language) {
    const faqContainer = document.getElementById('faq-dynamic-container');
    if (!faqContainer || !faqData) return;

    faqContainer.innerHTML = faqData.map(item => `
        <div class="faq__item">
            <button class="faq__question">
                <span>${language === 'ru' ? item.q : item.en_q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div class="faq__answer"><p>${language === 'ru' ? item.a : item.en_a}</p></div>
        </div>
    `).join('');

    if (typeof initFaqAccordion === 'function') initFaqAccordion();
}

/**
 * Update SEO from stored content
 */
function updateSEOFromContent(content, language) {
    const seo = content.seo;
    document.title = language === 'ru' ? seo.title : seo.en_title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', language === 'ru' ? seo.description : seo.en_description);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', language === 'ru' ? seo.title : seo.en_title);
    if (ogDesc) ogDesc.setAttribute('content', language === 'ru' ? seo.description : seo.en_description);
}
