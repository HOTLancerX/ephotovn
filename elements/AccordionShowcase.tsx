"use client";

/**
 * AccordionShowcase.tsx — Image-switching accordion section.
 *
 * Two-column grid:
 *   Left:  Image that changes based on active accordion item.
 *   Right: Subtitle, heading, then accordion items.
 *
 * Each accordion item has: title, description, CTA button, and its own image.
 * When you expand an item, the left image swaps to that item's image.
 * Image position left/right is configurable.
 */

import React, { useState } from "react";
import Image from "next/image";
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

interface AccordionItem {
  title: string;
  description: string;
  btnText: string;
  btnLink: any;
  image: string;
}

// ── Frontend render ───────────────────────────────────────────────────────────

function AccordionShowcaseFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const subtitle: string = s.content?.subtitle || "Image management";
  const showSubtitle: boolean = s.content?.showSubtitle ?? true;
  const heading: string = s.content?.heading || "Comprehensive and\neasy-to-use image\nmanagement platform";
  const items: AccordionItem[] = s.content?.items ?? [
    {
      title: "Upload & Request",
      description: "Upload images and integrate with Google Drive, WeTransfer, or Dropbox to create a request and store all requests for all orders.",
      btnText: "More info",
      btnLink: { url: "#" },
      image: "",
    },
    {
      title: "Manager Projects",
      description: "Manage all your projects in one place. Track progress, assign retouchers, and monitor deadlines with ease.",
      btnText: "More info",
      btnLink: { url: "#" },
      image: "",
    },
    {
      title: "Review & Approval",
      description: "Review retouched images side by side, leave feedback, and approve with a single click.",
      btnText: "More info",
      btnLink: { url: "#" },
      image: "",
    },
    {
      title: "Data Synchronization",
      description: "Sync your data across all devices and platforms. Never lose a file or miss an update.",
      btnText: "More info",
      btnLink: { url: "#" },
      image: "",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // ── Layout ──
  const layout: "left" | "right" = s.style?.imagePosition || "left";
  const gap: number = s.style?.gap ?? 48;
  const contentGap: number = s.style?.contentGap ?? 20;

  // ── Subtitle styles ──
  const subtitleColor: string = s.style?.subtitleColor || "#374151";
  const subtitleTyp = getTypographyStyles(s.style?.subtitleTypography || {});

  // ── Heading styles ──
  const headingColor: string = s.style?.headingColor || "#111827";
  const headingTyp = getTypographyStyles(s.style?.headingTypography || {});

  // ── Accordion styles ──
  const itemTitleColor: string = s.style?.itemTitleColor || "#111827";
  const itemTitleTyp = getTypographyStyles(s.style?.itemTitleTypography || {});
  const itemDescColor: string = s.style?.itemDescColor || "#4b5563";
  const itemDescTyp = getTypographyStyles(s.style?.itemDescTypography || {});
  const dividerColor: string = s.style?.dividerColor || "#e5e7eb";
  const activeIconColor: string = s.style?.activeIconColor || "#111827";
  const inactiveIconColor: string = s.style?.inactiveIconColor || "#9ca3af";

  // ── Button styles ──
  const btnBg: string = s.style?.btnBg || "#ff3b00";
  const btnTextColor: string = s.style?.btnTextColor || "#ffffff";
  const btnHoverBg: string = s.style?.btnHoverBg || "#e03400";
  const btnBorderRadius: number = s.style?.btnBorderRadius ?? 9999;
  const btnTyp = getTypographyStyles(s.style?.btnTypography || {});

  // ── Image styles ──
  const imageBorderRadius: number = s.style?.imageBorderRadius ?? 16;

  const elementId = `accordion-showcase-${element.id}`;

  const renderLineByLine = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">{line}</span>
    ));

  // Active item image
  const activeImage = items[activeIndex]?.image || "";

  // Build image column
  const imageColumn = (
    <div className="flex items-center justify-center md:col-span-2">
      {activeImage ? (
        <div
          style={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: `${imageBorderRadius}px`,
            aspectRatio: "4 / 3",
            transition: "opacity 0.3s ease",
          }}
        >
          <Image
            key={activeImage}
            src={activeImage}
            alt={items[activeIndex]?.title || "Feature"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 3",
            background: "#f3f4f6",
            borderRadius: `${imageBorderRadius}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon icon="mdi:image-outline" width={64} height={64} style={{ color: "#d1d5db" }} />
        </div>
      )}
    </div>
  );

  // Build content column
  const contentColumn = (
    <div className="flex flex-col justify-center" style={{ gap: `${contentGap}px` }}>
      {/* Subtitle */}
      {showSubtitle && subtitle && (
        <div
          style={{
            color: subtitleColor,
            fontWeight: "600",
            letterSpacing: "0.02em",
            ...subtitleTyp,
          }}
        >
          {renderLineByLine(subtitle)}
        </div>
      )}

      {/* Heading */}
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

      {/* Accordion items */}
      {items.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={idx}
                style={{ borderBottom: `1px solid ${dividerColor}` }}
              >
                {/* Accordion header */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(isActive ? -1 : idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    padding: "16px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      color: itemTitleColor,
                      fontWeight: "700",
                      ...itemTitleTyp,
                    }}
                  >
                    {item.title}
                  </span>
                  <Icon
                    icon={isActive ? "mdi:arrow-top-right" : "mdi:chevron-down"}
                    width={20}
                    height={20}
                    style={{
                      color: isActive ? activeIconColor : inactiveIconColor,
                      flexShrink: 0,
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>

                {/* Accordion body */}
                <div
                  className={`accordion-body-${elementId}`}
                  style={{
                    maxHeight: isActive ? "500px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease, opacity 0.25s ease",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <div style={{ paddingBottom: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                    {/* Description */}
                    {item.description && (
                      <p
                        style={{
                          margin: 0,
                          color: itemDescColor,
                          ...itemDescTyp,
                        }}
                      >
                        {item.description}
                      </p>
                    )}

                    {/* CTA Button */}
                    {item.btnText && (
                      <div>
                        <a
                          href={item.btnLink?.url || "#"}
                          target={item.btnLink?.target || undefined}
                          rel={item.btnLink?.nofollow ? "nofollow" : undefined}
                          className={`btn-accordion-${elementId}`}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "10px 24px",
                            backgroundColor: btnBg,
                            color: btnTextColor,
                            borderRadius: `${btnBorderRadius}px`,
                            textDecoration: "none",
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                            ...btnTyp,
                          }}
                        >
                          {item.btnText}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className={`w-full ${elementId}`}>
      <style>{`
        .${elementId} .btn-accordion-${elementId}:hover {
          background-color: ${btnHoverBg} !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div
        className="grid grid-cols-1 md:grid-cols-3 items-stretch"
        style={{ gap: `${gap}px` }}
      >
        {layout === "left" ? (
          <>
            {imageColumn}
            {contentColumn}
          </>
        ) : (
          <>
            {contentColumn}
            {imageColumn}
          </>
        )}
      </div>
    </div>
  );
}

// ── Accordion Items repeater control ──────────────────────────────────────────

function AccordionItemsControl({
  value,
  onChange,
}: {
  value: AccordionItem[];
  onChange: (items: AccordionItem[]) => void;
}) {
  const items: AccordionItem[] = Array.isArray(value) ? value : [];

  const update = (index: number, field: keyof AccordionItem, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const add = () =>
    onChange([
      ...items,
      {
        title: "New Section",
        description: "Section description goes here.",
        btnText: "More info",
        btnLink: { url: "#" },
        image: "",
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
          {/* Item header */}
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

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Text label="Title" value={item.title || ""} onChange={(v) => update(idx, "title", v)} />
            <Textarea label="Description" value={item.description || ""} onChange={(v) => update(idx, "description", v)} rows={3} />
            <Text label="Button Text" value={item.btnText || ""} onChange={(v) => update(idx, "btnText", v)} />
            <Url label="Button Link" value={item.btnLink || { url: "" }} onChange={(v) => update(idx, "btnLink", v)} />
            <ImageGallery label="Section Image" value={item.image || ""} onChange={(v) => update(idx, "image", v)} />
          </div>
        </div>
      ))}

      {/* Add button */}
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

const accordionShowcaseElement = {
  type: "accordion-showcase",
  category: "ephotovn",
  label: "Accordion Showcase",
  icon: "solar:list-bold-duotone",

  schema: {
    content: {
      subtitle: "Image management",
      showSubtitle: true,
      heading: "Comprehensive and\neasy-to-use image\nmanagement platform",
      items: [
        {
          title: "Upload & Request",
          description: "Upload images and integrate with Google Drive, WeTransfer, or Dropbox to create a request and store all requests for all orders.",
          btnText: "More info",
          btnLink: { url: "#" },
          image: "",
        },
        {
          title: "Manager Projects",
          description: "Manage all your projects in one place. Track progress, assign retouchers, and monitor deadlines with ease.",
          btnText: "More info",
          btnLink: { url: "#" },
          image: "",
        },
        {
          title: "Review & Approval",
          description: "Review retouched images side by side, leave feedback, and approve with a single click.",
          btnText: "More info",
          btnLink: { url: "#" },
          image: "",
        },
        {
          title: "Data Synchronization",
          description: "Sync your data across all devices and platforms. Never lose a file or miss an update.",
          btnText: "More info",
          btnLink: { url: "#" },
          image: "",
        },
      ],
    },

    style: {
      imagePosition: "left",
      gap: { desktop: 48, tablet: 48, mobile: 48 },
      contentGap: 20,

      // Subtitle
      subtitleColor: "#374151",
      subtitleTypography: {
        fontSize: 15,
        fontWeight: "600",
      },

      // Heading
      headingColor: "#111827",
      headingTypography: {
        fontSize: 36,
        fontWeight: "800",
        lineHeight: 42,
        lineHeightUnit: "px",
      },

      // Accordion item title
      itemTitleColor: "#111827",
      itemTitleTypography: {
        fontSize: 16,
        fontWeight: "700",
      },

      // Accordion item description
      itemDescColor: "#4b5563",
      itemDescTypography: {
        fontSize: 14,
        lineHeight: 22,
        lineHeightUnit: "px",
      },

      // Divider & icons
      dividerColor: "#e5e7eb",
      activeIconColor: "#111827",
      inactiveIconColor: "#9ca3af",

      // Button
      btnBg: "#ff3b00",
      btnTextColor: "#ffffff",
      btnHoverBg: "#e03400",
      btnBorderRadius: 9999,
      btnTypography: {
        fontSize: 14,
        fontWeight: "600",
      },

      // Image
      imageBorderRadius: 16,
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
            <Textarea label="Main Heading (line break = new line)" value={value || ""} onChange={onChange} rows={4} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Accordion Items",
      controls: [
        {
          name: "items",
          responsive: false,
          render: (value: any, onChange: any) => (
            <AccordionItemsControl value={value ?? []} onChange={onChange} />
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
          name: "imagePosition",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Image Position"
              value={value ?? "left"}
              onChange={onChange}
              options={[
                { value: "left", label: "Image on Left" },
                { value: "right", label: "Image on Right" },
              ]}
            />
          ),
        },
        {
          name: "gap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Column Gap (px)" value={value ?? 48} onChange={onChange} min={0} max={120} />
          ),
        },
        {
          name: "contentGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Content Vertical Gap (px)" value={value ?? 20} onChange={onChange} min={0} max={80} />
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
      section: "Accordion Title Styling",
      controls: [
        {
          name: "itemTitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Item Title Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "itemTitleTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Item Title Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Accordion Description Styling",
      controls: [
        {
          name: "itemDescColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Item Description Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
        {
          name: "itemDescTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Item Description Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Accordion Divider & Icons",
      controls: [
        {
          name: "dividerColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Divider Color" value={value ?? "#e5e7eb"} onChange={onChange} />
          ),
        },
        {
          name: "activeIconColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Active Arrow Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "inactiveIconColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Inactive Arrow Color" value={value ?? "#9ca3af"} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Button Styling",
      controls: [
        {
          name: "btnBg",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Button Background" value={value ?? "#ff3b00"} onChange={onChange} />
          ),
        },
        {
          name: "btnTextColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Button Text Color" value={value ?? "#ffffff"} onChange={onChange} />
          ),
        },
        {
          name: "btnHoverBg",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Button Hover Background" value={value ?? "#e03400"} onChange={onChange} />
          ),
        },
        {
          name: "btnBorderRadius",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Button Border Radius (px)" value={value ?? 9999} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "btnTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Button Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Image Styling",
      controls: [
        {
          name: "imageBorderRadius",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Image Border Radius (px)" value={value ?? 16} onChange={onChange} min={0} max={100} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <AccordionShowcaseFrontend element={element} />,
};

export default accordionShowcaseElement;
