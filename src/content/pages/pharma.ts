import type { PageContent } from '../types';
const content: PageContent = {
  "description": "Review pharmaceutical and biotech filtration requirements by process stage. Specify validation, material and documentation needs before selection.",
  "intro": "For pharmaceutical and biotech filtration, define each stage and its qualification requirements. A pore-size label alone does not establish a sterile process or a validated filter.",
  "stages": [
    {
      "title": "Define the liquid stage",
      "description": "Provide the fluid, retention target and validation requirements for the exact assembly.",
      "products": [
        "pes"
      ]
    },
    {
      "title": "Review chemistry and wetting",
      "description": "Assess membrane treatment, supports and seals under the complete exposure cycle.",
      "products": [
        "ptfe"
      ]
    },
    {
      "title": "Define the assembly",
      "description": "Confirm device connections, handling requirements and required supply documentation.",
      "products": [
        "capsule"
      ]
    }
  ],
  "sections": [
    {
      "heading": "Build a qualification request",
      "paragraphs": [
        "Specify product-contact materials, compatibility, extractables considerations, retention evidence and any integrity-test requirements. Critical applications require product-specific evidence and process qualification.",
        "FHS pharmaceutical qualifications, sterile supply and supporting validation packages have not been confirmed in this repository. [Confirm pharmaceutical product scope and validation documentation]"
      ]
    },
    {
      "heading": "Keep prefiltration tied to the process",
      "paragraphs": [
        "Upstream loading affects the final stage. Evaluate representative feed and define what the prefilter is intended to remove without losing valuable product components.",
        "Do not infer suitability from a polymer name or another supplier’s validation. Supply your acceptance criteria, cleaning or sterilization cycle and documentation list for review before a product is proposed."
      ]
    }
  ],
  "mistakes": [
    "Equating a pore-size label with a validated sterilizing claim.",
    "Transferring validation from a similar construction.",
    "Overlooking product loss or adsorption in a prefiltration trial.",
    "Ordering before the required documentation has been reviewed."
  ]
};
export default content;

