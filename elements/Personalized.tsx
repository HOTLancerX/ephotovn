"use client";

/**
 * Personalized.tsx — "Personalized 1-on-1 Approach" section.
 *
 * Two-column grid layout:
 *   One side: Image (rounded).
 *   Other side: Subtitle, heading, description paragraph, CTA button.
 *
 * Image can be positioned left or right via the builder controls.
 * No custom background controls — the builder's built-in Background handles that.
 */

import React from "react";
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

// ── Frontend render ───────────────────────────────────────────────────────────

function PersonalizedFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const subtitle: string = s.content?.subtitle || "Efficient workflow";
  const showSubtitle: boolean = s.content?.showSubtitle ?? true;
  const heading: string = s.content?.heading || "Personalized 1-on-1\nApproach";
  const description: string = s.content?.description || "Working with multiple photo retouchers can often lead to disappointments, misunderstandings, and delays. We streamline your creative process with our personalized 1-on-1 approach. You'll be assigned a dedicated editor, fully aligned with your style, to handle every project you entrust to us. This allows you to focus on more creative work in the studio, with confidence and peace of mind.";
  const showDescription: boolean = s.content?.showDescription ?? true;
  const image: string = s.content?.image || "";
  const showImage: boolean = s.content?.showImage ?? true;

  const btnText: string = s.content?.btnText || "More info";
  const btnLink: any = s.content?.btnLink || { url: "#" };
  const btnShow: boolean = s.content?.btnShow ?? true;

  // ── Layout ──
  const layout: "left" | "right" = s.style?.imagePosition || "left";
  const gap: number = s.style?.gap ?? 48;
  const contentGap: number = s.style?.contentGap ?? 24;

  // ── Subtitle styles ──
  const subtitleColor: string = s.style?.subtitleColor || "#374151";
  const subtitleTyp = getTypographyStyles(s.style?.subtitleTypography || {});

  // ── Heading styles ──
  const headingColor: string = s.style?.headingColor || "#111827";
  const headingTyp = getTypographyStyles(s.style?.headingTypography || {});

  // ── Description styles ──
  const descColor: string = s.style?.descColor || "#4b5563";
  const descTyp = getTypographyStyles(s.style?.descTypography || {});

  // ── Button styles ──
  const btnBg: string = s.style?.btnBg || "#ff3b00";
  const btnTextColor: string = s.style?.btnTextColor || "#ffffff";
  const btnHoverBg: string = s.style?.btnHoverBg || "#e03400";
  const btnBorderRadius: number = s.style?.btnBorderRadius ?? 9999;
  const btnTyp = getTypographyStyles(s.style?.btnTypography || {});

  // ── Image styles ──
  const imageBorderRadius: number = s.style?.imageBorderRadius ?? 16;
  const imageObjectFit: string = s.style?.imageObjectFit || "cover";

  const elementId = `personalized-el-${element.id}`;

  const renderLineByLine = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">{line}</span>
    ));

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

      {/* Description */}
      {showDescription && description && (
        <p
          style={{
            margin: 0,
            color: descColor,
            ...descTyp,
          }}
        >
          {description}
        </p>
      )}

      {/* CTA Button */}
      {btnShow && btnText && (
        <div>
          <a
            href={btnLink.url || "#"}
            target={btnLink.target || undefined}
            rel={btnLink.nofollow ? "nofollow" : undefined}
            className="btn-personalized"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 28px",
              backgroundColor: btnBg,
              color: btnTextColor,
              borderRadius: `${btnBorderRadius}px`,
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.3s ease",
              ...btnTyp,
            }}
          >
            {btnText}
          </a>
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
            aspectRatio: "16 / 10",
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
            aspectRatio: "16 / 10",
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
    <div className={`w-full ${elementId}`}>
      <style>{`
        .${elementId} .btn-personalized:hover {
          background-color: ${btnHoverBg} !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div
        className="grid grid-cols-1 md:grid-cols-2 items-stretch"
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

// ── Builder element definition ────────────────────────────────────────────────

const personalizedElement = {
  type: "personalized-section",
  category: "ephotovn",
  label: "Personalized",
  icon: "/plugin/ephotovn/icon/s1.png",

  schema: {
    content: {
      subtitle: "Efficient workflow",
      showSubtitle: true,
      heading: "Personalized 1-on-1\nApproach",
      description: "Working with multiple photo retouchers can often lead to disappointments, misunderstandings, and delays. We streamline your creative process with our personalized 1-on-1 approach. You'll be assigned a dedicated editor, fully aligned with your style, to handle every project you entrust to us. This allows you to focus on more creative work in the studio, with confidence and peace of mind.",
      showDescription: true,
      image: "",
      showImage: true,
      btnText: "More info",
      btnLink: { url: "#" },
      btnShow: true,
    },

    style: {
      imagePosition: "left",
      gap: 48,
      contentGap: 24,

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

      // Description
      descColor: "#4b5563",
      descTypography: {
        fontSize: 15,
        lineHeight: 24,
        lineHeightUnit: "px",
      },

      // Button
      btnBg: "#ff3b00",
      btnTextColor: "#ffffff",
      btnHoverBg: "#e03400",
      btnBorderRadius: 9999,
      btnTypography: {
        fontSize: 15,
        fontWeight: "600",
      },

      // Image
      imageBorderRadius: 16,
      imageObjectFit: "cover",
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
      section: "Description",
      controls: [
        {
          name: "showDescription",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Description" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "description",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Description Text" value={value || ""} onChange={onChange} rows={5} />
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
            <Toggle label="Show Image" value={value ?? true} onChange={onChange} />
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
      section: "CTA Button",
      controls: [
        {
          name: "btnShow",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Button" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "btnText",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Button Text" value={value || ""} onChange={onChange} />
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
            <NumberControl label="Content Vertical Gap (px)" value={value ?? 24} onChange={onChange} min={0} max={80} />
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

  render: (element: any) => <PersonalizedFrontend element={element} />,
};

export default personalizedElement;
