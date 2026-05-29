export const newsFilters = ["ALL", "BRAND", "CRAFTSMANSHIP", "EVENTS", "PROJECTS"] as const;

export type NewsFilter = (typeof newsFilters)[number];

export type NewsArticle = {
  body: Array<{
    heading?: string;
    paragraphs: string[];
  }>;
  category: Exclude<NewsFilter, "ALL">;
  date: string;
  excerpt: string;
  notes: string[];
  image: string;
  imagePosition?: string;
  quote: string;
  readingTime: string;
  slug: string;
  title: string;
};

export const featuredNews: NewsArticle = {
  body: [
    {
      heading: "A ring begins before metal is shaped",
      paragraphs: [
        "Every DAEHO championship ring begins as a record of a season, a team, and a moment that cannot be repeated. Before the first line is engraved, the design team studies symbols, colors, scorelines, uniforms, and the language that made the victory belong to its people.",
        "The goal is not to make a decorative object. The goal is to make a physical memory that feels exact when it is held years later."
      ]
    },
    {
      heading: "Designed for memory, built for endurance",
      paragraphs: [
        "Stone layout, side engraving, crest depth, and surface finish are balanced so the ring reads clearly from a distance and rewards close inspection. This is where DAEHO's craft language stays restrained: every element needs a reason to exist.",
        "The final piece carries a team identity, but it also carries the quiet discipline of its making."
      ]
    }
  ],
  category: "CRAFTSMANSHIP",
  date: "2025-05-12",
  excerpt:
    "Every DAEHO ring begins with a story of victory and is crafted with a legacy in mind. Explore the meaning, the process, and the purpose behind our championship rings.",
  image: "/images/project-1.png",
  notes: ["Victory narrative", "Symbol mapping", "Final inspection"],
  quote: "A championship ring should not only say that a team won. It should remember how the victory felt.",
  readingTime: "4 min read",
  slug: "designed-to-be-remembered",
  title: "Designed to Be Remembered"
};

export const newsArticles: NewsArticle[] = [
  {
    body: [
      {
        heading: "A result shaped by many hands",
        paragraphs: [
          "Victory is never a single image. It is a collection of practices, decisions, and shared pressure. DAEHO approaches each ring as a vessel for those layers, translating team culture into metal, stone, and proportion.",
          "The process moves from archive to sketch, from sketch to prototype, and from prototype to a piece that can survive ceremony, travel, and time."
        ]
      },
      {
        heading: "The legacy is in the restraint",
        paragraphs: [
          "A memorable ring does not need to be visually loud. The strongest pieces carry a clear center, meaningful side details, and enough negative space for the main story to breathe.",
          "That restraint is what keeps a project from becoming a souvenir. It becomes a record."
        ]
      }
    ],
    category: "BRAND",
    date: "2024-05-28",
    excerpt: "Behind every DAEHO ring is a story of passion, dedication, and unforgettable moments.",
    image: "/images/project-1.png",
    notes: ["Brand memory", "Team identity", "Victory record"],
    quote: "Legacy is not added at the end. It is designed from the first conversation.",
    readingTime: "3 min read",
    slug: "legacy-forged-in-victory",
    title: "Legacy Forged in Victory"
  },
  {
    body: [
      {
        heading: "Precision at a human scale",
        paragraphs: [
          "Detail work is where a DAEHO ring becomes personal. The curve of a side wall, the spacing around a stone, and the depth of an engraved emblem all change how the object feels in hand.",
          "The smallest elements must remain legible without competing with the central symbol."
        ]
      },
      {
        heading: "Every line has a purpose",
        paragraphs: [
          "The craft team reviews each surface as both image and structure. Lines need to catch light, support the design, and remain durable through repeated handling.",
          "That balance is why the final ring can feel ornate without feeling crowded."
        ]
      }
    ],
    category: "CRAFTSMANSHIP",
    date: "2024-05-24",
    excerpt: "Every line, stone, and curve is engineered with precision and purpose.",
    image: "/images/project-3.png",
    notes: ["Stone setting", "Surface control", "Engraving depth"],
    quote: "Detail is not decoration. Detail is how the object proves it was considered.",
    readingTime: "5 min read",
    slug: "the-art-of-detail",
    title: "The Art of Detail"
  },
  {
    body: [
      {
        heading: "A collection for different kinds of victory",
        paragraphs: [
          "The 2024 Signature Collection gathers silhouettes for teams, organizations, and individual commemorations. Each direction keeps the same DAEHO standard while allowing the identity of the client to lead.",
          "The collection is built around clarity: strong central motifs, clean side narratives, and finishes that hold contrast under ceremony lighting."
        ]
      },
      {
        heading: "Flexible, but never generic",
        paragraphs: [
          "Customization happens through meaningful decisions rather than superficial variation. Crest treatment, gemstone rhythm, metal tone, and inner engraving are adjusted to match the story being preserved.",
          "The result is a set of rings that belong together without feeling repeated."
        ]
      }
    ],
    category: "PROJECTS",
    date: "2024-05-20",
    excerpt: "Introducing our latest designs that celebrate champions, teams, and timeless achievement.",
    image: "/images/project-2.png",
    notes: ["Signature line", "Custom options", "Team programs"],
    quote: "A collection should offer range, but every piece still needs the discipline of a final object.",
    readingTime: "4 min read",
    slug: "2024-signature-collection",
    title: "2024 Signature Collection"
  },
  {
    body: [
      {
        heading: "The ceremony after the season",
        paragraphs: [
          "When a championship is won, the public image is immediate. The ring arrives later, giving the achievement a permanent form. DAEHO treats that delay as part of the ritual.",
          "The work is to make the object feel worthy of the moment without copying the moment too literally."
        ]
      },
      {
        heading: "From stadium energy to lasting form",
        paragraphs: [
          "Team imagery, celebration photos, and season records guide the design rhythm. The finished ring compresses that energy into a piece that can be worn, displayed, and passed forward.",
          "It becomes a quieter kind of celebration."
        ]
      }
    ],
    category: "EVENTS",
    date: "2024-05-18",
    excerpt: "A remarkable season. An unforgettable victory. DAEHO is proud to be part of their journey.",
    image: "/images/home-recent-projects.png",
    imagePosition: "center 34%",
    notes: ["Championship moment", "Ceremony planning", "Team archive"],
    quote: "The ring is the moment after the noise, when victory becomes something permanent.",
    readingTime: "3 min read",
    slug: "wins-crowned-champions",
    title: "WINS Crowned Champions"
  },
  {
    body: [
      {
        heading: "The blueprint stage",
        paragraphs: [
          "Concept work starts with intent. DAEHO maps what needs to be remembered, what should be hidden in detail, and what must be visible at first glance.",
          "Sketches, scale studies, and material tests help the team decide which symbols deserve emphasis."
        ]
      },
      {
        heading: "Turning direction into proof",
        paragraphs: [
          "Once the direction is set, the project moves through modeling, sample review, surface refinement, and production checks. Each phase narrows ambiguity.",
          "The final ring should feel inevitable, even though it came from many small decisions."
        ]
      }
    ],
    category: "CRAFTSMANSHIP",
    date: "2024-05-15",
    excerpt: "Explore how our design process turns inspiration into a lasting symbol of greatness.",
    image: "/images/home-bg.png",
    notes: ["Sketch review", "3D modeling", "Material sample"],
    quote: "A strong concept is not finished when it looks impressive. It is finished when it can be made well.",
    readingTime: "5 min read",
    slug: "from-concept-to-legacy",
    title: "From Concept to Legacy"
  },
  {
    body: [
      {
        heading: "A standard made visible",
        paragraphs: [
          "Durability is a design decision. DAEHO considers how surfaces age, how stones are protected, and how the ring will be handled long after the first presentation.",
          "The strongest object is one that keeps its meaning while it keeps its form."
        ]
      },
      {
        heading: "Made to be remembered forever",
        paragraphs: [
          "Material selection, finishing discipline, and final inspection are treated as part of the storytelling process. A ring that commemorates achievement must also prove its own standard.",
          "That is why each project ends with inspection, not with decoration."
        ]
      }
    ],
    category: "BRAND",
    date: "2024-05-10",
    excerpt: "Crafted with the finest materials and uncompromising standards. Made to be remembered forever.",
    image: "/images/project-3.png",
    imagePosition: "center 56%",
    notes: ["Material discipline", "Finish quality", "Delivery standard"],
    quote: "The best keepsake is not fragile. It is built to carry the weight of the story.",
    readingTime: "4 min read",
    slug: "built-to-last-forever",
    title: "Built to Last Forever"
  }
];
