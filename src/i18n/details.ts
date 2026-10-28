// Détail technique des nœuds et des liaisons, ouvert au clic sur le schéma.
// Source : la configuration Traefik et BunkerWeb du dépôt Docker-Compose. Le site
// est public : on décrit les mécanismes, jamais les IP ni les noms d'hôte
// internes (le SNI reste sous la forme <nœud>.local.<domaine>).
import type { Language } from './translations';

export type DetailId = 'waf' | 'central' | 'authentik' | 'local' | 'backend' | 'tlsWaf' | 'tlsCentral';

export interface Detail {
    kind: string;
    title: string;
    lead: string;
    // [libellé, valeur HTML]
    rows: [string, string][];
}

const SNI = '<code>&lt;node&gt;.local.&lt;domain&gt;</code>';
const SNI_FR = '<code>&lt;nœud&gt;.local.&lt;domaine&gt;</code>';

export const details: Record<Language, Record<DetailId, Detail>> = {
    en: {
        waf: {
            kind: 'Node · public entry point',
            title: 'BunkerWeb · WAF Edge',
            lead: 'Terminates public HTTPS, filters attacks, then hands the request to the Local Traefik of the target node. Central Traefik is never on this path.',
            rows: [
                ['Certificate shown', 'Public certificate, managed by BunkerWeb'],
                ['Filtering', 'BunkerWeb WAF rules (ModSecurity)'],
                ['To Local Traefik', 'HTTPS, internal PKI certificate verified (<code>REVERSE_PROXY_SSL_VERIFY=yes</code>)'],
                ['SNI', `${SNI}, set explicitly (<code>REVERSE_PROXY_SSL_SNI_NAME</code>)`],
                ['Host', 'Public service name, passed as is (<code>REVERSE_PROXY_CUSTOM_HOST</code>)'],
                ['Accepted by', '<code>chain-back-waf</code> on the Local Traefik: allow list of WAF IPs only'],
            ],
        },
        central: {
            kind: 'Node · Traefik, front profile',
            title: 'Central Traefik',
            lead: 'Internal entry point (LAN and VPN). Requires an Authentik session, then relays to the Local Traefik of the node.',
            rows: [
                ['Certificate shown', "Let's Encrypt (public ACME)"],
                ['Entry points', '<code>web</code> redirected to <code>websecure</code> · HTTP/3 advertised · TLS 1.2 minimum'],
                ['Authentication', '<code>forwardAuth</code> to the Authentik outpost (<code>chain-standard-authentik</code>)'],
                ['Headers', 'One-year HSTS with subdomains, <code>nosniff</code>, compression'],
                ['To Local Traefik', 'HTTPS verified against the internal PKI root (<code>serversTransport</code>), never <code>insecureSkipVerify</code>'],
            ],
        },
        authentik: {
            kind: 'Node · identity provider',
            title: 'Authentik',
            lead: 'Answers the forwardAuth of Central Traefik: the request moves on only with a valid session.',
            rows: [
                ['Response', '<code>200</code> with a valid session, otherwise <code>302</code> to the sign-in page'],
                ['Headers passed on', '<code>X-authentik-username</code>, <code>X-authentik-groups</code>, <code>X-authentik-email</code>…'],
                ['TLS link', 'Outpost verified against the internal PKI root'],
            ],
        },
        local: {
            kind: 'Node · Traefik, back profile',
            title: 'Local Traefik (sidecar)',
            lead: 'One Traefik per service machine. The only way in to the applications of the node.',
            rows: [
                ['Certificate shown', 'Issued by the internal PKI (step-ca) through ACME HTTP-01, short-lived'],
                ['Expected SNI', SNI],
                ['From the WAFs', '<code>chain-back-waf</code>: WAF IPs only, <code>depth: 0</code>'],
                ['From Central Traefik', '<code>chain-back-standard</code>: Central Traefik IP only'],
                ['TLS', 'TLS 1.2 minimum'],
                ['Docker', 'Read-only provider through <code>socket-proxy</code>, <code>exposedByDefault: false</code>'],
            ],
        },
        backend: {
            kind: 'Node · application',
            title: 'App backend',
            lead: 'Never exposed directly: no published port, only the Local Traefik of the node reaches it.',
            rows: [
                ['Exposure', 'No port published on the host'],
                ['Link', 'Docker <code>proxy</code> network of the node, shared with the Local Traefik'],
                ['Discovery', 'Docker labels, opted in service by service'],
            ],
        },
        tlsWaf: {
            kind: 'Link · public flow',
            title: 'BunkerWeb to Local Traefik',
            lead: 'The WAF never relays in clear text: it opens a TLS session to the Local Traefik and verifies its certificate.',
            rows: [
                ['Protocol', 'HTTPS, or gRPCS for gRPC services'],
                ['Server certificate', 'Internal PKI (step-ca)'],
                ['Verification', 'Internal PKI root, verification on'],
                ['SNI', `${SNI}, set by BunkerWeb: the connection targets an IP`],
                ['Host', 'Public service name'],
                ['mTLS', 'No: only the Local Traefik presents a certificate'],
            ],
        },
        tlsCentral: {
            kind: 'Link · internal flow',
            title: 'Central Traefik to Local Traefik',
            lead: 'Between the two Traefik instances, traffic is encrypted with TLS and an internal PKI certificate, verified by Central Traefik.',
            rows: [
                ['Protocol', 'HTTPS'],
                ['Server certificate', 'Internal PKI (step-ca)'],
                ['Verification', '<code>serversTransport</code> with the root mounted read-only, no <code>insecureSkipVerify</code>'],
                ['SNI', `${SNI}, set by the transport: the connection targets an IP`],
                ['Host', 'Original Host kept'],
                ['mTLS', 'No: only the Local Traefik presents a certificate'],
            ],
        },
    },
    fr: {
        waf: {
            kind: "Nœud · point d'entrée public",
            title: 'BunkerWeb · WAF Edge',
            lead: "Termine le HTTPS public, filtre les attaques, puis remet la requête au Traefik local du nœud visé. Le Traefik central n'est jamais sur ce chemin.",
            rows: [
                ['Certificat présenté', 'Certificat public, géré par BunkerWeb'],
                ['Filtrage', 'Règles WAF BunkerWeb (ModSecurity)'],
                ['Vers le Traefik local', 'HTTPS, certificat de la PKI interne vérifié (<code>REVERSE_PROXY_SSL_VERIFY=yes</code>)'],
                ['SNI', `${SNI_FR}, posé explicitement (<code>REVERSE_PROXY_SSL_SNI_NAME</code>)`],
                ['Host', 'Nom public du service, transmis tel quel (<code>REVERSE_PROXY_CUSTOM_HOST</code>)'],
                ['Accepté par', '<code>chain-back-waf</code> sur le Traefik local : liste blanche des seules IP des WAF'],
            ],
        },
        central: {
            kind: 'Nœud · Traefik, profil front',
            title: 'Traefik central',
            lead: "Point d'entrée interne (LAN et VPN). Exige une session Authentik, puis relaie vers le Traefik local du nœud.",
            rows: [
                ['Certificat présenté', "Let's Encrypt (ACME public)"],
                ['Entrées', '<code>web</code> redirigé vers <code>websecure</code> · HTTP/3 annoncé · TLS 1.2 minimum'],
                ['Authentification', "<code>forwardAuth</code> vers l'outpost Authentik (<code>chain-standard-authentik</code>)"],
                ['En-têtes', 'HSTS un an avec sous-domaines, <code>nosniff</code>, compression'],
                ['Vers le Traefik local', 'HTTPS vérifié par la racine de la PKI interne (<code>serversTransport</code>), jamais <code>insecureSkipVerify</code>'],
            ],
        },
        authentik: {
            kind: "Nœud · fournisseur d'identité",
            title: 'Authentik',
            lead: "Répond au forwardAuth du Traefik central : la requête n'avance que si la session est valide.",
            rows: [
                ['Réponse', '<code>200</code> si la session est valide, sinon <code>302</code> vers la page de connexion'],
                ['En-têtes transmis', '<code>X-authentik-username</code>, <code>X-authentik-groups</code>, <code>X-authentik-email</code>…'],
                ['Lien TLS', 'Outpost vérifié avec la racine de la PKI interne'],
            ],
        },
        local: {
            kind: 'Nœud · Traefik, profil back',
            title: 'Traefik local (sidecar)',
            lead: "Un Traefik par machine de services. Seul point d'accès aux applications du nœud.",
            rows: [
                ['Certificat présenté', 'Émis par la PKI interne (step-ca) via ACME HTTP-01, de courte durée'],
                ['SNI attendu', SNI_FR],
                ['Depuis les WAF', '<code>chain-back-waf</code> : IP des WAF uniquement, <code>depth: 0</code>'],
                ['Depuis le Traefik central', '<code>chain-back-standard</code> : IP du Traefik central uniquement'],
                ['TLS', 'TLS 1.2 minimum'],
                ['Docker', 'Provider en lecture seule via <code>socket-proxy</code>, <code>exposedByDefault: false</code>'],
            ],
        },
        backend: {
            kind: 'Nœud · application',
            title: 'App backend',
            lead: 'Jamais exposée directement : aucun port publié, seul le Traefik local du nœud la joint.',
            rows: [
                ['Exposition', "Aucun port publié sur l'hôte"],
                ['Liaison', 'Réseau Docker <code>proxy</code> du nœud, partagé avec le Traefik local'],
                ['Découverte', 'Labels Docker, activée service par service'],
            ],
        },
        tlsWaf: {
            kind: 'Liaison · flux public',
            title: 'BunkerWeb vers Traefik local',
            lead: 'Le WAF ne relaie jamais en clair : il ouvre une session TLS vers le Traefik local et vérifie son certificat.',
            rows: [
                ['Protocole', 'HTTPS, ou gRPCS pour les services gRPC'],
                ['Certificat serveur', 'PKI interne (step-ca)'],
                ['Vérification', 'Racine de la PKI interne, vérification active'],
                ['SNI', `${SNI_FR}, posé par BunkerWeb : la connexion vise une IP`],
                ['Host', 'Nom public du service'],
                ['mTLS', 'Non : seul le Traefik local présente un certificat'],
            ],
        },
        tlsCentral: {
            kind: 'Liaison · flux interne',
            title: 'Traefik central vers Traefik local',
            lead: 'Entre les deux Traefik, le trafic est chiffré en TLS avec un certificat de la PKI interne, vérifié par le Traefik central.',
            rows: [
                ['Protocole', 'HTTPS'],
                ['Certificat serveur', 'PKI interne (step-ca)'],
                ['Vérification', '<code>serversTransport</code> avec la racine montée en lecture seule, sans <code>insecureSkipVerify</code>'],
                ['SNI', `${SNI_FR}, posé par le transport : la connexion vise une IP`],
                ['Host', "Host d'origine conservé"],
                ['mTLS', 'Non : seul le Traefik local présente un certificat'],
            ],
        },
    },
};
