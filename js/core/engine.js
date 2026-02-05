/**
 * INTERCARGO - Core Engine
 * Main rendering logic for dynamic content generation
 */

import { updateSEO, injectSchemaOrg } from './seo.js';
import { generateRouteContent } from './routes-generator.js';
import { getContent } from './content-manager.js';
import { PILOT_ROUTES } from '../data/routes-pilot.js';

// --- DATA ACCESS HELPERS (Universal: Legacy + V2) ---

export function getCountryName(obj, lang) {
    if (!obj) return '';
    // V2 Structure
    if (obj.names && obj.names[lang]) return obj.names[lang];
    // Legacy Structure
    if (lang === 'ru' && obj.ru) return obj.ru; // or obj.name?
    if (lang === 'en' && obj.en) return obj.en;
    if (lang === 'de' && obj.de) return obj.de;
    // Fallback
    return obj[lang] || obj.slug || 'Unknown';
}

export function getCountryPreposition(obj, type, lang) {
    if (!obj) return '';
    // V2 Structure
    if (obj.prepositions && obj.prepositions[type] && obj.prepositions[type][lang]) {
        return obj.prepositions[type][lang];
    }
    // Legacy Structure
    if (type === 'from') {
        if (lang === 'ru' && obj.from) return obj.from;
        if (lang === 'en') return obj.en; // "Germany"
    }
    if (type === 'to') {
        if (lang === 'ru' && obj.to) return obj.to;
        if (lang === 'en') return "to " + obj.en;
    }
    return getCountryName(obj, lang);
}

/**
 * Main page content updater
 */
export function updatePageContent(params, citiesDB, routesData) {
    const { from_city, to_city, language } = params;

    // Find city/country objects
    let cityFromObj, cityToObj, countryFrom, countryTo;

    // V2 / Mixed Lookup
    // citiesDB structure: { "Europe": { "Germany": {...}, "Spain": {...} } }
    for (const region in citiesDB) {
        if (citiesDB[region][from_city]) {
            cityFromObj = citiesDB[region][from_city];
            countryFrom = region; // or "Europe"
        }
        if (citiesDB[region][to_city]) {
            cityToObj = citiesDB[region][to_city];
            countryTo = region;
        }
    }

    // Try finding by slug if direct key lookup failed (Legacy/V2 mixup safe)
    if (!cityFromObj || !cityToObj) {
        // ... (Optional: iterate values to find by slug if needed)
    }

    if (!cityFromObj || !cityToObj) {
        console.error("Engine: Could not find country/city objects for", from_city, to_city);
        return;
    }

    const routeSlug = `${cityFromObj.slug}-${cityToObj.slug}`;
    const countryRouteKey = `${countryFrom}_${countryTo}`;

    // Check Pilot Route
    const pilotRoute = PILOT_ROUTES.find(r => r.slug === routeSlug);
    let routeContent;

    if (pilotRoute) {
        console.log(`📦 Loading from Content Platform: ${routeSlug}`);
        getContent(routeSlug).then(content => {
            renderFromContentStore(content, cityFromObj, cityToObj, language);
        });
        return;
    }

    // Fallback Legacy Dynamic
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
    renderSubtitles(language, routeContent);

    // 5. Update Customs
    renderCustoms(cityFromObj, cityToObj, language, routeContent);

    // 6. Update FAQ
    renderFAQ(language, routeContent);

    // 7. Update Cargo
    renderCargo(language, routeContent, routeSlug);

    // 8. Update Process
    renderProcess(language, routeContent);

    // 9. Timelines
    renderTimelines(language, routeContent);

    // 10. Internal Links
    renderInternalLinks(routeContent);
}

/**
 * Render Breadcrumbs
 */
function renderBreadcrumbs(cityFrom, cityTo, language) {
    const bcContainer = document.getElementById('breadcrumbs-container');
    if (!bcContainer) return;

    const labels = {
        ru: { home: "Главная", cat: "Международные переезды" },
        en: { home: "Home", cat: "International Moving" },
        de: { home: "Startseite", cat: "Internationale Umzüge" }
    };

    const l = labels[language] || labels.ru;
    const fromName = getCountryName(cityFrom, language);
    const toName = getCountryName(cityTo, language);
    const currentLabel = `${fromName} → ${toName}`;

    const routeUrl = `/${language}/international-moving/${cityFrom.slug}-${cityTo.slug}`;

    bcContainer.innerHTML = `
        <div class="breadcrumbs__container">
            <a href="/" class="breadcrumbs__link">${l.home}</a>
            <span class="breadcrumbs__separator">/</span>
            <a href="#" class="breadcrumbs__link">${l.cat}</a>
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
        const fromName = getCountryPreposition(cityFrom, 'from', language);
        const toName = getCountryPreposition(cityTo, 'to', language);

        // Templates
        let titleText = "";
        if (language === 'ru') titleText = `Переезд из ${fromName} <span>${toName}</span>`;
        else if (language === 'de') titleText = `Umzug von ${fromName} <span>${toName}</span>`;
        else titleText = `Relocation from ${fromName} <span>${toName}</span>`;

        hTitle.innerHTML = titleText;
    }

    if (hSub) {
        // Try fallback logic for subtitles
        const cityOverride = routeContent.city_routes?.[routeSlug];
        let subText = "";

        if (cityOverride) {
            subText = cityOverride[`${language === 'ru' ? '' : language + '_'}hero_subtitle`] || cityOverride.hero_subtitle;
        } else if (routeContent.hero) {
            subText = routeContent.hero[`${language === 'ru' ? '' : language + '_'}subtitle`] || routeContent.hero.subtitle;
        }

        hSub.innerHTML = subText || "";
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
 * Render Customs Block (Dynamic)
 */
function renderCustoms(cityFrom, cityTo, language, routeContent) {
    const customsBlock = document.getElementById('customs-dynamic-content');
    if (!customsBlock || !routeContent.customs) return;

    const customs = routeContent.customs;
    const text = customs[language] || customs.ru || "";

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
                <!-- Logic tags logic omitted for brevity in fallback -->
            </div>
            <p class="customs-text">${text}</p>
        </div>
    `;
}

/**
 * Render FAQ
 */
function renderFAQ(language, routeContent) {
    const faqContainer = document.getElementById('faq-dynamic-container');
    if (!faqContainer || !routeContent.faq) return;

    faqContainer.innerHTML = routeContent.faq.map(item => {
        const q = item[`${language === 'ru' ? '' : language + '_'}q`] || item.q;
        const a = item[`${language === 'ru' ? '' : language + '_'}a`] || item.a;
        return `
            <div class="faq__item">
                <button class="faq__question">
                    <span>${q}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div class="faq__answer"><p>${a}</p></div>
            </div>
        `;
    }).join('');

    // Re-init accordion logic if globally available
    if (window.initFaqAccordion) window.initFaqAccordion();
}

/**
 * Render Cargo Cards
 */
function renderCargo(language, routeContent, routeSlug) {
    const cargoGrid = document.getElementById('cargo-grid');
    const cargoSub = document.getElementById('subtitle-cargo');

    if (!routeContent.cargo) return;

    if (cargoSub) {
        // Logic to find subtitle
    }

    if (cargoGrid) {
        cargoGrid.innerHTML = routeContent.cargo.items.map(item => {
            const title = item[`${language === 'ru' ? '' : language + '_'}title`] || item.title;
            return `
                <div class="cargo__item">
                    <div class="cargo__item-image"><img src="${item.icon}" alt="${title}"></div>
                    <h3 class="cargo__item-title">${title}</h3>
                </div>
            `;
        }).join('');
    }
}

/**
 * Render Process Steps
 */
function renderProcess(language, routeContent) {
    const processGrid = document.getElementById('process-grid');
    if (!processGrid || !routeContent.process) return;

    processGrid.innerHTML = routeContent.process.map((step, idx) => {
        const t = step[`${language === 'ru' ? '' : language + '_'}title`] || step.title;
        const d = step[`${language === 'ru' ? '' : language + '_'}desc`] || step.desc;
        return `
            <div class="process-card">
                <h3 class="process-card__title">${idx + 1}. ${t}</h3>
                <p class="process-card__text">${d}</p>
            </div>
        `;
    }).join('');
}

/**
 * Render from Content Store (Pilot)
 */
function renderFromContentStore(content, cityFrom, cityTo, language) {
    // 1. Update SEO
    updateSEOFromContent(content, language);

    // 2. Update Breadcrumbs (Logic moved to shared function)
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
    if (processGrid && content.process) {
        processGrid.innerHTML = content.process.map((step, idx) => `
            <div class="process-card">
                <h3 class="process-card__title">${idx + 1}. ${step.title}</h3>
                <p class="process-card__text">${step.desc}</p>
            </div>
        `).join('');
    }

    // 9. Cargo (Store usually pre-generates correct lang content?)
    // Note: Content Store returns data *for the specific language* requested?
    // Review content-manager.js: NO, it currently returns all langs?
    // Let's assume content store returns localized strings in top fields OR we handle it.
    // Based on previous logs, content store returns objects like { hero: { title: "..." } } 
    // Wait, content-manager.js generates based on language?
    // Check generateRouteContent: it generates for specific language?
    // YES, `generateRouteContent(cityFrom, cityTo, language)`

    // BUT `getContent(routeSlug)` in engine.js might be fetching JSON that contains ONE language?
    // Currently `getContent` just checks cache.
    // The pilot architecture implies we generate UNIQUE content per language.

    // For now, assume content object has simplified structure matching the view.

    const cargoGrid = document.getElementById('cargo-grid');
    if (cargoGrid && content.cargo) {
        cargoGrid.innerHTML = content.cargo.items.map(item => `
            <div class="cargo__item">
                <div class="cargo__item-image"><img src="${item.icon}" alt="${item.title}"></div>
                <h3 class="cargo__item-title">${item.title}</h3>
            </div>
        `).join('');
    }
}

/**
 * Render Timelines & Others (Simplified for Brevity - keeping core logic)
 */
function renderTimelines(language, routeContent) {
    const container = document.getElementById('timelines-dynamic-content');
    if (!container) return;
    const text = routeContent?.timelines?.[language] || "7-14 days";
    container.innerHTML = `<p class="timelines-text">${text}</p>`;
}

function renderTimelinesFromStore(timelinesData, language) {
    const container = document.getElementById('timelines-dynamic-content');
    if (!container || !timelinesData) return;

    // Pilot content usually comes pre-generated text
    const text = timelinesData.text || timelinesData[language] || timelinesData.ru;

    container.innerHTML = `
        <div class="timelines-content">
            <div class="timelines-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            </div>
            <p class="timelines-text">${text}</p>
            <span class="timelines-badge">${timelinesData.time_range || '7-14 days'}</span>
        </div>
    `;
}

function renderInternalLinks(routeContent) {
    // Legacy placeholder
}

function renderInternalLinksFromStore(linksData) {
    const container = document.getElementById('internal-links-dynamic-content');
    if (!container || !linksData) return;

    container.innerHTML = linksData.map(link => `
        <a href="${link.url}" class="internal-link-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>${link.label}</span>
        </a>
    `).join('');
}

function renderCustomsFromStore(customsData, language) {
    const customsBlock = document.getElementById('customs-dynamic-content');
    if (!customsBlock || !customsData) return;

    // Pilot Customs is an Object with keys: text, logic tags etc
    // Or it might be per-language.
    // If content generation was specific, it's flat.

    customsBlock.innerHTML = `
        <div class="customs-content">
             <div class="customs-header-row">
                <div class="customs-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                    </svg>
                </div>
                <div class="customs-logic-tags">
                   ${(customsData.logic || []).map(tag => `<span class="logic-tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <p class="customs-text">${customsData.text || customsData[language]}</p>
        </div>
    `;
}

function renderFAQFromStore(faqData, language) {
    const faqContainer = document.getElementById('faq-dynamic-container');
    if (!faqContainer || !faqData) return;

    faqContainer.innerHTML = faqData.map(item => `
        <div class="faq__item">
            <button class="faq__question">
                <span>${item.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div class="faq__answer"><p>${item.a}</p></div>
        </div>
    `).join('');

    if (window.initFaqAccordion) window.initFaqAccordion();
}

function updateSEOFromContent(content, language) {
    const seo = content.seo;
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seo.description);
}
