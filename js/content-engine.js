/**
 * INTERCARGO Dynamic Content Engine v5 - PILOT EDITION
 * Main entry point - imports all modules and initializes the system
 * SCOPE: Germany ↔ 5 Pilot Countries (10 Routes)
 */

import { COUNTRIES_V2, getAllCountries } from './data/countries-v2.js';
import { updatePageContent } from './core/engine.js';
import { Router } from './core/router.js';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Router
    const routerState = Router.init();

    // 2. Create Control Panel (Demo)
    createControlPanel(routerState);

    // 3. Initial Render
    render(routerState);

    // 4. Listen for Route Changes
    window.addEventListener('route_change', (e) => {
        const newState = e.detail;
        render(newState);
        syncControls(newState);
    });
});

/**
 * Render function
 * Maps V2 Country Data to Engine's expected format
 */
function render(state) {
    const { from, to, lang } = state;

    // Construct MOCK_DB expected by engine.js
    // Engine expects: citiesDB[continent][cityKey]
    const MOCK_DB = {
        "Europe": COUNTRIES_V2
    };

    // Prepare Params
    const params = {
        from_city: from,
        to_city: to,
        language: lang
    };

    // Engine expects routes data (legacy), pass empty for Pilot
    const MOCK_ROUTES = {};

    console.log(`🚀 Rendering Pilot Route: ${from} -> ${to} [${lang}]`);
    updatePageContent(params, MOCK_DB, MOCK_ROUTES);
}

/**
 * Control Panel (Demo UI)
 * Mounts to #pilot-controls-mount if available, otherwise appends to body.
 */
function createControlPanel(initialState) {
    const mountPoint = document.getElementById('pilot-controls-mount');
    const controls = document.createElement('div');
    controls.className = 'demo-controls pilot-controls';

    controls.innerHTML = `
        <div class="controls-container">
            <div class="control-header">
                <strong>Pilot v2 Control</strong>
            </div>
            <div class="control-group">
                <label>Language</label>
                <select id="lang-select">
                    <option value="ru">RU</option>
                    <option value="en">EN</option>
                    <option value="de">DE</option>
                </select>
            </div>
            <div class="control-group">
                <label>From</label>
                <select id="from-city-select"></select>
            </div>
            <div class="control-group">
                <label>To</label>
                <select id="to-city-select"></select>
            </div>
        </div>
    `;

    if (mountPoint) {
        mountPoint.appendChild(controls);
    } else {
        document.body.appendChild(controls);
        controls.style.position = 'fixed';
        controls.style.bottom = '20px';
        controls.style.right = '20px';
        controls.style.zIndex = '9999';
    }

    // Initial Population
    const countries = getAllCountries();
    populateSelect('from-city-select', countries, initialState.from);
    populateSelect('to-city-select', countries, initialState.to);
    document.getElementById('lang-select').value = initialState.lang;

    // Event Listeners
    document.getElementById('from-city-select').addEventListener('change', (e) => {
        const fromVal = e.target.value;
        const currentTo = Router.getState().to;
        let newTo = currentTo;

        // Auto-lock Logic: Germany <-> Others
        if (fromVal === 'germany') {
            if (newTo === 'germany') newTo = 'spain'; // Default to Spain if From was Germany
        } else {
            newTo = 'germany';
        }

        Router.navigate(fromVal, newTo);
    });

    document.getElementById('to-city-select').addEventListener('change', (e) => {
        Router.navigate(Router.getState().from, e.target.value);
    });

    document.getElementById('lang-select').addEventListener('change', (e) => {
        Router.setLanguage(e.target.value);
    });
}

function populateSelect(id, countries, selectedSlug) {
    const select = document.getElementById(id);
    select.innerHTML = '';

    // Sort: Germany first, then others
    const sorted = [...countries].sort((a, b) => {
        if (a.slug === 'germany') return -1;
        if (b.slug === 'germany') return 1;
        return a.names.ru.localeCompare(b.names.ru);
    });

    sorted.forEach(c => {
        const option = document.createElement('option');
        option.value = c.slug;
        option.textContent = `${c.names.ru} (${c.slug})`;
        if (c.slug === selectedSlug) option.selected = true;
        select.appendChild(option);
    });
}

function syncControls(state) {
    const fromSel = document.getElementById('from-city-select');
    const toSel = document.getElementById('to-city-select');
    const langSel = document.getElementById('lang-select');

    if (fromSel) fromSel.value = state.from;
    if (toSel) toSel.value = state.to;
    if (langSel) langSel.value = state.lang;
}
