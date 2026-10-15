import type { PageContent } from '../types';
const content: PageContent = {
  "description": "Compare a 304 vs 316 stainless steel filter housing using liquid chemistry, cleaning, temperature and construction. Confirm the exact alloy and duty.",
  "intro": "The 304 vs 316 stainless steel filter housing decision depends on the liquid, temperature and cleaning exposure. Confirm whether the proposed grade is 316 or 316L, and review the complete housing construction.",
  "sections": [
    {
      "heading": "Start with corrosion exposure",
      "paragraphs": [
        "316L contains molybdenum and has low carbon content. Molybdenum improves resistance to some localized corrosion conditions compared with common 304 grades; low carbon helps limit sensitization associated with welding. Neither makes a housing immune to corrosion."
      ],
      "table": {
        "headings": [
          "Review item",
          "What to provide"
        ],
        "rows": [
          [
            "Process liquid",
            "Composition, concentration and contaminants, including chlorides."
          ],
          [
            "Temperature",
            "Normal operation and cleaning or upset exposure."
          ],
          [
            "Cleaning",
            "Chemicals, concentration, exposure duration and rinsing procedure."
          ],
          [
            "Construction",
            "Exact alloy, weld requirements, surface condition and crevices."
          ],
          [
            "Verification",
            "Material documentation and the acceptance standard required."
          ]
        ]
      }
    },
    {
      "heading": "Avoid a universal chloride limit",
      "paragraphs": [
        "Corrosion depends on combined exposure and construction conditions. Outokumpu describes how temperature, chemistry and surface condition affect localized corrosion; a single concentration limit cannot be transferred to every service.",
        "For aggressive duty, obtain a materials review. Both common grades may be unsuitable, so the decision is not always a choice between those two."
      ]
    },
    {
      "heading": "Check the housing beyond its shell",
      "paragraphs": [
        "Seals, internals, connections and welds also contact the process. State the required pressure and temperature rating separately: the alloy label does not establish a vessel rating.",
        "Confirm the applicable design documentation with the offered housing. A material certificate and a pressure design document answer different questions."
      ]
    },
    {
      "heading": "Request a construction-specific quote",
      "paragraphs": [
        "Send liquid and cleaning details, flow, connections, element arrangement and required documentation. Identify whether you are replacing an existing housing or defining a new installation.",
        "[Confirm FHS housing alloy availability and material-document options]"
      ]
    }
  ],
  "sources": [
    {
      "title": "Outokumpu: Supra stainless steel grades",
      "url": "https://www.outokumpu.com/en/products/product-ranges/supra",
      "note": "Molybdenum alloying and low-carbon 316L welding behavior; checked 2026-10-13."
    },
    {
      "title": "Outokumpu: Stainless steel corrosion resistance",
      "url": "https://www.outokumpu.com/en/expertise/stainless-basics/corrosion-resistance",
      "note": "General effects of alloying and service environment; checked 2026-10-13."
    }
  ]
};
export default content;

