export interface BackgroundConcept {
  id: string;
  family: 'graphite' | 'light' | 'room' | 'material';
  title: string;
  subject: string;
}

export const backgroundConcepts: BackgroundConcept[] = [
  {
    "id": "01",
    "family": "room",
    "title": "Графит и тумба",
    "subject": "An almost uniform warm neutral charcoal surface, extremely fine matte tooth visible only at close inspection. The quietest baseline. No distinct light shape, edge, seam or pattern."
  },
  {
    "id": "02",
    "family": "room",
    "title": "Стена у стола",
    "subject": "A flat deep charcoal mineral surface with a very soft velvety finish, slightly warmer than black, no visible fibers or recognizable texture. Subtle natural tonal life, almost uniform."
  },
  {
    "id": "03",
    "family": "graphite",
    "title": "Матовая штукатурка",
    "subject": "A vast matte dark graphite plaster wall, extremely smooth and evenly lit. Barely perceptible fine plaster character, no mottling, stains or repeated texture. No visible room boundaries."
  },
  {
    "id": "04",
    "family": "graphite",
    "title": "Графитовый алюминий",
    "subject": "A seamless sheet of satin bead-blasted dark graphite aluminium, no seams or machining lines, microscopic tooth only, one extremely diffuse reflection so faint it is nearly uniform."
  },
  {
    "id": "05",
    "family": "graphite",
    "title": "Тёмный умбра",
    "subject": "A nearly uniform dark warm brown-charcoal matte surface, brown warmth extremely subdued, elegant natural umber undertone without visible wood grain, no shapes or borders."
  },
  {
    "id": "06",
    "family": "light",
    "title": "Свет справа",
    "subject": "A matte charcoal wall with a single exceptionally broad very faint soft daylight lift entering from the far right, feathered naturally over the rightmost third; the left and center remain calm dark graphite. No visible circular pool."
  },
  {
    "id": "07",
    "family": "light",
    "title": "Верхний дневной свет",
    "subject": "A matte warm graphite wall, the faintest broad diffused daylight grazes the upper right edge and dies away before the center; no beam or sharp border, no visible source, no vignette."
  },
  {
    "id": "08",
    "family": "light",
    "title": "Тёплый нижний свет",
    "subject": "Deep neutral charcoal with a barely perceptible broad low warm illumination along the bottom right edge, as distant soft room light reflecting from walnut. No orange wash or halo, main field remains graphite."
  },
  {
    "id": "09",
    "family": "light",
    "title": "Боковой рассеянный свет",
    "subject": "A smooth dark graphite wall with extremely soft broad natural side-light from the left outer edge, a subtle flat reflection with no hotspot; center holds dark neutral charcoal, far right quiet."
  },
  {
    "id": "10",
    "family": "light",
    "title": "Диагональный свет",
    "subject": "A dark matte charcoal surface receiving the faintest broad diagonal ambient daylight from upper right to lower left, no visible ray or edge, restrained tonal difference, realistic light on material."
  },
  {
    "id": "11",
    "family": "graphite",
    "title": "Чистый графит",
    "subject": "A completely empty flat uniform matte warm neutral graphite surface, a single uninterrupted near-solid background. No room, no wall/floor junction, no furniture, no props, no plants, no recognizable scene, no gradients or shadow shapes. Microscopic matte tooth only. Pure material study, absolutely nothing else."
  },
  {
    "id": "12",
    "family": "graphite",
    "title": "Угольный бархат",
    "subject": "A completely empty seamless satin dark charcoal material, barely perceptible velvety finish. No room, furniture, props, plants, corner, horizon, seam, edge or recognizable subject, no scenic content. Extremely close abstract surface fills entire frame."
  },
  {
    "id": "13",
    "family": "room",
    "title": "Тихий вечер",
    "subject": "A wide-angle impression of a quiet evening listening room, shot wildly out of focus, charcoal wall and very dim warm brown room tones at the far right edge. No lamp, no bokeh circles or point lights; entire scene very dark and calm."
  },
  {
    "id": "14",
    "family": "room",
    "title": "Стол на краю кадра",
    "subject": "A deeply defocused charcoal listening-room wall filling almost all the frame, a soft hint of a walnut tabletop only in the bottom right corner, no distinct horizon, no objects, gentle daylight. Central field absolutely calm."
  },
  {
    "id": "15",
    "family": "room",
    "title": "Дальний текстиль",
    "subject": "An extremely defocused dark room with an out-of-focus charcoal fabric chair barely suggested at the far right margin, muted walnut brown beneath it, empty matte graphite elsewhere. No identifiable furniture outlines, no cushion pattern."
  },
  {
    "id": "16",
    "family": "material",
    "title": "Орех у правого края",
    "subject": "A smooth matte graphite wall across the left 85 percent, a narrow softly focused vertical edge of natural dark oiled walnut at the extreme right, only subtle real grain. No slats, no repeated pattern, no gold seam. Soft ambient daylight."
  },
  {
    "id": "17",
    "family": "material",
    "title": "Мягкая ткань",
    "subject": "A calm matte charcoal field, with a small section of soft dark charcoal wool entering the bottom right corner, large gentle fold and no fine visible knit pattern. Material is subdued and dark, no high contrast edge."
  },
  {
    "id": "18",
    "family": "material",
    "title": "Акустический войлок",
    "subject": "A full frame of very dark warm graphite acoustic felt, shot with very shallow detail so fibers are not individually sharp. A single large soft change of plane far right, not a geometric repeated pattern, no ridges or grooves."
  },
  {
    "id": "19",
    "family": "material",
    "title": "Матовая бумага",
    "subject": "A vast sheet of dark warm charcoal uncoated paper, extremely fine natural tooth. One very broad faint bend only at the far right edge catches soft light, no crease across center, no visible line or dramatic shadow."
  },
  {
    "id": "20",
    "family": "material",
    "title": "Дерево в полутени",
    "subject": "A mostly empty matte graphite wall with a broad indistinct dark walnut surface entering along the lower right edge, grazing natural daylight showing just a trace of grain. No repeated boards, no seams, no bright brown patch."
  }
];

export const backgroundFamilies = {
  graphite: 'Ровные поверхности',
  light: 'Мягкий свет',
  room: 'Расфокусированная комната',
  material: 'Натуральные материалы',
} as const;

