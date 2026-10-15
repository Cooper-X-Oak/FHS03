import type { PageContent } from '../types';
const content: PageContent = {
  "description": "Compare a depth filter vs membrane filter by retention, loading and process role. Decide whether you need clarification, final control or both.",
  "intro": "The depth filter vs membrane filter decision starts with the separation task. Depth media capture material through a porous structure; membranes provide a defined filtration barrier. Their roles can be complementary in a staged process.",
  "sections": [
    {
      "heading": "Compare the job each stage does",
      "paragraphs": [
        "A depth element can distribute retained material within its structure. A membrane stage is often selected for a specified final retention requirement. Neither description establishes a product’s actual efficiency or capacity."
      ],
      "table": {
        "headings": [
          "Decision",
          "Depth element",
          "Membrane element"
        ],
        "rows": [
          [
            "Loading",
            "Evaluate solids-holding behavior through the media.",
            "Evaluate fouling and upstream protection needs."
          ],
          [
            "Retention",
            "Ask for efficiency and test conditions.",
            "Ask for retention evidence for the exact membrane grade."
          ],
          [
            "Critical microbial duty",
            "Do not infer qualification from the media format.",
            "Require relevant validation and process qualification."
          ],
          [
            "Trial",
            "Measure pressure rise and acceptable throughput.",
            "Measure pressure rise, quality and any required integrity result."
          ]
        ]
      }
    },
    {
      "heading": "Use stages only when they earn their place",
      "paragraphs": [
        "A suitable prefilter can reduce the load reaching a final membrane. Choose it against actual contaminants and the final-stage requirement. An overly restrictive prefilter can become the limiting stage without improving the accepted result.",
        "Pall’s discussion of depth and membrane stages in food filtration distinguishes loading and final microbial-control tasks. This is a process concept, not evidence for an FHS product claim."
      ]
    },
    {
      "heading": "Compare with a representative run",
      "paragraphs": [
        "Keep flow, temperature and incoming conditions comparable. Record initial pressure drop, volume processed, changeout reason and filtrate acceptance. Include product loss and changeout work when comparing the total task."
      ]
    },
    {
      "heading": "Prepare the specification",
      "paragraphs": [
        "Send the feed description, solids problem, current element, downstream requirement and available housing. State any compatibility, cleaning or validation constraints. Ask for construction-specific data rather than selecting by format alone."
      ]
    }
  ],
  "sources": [
    {
      "title": "Pall: Pore decisions in food filtration",
      "url": "https://www.pall.com/content/dam/pall/food-beverage/literature-library/non-gated/Pore_Decisions_Food_and_Drink_Technology.pdf",
      "note": "General distinction between depth stages and membrane retention; checked 2026-10-13."
    }
  ]
};
export default content;

