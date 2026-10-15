import type { CollectionConfig, GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";
import path from "node:path";
import {
  allPages,
  handoffMap,
  pages,
  pageById,
  templateModules,
  sitemap,
} from "../lib/sitemap";
import { revalidateProduct, revalidateShared } from "./revalidate";
import { administrator, authenticated, staffOnly } from "./access";
import { contentFields, paragraphs, text } from "./fields";

const pageOptions = pages.map((page) => ({
  label: page.label,
  value: page.id,
}));
const stageField = contentFields.find(
  (field) => "name" in field && field.name === "stages",
);
if (stageField?.type === "array") {
  const products = stageField.fields.find(
    (field) => "name" in field && field.name === "products",
  );
  if (products?.type === "select")
    products.options = pageOptions.filter(
      (option) => pageById(option.value).template === "T3",
    );
}

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  access: {
    read: administrator,
    create: administrator,
    update: administrator,
    delete: administrator,
    admin: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: ["admin", "editor"],
      defaultValue: "editor",
      required: true,
      access: {
        create: ({ req }) => !req.user || req.user.role === "admin",
        update: ({ req }) => req.user?.role === "admin",
      },
    },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  access: { ...staffOnly, create: () => false, delete: () => false },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["pageId", "title", "template", "updatedAt"],
    description:
      "Structure comes from SITEMAP.md. Edit English content below. Other locales require owner approval before publication.",
  },
  versions: { drafts: true },
  fields: [
    {
      name: "pageId",
      type: "select",
      unique: true,
      required: true,
      options: [
        { label: "Legacy 3M record", value: "3m-cuno" },
        ...allPages.map((page) => ({ label: page.label, value: page.id })),
        ...Object.keys(handoffMap).map((value) => ({
          label: `Archived: ${value}`,
          value,
        })),
      ],
      admin: { readOnly: true },
    },
    ...[
      "path",
      "title",
      "h1",
      "template",
      "stage",
      "index_status",
      "launch_batch",
      "main_keyword",
    ].map((name) => ({
      name,
      type: "text" as const,
      admin: { readOnly: true },
    })),
    {
      name: "is_live",
      type: "checkbox",
      defaultValue: false,
      admin: { readOnly: true },
    },
    {
      name: "modules",
      type: "array",
      admin: {
        readOnly: true,
        description:
          "Ordered template modules. Content below supplies these shared modules.",
      },
      fields: [text("name", true)],
    },
    { name: "content", type: "group", localized: true, fields: contentFields },
    {
      name: "translationComplete",
      type: "checkbox",
      localized: true,
      defaultValue: false,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, originalDoc }) => {
        if (!data) return data;
        if (handoffMap[originalDoc?.pageId || data.pageId])
          throw new Error(
            "This page is archived. Edit its destination page from docs/HANDOFF-2026-10-14.md.",
          );
        const page = pageById(originalDoc?.pageId || data.pageId);
        return {
          ...data,
          pageId: page.id,
          path: page.path,
          title: page.title,
          h1: page.h1,
          template: page.template,
          stage: page.stage,
          index_status: page.index_status,
          launch_batch: page.launch_batch,
          main_keyword: page.main_keyword,
          is_live: page.is_live,
          modules: templateModules(page).map((name) => ({ name })),
        };
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (handoffMap[doc.pageId]) return { ...doc, stage: "archived" };
        const page = pageById(doc.pageId);
        return {
          ...doc,
          pageId: page.id,
          path: page.path,
          title: page.title,
          h1: page.h1,
          template: page.template,
          stage: page.stage,
          index_status: page.index_status,
          launch_batch: page.launch_batch,
          main_keyword: page.main_keyword,
          is_live: page.is_live,
        };
      },
    ],
    afterChange: [
      ({ doc, req }) => {
        if (!req.context.skipRevalidation)
          revalidatePath(pageById(doc.pageId).path);
        return doc;
      },
    ],
  },
};

const pageLink = (templates: string[]): CollectionConfig["fields"][number] => ({
  name: "pageId",
  type: "select",
  required: true,
  options: pageOptions.filter((option) =>
    templates.includes(pageById(option.value).template),
  ),
});
export const Products: CollectionConfig = {
  slug: "products",
  access: staffOnly,
  admin: { useAsTitle: "name" },
  fields: [
    pageLink(["T3"]),
    { ...text("name", true), localized: true },
    text("model", true),
    {
      name: "slug",
      type: "text",
      unique: true,
      validate: (value: unknown) =>
        !value ||
        (typeof value === "string" &&
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) ||
        "Use lowercase letters, numbers and single hyphens.",
    },
    text("section"),
    text("length"),
    text("endCap"),
    text("seals"),
    text("housingFit"),
    text("replacementBrands"),
    {
      name: "indexable",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Enable only after reviewing unique model specifications. Incomplete models retain a family canonical.",
      },
    },
    text("material"),
    text("micronRange"),
    text("sizes"),
    text("connections"),
    { name: "images", type: "upload", relationTo: "media", hasMany: true },
    { name: "datasheet", type: "upload", relationTo: "media" },
    { name: "approved", type: "checkbox", defaultValue: false },
  ],
  hooks: {
    beforeValidate: [
      ({ data, originalDoc }) => {
        const model = { ...originalDoc, ...data };
        if (model.approved && !model.slug)
          throw new Error("Approved models require a unique catalogue slug.");
        if (
          model.section &&
          model.pageId &&
          !pageById(model.pageId).sections?.includes(model.section)
        )
          throw new Error(
            "Choose a section declared on the product family in SITEMAP.md.",
          );
        return data;
      },
    ],
    afterChange: [
      ({ doc, previousDoc, req }) => {
        if (!req.context.skipRevalidation) {
          revalidatePath("/products/catalog/", "layout");
          revalidatePath("/sitemap.xml");
          revalidateProduct(doc.pageId);
          if (previousDoc?.pageId && previousDoc.pageId !== doc.pageId)
            revalidateProduct(previousDoc.pageId);
        }
        return doc;
      },
    ],
  },
};
export const CrossReferences: CollectionConfig = {
  slug: "crossReferences",
  access: staffOnly,
  fields: [
    pageLink(["T3", "T4"]),
    text("brand", true),
    text("partNumber", true),
    text("equivalent", true),
    text("spec", true),
    { name: "checkedAt", type: "date", required: true },
    text("checkedBy", true),
    { name: "verified", type: "checkbox", defaultValue: false },
  ],
  hooks: {
    afterChange: [
      ({ doc, previousDoc, req }) => {
        if (!req.context.skipRevalidation) {
          revalidateProduct(doc.pageId);
          if (previousDoc?.pageId && previousDoc.pageId !== doc.pageId)
            revalidateProduct(previousDoc.pageId);
        }
        return doc;
      },
    ],
  },
};
export const News: CollectionConfig = {
  slug: "news",
  access: staffOnly,
  versions: { drafts: true },
  admin: { useAsTitle: "title" },
  fields: [
    { ...text("title", true), localized: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      validate: (value: unknown) =>
        (typeof value === "string" &&
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) ||
        "Use lowercase letters, numbers and single hyphens.",
    },
    { name: "date", type: "date", required: true },
    { name: "content", type: "group", localized: true, fields: contentFields },
    { name: "images", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "relatedPages",
      type: "select",
      hasMany: true,
      options: pageOptions,
    },
    {
      name: "translationComplete",
      type: "checkbox",
      localized: true,
      defaultValue: false,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, originalDoc }) => {
        if (data?._status === "published") {
          const related = data.relatedPages || originalDoc?.relatedPages || [];
          if (!related.some((id: string) => pageById(id).template === "T3"))
            throw new Error(
              "Published news must link to at least one product page.",
            );
        }
        return data;
      },
    ],
    afterDelete: [
      ({ doc, req }) => {
        if (!req.context.skipRevalidation) {
          revalidatePath(
            sitemap.collections["news-items"].path.replace("{slug}", doc.slug),
          );
          revalidatePath(pageById("news").path);
          revalidatePath("/sitemap.xml");
        }
        return doc;
      },
    ],
    afterChange: [
      ({ doc, previousDoc, req }) => {
        if (!req.context.skipRevalidation) {
          const pattern = sitemap.collections["news-items"].path;
          revalidatePath(pattern.replace("{slug}", doc.slug));
          if (previousDoc?.slug && previousDoc.slug !== doc.slug)
            revalidatePath(pattern.replace("{slug}", previousDoc.slug));
          revalidatePath(pageById("news").path);
          revalidatePath("/sitemap.xml");
        }
        return doc;
      },
    ],
  },
};
export const Cases: CollectionConfig = {
  slug: "cases",
  access: staffOnly,
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        if (!req.context.skipRevalidation) revalidateShared();
        return doc;
      },
    ],
    afterDelete: [
      ({ doc, req }) => {
        if (!req.context.skipRevalidation) revalidateShared();
        return doc;
      },
    ],
  },
  fields: [
    text("title", true),
    text("industry"),
    text("country"),
    text("before"),
    text("after"),
    { name: "approved", type: "checkbox", defaultValue: false },
    paragraphs,
  ],
};
export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  access: { ...staffOnly, create: () => false },
  admin: {
    useAsTitle: "reference",
    defaultColumns: ["reference", "company", "email", "status", "createdAt"],
  },
  fields: [
    text("reference", true),
    ...[
      "name",
      "email",
      "company",
      "country",
      "brand",
      "partNumber",
      "application",
      "quantity",
      "sourcePage",
      "page_id",
      "template",
      "entry_location",
      "page_url",
      "referrer",
      "whatsappNumber",
      "customer_type",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ].map((name) => text(name)),
    { name: "message", type: "textarea" },
    {
      name: "attachments",
      type: "upload",
      relationTo: "attachments",
      hasMany: true,
    },
    {
      name: "status",
      type: "select",
      options: ["new", "quoted", "won", "lost"],
      defaultValue: "new",
    },
    ...["salesEmailStatus", "buyerEmailStatus"].map((name) => ({
      name,
      type: "select" as const,
      options: ["pending", "sent"],
      defaultValue: "pending",
    })),
  ],
};
export const Media: CollectionConfig = {
  slug: "media",
  access: { ...staffOnly, read: () => true },
  upload: {
    staticDir: path.resolve("data/media"),
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/svg+xml",
      "application/pdf",
    ],
    formatOptions: { format: "webp" },
    imageSizes: [
      { name: "card", width: 640, formatOptions: { format: "webp" } },
    ],
  },
  fields: [{ ...text("alt", true), localized: true }],
};
export const Attachments: CollectionConfig = {
  slug: "attachments",
  access: { ...staffOnly, read: authenticated, create: () => false },
  upload: {
    staticDir: path.resolve("data/attachments"),
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "image/vnd.dwg",
      "application/acad",
      "application/octet-stream",
    ],
  },
  fields: [],
};
export const globals: GlobalConfig[] = [
  {
    slug: "contact",
    access: { read: authenticated, update: administrator },
    fields: [
      text("salesEmail"),
      text("whatsapp"),
      text("contactName"),
      { name: "contactPhoto", type: "upload", relationTo: "media" },
      { name: "contactIntro", type: "textarea", localized: true },
      { name: "companySummary", type: "textarea", localized: true },
      { name: "wechatQR", type: "upload", relationTo: "media" },
      { name: "whatsappMessage", type: "textarea", localized: true },
    ],
  },
  {
    slug: "proof",
    access: { read: authenticated, update: administrator },
    fields: [
      {
        name: "metrics",
        type: "array",
        fields: [
          text("value", true),
          text("label", true),
          { name: "confirmed", type: "checkbox", defaultValue: false },
          { name: "approved", type: "checkbox", defaultValue: false },
        ],
      },
    ],
  },
  {
    slug: "certifications",
    access: { read: authenticated, update: administrator },
    fields: [
      {
        name: "items",
        type: "array",
        fields: [
          text("name", true),
          {
            name: "certificate",
            type: "upload",
            relationTo: "media",
            required: true,
          },
          { name: "approved", type: "checkbox", defaultValue: false },
        ],
      },
    ],
  },
];

for (const global of globals)
  global.hooks = {
    afterChange: [
      ({ doc, req }) => {
        if (!req.context.skipRevalidation) revalidateShared();
        return doc;
      },
    ],
  };
for (const collection of [Products, CrossReferences]) {
  collection.hooks!.afterDelete = [
    ({ doc, req }) => {
      if (!req.context.skipRevalidation) revalidateProduct(doc.pageId);
      return doc;
    },
  ];
}
