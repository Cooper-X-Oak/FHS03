import type { PageContent } from '../types';
const content: PageContent = {
  "description": "Compare absolute vs nominal filter rating using efficiency, test conditions and construction. Identical micron labels do not establish equivalence.",
  "intro": "When comparing an absolute vs nominal filter rating, ask what was measured. Neither word is a complete specification without particle size, removal efficiency and test conditions.",
  "sections": [
    {
      "heading": "Treat the label as the beginning of the comparison",
      "paragraphs": [
        "Nominal commonly describes a stated degree of removal, while absolute is often used for a more demanding retention claim. Supplier definitions and test methods differ. Never assign a universal efficiency to either word without the supporting specification.",
        "Pall’s food-safety guidance explains why the measured retention claim matters more than terminology alone."
      ]
    },
    {
      "heading": "Request comparable evidence",
      "paragraphs": [
        "Use this checklist for both products. If a field is missing, keep the comparison open instead of assuming equivalence."
      ],
      "table": {
        "headings": [
          "Evidence",
          "What to compare"
        ],
        "rows": [
          [
            "Particle size",
            "The size or sizes at which retention was evaluated."
          ],
          [
            "Removal efficiency",
            "The stated fraction removed under the test."
          ],
          [
            "Challenge and conditions",
            "Test material, liquid, flow and other reported conditions."
          ],
          [
            "Construction",
            "The exact media grade and complete element tested."
          ],
          [
            "Operating limits",
            "Whether the proposed service stays within the documented limits."
          ]
        ]
      }
    },
    {
      "heading": "Keep retention separate from service life",
      "paragraphs": [
        "A higher removal efficiency does not state how much material an element can hold. Two products with comparable retention can differ in pressure drop and usable capacity. Evaluate those properties separately under a representative load.",
        "Bypass at an incorrect seal or connection can also defeat the intended retention. Verify fit and assembly integrity as part of the replacement review."
      ]
    },
    {
      "heading": "Write the acceptance requirement",
      "paragraphs": [
        "Specify the downstream cleanliness requirement and the evidence needed to accept a candidate. Where microbial control is involved, require the relevant validation; a particle rating alone does not supply it.",
        "Send the original data sheet and process conditions with your quote request. Mark missing test information as unresolved rather than approving by nominal number."
      ]
    }
  ],
  "sources": [
    {
      "title": "Pall: Enhancing food safety management through filtration",
      "url": "https://www.pall.com/content/dam/pall/food-beverage/literature-library/non-gated/FBFSMEN-Food-Safety-Technical-Article.pdf",
      "note": "Background on rating terminology and documented retention; checked 2026-10-13."
    }
  ]
};
export default content;

