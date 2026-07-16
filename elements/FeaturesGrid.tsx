"use client";

/**
 * FeaturesGrid.tsx — Ephotovn trusted features grid element.
 *
 * Layout:
 *   Top: Main heading (or subtitle + heading).
 *   Below: A responsive multi-column grid of text-based feature blocks.
 *   Each block has: Feature Title (bold) + Description paragraph.
 *
 * Fully dynamic — columns count, colors, typography, spacing.
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

interface FeatureItem {
  title: string;
  description: string;
}

// ── Frontend render ───────────────────────────────────────────────────────────

function FeaturesGridFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const heading: string = s.content?.heading || "Your Trusted\nPhoto Retouching Services";
  const features: FeatureItem[] = s.content?.features ?? [
    {
      title: "Fast Turnaround",
      description: "Get high-quality, stunning, and professional edits and retouches within 24 hours.",
    },
    {
      title: "No Subscription",
      description: "We only charge per image and pay only when you are satisfied with our service.",
    },
    {
      title: "Unlimited Changes",
      description: "Customer satisfaction is always our #1 priority. We do not limit the number of revisions until you feel truly satisfied with the service.",
    },
    {
      title: "One-on-one Approach",
      description: "Work 1-on-1 with one of our editors so you can get consistent results. This will provide you with a fast and dedicated support.",
    },
    {
      title: "We Don't Own Your Photos",
      description: "Your photos are completely yours. We don't claim any copyright after we edit and send them back. All data will be removed from our system within 30 days.",
    },
  ];

  // ── Layout ──
  const columns: number = s.style?.columns ?? 3;
  const gapX: number = s.style?.gapX ?? 48;
  const gapY: number = s.style?.gapY ?? 40;
  const headerGap: number = s.style?.headerGap ?? 48;
  const cardGap: number = s.style?.cardGap ?? 12;

  // ── Heading styles ──
  const headingColor: string = s.style?.headingColor || "#111827";
  const headingTyp = getTypographyStyles(s.style?.headingTypography || {});

  // ── Feature Block styles ──
  const featureTitleColor: string = s.style?.featureTitleColor || "#111827";
  const featureTitleTyp = getTypographyStyles(s.style?.featureTitleTypography || {});
  const featureDescColor: string = s.style?.featureDescColor || "#4b5563";
  const featureDescTyp = getTypographyStyles(s.style?.featureDescTypography || {});

  const renderLineByLine = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">{line}</span>
    ));

  return (
    <div className="w-full">
      {/* Header heading */}
      {heading && (
        <div style={{ marginBottom: `${headerGap}px` }}>
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
      {features.length > 0 && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            columnGap: `${gapX}px`,
            rowGap: `${gapY}px`,
          }}
        >
          {features.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${cardGap}px`,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: featureTitleColor,
                  fontWeight: "700",
                  lineHeight: "1.3",
                  ...featureTitleTyp,
                }}
              >
                {item.title}
              </h3>
              {item.description && (
                <p
                  style={{
                    margin: 0,
                    color: featureDescColor,
                    ...featureDescTyp,
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
        @media (max-width: 768px) {
          .grid[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Repeater control ──────────────────────────────────────────────────────────

function FeaturesControl({
  value,
  onChange,
}: {
  value: FeatureItem[];
  onChange: (items: FeatureItem[]) => void;
}) {
  const items: FeatureItem[] = Array.isArray(value) ? value : [];

  const update = (index: number, field: keyof FeatureItem, val: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const add = () =>
    onChange([...items, { title: "New Feature", description: "Feature description goes here." }]);

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
              Feature {idx + 1}
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
            <Text label="Title" value={item.title || ""} onChange={(v) => update(idx, "title", v)} />
            <Textarea label="Description" value={item.description || ""} onChange={(v) => update(idx, "description", v)} rows={3} />
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
        <Icon icon="mdi:plus" width={16} /> Add Feature
      </button>
    </div>
  );
}

// ── Builder element definition ────────────────────────────────────────────────

const featuresGridElement = {
  type: "features-grid-section",
  category: "ephotovn",
  label: "Features Grid Text Only",
  icon: "solar:widget-2-bold-duotone",

  schema: {
    content: {
      heading: "Your Trusted\nPhoto Retouching Services",
      features: [
        {
          title: "Fast Turnaround",
          description: "Get high-quality, stunning, and professional edits and retouches within 24 hours.",
        },
        {
          title: "No Subscription",
          description: "We only charge per image and pay only when you are satisfied with our service.",
        },
        {
          title: "Unlimited Changes",
          description: "Customer satisfaction is always our #1 priority. We do not limit the number of revisions until you feel truly satisfied with the service.",
        },
        {
          title: "One-on-one Approach",
          description: "Work 1-on-1 with one of our editors so you can get consistent results. This will provide you with a fast and dedicated support.",
        },
        {
          title: "We Don't Own Your Photos",
          description: "Your photos are completely yours. We don't claim any copyright after we edit and send them back. All data will be removed from our system within 30 days.",
        },
      ],
    },

    style: {
      columns: 3,
      gapX: 48,
      gapY: 40,
      headerGap: 48,
      cardGap: 12,

      // Heading
      headingColor: "#111827",
      headingTypography: {
        fontSize: 38,
        fontWeight: "800",
      },

      // Feature Title
      featureTitleColor: "#111827",
      featureTitleTypography: {
        fontSize: 18,
        fontWeight: "700",
      },

      // Feature Description
      featureDescColor: "#4b5563",
      featureDescTypography: {
        fontSize: 14,
        lineHeight: 22,
        lineHeightUnit: "px",
      },
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
      section: "Features List",
      controls: [
        {
          name: "features",
          responsive: false,
          render: (value: any, onChange: any) => (
            <FeaturesControl value={value ?? []} onChange={onChange} />
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
          name: "gapX",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Horizontal Gap (px)" value={value ?? 48} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "gapY",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Vertical Gap (px)" value={value ?? 40} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "headerGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Heading to Grid Gap (px)" value={value ?? 48} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "cardGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Title to Description Gap (px)" value={value ?? 12} onChange={onChange} min={0} max={60} />
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
      section: "Feature Card Styling",
      controls: [
        {
          name: "featureTitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Feature Title Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "featureTitleTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Feature Title Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "featureDescColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Feature Description Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
        {
          name: "featureDescTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Feature Description Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <FeaturesGridFrontend element={element} />,
};

export default featuresGridElement;
