export const translations = {
    en: {
        // Header
        title: "Secure \"Zero Trust\" Network Architecture",
        subtitle: "Dual Traefik Entry with WAN/LAN Segmentation",

        // Buttons
        visualizePublicFlow: "Visualize Public Flow (Internet → Local Traefik 2)",
        visualizeInternalFlow: "Visualize Internal Flow (Central → Local Traefik 1)",

        // Zones
        wanZone: "WAN / INTERNET ZONE",
        lanZone: "LAN / INTRANET ZONE",

        // Users
        publicUser: "Public User",
        internetAccess: "Internet Access",
        internalUser: "Internal User",
        lanVpn: "LAN / VPN",

        // Badges
        public: "Public",
        internal: "Internal",
        central: "Central",

        // WAF
        wafEdgeA: "WAF Edge A",
        wafEdgeB: "WAF Edge B",
        bunkerWebSiteA: "BunkerWeb - Site A",
        bunkerWebSiteB: "BunkerWeb - Site B",

        // Infrastructure
        centralInfrastructure: "Central Infrastructure (Management)",
        centralTraefik: "Central Traefik",
        internalProxy: "Internal Proxy",
        authentik: "Authentik",
        ssoAuth: "SSO / Auth",
        identityValidation: "↔ Identity Validation",

        // Service Machines
        serviceMachines: "Service Machines (Nodes)",
        server1: "🖥️ Server 1 (srv-worker-01)",
        server2: "🖥️ Server 2 (srv-cloud-01)",
        localTraefik1: "Local Traefik 1",
        localTraefik2: "Local Traefik 2",
        sidecar: "Sidecar",
        appBackend1: "App Backend 1",
        appBackend2: "App Backend 2",
        business: "Business",
        showcase: "Showcase",

        // Info Boxes
        publicFlowInfo: "🔴 <strong>Public Flow:</strong> WAFs filter attacks and route directly to Local Traefik instances",
        internalFlowInfo: "🟢 <strong>Internal Flow:</strong> Goes through Central Traefik + Authentik before reaching services",

        // Legend
        publicFlowLegend: "Public Flow (Red/Orange)",
        publicFlowDesc: "Internet → WAF Edge → Local Traefik<br/><em>Bypasses Central Traefik</em>",
        internalFlowLegend: "Internal Flow (Blue/Green)",
        internalFlowDesc: "LAN/VPN → Central Traefik ↔ Authentik → Local Traefik<br/><em>Authentication required</em>",
        finalFlowLegend: "Final Flow (Gray/Black)",
        finalFlowDesc: "Local Traefik → App Backend<br/><em>Localhost communication only</em>",

        // Zero Trust Principle
        zeroTrustPrinciple: "🔐 \"Zero Trust\" Principle",
        zeroTrustDesc: "Backend applications are <strong>NEVER</strong> directly accessible. They are always protected by their Local Traefik (Sidecar pattern).",

        // Flow Visualizer
        closeButton: "Close",
        publicFlowTitle: "Public Flow: Internet → Local Traefik 2",
        internalFlowTitle: "Internal Flow: Central Traefik → Local Traefik 1",
        internet: "Internet",
        publicUserLabel: "Public User",
        secureFiltering: "Secure Filtering",
        server2Sidecar: "Server 2 (Sidecar)",
        directPath: "⚡ <strong>Direct Path:</strong> This flow completely bypasses Central Traefik and authentication.<br/>WAFs filter attacks and route directly to public services.",
        user: "User",
        server1Sidecar: "Server 1 (Sidecar)",
        securePath: "🔒 <strong>Secure Path:</strong> All internal traffic goes through Central Traefik.<br/>Authentication via Authentik is required before accessing services.",
    },
    fr: {
        // Header
        title: "Architecture Réseau Sécurisée \"Zero Trust\"",
        subtitle: "Double Entrée Traefik avec Segmentation WAN/LAN",

        // Buttons
        visualizePublicFlow: "Visualiser Flux Public (Internet → Traefik Local 2)",
        visualizeInternalFlow: "Visualiser Flux Interne (Central → Traefik Local 1)",

        // Zones
        wanZone: "ZONE WAN / INTERNET",
        lanZone: "ZONE LAN / INTRANET",

        // Users
        publicUser: "Utilisateur Public",
        internetAccess: "Accès Internet",
        internalUser: "Utilisateur Interne",
        lanVpn: "LAN / VPN",

        // Badges
        public: "Public",
        internal: "Interne",
        central: "Central",

        // WAF
        wafEdgeA: "WAF Edge A",
        wafEdgeB: "WAF Edge B",
        bunkerWebSiteA: "BunkerWeb - Site A",
        bunkerWebSiteB: "BunkerWeb - Site B",

        // Infrastructure
        centralInfrastructure: "Infrastructure Centrale (Gestion)",
        centralTraefik: "Traefik Central",
        internalProxy: "Proxy Interne",
        authentik: "Authentik",
        ssoAuth: "SSO / Auth",
        identityValidation: "↔ Validation d'identité",

        // Service Machines
        serviceMachines: "Machines de Services (Nodes)",
        server1: "🖥️ Serveur 1 (srv-worker-01)",
        server2: "🖥️ Serveur 2 (srv-cloud-01)",
        localTraefik1: "Traefik Local 1",
        localTraefik2: "Traefik Local 2",
        sidecar: "Sidecar",
        appBackend1: "App Backend 1",
        appBackend2: "App Backend 2",
        business: "Métier",
        showcase: "Vitrine",

        // Info Boxes
        publicFlowInfo: "🔴 <strong>Flux Public:</strong> Les WAF filtrent les attaques et routent directement vers les Traefik Locaux",
        internalFlowInfo: "🟢 <strong>Flux Interne:</strong> Passe par Traefik Central + Authentik avant d'atteindre les services",

        // Legend
        publicFlowLegend: "Flux Public (Rouge/Orange)",
        publicFlowDesc: "Internet → WAF Edge → Traefik Locaux<br/><em>Contourne le Traefik Central</em>",
        internalFlowLegend: "Flux Interne (Bleu/Vert)",
        internalFlowDesc: "LAN/VPN → Traefik Central ↔ Authentik → Traefik Locaux<br/><em>Authentification obligatoire</em>",
        finalFlowLegend: "Flux Final (Gris/Noir)",
        finalFlowDesc: "Traefik Local → App Backend<br/><em>Communication localhost uniquement</em>",

        // Zero Trust Principle
        zeroTrustPrinciple: "🔐 Principe \"Zero Trust\"",
        zeroTrustDesc: "Les applications Backend ne sont <strong>JAMAIS</strong> accessibles directement. Elles sont toujours protégées par leur Traefik Local (pattern Sidecar).",

        // Flow Visualizer
        closeButton: "Fermer",
        publicFlowTitle: "Flux Public: Internet → Traefik Local 2",
        internalFlowTitle: "Flux Interne: Traefik Central → Traefik Local 1",
        internet: "Internet",
        publicUserLabel: "Utilisateur Public",
        secureFiltering: "Filtrage sécurisé",
        server2Sidecar: "Serveur 2 (Sidecar)",
        directPath: "⚡ <strong>Chemin Direct:</strong> Ce flux contourne complètement le Traefik Central et l'authentification.<br/>Les WAF filtrent les attaques et routent directement vers les services publics.",
        user: "Utilisateur",
        server1Sidecar: "Serveur 1 (Sidecar)",
        securePath: "🔒 <strong>Chemin Sécurisé:</strong> Tout le trafic interne passe par Traefik Central.<br/>L'authentification via Authentik est obligatoire avant d'accéder aux services.",
    },
};

export type Language = keyof typeof translations;
export type TranslationKeys = keyof typeof translations.en;
