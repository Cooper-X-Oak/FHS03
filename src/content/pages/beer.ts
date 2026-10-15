import type { PageContent } from '../types';
const content: PageContent = {
  "description": "Select a brewery filter by beer stage, loading and final acceptance criteria. Review clarification, membrane protection and cleaning conditions.",
  "intro": "A brewery filter must match its process stage. Separate clarification and membrane protection from final microbial-control requirements, and judge the result against the beer and packaging process.",
  "stages": [
    {
      "title": "Define the incoming load",
      "description": "Describe upstream clarification, solids and changes between batches. Compare a prefilter against actual conditions.",
      "products": [
        "melt-blown"
      ]
    },
    {
      "title": "Review the final stage",
      "description": "Confirm retention and validation requirements before selecting a membrane grade.",
      "products": [
        "pes"
      ]
    },
    {
      "title": "Evaluate the process",
      "description": "Compare throughput, pressure rise and finished-product acceptance under representative conditions.",
      "products": []
    }
  ],
  "sections": [
    {
      "heading": "Protect the final stage",
      "paragraphs": [
        "A final membrane can lose useful capacity when upstream solids or colloidal loading changes. Review the preceding process and a representative run record before changing the final rating.",
        "A staged arrangement must be justified by the actual feed and target. Do not assume a prefilter construction is suitable for every beer or every brewery."
      ]
    },
    {
      "heading": "Keep quality and qualification together",
      "paragraphs": [
        "Set acceptance criteria for clarity and the relevant product characteristics before a trial. Where microbial control is required, specify the target organisms, validated filter performance and process qualification.",
        "Provide cleaning agents, temperatures and exposure cycles. Confirm food-contact documentation, thermal limits and integrity-test requirements for the exact offered assembly."
      ]
    }
  ],
  "mistakes": [
    "Judging a trial only by throughput.",
    "Applying a sterile-filtration claim from a pore-size label.",
    "Changing cleaning exposure without checking the assembly limits.",
    "Ignoring upstream changes when the final membrane loads early."
  ]
};
export default content;

