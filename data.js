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
  { pexels: "34285246", alt: "foto von yanic dammann" },
  { pexels: "34285244", alt: "porsche gt3 rs von oben mit carbon-dach" },
  { pexels: "34285241", alt: "foto von yanic dammann" },
  { pexels: "34285240", alt: "flugzeugwrack am schwarzen sandstrand in island" },
  { pexels: "34285236", alt: "kirche in dramatischer landschaft bei selfoss, island" },
  { pexels: "34285235", alt: "foto von yanic dammann" },
  { pexels: "34285234", alt: "wasserfall seljalandsfoss in island" },
  { pexels: "34285233", alt: "foto von yanic dammann" },
  { pexels: "34285232", alt: "foto von yanic dammann" },
  { pexels: "34285231", alt: "foto von yanic dammann" },
  { pexels: "34285230", alt: "nächtliche autofahrt von innen, dunkle strasse und grünes gras" },
  { pexels: "34285229", alt: "foto von yanic dammann" },
  { pexels: "34285228", alt: "foto von yanic dammann" },
  { pexels: "34285227", alt: "foto von yanic dammann" },
  { pexels: "34285226", alt: "foto von yanic dammann" },
  { pexels: "34285225", alt: "foto von yanic dammann" },
  { pexels: "34285223", alt: "foto von yanic dammann" },
  { pexels: "34285218", alt: "foto von yanic dammann" },
  { pexels: "34274165", alt: "stausee in den bergen mit spiegelung" },
  { pexels: "34274132", alt: "ruhiger alpensee mit spiegelung der berge" },
  { pexels: "34274116", alt: "foto von yanic dammann" },
  { pexels: "34274115", alt: "sonnenaufgang über den verschneiten österreichischen alpen" },
  { pexels: "34274114", alt: "foto von yanic dammann" },
  { pexels: "34274113", alt: "wanderer am gipfelkreuz in den österreichischen alpen" },
  { pexels: "34274112", alt: "alpengipfel im vorarlberg bei sonnenaufgang" },
  { pexels: "34274111", alt: "paragliding in den österreichischen alpen" },
  { pexels: "34274110", alt: "alpenlandschaft in warth, österreich" },
  { pexels: "34274109", alt: "hängebrücke im bergwald" },
  { pexels: "34274108", alt: "paragliding in den bergen" },
  { pexels: "34274099", alt: "berghütte in den österreichischen alpen" },
  { pexels: "34274097", alt: "nebelige alpenlandschaft in österreich" }
];

const VIDEOS = [
  { youtube: "https://youtu.be/zdBmfzcP9TU", title: "video 1", info: "" },
  { youtube: "https://youtu.be/_HlArkwMVIY", title: "video 2", info: "" },
  { youtube: "https://youtu.be/oazCLC_1CQA", title: "video 3", info: "" },
  { youtube: "https://youtu.be/bLIdyrXrXRo", title: "video 4", info: "" },
  { youtube: "https://youtu.be/jPHh7lrLre4", title: "video 5", info: "" },
  { youtube: "https://youtu.be/lwT6IzGVAms", title: "video 6", info: "" }
];
