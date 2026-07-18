"use client";

/**
 * ExploreResources.tsx — "Explore more resources with attractive incentives" element.
 *
 * Layout:
 *   Top: Centered Heading.
 *   Below: Responsive grid of resource cards.
 *   Each card: Image (top) + Title (with diagonal arrow indicator) + Description (bottom).
 *
 * Fully dynamic — columns count, colors, typography, border-radius, gaps.
 * No custom background — uses the builder's built-in Background control.
 */

import React from "react";
import { Icon } from "@iconify/react";
import {
  Text,
  Textarea,
  Select,
  NumberControl,
  ColorPickerPopup,
  Typography,
  ImageGallery,
  Url,
  Toggle,
} from "@/components/builder/controls";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getTypographyStyles(value: any) {
  if (!value || typeof value !== "object") return {};
  const styles: React.CSSProperties = {};
  if (value.fontFamily) styles.fontFamily = value.fontFamily;
  if (value.fontSize) styles.fontSize = `${value.fontSize}${value.fontSizeUnit || "px"}`;
  if (value.fontWeight) styles.fontWeight = value.fontWeight;
  if (value.textTransform) styles.textTransform = value.textTransform as any;
  if (value.fontStyle) styles.fontStyle = value.fontStyle;
  if (value.textDecoration) styles.textDecoration = value.textDecoration;
  if (value.lineHeight && value.lineHeight > 0)
    styles.lineHeight = `${value.lineHeight}${value.lineHeightUnit || "px"}`;
  if (value.letterSpacing !== undefined && value.letterSpacing !== 0)
    styles.letterSpacing = `${value.letterSpacing}${value.letterSpacingUnit || "px"}`;
  return styles;
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface ResourceItem {
  image: string;
  title: string;
  description: string;
  link: any;
}

// ── Frontend render ───────────────────────────────────────────────────────────

function ExploreResourcesFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const heading: string = s.content?.heading || "Explore more resources with\nattractive incentives";
  const items: ResourceItem[] = s.content?.items ?? [
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/backdrop-template.jpg",
      title: "Marketing Templates",
      description: "Take advantage and download Ephotovn's marketing templates and other materials that will help promote your work.",
      link: { url: "/free-templates/" },
    },
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/photoshop.jpg",
      title: "Photoshop Actions",
      description: "No need to build your own recipe of edits. These Photoshop Actions created by Ephotovn will help you get standardized edits and professional editing results.",
      link: { url: "/photoshop-action/" },
    },
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/free-template.jpg",
      title: "Digital Backdrops",
      description: "Create a pleasing portfolio with Ephotovn's exclusive range of digital backdrops. These are specifically designed for photographers that love to create memorable images for their customers.",
      link: { url: "/digital-backdrop/" },
    },
  ];

  // ── Layout ──
  const columns: number = s.style?.columns ?? 3;
  const gap: number = s.style?.gap ?? 32;
  const headerGap: number = s.style?.headerGap ?? 40;
  const cardGap: number = s.style?.cardGap ?? 14;

  // ── Heading styles ──
  const headingColor: string = s.style?.headingColor || "#111827";
  const headingTyp = getTypographyStyles(s.style?.headingTypography || {});

  // ── Card styles ──
  const cardTitleColor: string = s.style?.cardTitleColor || "#111827";
  const cardTitleTyp = getTypographyStyles(s.style?.cardTitleTypography || {});
  const cardDescColor: string = s.style?.cardDescColor || "#4b5563";
  const cardDescTyp = getTypographyStyles(s.style?.cardDescTypography || {});
  const imageBorderRadius: number = s.style?.imageBorderRadius ?? 8;
  const arrowColor: string = s.style?.arrowColor || "#111827";

  const renderLineByLine = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">{line}</span>
    ));

  return (
    <div className="w-full">
      {/* Header heading */}
      {heading && (
        <div style={{ textAlign: "center", marginBottom: `${headerGap}px` }}>
          <h2
            style={{
              margin: 0,
              color: headingColor,
              fontWeight: "800",
              lineHeight: "1.15",
              ...headingTyp,
            }}
          >
            {renderLineByLine(heading)}
          </h2>
        </div>
      )}

      {/* Grid */}
      {items.length > 0 && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${cardGap}px`,
              }}
            >
              {/* Image Container */}
              <a
                href={item.link?.url || "#"}
                target={item.link?.target || undefined}
                rel={item.link?.nofollow ? "nofollow" : undefined}
                style={{ display: "block", overflow: "hidden", borderRadius: `${imageBorderRadius}px` }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 10",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.3s ease",
                    }}
                    className="hover-scale-img"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 10",
                      backgroundColor: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon icon="mdi:image-outline" width={48} style={{ color: "#d1d5db" }} />
                  </div>
                )}
              </a>

              {/* Title & Arrow */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginTop: "4px" }}>
                <a
                  href={item.link?.url || "#"}
                  target={item.link?.target || undefined}
                  rel={item.link?.nofollow ? "nofollow" : undefined}
                  style={{
                    textDecoration: "none",
                    color: cardTitleColor,
                    fontWeight: "700",
                    flex: 1,
                    ...cardTitleTyp,
                  }}
                >
                  {item.title}
                </a>
                <a
                  href={item.link?.url || "#"}
                  target={item.link?.target || undefined}
                  rel={item.link?.nofollow ? "nofollow" : undefined}
                  style={{ display: "inline-flex", color: arrowColor }}
                >
                  <Icon icon="mdi:arrow-top-right" width={20} height={20} />
                </a>
              </div>

              {/* Description */}
              {item.description && (
                <p
                  style={{
                    margin: 0,
                    color: cardDescColor,
                    ...cardDescTyp,
                  }}
                >
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .hover-scale-img:hover {
          transform: scale(1.03);
        }
        @media (max-width: 768px) {
          .grid[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Items repeater control ────────────────────────────────────────────────────

function ItemsControl({
  value,
  onChange,
}: {
  value: ResourceItem[];
  onChange: (items: ResourceItem[]) => void;
}) {
  const items: ResourceItem[] = Array.isArray(value) ? value : [];

  const update = (index: number, field: keyof ResourceItem, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const add = () =>
    onChange([
      ...items,
      {
        image: "",
        title: "New Resource",
        description: "Resource description goes here.",
        link: { url: "#" },
      },
    ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index >= items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "#f9fafb",
            borderRadius: "8px",
            padding: "10px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>
              Item {idx + 1}
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button type="button" onClick={() => moveUp(idx)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#9ca3af" }}>
                <Icon icon="mdi:arrow-up" width={14} />
              </button>
              <button type="button" onClick={() => moveDown(idx)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#9ca3af" }}>
                <Icon icon="mdi:arrow-down" width={14} />
              </button>
              <button type="button" onClick={() => remove(idx)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#ef4444" }}>
                <Icon icon="mdi:close" width={14} />
              </button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <ImageGallery label="Image" value={item.image || ""} onChange={(v) => update(idx, "image", v)} />
            <Text label="Title" value={item.title || ""} onChange={(v) => update(idx, "title", v)} />
            <Textarea label="Description" value={item.description || ""} onChange={(v) => update(idx, "description", v)} rows={3} />
            <Url label="Link URL" value={item.link || { url: "" }} onChange={(v) => update(idx, "link", v)} />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "8px",
          border: "2px dashed #d1d5db",
          background: "transparent",
          color: "#6b7280",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <Icon icon="mdi:plus" width={16} /> Add Item
      </button>
    </div>
  );
}

// ── Builder element definition ────────────────────────────────────────────────

const exploreResourcesElement = {
  type: "explore-resources",
  category: "ephotovn",
  label: "Explore Resources",
  icon: "solar:archive-bold-duotone",

  schema: {
    content: {
      heading: "Explore more resources with\nattractive incentives",
      items: [
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/backdrop-template.jpg",
          title: "Marketing Templates",
          description: "Take advantage and download Ephotovn's marketing templates and other materials that will help promote your work.",
          link: { url: "/free-templates/" },
        },
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/photoshop.jpg",
          title: "Photoshop Actions",
          description: "No need to build your own recipe of edits. These Photoshop Actions created by Ephotovn will help you get standardized edits and professional editing results.",
          link: { url: "/photoshop-action/" },
        },
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/free-template.jpg",
          title: "Digital Backdrops",
          description: "Create a pleasing portfolio with Ephotovn's exclusive range of digital backdrops. These are specifically designed for photographers that love to create memorable images for their customers.",
          link: { url: "/digital-backdrop/" },
        },
      ],
    },

    style: {
      columns: 3,
      gap: { desktop: 32, tablet: 32, mobile: 32 },
      headerGap: { desktop: 40, tablet: 40, mobile: 40 },
      cardGap: { desktop: 14, tablet: 14, mobile: 14 },

      // Heading
      headingColor: "#111827",
      headingTypography: {
        fontSize: 38,
        fontWeight: "800",
      },

      // Card Title
      cardTitleColor: "#111827",
      cardTitleTypography: {
        fontSize: 16,
        fontWeight: "700",
      },

      // Card Description
      cardDescColor: "#4b5563",
      cardDescTypography: {
        fontSize: 14,
        lineHeight: 22,
        lineHeightUnit: "px",
      },

      imageBorderRadius: 8,
      arrowColor: "#111827",
    },

    advanced: {
      margin: { top: 60, right: 0, bottom: 60, left: 0, unit: "px" },
      padding: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
    },
  },

  controls: [
    // ═══════════════════ CONTENT TAB ════════════════
    {
      tab: "Content",
      section: "Heading Settings",
      controls: [
        {
          name: "heading",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Main Heading (line break = new line)" value={value || ""} onChange={onChange} rows={3} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Resource Items",
      controls: [
        {
          name: "items",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ItemsControl value={value ?? []} onChange={onChange} />
          ),
        },
      ],
    },

    // ═══════════════════ STYLE TAB ══════════════════
    {
      tab: "Style",
      section: "Layout",
      controls: [
        {
          name: "columns",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Grid Columns" value={value ?? 3} onChange={onChange} min={1} max={6} />
          ),
        },
        {
          name: "gap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Grid Gap (px)" value={value ?? 32} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "headerGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Heading to Grid Gap (px)" value={value ?? 40} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "cardGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Title to Description Gap (px)" value={value ?? 14} onChange={onChange} min={0} max={60} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Heading Styling",
      controls: [
        {
          name: "headingColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Heading Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "headingTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Heading Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Card Styling",
      controls: [
        {
          name: "cardTitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Card Title Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "cardTitleTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Card Title Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "cardDescColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Card Description Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
        {
          name: "cardDescTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Card Description Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "imageBorderRadius",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Image Border Radius (px)" value={value ?? 8} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "arrowColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Link Arrow Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <ExploreResourcesFrontend element={element} />,
};

export default exploreResourcesElement;
