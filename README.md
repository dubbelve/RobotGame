# Robotspel

Ett React-baserat robotrörelsesimuleringsspel där du kan styra en robot på ett rutnät med hjälp av enkla kommandon.

### Teknisk Stack

- React
- TypeScript
- Vite
- Vitest för testning


## Tillgängliga Kommandon

- `L` eller `V`: Rotera åt vänster
- `R` eller `H`: Rotera åt höger
- `G` eller `F`: Flytta framåt


### Installation

```bash
npm install
# eller
yarn install
```

### Starta
```bash
npm run dev
# eller
yarn dev
```

Applikationen kommer att vara tillgänglig på `http://localhost:5173`

## Användning

1. Konfigurera rutnätet:
   - Justera antalet rader och kolumner (1-20)
   - Ställ in startpositionen (rad och kolumn)
   - Välj startriktning (Norr, Öster, Söder, Väster)

2. Styr roboten:
   - Ange kommandon i inmatningsfältet (t.ex. "LFFRFF")
   - Klicka på "Execute" för att köra kommandona
   - Använd "Reset" för att återgå till startpositionen

## Tester

```bash
npm run test
# eller
yarn test
```
