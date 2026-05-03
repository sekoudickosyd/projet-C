## 1. Extension du DealsContext

- [x] 1.1 Ajouter `totalAmount` et `dealsCount` dans l'interface du contexte `DealsContext`
- [x] 1.2 Calculer `totalAmount` (somme de `Montant Deal`) et `dealsCount` (nombre de lignes) lors du parsing CSV
- [x] 1.3 Exposer ces valeurs dans le provider `DealsContext`

## 2. Hook useKpiMetrics

- [x] 2.1 Créer `src/hooks/useKpiMetrics.ts` retournant `{ pipelineTotal, averageBasket, prospectsCount }`
- [x] 2.2 Implémenter le calcul du Panier Moyen avec garde contre la division par zéro
- [x] 2.3 Connecter le hook à `DealsContext` pour lecture de `totalAmount` et `dealsCount`

## 3. Composant KpiBar

- [x] 3.1 Créer `src/components/KpiBar.tsx` avec trois cartes shadcn/ui
- [x] 3.2 Afficher "Pipeline Global" formaté en euros
- [x] 3.3 Afficher "Panier Moyen" formaté en euros
- [x] 3.4 Afficher "Volume de Prospects" (nombre entier)
- [x] 3.5 Conditionner l'affichage au flag `isLoaded` du contexte

## 4. Intégration dans la page principale

- [x] 4.1 Importer et placer `<KpiBar />` en haut de la page principale, après la zone de dropzone
- [x] 4.2 Vérifier que le bandeau est masqué avant import et visible après import CSV réussi

## 5. Tests interface

- [x] 5.1 Tester avec le skill `playwright-skill` : vérifier l'affichage des trois KPIs après import d'un CSV de test
- [x] 5.2 Vérifier le comportement avec un CSV dont tous les montants sont à zéro
- [x] 5.3 Vérifier que le bandeau est absent avant tout import
