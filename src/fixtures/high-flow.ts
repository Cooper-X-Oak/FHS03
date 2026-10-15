import type { PageContent } from "@/content/types";
// Development-only fixture. Never written into CMS or published.
export function highFlowFixture(empty = false): PageContent {
  const base = {
    description: "Development fixture for the high flow template.",
    intro:
      "Demonstration content for layout testing. These are fictional values, not FHS product specifications.",
    sections: [],
  };
  if (empty) return base;
  return {
    ...base,
    fixture: true,
    sections: [
      {
        heading: "Demonstration series",
        paragraphs: [
          "Fictional series A and B demonstrate the product type module.",
        ],
      },
    ],
    gallery: ["overall", "end-cap", "detail", "dimensions"].map((kind) => ({
      kind,
      caption: `Demonstration ${kind} view; not product evidence.`,
      image: {
        url: "/assets/sample/high-flow.webp",
        alt: "Development sample image",
        width: 720,
        height: 600,
      },
    })),
    specs: [
      { label: "Material", value: "Demonstration material" },
      { label: "Length", value: "Demonstration range" },
      { label: "Connections", value: "Demonstration connection" },
    ],
    selection: [
      "Check the existing part identification.",
      "Check the required operating conditions.",
      "Confirm dimensions before ordering.",
    ],
    moduleContent: {
      ...Object.fromEntries(["M08","M24","M25"].map(key=>[key,[{heading:`Demonstration ${key}`,paragraphs:["Development fixture only. Related destinations are not linked because they are not live."]}]])),
      M16: [
        {
          heading: "Demonstration purchasing process",
          paragraphs: [
            "Requirement review, sample evaluation and order confirmation.",
          ],
        },
      ],
    },
    faq: [
      {
        question: "Is this a real specification?",
        answer: "No. This page is an isolated engineering fixture.",
      },
    ],
    request_hint: "Describe the demonstration request.",
  };
}
