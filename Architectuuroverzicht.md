## Architectuuroverzicht

In onderstaande figuur zijn de lagen en onderwerpen benoemd voor een datastation. Een datastation is een architectuurcomponent voor een aanbieder van data en services op basis van de DIZRA-principes: 

- **Gemeenschappelijke taal**, door vanuit een gemeenschappelijke domeinontologie data aan te bieden;
- **Data bij de bron**, om data en services meervoudig te kunnen gebruiken vanuit een netwerkperspectief;
- **FAIR data**, door de data en services 
  - vindbaar te maken door het aanbieden van metadata in de vorm van een datacatalogus,  
  - toegankelijk te maken via een protocol met authenticatie en autorisatie, 
  - interoperabel te maken door de gehanteerde ontologie en 
  - herbruikbaar door de samenwerkingsafspraken.
- **Machineleesbaar**, door machineleesbare data op basis van een machineleesbare ontologie aan te bieden
- **Open (internationale) standaarden**, omdat een datastation technisch is uitgevoerd met de standaarden van de W3C semantic web stack.

Voor meer informatie over de architectuurprincipes, zie [https://dizra.gitbook.io/dizra/](https://dizra.gitbook.io/dizra/)). In dit document is voor het datastation iedere laag beschreven en waar nodig zijn referenties opgenomen naar andere standaarden.

<img src="diagrams/Overview.svg" alt="Architectuuroverzicht van een datastation" style="zoom:90%;" />

Dit document is de eerste beschrijving van een datastation. Alle onderwerpen uit alle lagen zijn daarom in dit document beschreven. De verwachting is dat in de toekomst een splitsing noodzakelijk is naar een samenhangend kerndocument en documenten per onderwerp, naar mate het aantal onderwerpen (zoals het aantal services) zal toenemen.

Wat beschrijft iedere laag?

- De **protocollen** beschrijven de toegang tot de data en services. Uitgangspunt is dat gebruik wordt gemaakt van webstandaarden zoals REST en GraphQL. Naast synchrone toegang biedt het datastation ook asynchrone toegang via messaging.  

- De **services** zijn specifieke services gebaseerd op use cases in het ecosysteem van het Informatiestelsel Zorg. 
- In de **resources** zijn de resource shapes opgenomen evenals de constraints die op de shapes van toepassing zijn. 
- De **kennis** van een aanbieder wordt weergegeven, en is bevraagbaar, op basis van een ontologie.
- De kennis van een aanbieder is opgenomen in de achterliggende informatiesystemen van een aanbieder. De **integratielaag** beschrijft de koppeling tussen de data in deze informatiesystemen en de kennisweergave.
- Een datastation is onderdeel van het ecosysteem Informatiestelsel Zorg. Voor het ecosysteem zijn generieke standaarden van toepassing die in de **platformlaag** zijn opgenomen.

Dit document is georganiseerd vanuit de lagen van het datastation. Ieder hoofdstuk beschrijft de onderdelen van een laag.