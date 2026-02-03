/**
 * PILOT ROUTES MATRIX
 * 100 routes: Germany <-> Europe (bidirectional)
 * 
 * Direction types:
 * - "export": Germany -> Country (German export regulations)
 * - "import": Country -> Germany (German import/Verzollung)
 */

export const PILOT_ROUTES = [
    // ============================================
    // EXPORT FROM GERMANY (DE → Europe)
    // Focus: German export docs, EX-1, T1
    // ============================================

    // Major EU destinations
    { route_id: "germany-france-export", from: "Germany", to: "France", direction: "export", slug: "germany-france" },
    { route_id: "germany-spain-export", from: "Germany", to: "Spain", direction: "export", slug: "germany-spain" },
    { route_id: "germany-italy-export", from: "Germany", to: "Italy", direction: "export", slug: "germany-italy" },
    { route_id: "germany-poland-export", from: "Germany", to: "Poland", direction: "export", slug: "germany-poland" },
    { route_id: "germany-netherlands-export", from: "Germany", to: "Netherlands", direction: "export", slug: "germany-netherlands" },
    { route_id: "germany-belgium-export", from: "Germany", to: "Belgium", direction: "export", slug: "germany-belgium" },
    { route_id: "germany-austria-export", from: "Germany", to: "Austria", direction: "export", slug: "germany-austria" },
    { route_id: "germany-czechrepublic-export", from: "Germany", to: "CzechRepublic", direction: "export", slug: "germany-czech-republic" },
    { route_id: "germany-portugal-export", from: "Germany", to: "Portugal", direction: "export", slug: "germany-portugal" },
    { route_id: "germany-greece-export", from: "Germany", to: "Greece", direction: "export", slug: "germany-greece" },

    // Nordic countries
    { route_id: "germany-sweden-export", from: "Germany", to: "Sweden", direction: "export", slug: "germany-sweden" },
    { route_id: "germany-denmark-export", from: "Germany", to: "Denmark", direction: "export", slug: "germany-denmark" },
    { route_id: "germany-finland-export", from: "Germany", to: "Finland", direction: "export", slug: "germany-finland" },
    { route_id: "germany-norway-export", from: "Germany", to: "Norway", direction: "export", slug: "germany-norway" },
    { route_id: "germany-iceland-export", from: "Germany", to: "Iceland", direction: "export", slug: "germany-iceland" },

    // Eastern Europe
    { route_id: "germany-hungary-export", from: "Germany", to: "Hungary", direction: "export", slug: "germany-hungary" },
    { route_id: "germany-romania-export", from: "Germany", to: "Romania", direction: "export", slug: "germany-romania" },
    { route_id: "germany-bulgaria-export", from: "Germany", to: "Bulgaria", direction: "export", slug: "germany-bulgaria" },
    { route_id: "germany-croatia-export", from: "Germany", to: "Croatia", direction: "export", slug: "germany-croatia" },
    { route_id: "germany-slovakia-export", from: "Germany", to: "Slovakia", direction: "export", slug: "germany-slovakia" },
    { route_id: "germany-slovenia-export", from: "Germany", to: "Slovenia", direction: "export", slug: "germany-slovenia" },

    // Baltic States
    { route_id: "germany-estonia-export", from: "Germany", to: "Estonia", direction: "export", slug: "germany-estonia" },
    { route_id: "germany-latvia-export", from: "Germany", to: "Latvia", direction: "export", slug: "germany-latvia" },
    { route_id: "germany-lithuania-export", from: "Germany", to: "Lithuania", direction: "export", slug: "germany-lithuania" },

    // Small states
    { route_id: "germany-luxembourg-export", from: "Germany", to: "Luxembourg", direction: "export", slug: "germany-luxembourg" },
    { route_id: "germany-ireland-export", from: "Germany", to: "Ireland", direction: "export", slug: "germany-ireland" },
    { route_id: "germany-cyprus-export", from: "Germany", to: "Cyprus", direction: "export", slug: "germany-cyprus" },
    { route_id: "germany-malta-export", from: "Germany", to: "Malta", direction: "export", slug: "germany-malta" },

    // Non-EU (special customs)
    { route_id: "germany-unitedkingdom-export", from: "Germany", to: "UnitedKingdom", direction: "export", slug: "germany-united-kingdom" },
    { route_id: "germany-switzerland-export", from: "Germany", to: "Switzerland", direction: "export", slug: "germany-switzerland" },
    { route_id: "germany-serbia-export", from: "Germany", to: "Serbia", direction: "export", slug: "germany-serbia" },
    { route_id: "germany-montenegro-export", from: "Germany", to: "Montenegro", direction: "export", slug: "germany-montenegro" },
    { route_id: "germany-albania-export", from: "Germany", to: "Albania", direction: "export", slug: "germany-albania" },
    { route_id: "germany-northmacedonia-export", from: "Germany", to: "NorthMacedonia", direction: "export", slug: "germany-north-macedonia" },
    { route_id: "germany-monaco-export", from: "Germany", to: "Monaco", direction: "export", slug: "germany-monaco" },
    { route_id: "germany-liechtenstein-export", from: "Germany", to: "Liechtenstein", direction: "export", slug: "germany-liechtenstein" },

    // ============================================
    // IMPORT TO GERMANY (Europe → DE)
    // Focus: Verzollung, residence permits, tax refunds
    // ============================================

    // Major EU origins
    { route_id: "france-germany-import", from: "France", to: "Germany", direction: "import", slug: "france-germany" },
    { route_id: "spain-germany-import", from: "Spain", to: "Germany", direction: "import", slug: "spain-germany" },
    { route_id: "italy-germany-import", from: "Italy", to: "Germany", direction: "import", slug: "italy-germany" },
    { route_id: "poland-germany-import", from: "Poland", to: "Germany", direction: "import", slug: "poland-germany" },
    { route_id: "netherlands-germany-import", from: "Netherlands", to: "Germany", direction: "import", slug: "netherlands-germany" },
    { route_id: "belgium-germany-import", from: "Belgium", to: "Germany", direction: "import", slug: "belgium-germany" },
    { route_id: "austria-germany-import", from: "Austria", to: "Germany", direction: "import", slug: "austria-germany" },
    { route_id: "czechrepublic-germany-import", from: "CzechRepublic", to: "Germany", direction: "import", slug: "czech-republic-germany" },
    { route_id: "portugal-germany-import", from: "Portugal", to: "Germany", direction: "import", slug: "portugal-germany" },
    { route_id: "greece-germany-import", from: "Greece", to: "Germany", direction: "import", slug: "greece-germany" },

    // Nordic origins
    { route_id: "sweden-germany-import", from: "Sweden", to: "Germany", direction: "import", slug: "sweden-germany" },
    { route_id: "denmark-germany-import", from: "Denmark", to: "Germany", direction: "import", slug: "denmark-germany" },
    { route_id: "finland-germany-import", from: "Finland", to: "Germany", direction: "import", slug: "finland-germany" },
    { route_id: "norway-germany-import", from: "Norway", to: "Germany", direction: "import", slug: "norway-germany" },
    { route_id: "iceland-germany-import", from: "Iceland", to: "Germany", direction: "import", slug: "iceland-germany" },

    // Eastern Europe origins
    { route_id: "hungary-germany-import", from: "Hungary", to: "Germany", direction: "import", slug: "hungary-germany" },
    { route_id: "romania-germany-import", from: "Romania", to: "Germany", direction: "import", slug: "romania-germany" },
    { route_id: "bulgaria-germany-import", from: "Bulgaria", to: "Germany", direction: "import", slug: "bulgaria-germany" },
    { route_id: "croatia-germany-import", from: "Croatia", to: "Germany", direction: "import", slug: "croatia-germany" },
    { route_id: "slovakia-germany-import", from: "Slovakia", to: "Germany", direction: "import", slug: "slovakia-germany" },
    { route_id: "slovenia-germany-import", from: "Slovenia", to: "Germany", direction: "import", slug: "slovenia-germany" },

    // Baltic States origins
    { route_id: "estonia-germany-import", from: "Estonia", to: "Germany", direction: "import", slug: "estonia-germany" },
    { route_id: "latvia-germany-import", from: "Latvia", to: "Germany", direction: "import", slug: "latvia-germany" },
    { route_id: "lithuania-germany-import", from: "Lithuania", to: "Germany", direction: "import", slug: "lithuania-germany" },

    // Small states origins
    { route_id: "luxembourg-germany-import", from: "Luxembourg", to: "Germany", direction: "import", slug: "luxembourg-germany" },
    { route_id: "ireland-germany-import", from: "Ireland", to: "Germany", direction: "import", slug: "ireland-germany" },
    { route_id: "cyprus-germany-import", from: "Cyprus", to: "Germany", direction: "import", slug: "cyprus-germany" },
    { route_id: "malta-germany-import", from: "Malta", to: "Germany", direction: "import", slug: "malta-germany" },

    // Non-EU origins (Brexit, special rules)
    { route_id: "unitedkingdom-germany-import", from: "UnitedKingdom", to: "Germany", direction: "import", slug: "united-kingdom-germany" },
    { route_id: "switzerland-germany-import", from: "Switzerland", to: "Germany", direction: "import", slug: "switzerland-germany" },
    { route_id: "serbia-germany-import", from: "Serbia", to: "Germany", direction: "import", slug: "serbia-germany" },
    { route_id: "montenegro-germany-import", from: "Montenegro", to: "Germany", direction: "import", slug: "montenegro-germany" },
    { route_id: "albania-germany-import", from: "Albania", to: "Germany", direction: "import", slug: "albania-germany" },
    { route_id: "northmacedonia-germany-import", from: "NorthMacedonia", to: "Germany", direction: "import", slug: "north-macedonia-germany" },
    { route_id: "monaco-germany-import", from: "Monaco", to: "Germany", direction: "import", slug: "monaco-germany" },
    { route_id: "liechtenstein-germany-import", from: "Liechtenstein", to: "Germany", direction: "import", slug: "liechtenstein-germany" }
];

/**
 * Helper: Get route by slug
 */
export function getRouteBySlug(slug) {
    return PILOT_ROUTES.find(route => route.slug === slug);
}

/**
 * Helper: Get all export routes
 */
export function getExportRoutes() {
    return PILOT_ROUTES.filter(route => route.direction === "export");
}

/**
 * Helper: Get all import routes
 */
export function getImportRoutes() {
    return PILOT_ROUTES.filter(route => route.direction === "import");
}

/**
 * Stats
 */
export const PILOT_STATS = {
    total: PILOT_ROUTES.length,
    export: PILOT_ROUTES.filter(r => r.direction === "export").length,
    import: PILOT_ROUTES.filter(r => r.direction === "import").length
};
