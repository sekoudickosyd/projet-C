## 1. Configuration & Structure

- [x] 1.1 Créer le fichier `src/config/csvColumns.ts` avec les constantes de noms de colonnes (`AMOUNT_COLUMN`, `DATE_CREATED_COLUMN`, `DUE_DATE_COLUMN`)
- [x] 1.2 Définir le type TypeScript `Deal` dans `src/types/deal.ts` (champs : `amount: number`, `dateCreated: Date | null`, `dueDate: Date | null`, plus les autres colonnes du CSV en `string`)

## 2. Context Global

- [x] 2.1 Créer `src/context/DealsContext.tsx` avec le `DealsContext`, le `DealsProvider` et le hook `useDeals`
- [x] 2.2 Initialiser le contexte avec `deals: Deal[]` vide et `isLoaded: false`
- [x] 2.3 Envelopper le composant racine `App` avec `DealsProvider` dans `src/main.tsx`

## 3. Hook de Parsing

- [x] 3.1 Créer `src/hooks/useCsvParser.ts` qui accepte un `File | null` et retourne `{ data: Deal[], error: string | null, isLoading: boolean }`
- [x] 3.2 Implémenter le parsing PapaParse (`header: true`, `skipEmptyLines: true`) dans le hook
- [x] 3.3 Implémenter la fonction de nettoyage des montants (suppression `€`, `$`, espaces, normalisation `,` → `.`, conversion en `number`)
- [x] 3.4 Implémenter la fonction de conversion des dates (support `YYYY-MM-DD` et `DD/MM/YYYY`, retourner `null` si invalide)
- [x] 3.5 Gérer le cas fichier vide / sans données (retourner erreur explicite)

## 4. Composant CsvDropzone

- [x] 4.1 Créer `src/components/CsvDropzone.tsx` avec la zone de dépôt et le déclencheur de sélection fichier natif (input `type="file" accept=".csv"`)
- [x] 4.2 Implémenter les gestionnaires `onDragOver`, `onDragLeave`, `onDrop` pour le retour visuel (style survol avec bordure bleue)
- [x] 4.3 Ajouter la validation du type de fichier (extension `.csv`) avant d'appeler le parser
- [x] 4.4 Afficher un message d'erreur si le fichier n'est pas un CSV ou si le parsing échoue
- [x] 4.5 Afficher le nom du fichier et le nombre de lignes importées après un parsing réussi
- [x] 4.6 Appeler `useCsvParser` et mettre à jour le `DealsContext` avec les données parsées

## 5. Intégration & Tests UI

- [x] 5.1 Intégrer `CsvDropzone` dans la page principale (`src/App.tsx` ou `src/pages/Dashboard.tsx`)
- [x] 5.2 Tester avec le skill `playwright-skill` : dépôt d'un fichier CSV valide, vérification du retour visuel succès et du nombre de lignes
- [x] 5.3 Tester avec `playwright-skill` : dépôt d'un fichier non-CSV, vérification du message d'erreur
- [x] 5.4 Tester avec `playwright-skill` : vérifier la responsivité de la zone de dépôt sur différentes tailles d'écran
