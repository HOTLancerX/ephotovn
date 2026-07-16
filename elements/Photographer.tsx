"use client";

/**
 * Photographer.tsx — "Why photographers choose Ephotovn?" section.
 *
 * Two-column layout:
 *   Left: subtitle pill, heading, repeating feature cards (icon + title + description).
 *   Right: a large feature image.
 *
 * Everything is dynamic — text, icons, image, colours, typography, spacing,
 * number of feature cards — all configurable via the builder controls panel.
 */

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Text,
  Textarea,
  Select,
  NumberControl,
  Dimensions,
  ColorPickerPopup,
  Typography,
  ImageGallery,
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

function getDimensionsStyles(obj: any, property: "margin" | "padding") {
  if (!obj || typeof obj !== "object") return {};
  const u = obj.unit || "px";
  if (u === "auto") return { [property]: "auto" };
  const t = obj.top === "" || obj.top === undefined ? 0 : obj.top;
  const r = obj.right === "" || obj.right === undefined ? 0 : obj.right;
  const b = obj.bottom === "" || obj.bottom === undefined ? 0 : obj.bottom;
  const l = obj.left === "" || obj.left === undefined ? 0 : obj.left;
  if (t === 0 && r === 0 && b === 0 && l === 0) return {};
  return { [property]: `${t}${u} ${r}${u} ${b}${u} ${l}${u}` };
}

// ── Feature card sub-component ────────────────────────────────────────────────

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({
  item,
  iconColor,
  iconBg,
  iconSize,
  titleColor,
  descColor,
  titleTyp,
  descTyp,
  gap,
}: {
  item: FeatureItem;
  iconColor: string;
  iconBg: string;
  iconSize: number;
  titleColor: string;
  descColor: string;
  titleTyp: React.CSSProperties;
  descTyp: React.CSSProperties;
  gap: number;
}) {
  return (
    <div style={{ display: "flex", gap: `${gap}px`, alignItems: "flex-start" }}>
      {/* Icon circle */}
      <div
        style={{
          width: `${iconSize + 16}px`,
          height: `${iconSize + 16}px`,
          minWidth: `${iconSize + 16}px`,
          borderRadius: "50%",
          backgroundColor: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "2px",
        }}
      >
        <Icon icon={item.icon || "mdi:star"} width={iconSize} height={iconSize} style={{ color: iconColor }} />
      </div>

      {/* Text block */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <h4 style={{ margin: 0, color: titleColor, ...titleTyp }}>
          {item.title}
        </h4>
        <p style={{ margin: 0, color: descColor, ...descTyp }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ── Main frontend render ──────────────────────────────────────────────────────

function PhotographerFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const subtitle: string = s.content?.subtitle || "Elevate Your Business";
  const showSubtitle: boolean = s.content?.showSubtitle ?? true;
  const heading: string = s.content?.heading || "Why photographers\nchoose Ephotovn?";
  const image: string = s.content?.image || "";
  const showImage: boolean = s.content?.showImage ?? true;
  const features: FeatureItem[] = s.content?.features ?? [
    {
      icon: "solar:crown-bold-duotone",
      title: "Outstanding Image Quality",
      description: "Our professional photo retouchers enhance image quality, remove imperfections, and deliver high-quality visual products. We use various professional photo retouching techniques to achieve the best results.",
    },
    {
      icon: "solar:shield-check-bold-duotone",
      title: "Reduced Workload Burden",
      description: "As photographers, you can concentrate more on capturing images and the creative aspects of your work. Our professional editors will perfect your images and adjust them to fit your style.",
    },
    {
      icon: "solar:tag-price-bold-duotone",
      title: "Flexible Pricing",
      description: "Outsourcing photo retouching is more cost-effective than hiring and maintaining an in-house team. We offer flexible payment options, allowing you to pay per project or per image, providing greater control over your budget.",
    },
  ];

  // ── Layout ──
  const layout: "left" | "right" = s.style?.imagePosition || "right";
  const gap: number = s.style?.gap ?? 48;
  const featureGap: number = s.style?.featureGap ?? 28;
  const iconTextGap: number = s.style?.iconTextGap ?? 14;

  // ── Subtitle styles ──
  const subtitleColor: string = s.style?.subtitleColor || "#374151";
  const subtitleTyp = getTypographyStyles(s.style?.subtitleTypography || {});

  // ── Heading styles ──
  const headingColor: string = s.style?.headingColor || "#111827";
  const headingTyp = getTypographyStyles(s.style?.headingTypography || {});

  // ── Feature card styles ──
  const iconColor: string = s.style?.iconColor || "#4f46e5";
  const iconBg: string = s.style?.iconBg || "#eef2ff";
  const iconSize: number = s.style?.iconSize ?? 22;
  const featureTitleColor: string = s.style?.featureTitleColor || "#111827";
  const featureDescColor: string = s.style?.featureDescColor || "#6b7280";
  const featureTitleTyp = getTypographyStyles(s.style?.featureTitleTypography || {});
  const featureDescTyp = getTypographyStyles(s.style?.featureDescTypography || {});

  // ── Image styles ──
  const imageBorderRadius: number = s.style?.imageBorderRadius ?? 16;
  const imageObjectFit: string = s.style?.imageObjectFit || "cover";

  // ── Background ──
  const bgType: "solid" | "gradient" | "transparent" = s.style?.bgType || "transparent";
  const bgColor: string = s.style?.bgColor || "#ffffff";
  const bgGradientLeft: string = s.style?.bgGradientLeft || "#f9fafb";
  const bgGradientRight: string = s.style?.bgGradientRight || "#ffffff";
  const bgGradientAngle: number = s.style?.bgGradientAngle ?? 135;

  // ── Spacing ──
  const margin = s.advanced?.margin || {};
  const padding = s.advanced?.padding || {};
  const marginStyle = getDimensionsStyles(margin, "margin");
  const paddingStyle = getDimensionsStyles(padding, "padding");

  let backgroundStyle: React.CSSProperties = {};
  if (bgType === "solid") {
    backgroundStyle.backgroundColor = bgColor;
  } else if (bgType === "gradient") {
    backgroundStyle.background = `linear-gradient(${bgGradientAngle}deg, ${bgGradientLeft}, ${bgGradientRight})`;
  }

  const renderLineByLine = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">{line}</span>
    ));

  // Build content column
  const contentColumn = (
    <div className="flex flex-col justify-center" style={{ gap: `${featureGap}px` }}>
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

      {/* Feature cards */}
      {features.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: `${featureGap}px` }}>
          {features.map((item, idx) => (
            <FeatureCard
              key={idx}
              item={item}
              iconColor={iconColor}
              iconBg={iconBg}
              iconSize={iconSize}
              titleColor={featureTitleColor}
              descColor={featureDescColor}
              titleTyp={featureTitleTyp}
              descTyp={featureDescTyp}
              gap={iconTextGap}
            />
          ))}
        </div>
      )}
    </div>
  );

  // Build image column
  const imageColumn = showImage ? (
    <div className="flex items-center justify-center">
      {image ? (
        <div
          style={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: `${imageBorderRadius}px`,
            aspectRatio: "4 / 5",
          }}
        >
          <Image
            src={image}
            alt={heading || "Feature image"}
            fill
            style={{ objectFit: imageObjectFit as any }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 5",
            background: "#e5e7eb",
            borderRadius: `${imageBorderRadius}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon icon="mdi:image-outline" width={64} height={64} style={{ color: "#9ca3af" }} />
        </div>
      )}
    </div>
  ) : null;

  return (
    <div
      style={{
        ...backgroundStyle,
        ...marginStyle,
        ...paddingStyle,
        width: "100%",
      }}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-2 items-stretch`}
        style={{ gap: `${gap}px` }}
      >
        {layout === "right" ? (
          <>
            {contentColumn}
            {imageColumn}
          </>
        ) : (
          <>
            {imageColumn}
            {contentColumn}
          </>
        )}
      </div>
    </div>
  );
}

// ── Feature Items Admin ──
// Renders repeater-style controls for the features array.

function FeatureItemsControl({
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

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    onChange([...items, { icon: "mdi:star", title: "New Feature", description: "Feature description goes here." }]);
  };

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
          {/* Card header */}
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
          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <IconPicker label="Icon" value={item.icon || ""} onChange={(v) => update(idx, "icon", v)} />
            <Text label="Title" value={item.title || ""} onChange={(v) => update(idx, "title", v)} />
            <Textarea label="Description" value={item.description || ""} onChange={(v) => update(idx, "description", v)} rows={3} />
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
        <Icon icon="mdi:plus" width={16} /> Add Feature
      </button>
    </div>
  );
}

// ── Builder element definition ────────────────────────────────────────────────

const photographerElement = {
  type: "photographer-section",
  category: "ephotovn",
  label: "Photographer Section",
  icon: "solar:camera-bold-duotone",

  schema: {
    content: {
      subtitle: "Elevate Your Business",
      showSubtitle: true,
      heading: "Why photographers\nchoose Ephotovn?",
      image: "",
      showImage: true,
      features: [
        {
          icon: "solar:crown-bold-duotone",
          title: "Outstanding Image Quality",
          description: "Our professional photo retouchers enhance image quality, remove imperfections, and deliver high-quality visual products. We use various professional photo retouching techniques to achieve the best results.",
        },
        {
          icon: "solar:shield-check-bold-duotone",
          title: "Reduced Workload Burden",
          description: "As photographers, you can concentrate more on capturing images and the creative aspects of your work. Our professional editors will perfect your images and adjust them to fit your style.",
        },
        {
          icon: "solar:tag-price-bold-duotone",
          title: "Flexible Pricing",
          description: "Outsourcing photo retouching is more cost-effective than hiring and maintaining an in-house team. We offer flexible payment options, allowing you to pay per project or per image, providing greater control over your budget.",
        },
      ],
    },

    style: {
      imagePosition: "right",
      gap: 48,
      featureGap: 28,
      iconTextGap: 14,

      // Subtitle
      subtitleColor: "#374151",
      subtitleTypography: {
        fontSize: 15,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 1,
        letterSpacingUnit: "px",
      },

      // Heading
      headingColor: "#111827",
      headingTypography: {
        fontSize: 40,
        fontWeight: "800",
        lineHeight: 46,
        lineHeightUnit: "px",
      },

      // Feature title
      featureTitleColor: "#111827",
      featureTitleTypography: {
        fontSize: 16,
        fontWeight: "700",
      },

      // Feature description
      featureDescColor: "#6b7280",
      featureDescTypography: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 22,
        lineHeightUnit: "px",
      },

      // Icon
      iconColor: "#4f46e5",
      iconBg: "#eef2ff",
      iconSize: 22,

      // Image
      imageBorderRadius: 16,
      imageObjectFit: "cover",

      // Background
      bgType: "transparent",
      bgColor: "#ffffff",
      bgGradientLeft: "#f9fafb",
      bgGradientRight: "#ffffff",
      bgGradientAngle: 135,
    },

    advanced: {
      margin: { top: 60, right: 0, bottom: 60, left: 0, unit: "px" },
      padding: { top: 40, right: 40, bottom: 40, left: 40, unit: "px" },
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
      section: "Feature Image",
      controls: [
        {
          name: "showImage",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Feature Image" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "image",
          render: (value: any, onChange: any) => (
            <ImageGallery label="Feature Image" value={value || ""} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Feature Cards",
      controls: [
        {
          name: "features",
          responsive: false,
          render: (value: any, onChange: any) => (
            <FeatureItemsControl value={value ?? []} onChange={onChange} />
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
              value={value ?? "right"}
              onChange={onChange}
              options={[
                { value: "right", label: "Image on Right" },
                { value: "left", label: "Image on Left" },
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
          name: "featureGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Feature Cards Gap (px)" value={value ?? 28} onChange={onChange} min={0} max={80} />
          ),
        },
        {
          name: "iconTextGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Icon-to-Text Gap (px)" value={value ?? 14} onChange={onChange} min={0} max={40} />
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
      section: "Feature Card Styling",
      controls: [
        {
          name: "iconColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Icon Color" value={value ?? "#4f46e5"} onChange={onChange} />
          ),
        },
        {
          name: "iconBg",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Icon Background" value={value ?? "#eef2ff"} onChange={onChange} />
          ),
        },
        {
          name: "iconSize",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Icon Size (px)" value={value ?? 22} onChange={onChange} min={12} max={48} />
          ),
        },
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
            <ColorPickerPopup label="Feature Description Color" value={value ?? "#6b7280"} onChange={onChange} />
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
        {
          name: "imageObjectFit",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Image Fit"
              value={value ?? "cover"}
              onChange={onChange}
              options={[
                { value: "cover", label: "Cover" },
                { value: "contain", label: "Contain" },
                { value: "fill", label: "Fill" },
              ]}
            />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <PhotographerFrontend element={element} />,
};

export default photographerElement;
