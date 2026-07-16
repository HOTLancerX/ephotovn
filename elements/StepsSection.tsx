"use client";

/**
 * StepsSection.tsx — "Our operational approach" section.
 *
 * Centered layout:
 *   Top: Subtitle + Heading (centered).
 *   Below: Grid of step cards, each with an icon and description text.
 *
 * Fully dynamic — step count, grid columns, icons, colours, typography.
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
  IconPicker,
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

interface StepItem {
  icon: string;
  description: string;
}

// ── Frontend render ───────────────────────────────────────────────────────────

function StepsSectionFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const subtitle: string = s.content?.subtitle || "Upload & start now!";
  const showSubtitle: boolean = s.content?.showSubtitle ?? true;
  const heading: string = s.content?.heading || "Our operational approach";
  const steps: StepItem[] = s.content?.steps ?? [
    {
      icon: "solar:plain-bold-duotone",
      description: "Send us a test image along with your editing requirements. Receive the edited result and a price quote within 24 hours.",
    },
    {
      icon: "solar:letter-opened-bold-duotone",
      description: "Once you're satisfied with the result and the per-image price is agreed upon, you can begin sending orders via email.",
    },
    {
      icon: "solar:cloud-upload-bold-duotone",
      description: "Upload your photos for editing using Google Drive, WeTransfer, or Dropbox. Share the link with us, and we'll take it from there.",
    },
  ];

  // ── Layout ──
  const columns: number = s.style?.columns ?? 3;
  const gap: number = s.style?.gap ?? 40;
  const headerGap: number = s.style?.headerGap ?? 40;
  const headerAlign: "left" | "center" | "right" = s.style?.headerAlign || "center";
  const cardAlign: "left" | "center" | "right" = s.style?.cardAlign || "center";

  // ── Subtitle styles ──
  const subtitleColor: string = s.style?.subtitleColor || "#374151";
  const subtitleTyp = getTypographyStyles(s.style?.subtitleTypography || {});

  // ── Heading styles ──
  const headingColor: string = s.style?.headingColor || "#111827";
  const headingTyp = getTypographyStyles(s.style?.headingTypography || {});

  // ── Icon styles ──
  const iconColor: string = s.style?.iconColor || "#ff6b4a";
  const iconSize: number = s.style?.iconSize ?? 40;
  const iconGap: number = s.style?.iconGap ?? 20;

  // ── Description styles ──
  const descColor: string = s.style?.descColor || "#4b5563";
  const descTyp = getTypographyStyles(s.style?.descTypography || {});

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
              marginBottom: "14px",
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

      {/* Steps grid */}
      {steps.length > 0 && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: cardAlign === "left" ? "flex-start" : cardAlign === "right" ? "flex-end" : "center",
                textAlign: cardAlign,
                gap: `${iconGap}px`,
              }}
            >
              {/* Icon */}
              {step.icon && (
                <Icon
                  icon={step.icon}
                  width={iconSize}
                  height={iconSize}
                  style={{ color: iconColor, flexShrink: 0 }}
                />
              )}

              {/* Description */}
              {step.description && (
                <p
                  style={{
                    margin: 0,
                    color: descColor,
                    ...descTyp,
                  }}
                >
                  {step.description}
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

// ── Steps repeater control ────────────────────────────────────────────────────

function StepsControl({
  value,
  onChange,
}: {
  value: StepItem[];
  onChange: (items: StepItem[]) => void;
}) {
  const items: StepItem[] = Array.isArray(value) ? value : [];

  const update = (index: number, field: keyof StepItem, val: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const add = () =>
    onChange([...items, { icon: "mdi:star", description: "Step description goes here." }]);

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
              Step {idx + 1}
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
            <IconPicker label="Icon" value={item.icon || ""} onChange={(v) => update(idx, "icon", v)} />
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
        <Icon icon="mdi:plus" width={16} /> Add Step
      </button>
    </div>
  );
}

// ── Builder element definition ────────────────────────────────────────────────

const stepsSectionElement = {
  type: "steps-section",
  category: "ephotovn",
  label: "Steps Section",
  icon: "solar:routing-bold-duotone",

  schema: {
    content: {
      subtitle: "Upload & start now!",
      showSubtitle: true,
      heading: "Our operational approach",
      steps: [
        {
          icon: "solar:plain-bold-duotone",
          description: "Send us a test image along with your editing requirements. Receive the edited result and a price quote within 24 hours.",
        },
        {
          icon: "solar:letter-opened-bold-duotone",
          description: "Once you're satisfied with the result and the per-image price is agreed upon, you can begin sending orders via email.",
        },
        {
          icon: "solar:cloud-upload-bold-duotone",
          description: "Upload your photos for editing using Google Drive, WeTransfer, or Dropbox. Share the link with us, and we'll take it from there.",
        },
      ],
    },

    style: {
      columns: 3,
      gap: 40,
      headerGap: 40,
      headerAlign: "center",
      cardAlign: "center",

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
        fontFamily: "Georgia, serif",
      },

      // Icon
      iconColor: "#ff6b4a",
      iconSize: 40,
      iconGap: 20,

      // Description
      descColor: "#4b5563",
      descTypography: {
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
      section: "Steps",
      controls: [
        {
          name: "steps",
          responsive: false,
          render: (value: any, onChange: any) => (
            <StepsControl value={value ?? []} onChange={onChange} />
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
            <NumberControl label="Cards Gap (px)" value={value ?? 40} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "headerGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Header to Steps Gap (px)" value={value ?? 40} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "headerAlign",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Header Alignment"
              value={value ?? "center"}
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
          name: "cardAlign",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Step Card Alignment"
              value={value ?? "center"}
              onChange={onChange}
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
            />
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
      section: "Icon Styling",
      controls: [
        {
          name: "iconColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Icon Color" value={value ?? "#ff6b4a"} onChange={onChange} />
          ),
        },
        {
          name: "iconSize",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Icon Size (px)" value={value ?? 40} onChange={onChange} min={16} max={80} />
          ),
        },
        {
          name: "iconGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Icon to Text Gap (px)" value={value ?? 20} onChange={onChange} min={0} max={60} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Description Styling",
      controls: [
        {
          name: "descColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Description Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
        {
          name: "descTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Description Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <StepsSectionFrontend element={element} />,
};

export default stepsSectionElement;
