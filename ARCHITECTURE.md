# Architecture Technique — Dashboard CRM "Flash"

## Stack Retenue

| Rôle | Technologie | Version |
|---|---|---|
| Framework UI | React | 18.x |
| Build tool | Vite | 5.x |
| Styling | Tailwind CSS | 3.x |
| Graphiques | Recharts | latest |
| Parsing CSV | PapaParse | latest |
| Composants UI | shadcn/ui | latest |

## Contraintes Techniques

- **Mode :** Client-side uniquement, aucun backend
- **Persistance :** Aucune (données en mémoire le temps de la session)
- **Auth :** Aucune
- **Accès :** Read-only (le CSV est la seule source de données)

## Structure du Projet

```
crm-flash/
├── public/
├── src/
│   ├── components/
│   │   ├── CSVDropzone.jsx      # Import drag & drop
│   │   ├── KPICard.jsx          # Tuile KPI générique
│   │   ├── DealTable.jsx        # Tableau Top 5 deals
│   │   ├── StatusChart.jsx      # Répartition montant par statut
│   │   ├── AssigneeChart.jsx    # CA par collaborateur (V1)
│   │   └── AlertList.jsx        # Deals urgents / en retard (V1)
│   ├── hooks/
│   │   ├── useCSVParser.js      # Parsing + nettoyage (montants €, dates)
│   │   └── useFilters.js        # Filtres dynamiques par Assignee (V1)
│   ├── utils/
│   │   └── formatters.js        # Formatage monétaire (€) et dates FR
│   ├── App.jsx                  # State global + layout principal
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Format des Données Attendu (CSV)

Colonnes traitées depuis `crm_prospects_demo.csv` :

| Colonne | Type après parsing | Notes |
|---|---|---|
| `Task Name` | string | Nom du deal |
| `Status` | string | prospect / qualifié / négociation / gagné - en cours / à relancer |
| `Date Created` | Date | Parsing ISO ou DD/MM/YYYY |
| `Due Date` | Date | Utilisée pour les alertes retard |
| `Assignees` | string | Filtre V1 |
| `Priority` | string | low / medium / high |
| `Montant Deal` | number | Nettoyage : retrait `€`, espaces insécables |

Colonnes ignorées : `Tags`, `Task Content`, `Start Date`

## Règles Métier

### Statuts
- **CA Sécurisé :** `Status` contient `"gagné"`
- **CA Probable :** prospect, qualifié, négociation
- **À relancer :** statut `"à relancer"` — traité comme pipeline actif

### Alertes (V1)
- Deal en **retard** : `Due Date` < aujourd'hui ET statut ≠ gagné → badge rouge
- Deal **prioritaire** : `Priority` = `"high"` → mise en avant

### Code couleur UI
- Rouge — retard (`Due Date` dépassée)
- Vert — statut gagné
- Bleu — pipeline en cours

## Roadmap d'Implémentation

### MVP
1. Drag & drop CSV + parsing PapaParse
2. Nettoyage des montants (`8,500€` → `8500`) et des dates
3. 3 KPI Cards : Pipeline total, Panier moyen, Volume prospects
4. BarChart : montant total par statut (Recharts)
5. Tableau Top 5 deals (triés par montant décroissant)

### V1
6. Filtre dynamique par Assignee (dropdown)
7. BarChart : CA potentiel par collaborateur
8. Liste d'alertes : deals en retard + priorité high
9. Segmentation visuelle CA Sécurisé vs CA Probable

### V2 (hors périmètre actuel)
- Migration vers une base de données (stockage des imports)
- Comparaison temporelle d'une semaine sur l'autre
- Export PDF du rapport flash
- Coefficients de probabilité par statut
