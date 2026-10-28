// Copy alignée sur la charte youkyi : casse phrase, aucun emoji, séparateur « · ».
// En français, espace insécable ( ) devant « : » et dans les guillemets.
export const translations = {
    en: {
        // Header
        title: "Secure \"Zero Trust\" network architecture",
        subtitle: "Dual Traefik entry with WAN/LAN segmentation",

        // Buttons
        visualizePublicFlow: "View the public flow",
        visualizeInternalFlow: "View the internal flow",

        // Zones
        wanZone: "WAN / Internet zone",
        lanZone: "LAN / intranet zone",

        // Users
        publicUser: "Public user",
        internetAccess: "Internet access",
        internalUser: "Internal user",
        lanVpn: "LAN / VPN",


        // WAF
        wafEdgeA: "WAF Edge A",
        wafEdgeB: "WAF Edge B",
        bunkerWebSiteA: "BunkerWeb · Site A",
        bunkerWebSiteB: "BunkerWeb · Site B",

        // Infrastructure
        centralInfrastructure: "Central infrastructure (management)",
        centralTraefik: "Central Traefik",
        internalProxy: "Internal proxy",
        authentik: "Authentik",
        ssoAuth: "SSO / Auth",
        identityValidation: "Identity validation",

        // Service Machines
        serviceMachines: "Service machines (nodes)",
        server1: "Server 1 (srv-worker-01)",
        server2: "Server 2 (srv-cloud-01)",
        localTraefik1: "Local Traefik 1",
        localTraefik2: "Local Traefik 2",
        sidecar: "Sidecar",
        appBackend1: "App Backend 1",
        appBackend2: "App Backend 2",
        business: "Business",
        showcase: "Showcase",

        // Info Boxes
        publicFlowInfo: "<strong>Public flow:</strong> a separate entry point. WAFs filter attacks and route directly to Local Traefik instances, over TLS with internal PKI certificates.",
        clickHint: "Click a node or a link to see its details",
        toLocalTraefiks: "To the Local Traefik instances",
        pkiTls: "TLS · internal PKI certificate",
        internalFlowInfo: "<strong>Internal flow:</strong> goes through Central Traefik + Authentik before reaching services. Between Central Traefik and Local Traefik instances, traffic uses TLS with certificates from the internal PKI (step-ca).",

        // Legend
        legend: "Legend",
        publicFlowLegend: "Public flow",
        publicFlowDesc: "Internet → WAF Edge → Local Traefik<br/><em>Separate entry point, without Central Traefik · TLS with internal PKI certificates</em>",
        internalFlowLegend: "Internal flow",
        internalFlowDesc: "LAN/VPN → Central Traefik ↔ Authentik → Local Traefik<br/><em>Authentication required · TLS with internal PKI certificates</em>",
        finalFlowLegend: "Final flow",
        finalFlowDesc: "Local Traefik → App Backend<br/><em>Localhost communication only</em>",

        // Zero Trust Principle
        zeroTrustPrinciple: "\"Zero Trust\" principle",
        zeroTrustDesc: "Backend applications are <strong>never</strong> directly accessible. They are always protected by their Local Traefik (sidecar pattern).",

        // Flow Visualizer
        closeButton: "Close",
        themeToDark: "Switch to dark theme",
        themeToLight: "Switch to light theme",
        replay: "Replay",
        publicFlowTitle: "Public flow: Internet → Local Traefik 2",
        internalFlowTitle: "Internal flow: Central Traefik → Local Traefik 1",
        internet: "Internet",
        publicUserLabel: "Public user",
        secureFiltering: "Secure filtering",
        server2Sidecar: "Server 2 (sidecar)",
        directPath: "<strong>Direct path:</strong> a separate entry point. WAFs filter attacks and hand the request straight to the Local Traefik, without going through Central Traefik or Authentik. This hop also uses TLS with an internal PKI certificate.",
        user: "User",
        server1Sidecar: "Server 1 (sidecar)",
        securePath: "<strong>Secure path:</strong> all internal traffic goes through Central Traefik. Authentication via Authentik is required before accessing services. Central Traefik then reaches the Local Traefik over TLS, with an internal PKI certificate.",
    },
    fr: {
        // Header
        title: "Architecture réseau sécurisée « Zero Trust »",
        subtitle: "Double entrée Traefik avec segmentation WAN/LAN",

        // Buttons
        visualizePublicFlow: "Voir le flux public",
        visualizeInternalFlow: "Voir le flux interne",

        // Zones
        wanZone: "Zone WAN / Internet",
        lanZone: "Zone LAN / intranet",

        // Users
        publicUser: "Utilisateur public",
        internetAccess: "Accès Internet",
        internalUser: "Utilisateur interne",
        lanVpn: "LAN / VPN",


        // WAF
        wafEdgeA: "WAF Edge A",
        wafEdgeB: "WAF Edge B",
        bunkerWebSiteA: "BunkerWeb · Site A",
        bunkerWebSiteB: "BunkerWeb · Site B",

        // Infrastructure
        centralInfrastructure: "Infrastructure centrale (gestion)",
        centralTraefik: "Traefik central",
        internalProxy: "Proxy interne",
        authentik: "Authentik",
        ssoAuth: "SSO / Auth",
        identityValidation: "Validation d'identité",

        // Service Machines
        serviceMachines: "Machines de services (nodes)",
        server1: "Serveur 1 (srv-worker-01)",
        server2: "Serveur 2 (srv-cloud-01)",
        localTraefik1: "Traefik local 1",
        localTraefik2: "Traefik local 2",
        sidecar: "Sidecar",
        appBackend1: "App Backend 1",
        appBackend2: "App Backend 2",
        business: "Métier",
        showcase: "Vitrine",

        // Info Boxes
        publicFlowInfo: "<strong>Flux public :</strong> un point d'entrée distinct. Les WAF filtrent les attaques et routent directement vers les Traefik locaux, en TLS avec des certificats de la PKI interne.",
        clickHint: "Clique sur un nœud ou une liaison pour voir son détail",
        toLocalTraefiks: "Vers les Traefik locaux",
        pkiTls: "TLS · certificat de la PKI interne",
        internalFlowInfo: "<strong>Flux interne :</strong> passe par le Traefik central et Authentik avant d'atteindre les services. Entre le Traefik central et les Traefik locaux, le trafic est chiffré en TLS avec des certificats de la PKI interne (step-ca).",

        // Legend
        legend: "Légende",
        publicFlowLegend: "Flux public",
        publicFlowDesc: "Internet → WAF Edge → Traefik locaux<br/><em>Point d'entrée distinct, sans Traefik central · TLS, certificats de la PKI interne</em>",
        internalFlowLegend: "Flux interne",
        internalFlowDesc: "LAN/VPN → Traefik central ↔ Authentik → Traefik locaux<br/><em>Authentification obligatoire · TLS, certificats de la PKI interne</em>",
        finalFlowLegend: "Flux final",
        finalFlowDesc: "Traefik local → App Backend<br/><em>Communication localhost uniquement</em>",

        // Zero Trust Principle
        zeroTrustPrinciple: "Principe « Zero Trust »",
        zeroTrustDesc: "Les applications backend ne sont <strong>jamais</strong> accessibles directement. Elles sont toujours protégées par leur Traefik local (pattern sidecar).",

        // Flow Visualizer
        closeButton: "Fermer",
        themeToDark: "Passer au thème sombre",
        themeToLight: "Passer au thème clair",
        replay: "Rejouer",
        publicFlowTitle: "Flux public : Internet → Traefik local 2",
        internalFlowTitle: "Flux interne : Traefik central → Traefik local 1",
        internet: "Internet",
        publicUserLabel: "Utilisateur public",
        secureFiltering: "Filtrage sécurisé",
        server2Sidecar: "Serveur 2 (sidecar)",
        directPath: "<strong>Chemin direct :</strong> un point d'entrée distinct. Les WAF filtrent les attaques et remettent la requête directement au Traefik local, sans passer par le Traefik central ni par Authentik. Ce trajet aussi est en TLS, avec un certificat de la PKI interne.",
        user: "Utilisateur",
        server1Sidecar: "Serveur 1 (sidecar)",
        securePath: "<strong>Chemin sécurisé :</strong> tout le trafic interne passe par le Traefik central. L'authentification via Authentik est obligatoire avant d'accéder aux services. Le Traefik central joint ensuite le Traefik local en TLS, avec un certificat de la PKI interne.",
    },
};

export type Language = keyof typeof translations;
export type TranslationKeys = keyof typeof translations.en;
