import type { PageContent } from '../types';
const content: PageContent = {
  "description": "Investigate filter cartridge clogging with pressure, flow and feed records. Separate loading problems from sizing, compatibility and installation issues.",
  "intro": "Filter cartridge clogging is a symptom to investigate, not a reason to select a coarser rating immediately. Compare pressure rise with flow, temperature and incoming conditions to identify what changed.",
  "sections": [
    {
      "heading": "Separate the patterns",
      "paragraphs": [
        "Record clean differential pressure after installation and how it changes through the run. Compare like-for-like operating conditions; a colder, more viscous liquid can change pressure without the same solids load."
      ],
      "table": {
        "headings": [
          "Observation",
          "Checks to make"
        ],
        "rows": [
          [
            "High pressure from startup",
            "Flow, viscosity, element sizing, installation and trapped air."
          ],
          [
            "Steady pressure rise",
            "Incoming load, available media area and upstream treatment."
          ],
          [
            "Sudden pressure change",
            "Process upset, flow change, instrument behavior or damage."
          ],
          [
            "Poor filtrate with little pressure rise",
            "Seal seating, bypass, damage and retention suitability."
          ],
          [
            "Life changed between batches",
            "Feed preparation, temperature, formulation and operating changes."
          ]
        ]
      }
    },
    {
      "heading": "Measure life by useful throughput",
      "paragraphs": [
        "Record acceptable volume or batch completion alongside hours in service. Hours alone can hide different flow and loading. Include the reason for changeout: pressure limit, quality result, scheduled hygiene requirement or another approved criterion.",
        "There is no universal industrial cartridge change interval. Follow the product limits and the site’s validated or approved operating procedure."
      ]
    },
    {
      "heading": "Investigate before changing the rating",
      "paragraphs": [
        "Inspect a removed element only under the site’s safe isolation and handling procedure. Record deposits and damage, and obtain appropriate analysis when necessary. Review chemical and thermal exposure if deformation or degradation appears.",
        "A coarser element may last longer while failing the downstream requirement. Consider upstream control, additional suitable area or a different validated construction only after identifying the limiting mechanism."
      ]
    },
    {
      "heading": "Send a useful troubleshooting record",
      "paragraphs": [
        "Include the current code, housing, flow, temperature, liquid, pressure trend, throughput and photos. Note the last satisfactory run and all changes since then.",
        "Agree on a controlled comparison with acceptance criteria before replacing the whole filter train."
      ]
    }
  ]
};
export default content;

