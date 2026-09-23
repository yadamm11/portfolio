/* ==========================================================
   INHALTE – nur diese Datei bearbeiten
   ----------------------------------------------------------
   Fotos:  Pexels-Foto -> die Nummer am Ende des Links eintragen
             https://www.pexels.com/de-de/foto/34285246/ -> pexels: "34285246"
           Eigenes Bild -> in /images ablegen und
             { src: "images/meinbild.jpg", alt: "…" }
           alt = kurze Bildbeschreibung (für Barrierefreiheit/Google)
           title (optional) = Bildunterschrift

   Videos: ganzen YouTube-Link oder nur die ID eintragen.
           title und info (z. B. "imagefilm, 2025") frei anpassen.
           Eigenes Video ohne YouTube -> mp4 in /videos ablegen:
             { file: "videos/film.mp4", poster: "images/film.jpg",
               title: "…", info: "…" }
   ========================================================== */

const PHOTOS = [
  { pexels: "34285246", alt: "Foto von Yanic Dammann" },
  { pexels: "34285244", alt: "Porsche GT3 RS von oben mit Carbon-Dach" },
  { pexels: "34285241", alt: "Foto von Yanic Dammann" },
  { pexels: "34285240", alt: "Flugzeugwrack am schwarzen Sandstrand in Island" },
  { pexels: "34285236", alt: "Kirche in dramatischer Landschaft bei Selfoss, Island" },
  { pexels: "34285235", alt: "Foto von Yanic Dammann" },
  { pexels: "34285234", alt: "Wasserfall Seljalandsfoss in Island" },
  { pexels: "34285233", alt: "Foto von Yanic Dammann" },
  { pexels: "34285232", alt: "Foto von Yanic Dammann" },
  { pexels: "34285231", alt: "Foto von Yanic Dammann" },
  { pexels: "34285230", alt: "Nächtliche Autofahrt von innen, dunkle Strasse und grünes Gras" },
  { pexels: "34285229", alt: "Foto von Yanic Dammann" },
  { pexels: "34285228", alt: "Foto von Yanic Dammann" },
  { pexels: "34285227", alt: "Foto von Yanic Dammann" },
  { pexels: "34285226", alt: "Foto von Yanic Dammann" },
  { pexels: "34285225", alt: "Foto von Yanic Dammann" },
  { pexels: "34285223", alt: "Foto von Yanic Dammann" },
  { pexels: "34285218", alt: "Foto von Yanic Dammann" },
  { pexels: "34274165", alt: "Stausee in den Bergen mit Spiegelung" },
  { pexels: "34274132", alt: "Ruhiger Alpensee mit Spiegelung der Berge" },
  { pexels: "34274116", alt: "Foto von Yanic Dammann" },
  { pexels: "34274115", alt: "Sonnenaufgang über den verschneiten österreichischen Alpen" },
  { pexels: "34274114", alt: "Foto von Yanic Dammann" },
  { pexels: "34274113", alt: "Wanderer am Gipfelkreuz in den österreichischen Alpen" },
  { pexels: "34274112", alt: "Alpengipfel im Vorarlberg bei Sonnenaufgang" },
  { pexels: "34274111", alt: "Paragliding in den österreichischen Alpen" },
  { pexels: "34274110", alt: "Alpenlandschaft in Warth, Österreich" },
  { pexels: "34274109", alt: "Hängebrücke im Bergwald" },
  { pexels: "34274108", alt: "Paragliding in den Bergen" },
  { pexels: "34274099", alt: "Berghütte in den Österreichischen Alpen" },
  { pexels: "34274097", alt: "Nebelige Alpenlandschaft in Österreich" }
];

const VIDEOS = [
  { youtube: "https://youtu.be/zdBmfzcP9TU", title: "Chase your Dreams / Nike Spec Ad", info: "" },
  { youtube: "https://youtu.be/_HlArkwMVIY", title: "KPMG Tax Event Video", info: "" },
  { youtube: "https://youtu.be/oazCLC_1CQA", title: "Summit Wander Cinematic Short", info: "" },
  { youtube: "https://youtu.be/bLIdyrXrXRo", title: "Island Reise Recap ", info: "" },
  { youtube: "https://youtu.be/jPHh7lrLre4", title: "Nürensdorf Vintage Video", info: "" },
  { youtube: "https://youtu.be/lwT6IzGVAms", title: "Uhren Spec Ad", info: "" }
];
