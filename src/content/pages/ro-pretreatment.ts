import type { PageContent } from '../types';
const content: PageContent = {
  "description": "Plan RO prefiltration around feed-water solids, flow and membrane-supplier requirements. Compare cartridge stages and housing fit before a quote.",
  "intro": "RO prefiltration controls particulate loading before the reverse-osmosis membrane. Choose the stage from feed-water conditions and the membrane supplier’s requirements, then check capacity and housing fit.",
  "stages": [
    {
      "title": "Characterize the feed",
      "description": "Record feed variability and the upstream treatment already in place. A cartridge does not replace all pretreatment duties.",
      "products": [
        "melt-blown"
      ]
    },
    {
      "title": "Size the cartridge stage",
      "description": "Compare flow per assembly, retention evidence, clean pressure drop and service capacity.",
      "products": [
        "high-flow"
      ]
    },
    {
      "title": "Check the housing",
      "description": "Confirm cartridge interfaces, seals, pressure limits and access for safe changeout.",
      "products": [
        "cartridge-housings"
      ]
    }
  ],
  "sections": [
    {
      "heading": "Define what the cartridge must control",
      "paragraphs": [
        "Suspended material can consume cartridge capacity and load the downstream membrane. Review feed quality over the operating cycle, including startup and upset conditions. Avoid selecting only from an average sample.",
        "Particle cartridges do not establish control of dissolved salts, scaling potential or oxidant exposure. Those requirements belong in the complete RO pretreatment design."
      ]
    },
    {
      "heading": "Use the membrane requirements as the starting point",
      "paragraphs": [
        "Obtain the RO equipment supplier’s particulate and feed-quality requirements. Compare the proposed cartridge’s efficiency and test conditions with those requirements; do not infer protection from a micron label alone.",
        "Record cartridge differential pressure and changeout history alongside feed conditions. A sudden reduction in life calls for investigation upstream before simply installing a coarser grade."
      ]
    }
  ],
  "mistakes": [
    "Treating cartridge filtration as complete RO pretreatment.",
    "Selecting by nominal micron number without efficiency data.",
    "Ignoring feed-water changes during startup or seasonal operation.",
    "Changing the retention grade without checking the membrane supplier’s requirements."
  ]
};
export default content;

