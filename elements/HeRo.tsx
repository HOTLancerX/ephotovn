"use client";

import React from "react";
import {
  Text,
  Textarea,
  Select,
  NumberControl,
  Dimensions,
  ColorPickerPopup,
  Typography,
  Url,
  Toggle,
} from "@/components/builder/controls";

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

function HeRoFrontend({ element }: { element: any }) {
  const s = element.schema;

  // Content values
  const pillText: string = s.content?.pillText || "Currently employs 200 professional retouchers";
  const pillShow: boolean = s.content?.pillShow ?? true;

  const title: string = s.content?.title || "Premier photo retouching services globally";
  const subtitle: string = s.content?.subtitle || "Perfected Over 20 Million Images in Partnership with 10,000+ Photographers Worldwide";

  const btnText: string = s.content?.btnText || "Try for free now";
  const btnLink: any = s.content?.btnLink || { url: "#" };
  const btnShow: boolean = s.content?.btnShow ?? true;

  // Styling values
  const gap: number = s.style?.gap ?? 24;
  const containerAlignment: "left" | "center" | "right" = s.style?.containerAlignment || "center";
  const pillAlignment: "left" | "center" | "right" = s.style?.pillAlignment || "center";
  const titleAlignment: "left" | "center" | "right" = s.style?.titleAlignment || "center";
  const subtitleAlignment: "left" | "center" | "right" = s.style?.subtitleAlignment || "center";
  const btnAlignment: "left" | "center" | "right" = s.style?.btnAlignment || "center";

  // Pill styling
  const pillBg: string = s.style?.pillBg || "#c3e2ff";
  const pillTextColor: string = s.style?.pillTextColor || "#1e3a8a";
  const pillBorderRadius: number = s.style?.pillBorderRadius ?? 9999;
  const pillTyp = getTypographyStyles(s.style?.pillTypography || {});

  // Title styling
  const titleColor: string = s.style?.titleColor || "#1f2937";
  const titleTyp = getTypographyStyles(s.style?.titleTypography || {});

  // Subtitle styling
  const subtitleColor: string = s.style?.subtitleColor || "#4b5563";
  const subtitleTyp = getTypographyStyles(s.style?.subtitleTypography || {});

  // Button styling
  const btnBg: string = s.style?.btnBg || "#ff3b00";
  const btnTextColor: string = s.style?.btnTextColor || "#ffffff";
  const btnHoverBg: string = s.style?.btnHoverBg || "#e03400";
  const btnHoverTextColor: string = s.style?.btnHoverTextColor || "#ffffff";
  const btnBorderRadius: number = s.style?.btnBorderRadius ?? 9999;
  const btnTyp = getTypographyStyles(s.style?.btnTypography || {});

  // Background settings
  const bgType: "solid" | "gradient" | "transparent" = s.style?.bgType || "transparent";
  const bgColor: string = s.style?.bgColor || "#ffffff";
  const bgGradientLeft: string = s.style?.bgGradientLeft || "#c3e2ff";
  const bgGradientRight: string = s.style?.bgGradientRight || "#ffffff";
  const bgGradientAngle: number = s.style?.bgGradientAngle ?? 90;

  // Spacing settings
  const margin = s.advanced?.margin || {};
  const padding = s.advanced?.padding || {};
  const marginStyle = getDimensionsStyles(margin, "margin");
  const paddingStyle = getDimensionsStyles(padding, "padding");

  // Map alignments to flex/text-align classes
  const getFlexAlign = (align: "left" | "center" | "right") => {
    if (align === "left") return "items-start text-left";
    if (align === "right") return "items-end text-right";
    return "items-center text-center";
  };

  const getJustifyAlign = (align: "left" | "center" | "right") => {
    if (align === "left") return "justify-start";
    if (align === "right") return "justify-end";
    return "justify-center";
  };

  const elementId = `hero-el-${element.id}`;

  // Background CSS styles
  let backgroundStyle: React.CSSProperties = {};
  if (bgType === "solid") {
    backgroundStyle.backgroundColor = bgColor;
  } else if (bgType === "gradient") {
    backgroundStyle.background = `linear-gradient(${bgGradientAngle}deg, ${bgGradientLeft}, ${bgGradientRight})`;
  } else {
    backgroundStyle.background = "transparent";
  }

  // Render text helper for line by line split
  const renderLineByLine = (text: string) => {
    return text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">
        {line}
      </span>
    ));
  };

  return (
    <div
      className={`w-full ${elementId}`}
      style={{
        ...backgroundStyle,
        ...marginStyle,
        ...paddingStyle,
      }}
    >
      <style>{`
        .${elementId} .btn-hero {
          background-color: ${btnBg};
          color: ${btnTextColor};
          border-radius: ${btnBorderRadius}px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .${elementId} .btn-hero:hover {
          background-color: ${btnHoverBg};
          color: ${btnHoverTextColor};
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      <div className={`flex flex-col w-full ${getFlexAlign(containerAlignment)}`} style={{ gap: `${gap}px` }}>
        {/* Pill Badge */}
        {pillShow && pillText && (
          <div className={`w-full flex ${getJustifyAlign(pillAlignment)}`}>
            <span
              className="px-6 py-2 shadow-sm font-medium flex flex-col"
              style={{
                backgroundColor: pillBg,
                color: pillTextColor,
                borderRadius: `${pillBorderRadius}px`,
                ...pillTyp,
                alignItems: pillAlignment === "left" ? "flex-start" : pillAlignment === "right" ? "flex-end" : "center",
                textAlign: pillAlignment,
              }}
            >
              {renderLineByLine(pillText)}
            </span>
          </div>
        )}

        {/* Title */}
        {title && (
          <h1
            className="w-full font-serif font-bold tracking-tight leading-tight flex flex-col"
            style={{
              color: titleColor,
              textAlign: titleAlignment,
              alignItems: titleAlignment === "left" ? "flex-start" : titleAlignment === "right" ? "flex-end" : "center",
              ...titleTyp,
            }}
          >
            {renderLineByLine(title)}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <div
            className="w-full max-w-4xl text-lg font-normal leading-relaxed flex flex-col"
            style={{
              color: subtitleColor,
              textAlign: subtitleAlignment,
              alignItems: subtitleAlignment === "left" ? "flex-start" : subtitleAlignment === "right" ? "flex-end" : "center",
              ...subtitleTyp,
            }}
          >
            {renderLineByLine(subtitle)}
          </div>
        )}

        {/* Action Button */}
        {btnShow && btnText && (
          <div className={`w-full flex ${getJustifyAlign(btnAlignment)}`}>
            <a
              href={btnLink.url || "#"}
              target={btnLink.target || undefined}
              rel={btnLink.nofollow ? "nofollow" : undefined}
              className="btn-hero px-8 py-3.5 text-base font-semibold flex flex-col"
              style={{
                ...btnTyp,
                alignItems: btnAlignment === "left" ? "flex-start" : btnAlignment === "right" ? "flex-end" : "center",
                textAlign: btnAlignment,
              }}
            >
              {renderLineByLine(btnText)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const heroElement = {
  type: "hero",
  category: "ephotovn",
  label: "Hero Section",
  icon: "solar:home-bold-duotone",

  schema: {
    content: {
      pillText: "Currently employs 200 professional retouchers",
      pillShow: true,
      title: "Premier photo retouching services\nglobally",
      subtitle: "Perfected Over 20 Million Images in Partnership with 10,000+ Photographers Worldwide",
      btnText: "Try for free now",
      btnLink: { url: "#" },
      btnShow: true,
    },

    style: {
      gap: 24,
      containerAlignment: "center",
      pillAlignment: "center",
      titleAlignment: "center",
      subtitleAlignment: "center",
      btnAlignment: "center",

      // Pill
      pillBg: "#c3e2ff",
      pillTextColor: "#1e3a8a",
      pillBorderRadius: 9999,
      pillTypography: {
        fontSize: 14,
        fontWeight: "500",
      },

      // Title
      titleColor: "#1f2937",
      titleTypography: {
        fontSize: 48,
        fontWeight: "700",
        fontFamily: "Georgia, serif",
      },

      // Subtitle
      subtitleColor: "#4b5563",
      subtitleTypography: {
        fontSize: 18,
      },

      // Button
      btnBg: "#ff3b00",
      btnTextColor: "#ffffff",
      btnHoverBg: "#e03400",
      btnHoverTextColor: "#ffffff",
      btnBorderRadius: 9999,
      btnTypography: {
        fontSize: 16,
        fontWeight: "600",
      },

      // Background
      bgType: "transparent",
      bgColor: "#ffffff",
      bgGradientLeft: "#c3e2ff",
      bgGradientRight: "#ffffff",
      bgGradientAngle: 90,
    },

    advanced: {
      margin: { top: 40, right: 0, bottom: 40, left: 0, unit: "px" },
      padding: { top: 40, right: 20, bottom: 40, left: 20, unit: "px" },
    },
  },

  controls: [
    // ═══════════════════ CONTENT TAB ════════════════
    {
      tab: "Content",
      section: "Pill Badge Settings",
      controls: [
        {
          name: "pillShow",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Pill Badge" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "pillText",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Pill Text (Split by new line)" value={value || ""} onChange={onChange} rows={2} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Headings Settings",
      controls: [
        {
          name: "title",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Main Title text (Split by new line)" value={value || ""} onChange={onChange} rows={3} />
          ),
        },
        {
          name: "subtitle",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Subtitle text (Split by new line)" value={value || ""} onChange={onChange} rows={3} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Action Button Settings",
      controls: [
        {
          name: "btnShow",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Action Button" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "btnText",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Button Text (Split by new line)" value={value || ""} onChange={onChange} rows={2} />
          ),
        },
        {
          name: "btnLink",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Url label="Button Link" value={value || { url: "" }} onChange={onChange} />
          ),
        },
      ],
    },

    // ═══════════════════ STYLE TAB ══════════════════
    {
      tab: "Style",
      section: "Layout & Alignment",
      controls: [
        {
          name: "gap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Vertical Gap (px)" value={value ?? 24} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "containerAlignment",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Overall Section Alignment"
              value={value ?? "center"}
              onChange={onChange}
              options={[
                { value: "left", label: "Left Align" },
                { value: "center", label: "Center Align" },
                { value: "right", label: "Right Align" },
              ]}
            />
          ),
        },
        {
          name: "pillAlignment",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Pill Alignment"
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
          name: "titleAlignment",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Title Alignment"
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
          name: "subtitleAlignment",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Subtitle Alignment"
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
          name: "btnAlignment",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Button Alignment"
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
      section: "Background Settings",
      controls: [
        {
          name: "bgType",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Background Type"
              value={value ?? "transparent"}
              onChange={onChange}
              options={[
                { value: "transparent", label: "Transparent" },
                { value: "solid", label: "Solid Color" },
                { value: "gradient", label: "Gradient Color" },
              ]}
            />
          ),
        },
        {
          name: "bgColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Solid Background Color" value={value ?? "#ffffff"} onChange={onChange} />
          ),
        },
        {
          name: "bgGradientLeft",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="Gradient Left/Start Color" value={value ?? "#c3e2ff"} onChange={onChange} />
              <ColorPickerPopup
                label="Gradient Right/End Color"
                value={schema.style.bgGradientRight ?? "#ffffff"}
                onChange={(v) => updateSchema("style", "bgGradientRight", v)}
              />
              <NumberControl
                label="Gradient Angle (deg)"
                value={schema.style.bgGradientAngle ?? 90}
                onChange={(v) => updateSchema("style", "bgGradientAngle", v)}
                min={0}
                max={360}
              />
            </div>
          ),
        },
      ],
    },

    {
      tab: "Style",
      section: "Pill Badge Design",
      controls: [
        {
          name: "pillBg",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="Pill Background Color" value={value ?? "#c3e2ff"} onChange={onChange} />
              <ColorPickerPopup
                label="Pill Text Color"
                value={schema.style.pillTextColor ?? "#1e3a8a"}
                onChange={(v) => updateSchema("style", "pillTextColor", v)}
              />
            </div>
          ),
        },
        {
          name: "pillBorderRadius",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Pill Border Radius (px)" value={value ?? 9999} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "pillTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Pill Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },

    {
      tab: "Style",
      section: "Main Title Typography",
      controls: [
        {
          name: "titleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Title Text Color" value={value ?? "#1f2937"} onChange={onChange} />
          ),
        },
        {
          name: "titleTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Title Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },

    {
      tab: "Style",
      section: "Subtitle Typography",
      controls: [
        {
          name: "subtitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Subtitle Text Color" value={value ?? "#4b5563"} onChange={onChange} />
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
      section: "Action Button Design",
      controls: [
        {
          name: "btnBg",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="Button Background Color" value={value ?? "#ff3b00"} onChange={onChange} />
              <ColorPickerPopup
                label="Button Text Color"
                value={schema.style.btnTextColor ?? "#ffffff"}
                onChange={(v) => updateSchema("style", "btnTextColor", v)}
              />
              <ColorPickerPopup
                label="Button Hover Background"
                value={schema.style.btnHoverBg ?? "#e03400"}
                onChange={(v) => updateSchema("style", "btnHoverBg", v)}
              />
              <ColorPickerPopup
                label="Button Hover Text Color"
                value={schema.style.btnHoverTextColor ?? "#ffffff"}
                onChange={(v) => updateSchema("style", "btnHoverTextColor", v)}
              />
            </div>
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

    // ═══════════════════ ADVANCED TAB ═══════════════
    {
      tab: "Advanced",
      section: "Spacing Bounds",
      controls: [
        {
          name: "margin",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Dimensions type="margin" value={value} onChange={onChange} />
          ),
        },
        {
          name: "padding",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Dimensions type="padding" value={value} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <HeRoFrontend element={element} />,
};

export default heroElement;
