"use client";

/**
 * FeatureCards.tsx — "Ensure quality with professional retouchers" section.
 *
 * Layout:
 *   Top: Subtitle + Heading (centered or aligned).
 *   Below: Grid of feature cards, each with a title (underlined highlight) + description.
 *
 * Fully dynamic — card count, grid columns, colours, typography, highlight style.
 * No custom background — the builder's built-in Background handles that.
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

interface CardItem {
  title: string;
  description: string;
}

// ── Frontend render ───────────────────────────────────────────────────────────

function FeatureCardsFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const subtitle: string = s.content?.subtitle || "Professional retouchers";
  const showSubtitle: boolean = s.content?.showSubtitle ?? true;
  const heading: string = s.content?.heading || "Ensure quality with\nprofessional retouchers";
  const cards: CardItem[] = s.content?.cards ?? [
    {
      title: "Choosing Top-notch Retouchers",
      description: "Start by working with two retouchers for free. Our support team will then help you find additional retouchers who match your style.",
    },
    {
      title: "Consistent Quality Assurance",
      description: "Save your preferred retouchers and templates for future projects to maintain consistent quality.",
    },
    {
      title: "Flexible Replacements",
      description: "Easily switch retouchers without limits if you're not fully satisfied with your current choice.",
    },
  ];

  // ── Layout ──
  const columns: number = s.style?.columns ?? 3;
  const gap: number = s.style?.gap ?? 24;
  const headerGap: number = s.style?.headerGap ?? 32;
  const headerAlign: "left" | "center" | "right" = s.style?.headerAlign || "left";

  // ── Subtitle styles ──
  const subtitleColor: string = s.style?.subtitleColor || "#374151";
  const subtitleTyp = getTypographyStyles(s.style?.subtitleTypography || {});

  // ── Heading styles ──
  const headingColor: string = s.style?.headingColor || "#111827";
  const headingTyp = getTypographyStyles(s.style?.headingTypography || {});

  // ── Card styles ──
  const cardTitleColor: string = s.style?.cardTitleColor || "#111827";
  const cardDescColor: string = s.style?.cardDescColor || "#4b5563";
  const cardTitleTyp = getTypographyStyles(s.style?.cardTitleTypography || {});
  const cardDescTyp = getTypographyStyles(s.style?.cardDescTypography || {});
  const cardGap: number = s.style?.cardGap ?? 12;

  // ── Highlight / underline ──
  const highlightColor: string = s.style?.highlightColor || "#fca5a5";
  const highlightHeight: number = s.style?.highlightHeight ?? 8;
  const highlightOffset: number = s.style?.highlightOffset ?? 40;
  const showHighlight: boolean = s.style?.showHighlight ?? true;

  const renderLineByLine = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">{line}</span>
    ));

  return (
    <div className="w-full">
      {/* Header: subtitle + heading */}
      <div style={{ textAlign: headerAlign, marginBottom: `${headerGap}px` }}>
        {showSubtitle && subtitle && (
          <div
            style={{
              color: subtitleColor,
              fontWeight: "600",
              letterSpacing: "0.02em",
              marginBottom: "12px",
              ...subtitleTyp,
            }}
          >
            {renderLineByLine(subtitle)}
          </div>
        )}

        {heading && (
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
        )}
      </div>

      {/* Cards grid */}
      {cards.length > 0 && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${cardGap}px`,
              }}
            >
              {/* Title with highlight underline */}
              <div style={{ display: "inline-block" }}>
                <h3
                  style={{
                    margin: 0,
                    color: cardTitleColor,
                    display: "inline",
                    position: "relative",
                    ...cardTitleTyp,
                    ...(showHighlight
                      ? {
                          backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: `0 ${highlightOffset}%`,
                          backgroundSize: `100% ${highlightHeight}px`,
                          paddingBottom: "2px",
                        }
                      : {}),
                  }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Description */}
              {card.description && (
                <p
                  style={{
                    margin: 0,
                    color: cardDescColor,
                    ...cardDescTyp,
                  }}
                >
                  {card.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Responsive override for mobile */}
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

// ── Cards repeater control ────────────────────────────────────────────────────

function CardsControl({
  value,
  onChange,
}: {
  value: CardItem[];
  onChange: (items: CardItem[]) => void;
}) {
  const items: CardItem[] = Array.isArray(value) ? value : [];

  const update = (index: number, field: keyof CardItem, val: string) => {
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
              Card {idx + 1}
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
        <Icon icon="mdi:plus" width={16} /> Add Card
      </button>
    </div>
  );
}

// ── Builder element definition ────────────────────────────────────────────────

const featureCardsElement = {
  type: "feature-cards",
  category: "ephotovn",
  label: "Feature Cards",
  icon: "solar:notes-bold-duotone",

  schema: {
    content: {
      subtitle: "Professional retouchers",
      showSubtitle: true,
      heading: "Ensure quality with\nprofessional retouchers",
      cards: [
        {
          title: "Choosing Top-notch Retouchers",
          description: "Start by working with two retouchers for free. Our support team will then help you find additional retouchers who match your style.",
        },
        {
          title: "Consistent Quality Assurance",
          description: "Save your preferred retouchers and templates for future projects to maintain consistent quality.",
        },
        {
          title: "Flexible Replacements",
          description: "Easily switch retouchers without limits if you're not fully satisfied with your current choice.",
        },
      ],
    },

    style: {
      columns: 3,
      gap: { desktop: 24, tablet: 24, mobile: 24 },
      headerGap: { desktop: 32, tablet: 32, mobile: 32 },
      headerAlign: "left",

      // Subtitle
      subtitleColor: "#374151",
      subtitleTypography: {
        fontSize: 15,
        fontWeight: "600",
      },

      // Heading
      headingColor: "#111827",
      headingTypography: {
        fontSize: 38,
        fontWeight: "800",
        lineHeight: 44,
        lineHeightUnit: "px",
      },

      // Card title
      cardTitleColor: "#111827",
      cardTitleTypography: {
        fontSize: 17,
        fontWeight: "700",
      },

      // Card description
      cardDescColor: "#4b5563",
      cardDescTypography: {
        fontSize: 14,
        lineHeight: 22,
        lineHeightUnit: "px",
      },

      cardGap: { desktop: 12, tablet: 12, mobile: 12 },

      // Highlight underline
      showHighlight: true,
      highlightColor: "#fca5a5",
      highlightHeight: 8,
      highlightOffset: 40,
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
      section: "Subtitle & Heading",
      controls: [
        {
          name: "showSubtitle",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Subtitle" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "subtitle",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Subtitle Text" value={value || ""} onChange={onChange} />
          ),
        },
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
      section: "Feature Cards",
      controls: [
        {
          name: "cards",
          responsive: false,
          render: (value: any, onChange: any) => (
            <CardsControl value={value ?? []} onChange={onChange} />
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
            <NumberControl label="Cards Gap (px)" value={value ?? 24} onChange={onChange} min={0} max={80} />
          ),
        },
        {
          name: "headerGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Header to Cards Gap (px)" value={value ?? 32} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "headerAlign",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Header Alignment"
              value={value ?? "left"}
              onChange={onChange}
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
            />
          ),
        },
        {
          name: "cardGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Title-to-Description Gap (px)" value={value ?? 12} onChange={onChange} min={0} max={40} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Subtitle Styling",
      controls: [
        {
          name: "subtitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Subtitle Color" value={value ?? "#374151"} onChange={onChange} />
          ),
        },
        {
          name: "subtitleTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Subtitle Typography" value={value} onChange={onChange} />
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
      section: "Card Title Styling",
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
      ],
    },
    {
      tab: "Style",
      section: "Card Description Styling",
      controls: [
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
      ],
    },
    {
      tab: "Style",
      section: "Title Highlight",
      controls: [
        {
          name: "showHighlight",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Title Highlight" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "highlightColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Highlight Color" value={value ?? "#fca5a5"} onChange={onChange} />
          ),
        },
        {
          name: "highlightHeight",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Highlight Thickness (px)" value={value ?? 8} onChange={onChange} min={1} max={20} />
          ),
        },
        {
          name: "highlightOffset",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Highlight Vertical Position (%)" value={value ?? 40} onChange={onChange} min={0} max={100} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <FeatureCardsFrontend element={element} />,
};

export default featureCardsElement;
