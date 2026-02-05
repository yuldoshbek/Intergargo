
import { COUNTRIES_V2, getCountry } from '../data/countries-v2.js';

/**
 * CLIENT-SIDE ROUTER (Pilot v2)
 * Handles URL parsing for: /lang/international-moving/from-to
 * Fallback for: ?from_city=...&to_city=... (Legacy)
 */
export const Router = {
    // Current state
    state: {
        lang: 'ru',
        from: 'germany',
        to: 'spain',
        isPilotRoute: false
    },

    /**
     * Initialize Router
     * Parses URL and sets initial state
     */
    init() {
        const route = this.parseUrl();
        this.state = { ...this.state, ...route };
        console.log("Router Initialized:", this.state);

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            const newRoute = this.parseUrl();
            this.state = { ...this.state, ...newRoute };
            // Trigger a re-render event or callback if needed
            window.dispatchEvent(new CustomEvent('route_change', { detail: this.state }));
        });

        return this.state;
    },

    /**
     * Parse current URL to extract route params
     * @returns {Object} { lang, from, to, isPilotRoute }
     */
    parseUrl() {
        const path = window.location.pathname;
        const search = window.location.search;

        // 1. Try Path-based Routing (New Pilot Structure)
        // Regex: /:lang/international-moving/:from-:to
        const pathRegex = /^\/([a-z]{2})\/international-moving\/([a-z-]+)-([a-z-]+)$/;
        const match = path.match(pathRegex);

        if (match) {
            const [_, lang, fromSlug, toSlug] = match;

            // Validate against V2 Data
            const fromCountry = getCountry(fromSlug);
            const toCountry = getCountry(toSlug);

            if (fromCountry && toCountry && ['ru', 'en', 'de'].includes(lang)) {
                return {
                    lang: lang,
                    from: fromSlug,
                    to: toSlug,
                    isPilotRoute: true
                };
            }
        }

        // 2. Fallback: Query Params (Legacy/Demo)
        // ?from_city=Germany&to_city=Spain
        const urlParams = new URLSearchParams(search);
        const qFrom = urlParams.get('from_city');
        const qTo = urlParams.get('to_city');

        if (qFrom && qTo) {
            // Map legacy names or slugs to V2 slugs if possible
            // For now, assume they might pass 'Germany' or 'germany'
            const fromSlug = this.normalizeSlug(qFrom);
            const toSlug = this.normalizeSlug(qTo);

            const fromCountry = getCountry(fromSlug);
            const toCountry = getCountry(toSlug);

            if (fromCountry && toCountry) {
                return {
                    lang: 'ru', // Default for legacy
                    from: fromSlug,
                    to: toSlug,
                    isPilotRoute: true // Treated as pilot if countries exist in V2
                };
            }
        }

        // 3. Default Validation Failure -> Default Route
        return {
            lang: 'ru',
            from: 'germany',
            to: 'spain',
            isPilotRoute: true // Default to pilot mode for demo
        };
    },

    /**
     * Normalize string to slug (e.g., 'Germany' -> 'germany')
     */
    normalizeSlug(str) {
        return str.toLowerCase().replace(/\s+/g, '-');
    },

    /**
     * Navigate to a new route
     * Updates URL and triggers render
     */
    navigate(fromSlug, toSlug, lang = this.state.lang) {
        // Construct new URL
        const newPath = `/${lang}/international-moving/${fromSlug}-${toSlug}`;

        // Push state
        window.history.pushState({}, '', newPath);

        // Update Internal State
        this.state = {
            lang,
            from: fromSlug,
            to: toSlug,
            isPilotRoute: true
        };

        // Dispatch Event
        window.dispatchEvent(new CustomEvent('route_change', { detail: this.state }));
    },

    /**
     * Switch Language
     */
    setLanguage(lang) {
        if (['ru', 'en', 'de'].includes(lang)) {
            this.navigate(this.state.from, this.state.to, lang);
        }
    },

    /**
     * Get current state
     */
    getState() {
        return this.state;
    }
};
