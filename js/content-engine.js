/**
 * INTERCARGO Dynamic Content Engine v5 - PILOT EDITION
 * Main entry point - imports all modules and initializes the system
 * SCOPE: Germany ↔ 36 European Countries (72 Routes)
 */

import { EUROPE_COUNTRIES, GERMANY } from './data/europe-countries.js';
import { updatePageContent } from './core/engine.js';
import { PILOT_ROUTES } from './data/routes-pilot.js';

// Default State (Pilot Anchor)
const DEFAULT_STATE = {
    language: 'ru',
    from_city: 'Germany', // Treating Country as "City" object for engine compatibility
    to_city: 'France'
};

// Current State
let pageParams = { ...DEFAULT_STATE };

/**
 * LOGIC: Router & State
 */

function parseUrl() {
    // 1. Check Query Params (Priority)
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from_city'); // e.g. "Germany"
    const toParam = urlParams.get('to_city');     // e.g. "Spain"

    if (fromParam && toParam) {
        // Validate against Europe Countries (handle Germany explicitly)
        const fromObj = fromParam === 'Germany' ? GERMANY : EUROPE_COUNTRIES[fromParam];
        const toObj = toParam === 'Germany' ? GERMANY : EUROPE_COUNTRIES[toParam];

        if (fromObj && toObj) {
            return { from_city: fromParam, to_city: toParam, language: 'ru' };
        }
    }

    // 2. Fallback: Check Path (Legacy / SEO friendly)
    const path = window.location.pathname;
    const match = path.match(/\/international-moving\/([a-z-]+)-([a-z-]+)/);

    if (match) {
        const fromSlug = match[1];
        const toSlug = match[2];
        const fromObj = findCountryBySlug(fromSlug);
        const toObj = findCountryBySlug(toSlug);

        if (fromObj && toObj) {
            return {
                from_city: Object.keys(EUROPE_COUNTRIES).find(key => EUROPE_COUNTRIES[key] === fromObj),
                to_city: Object.keys(EUROPE_COUNTRIES).find(key => EUROPE_COUNTRIES[key] === toObj),
                language: 'ru'
            };
        }
    }

    return DEFAULT_STATE;
}

function findCountryBySlug(slug) {
    return Object.values(EUROPE_COUNTRIES).find(c => c.slug === slug);
}

function updateUrl(fromKey, toKey) {
    const fromObj = EUROPE_COUNTRIES[fromKey];
    const toObj = EUROPE_COUNTRIES[toKey];

    if (fromObj && toObj) {
        // Use query params for the pilot to be safe and explicit
        const url = `?from_city=${fromKey}&to_city=${toKey}`;
        window.history.pushState({ from_city: fromKey, to_city: toKey }, '', url);
    }
}

// Render function: Maps Countries to Engine's expected "Cities" interface
function render() {
    const fromKey = pageParams.from_city;
    const toKey = pageParams.to_city;

    // We treat Countries as Cities for the engine
    const cityFromObj = EUROPE_COUNTRIES[fromKey];
    const cityToObj = EUROPE_COUNTRIES[toKey];

    // Mock the data structure the engine expects
    // Engine expects: citiesDB[country][city]
    // We provide: { "Europe": { "Germany": Obj, "France": Obj } }

    // CRITICAL FIX: Add explicit Germany object to the DB so engine can find it
    const MOCK_DB = {
        "Europe": {
            ...EUROPE_COUNTRIES,
            "Germany": GERMANY
        }
    };

    // Engine expects routes data
    // We pass empty object because engine.js now uses content-manager for Pilot Routes
    const MOCK_ROUTES = {};

    // Directly call engine with constructed objects
    // Fix: Engine looks up DB. We need to pass params that allow it to find our objects if we use standard lookup
    // OR just pass the objects if we modify engine.js? 
    // Current engine.js: loops through citiesDB.
    // Let's rely on engine.js modification we did earlier?
    // Early engine.js update: 
    // `for (const country in citiesDB) { if (citiesDB[country][from_city]) ... }`

    // So if we pass MOCK_DB = { "Europe": { "Germany": ... } } and params.from_city = "Germany"
    // It will find match!

    updatePageContent(pageParams, MOCK_DB, MOCK_ROUTES);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const urlState = parseUrl();
    pageParams = { ...pageParams, ...urlState };

    createControlPanel();
    render();

    window.addEventListener('popstate', (event) => {
        if (event.state) {
            pageParams.from_city = event.state.from_city;
            pageParams.to_city = event.state.to_city;
            syncControls();
            render();
        }
    });
});

/**
 * REFACTORED CONTROL PANEL
 * Strict Pilot Logic: Germany <-> Europe
 */
function createControlPanel() {
    const controls = document.createElement('div');
    controls.className = 'demo-controls';

    controls.innerHTML = `
        <div class="controls-container">
            <div class="control-group">
                <label>From:</label>
                <select id="from-city-select"></select>
            </div>
            <div class="control-group">
                <label>To:</label>
                <select id="to-city-select"></select>
            </div>
            <div class="control-group">
                <label>Lang:</label>
                <select id="lang-select">
                    <option value="ru" selected>RU</option>
                </select>
            </div>
        </div>
    `;
    document.body.appendChild(controls);

    // Initial Population
    updateSelectors();

    // Event Listeners
    document.getElementById('from-city-select').addEventListener('change', (e) => {
        pageParams.from_city = e.target.value;

        // AUTO-LOCK LOGIC
        // If From is Germany -> To can be any EU (default to France if currently Germany)
        // If From is EU -> To MUST be Germany
        if (pageParams.from_city === 'Germany') {
            if (pageParams.to_city === 'Germany') pageParams.to_city = 'France';
        } else {
            pageParams.to_city = 'Germany';
        }

        updateSelectors(); // Re-render To options based on lock
        updateUrl(pageParams.from_city, pageParams.to_city);
        render();
    });

    document.getElementById('to-city-select').addEventListener('change', (e) => {
        pageParams.to_city = e.target.value;
        updateUrl(pageParams.from_city, pageParams.to_city);
        render();
    });
}

function updateSelectors() {
    const fromSelect = document.getElementById('from-city-select');
    const toSelect = document.getElementById('to-city-select');

    // 1. Populate FROM
    // Can be Germany OR any EU country
    let fromHtml = `<option value="Germany" ${pageParams.from_city === 'Germany' ? 'selected' : ''}>Germany (Anchor)</option>`;
    fromHtml += `<optgroup label="Europe">`;
    Object.keys(EUROPE_COUNTRIES).forEach(key => {
        if (key === 'Germany') return;
        const selected = pageParams.from_city === key ? 'selected' : '';
        fromHtml += `<option value="${key}" ${selected}>${key}</option>`;
    });
    fromHtml += `</optgroup>`;
    fromSelect.innerHTML = fromHtml;

    // 2. Populate TO based on FROM
    let toHtml = '';

    if (pageParams.from_city === 'Germany') {
        // Export: To can be any EU country (exclude Germany)
        Object.keys(EUROPE_COUNTRIES).forEach(key => {
            if (key === 'Germany') return;
            const selected = pageParams.to_city === key ? 'selected' : '';
            toHtml += `<option value="${key}" ${selected}>${key}</option>`;
        });
        toSelect.disabled = false;
    } else {
        // Import: To MUST be Germany
        toHtml = `<option value="Germany" selected>Germany</option>`;
        // toSelect.disabled = true; // Optional: disable to visualize lock
    }

    toSelect.innerHTML = toHtml;
}

function syncControls() {
    updateSelectors();
}
