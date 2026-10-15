import type { PageContent } from '../types';
const content: PageContent = {
  "description": "Compare a 0.22 vs 0.45 micron filter by purpose, membrane and validation evidence. Pore-size labels alone do not establish sterilizing performance.",
  "intro": "A 0.22 vs 0.45 micron filter comparison begins with the procedure. Decide whether you need sample clarification, instrument protection or a validated microbial-retention duty before selecting the membrane and device.",
  "sections": [
    {
      "heading": "Define what the number does and does not tell you",
      "paragraphs": [
        "The label identifies a stated pore or retention rating. It does not by itself establish sterility, compatibility, adsorption or capacity. Compare the manufacturer’s definition for the exact construction."
      ],
      "table": {
        "headings": [
          "Decision",
          "What must be confirmed"
        ],
        "rows": [
          [
            "Analytical sample preparation",
            "The method’s filtration requirement, analyte recovery and blanks."
          ],
          [
            "Particle removal",
            "Retention evidence appropriate to the target contamination."
          ],
          [
            "Microbial-control duty",
            "Product validation and the process qualification required."
          ],
          [
            "Device selection",
            "Membrane treatment, wetted materials, area and connections."
          ],
          [
            "Operating conditions",
            "Liquid, temperature, pressure and exposure limits."
          ]
        ]
      }
    },
    {
      "heading": "Do not infer a sterilizing claim",
      "paragraphs": [
        "Sterilizing-grade performance requires appropriate bacterial-retention validation for the filter and qualification for its use. Pall’s integrity-testing guidance distinguishes initial retention validation from a correlated integrity test.",
        "A sterile supplied device and a device capable of validated sterilizing filtration are different claims. Ask for the evidence your procedure requires. Neither rating should be described as removing every microorganism."
      ]
    },
    {
      "heading": "Protect sample recovery",
      "paragraphs": [
        "Check the membrane and housing against the solvent. Evaluate adsorption and extractables where they affect the assay. Use a method-appropriate blank and recovery study when changing the device.",
        "A more restrictive rating can alter pressure and capacity. Compare performance with representative samples instead of assuming the smaller number is always better."
      ]
    },
    {
      "heading": "Send the method with the enquiry",
      "paragraphs": [
        "Provide the liquid, sample volume, analytical or production method, target retention and required supply status. Include the current code and any validation or documentation requirement.",
        "[Confirm FHS laboratory pore ratings and product-specific validation availability]"
      ]
    }
  ],
  "sources": [
    {
      "title": "Pall: Filter integrity testing",
      "url": "https://www.pall.com/en/food-beverage/quality-control/integrity-testing.html",
      "note": "Relationship between retention validation and correlated integrity tests; checked 2026-10-13."
    }
  ]
};
export default content;

