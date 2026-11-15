# 🏢 DATACENTER EXPERIENCE — Simulation 3D Éducative Interactive

> Application 3D temps réel développée pour remplacer une présentation PowerPoint traditionnelle dans le cadre d'un cours universitaire en **Réseaux & Télécommunications**.

---

## 🚀 Lancement Rapide

Dans le répertoire du projet :

```bash
# Installation des dépendances (si ce n'est pas déjà fait)
npm install

# Lancement du serveur de développement
npm run dev
```

Ouvrez votre navigateur sur l'adresse indiquée (par défaut : `http://localhost:3000` ou `http://localhost:5173`).

Pour compiler la version de production :

```bash
npm run build
npm run preview
```

---

## 🎮 Contrôles & Navigation

| Action | Touches Clavier | Souris |
|---|---|---|
| **Déplacement** | **Z / Q / S / D** (AZERTY) ou **W / A / S / D** (QWERTY) ou Flèches | - |
| **Regard / Caméra** | - | Mouvement de la souris (Pointer Lock) |
| **Examiner un équipement** | Touche **E** | Clic gauche sur le marqueur bleu |
| **Fermer la fiche / Pause** | Touche **Échap (ESC)** | Clic sur le bouton de fermeture |
| **Quiz de Connaissances** | Touche **K** | Clic sur le bouton Quiz en haut à droite |
| **Verrouillage souris** | - | Clic n'importe où dans la scène 3D |

---

## 🏛️ Les 6 Zones du Datacenter

1. **ZONE 01 — Introduction & Accueil (z: -50 à 0)**
   - Façade extérieure du datacenter hyperscale
   - Hall d'accueil et enregistrement des habilitations
   - Sas sécurisé (mantrap) et contrôle d'accès RFID (norme OSDP) & biométrique
   - Notions clés : Norme Tier de l'Uptime Institute (Tier I à Tier IV, disponibilité 99,995 %)

2. **ZONE 02 — Salle des Serveurs (z: 0 à 50)**
   - Allées de baies standard 19 pouces (42U selon EIA-310)
   - Serveurs lames haute densité (Blade servers) et serveurs de calcul
   - Commutateurs Top-of-Rack (ToR) 100G/400G
   - Chemins de câbles jaunes suspendus pour fibres optiques monomodes OS2 et multimodes OM5
   - Baies de stockage SAN (Storage Area Network) & NVMe-over-Fabrics

3. **ZONE 03 — Système Thermique & Climatisation CRAC (z: 50 à 100)**
   - Climatiseurs industriels de salle informatique (CRAC / CRAH)
   - Confinement d'allée froide (18°C - 24°C) avec flux de particules bleues montant du plancher technique perforé
   - Confinement d'allée chaude (35°C - 45°C) avec évacuation des particules rouges vers le plénum
   - Tuyauteries de distribution d'eau glacée et free-cooling
   - Notions clés : PUE (Power Usage Effectiveness) et thermodynamique des centres de données

4. **ZONE 04 — Infrastructure Électrique & Haute Disponibilité (z: 100 à 150)**
   - Onduleurs industriels (UPS) Online double-conversion (0 ms de temps de transfert)
   - Salles de bancs de batteries (10 à 30 minutes d'autonomie)
   - Commutateur de transfert automatique (ATS)
   - Groupes électrogènes diesel de secours géants (démarrage < 60s)
   - Animation du flux électrique le long des goulottes et gaines

5. **ZONE 05 — Réseau, Transit IP & Matrice Clos (z: 150 à 200)**
   - Routeurs de bordure BGP-4 assurant le multi-homing avec les opérateurs tiers (AS)
   - Matrice réseau haute performance Spine-and-Leaf (Clos Network)
   - Clusters de pare-feu de périmètre (NGFW) et protection Anti-DDoS
   - **Animation en temps réel d'un paquet réseau** voyageant de l'Internet vers les serveurs cibles

6. **ZONE 06 — Supervision NOC, SIEM & Sécurité Physique (z: 200 à 250)**
   - Mur vidéo central du centre d'opérations réseau (NOC) avec télémesure temps réel
   - Pupitre d'exploitation et tableaux de bord Grafana / Zabbix
   - Caméras dôme de surveillance motorisées avec rotation continue
   - Système d'extinction automatique d'incendie par gaz propre inerte (Novec 1230 / FM-200) sans eau
   - Scanner d'accès biométrique

---

## 📊 Mode Présentation Orale (Spécial Soutenance Universitaire)

Accessible depuis le menu principal ou le menu pause.
Ce mode offre :
- **Navigation assistée** : boutons *Zone Suivante / Précédente* pour voyager instantanément d'une zone à l'autre.
- **Positionnement de caméra automatique** : cadrage optimal sur chaque zone technique.
- **Notes orateur intégrées (toggleable)** : suggestions d'élocution rédigées en français, concepts techniques clés à insister, et questions à poser à l'auditoire.
- **Interaction en direct** : possibilité d'ouvrir les fiches d'équipements en plein exposé.

---

## 🚨 Scénarios de Gestion d'Incidents (Mission d'Urgence)

Trois scénarios de crise interactifs sont intégrés pour tester la compréhension opérationnelle :
1. **Alerte Thermique Critique** : panne de pompe CRAC-02, montée en température, bascule sur circuit de secours et acquittement NOC.
2. **Black-out Secteur** : rupture de ligne haute tension, prise de relais instantanée sur onduleur UPS et démarrage de l'ATS / groupe diesel.
3. **Coupure Fibre Dorsale** : rupture de liaison WAN primaire, reroutage dynamique BGP et supervision de rétablissement.

---

## 🛠️ Stack Technique

- **Framework** : React 19 + TypeScript
- **Moteur 3D** : Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **State Management** : Zustand
- **Build Tool** : Vite
- **Styles** : CSS moderne (custom properties, flexbox/grid, backdrop-filter, animations GPU)
