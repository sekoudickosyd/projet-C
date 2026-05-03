# Spécifications Fonctionnelles : Dashboard CRM "Flash"

## 🎯 Vision du Projet
Développer une application web légère permettant à un chef d'entreprise de visualiser instantanément la santé financière de son pipeline commercial à partir d'un export CSV. L'accent est mis sur la valeur des deals et l'urgence hebdomadaire.

---

## 🛠️ Stack Technique & Contraintes
- **Mode de fonctionnement :** "Live Memory" (Traitement des données au chargement, pas de stockage initial).
- **Format source :** CSV (basé sur le fichier `crm_prospects_demo.csv`).
- **Persistance :** Aucune (Base de données en hors-périmètre pour le MVP/V1).
- **Sécurité :** Accès direct sans authentification (No-Auth).

---

## 📋 Plan de Développement (Roadmap)

### Étape 1 : MVP (Produit Minimum Viable)
*Objectif : Transformer le CSV en indicateurs visuels immédiats.*

- **Module d'Import :** Zone de Drag & Drop pour le fichier CSV.
- **Parsing & Nettoyage :** 
    - Conversion des montants en nombres (nettoyage des symboles € ou espaces).
    - Conversion des colonnes `Date Created` et `Due Date` en objets Date.
- **Indicateurs KPIs (Top de page) :**
    - **Pipeline Global :** Somme cumulée de la colonne `Montant Deal`.
    - **Panier Moyen :** Montant total / Nombre de lignes.
    - **Volume de Prospects :** Nombre total de dossiers actifs.
- **Visualisation :**
    - Graphique en entonnoir ou barres : Répartition du montant total par `Status`.
    - **Tableau "Top 5 Deals" :** Affichage des 5 dossiers ayant le `Montant Deal` le plus élevé.

---

### Étape 2 : V1 (Pilotage & Urgences)
*Objectif : Identifier les leviers d'action pour la semaine.*

- **Analyse de l'Équipe :** 
    - Graphique de répartition du CA potentiel par `Assignees`.
- **Gestion des Alertes (Urgence) :**
    - Liste des deals avec une `Due Date` dépassée ou égale à aujourd'hui.
    - Mise en avant des dossiers avec une `Priority` "high".
- **Segmentation du CA :**
    - Séparer visuellement le **"CA Sécurisé"** (`Status` = gagné) du **"CA Probable"** (Prospect/Qualifié/Négo).
- **Filtres Dynamiques :**
    - Possibilité de filtrer tout le dashboard par un collaborateur spécifique (`Assignees`).

---

### Étape 3 : V2 (Évolutions Futures - À préparer)
*Objectif : Historisation et intelligence.*

- **Base de données :** Migration vers un stockage permanent pour enregistrer les imports.
- **Comparaison Temporelle :** Analyse de l'évolution du pipeline d'une semaine sur l'autre.
- **Export PDF :** Génération d'un rapport flash hebdomadaire pour archivage.
- **Probabilités :** Application d'un coefficient de réussite selon le statut du deal.

---

## 🚫 Hors-Périmètre (Exclu)
- **Authentification :** Pas de gestion d'utilisateurs ou de mots de passe.
- **Modification de données :** L'application est en lecture seule (Read-Only). Les corrections se font dans le CRM source.
- **Paiements :** Pas de suivi des factures ou des encaissements bancaires.
- **Tags :** La segmentation par la colonne `Tags` est ignorée pour simplifier l'interface.

---

## 📊 Structure des Données Attendue (Input)
L'application doit être capable de traiter les colonnes suivantes issues de `crm_prospects_demo.csv` :
- `Task Name` : Nom du deal/prospect.
- `Status` : État d'avancement.
- `Date Created` : Date d'entrée.
- `Due Date` : Date d'échéance.
- `Assignees` : Responsable du dossier.
- `Priority` : Niveau d'urgence.
- `Montant Deal` : Valeur financière (Clé primaire de la "santé" du deal).

---

## 🎨 Recommandations UI (Interface)
- **Style :** Épuré, professionnel, typé "Business Intelligence".
- **Code couleur :** 
    - Rouge pour les retards (`Due Date` passée).
    - Vert pour les statuts "Gagné".
    - Bleu pour le pipeline en cours.