"use client";

import React from "react";
import {
  Text,
  Textarea,
  ImageGallery,
  Typography,
  ColorPickerPopup,
  Select,
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

function SimplifyWorkflowFrontend({ element }: { element: any }) {
  const s = element.schema;

  // Content configurations
  const badgeText: string = s.content?.badgeText || "Optimized workflow";
  const title: string = s.content?.title || "Simplify Your Workflow - Less is More";
  const description: string = s.content?.description || "We carefully select a high aesthetic and understanding retoucher for you. Clients will work with them throughout the collaboration. However, if you are not satisfied, we will promptly change to a new retoucher with specific notes on your requirements.";
  const image: string = s.content?.image || "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/retoucher/rectangle-10.jpg";
  const layoutPosition: "left" | "right" = s.content?.layoutPosition || "left"; // left = image left, text right

  // Colors & Styling
  const badgeBgColor: string = s.style?.badgeBgColor || "#fee2e2";
  const badgeTextColor: string = s.style?.badgeTextColor || "#991b1b";
  const titleColor: string = s.style?.titleColor || "#111827";
  const descColor: string = s.style?.descColor || "#4b5563";

  // Typography
  const badgeTyp = getTypographyStyles(s.style?.badgeTypography || {});
  const titleTyp = getTypographyStyles(s.style?.titleTypography || {});
  const descTyp = getTypographyStyles(s.style?.descTypography || {});

  return (
    <div className="w-full select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Main Showcase Image */}
        <div className={`w-full flex items-center justify-center ${layoutPosition === "right" ? "order-2" : "order-1"}`}>
          {image && (
            <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <img 
                src={image} 
                alt={title || "Showcase Layout"} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>

        {/* Right Side: Text & Badge Information */}
        <div className={`flex flex-col items-start space-y-6 ${layoutPosition === "right" ? "order-1" : "order-2"}`}>
          {badgeText && (
            <span 
              className="inline-block px-3 py-1.5 text-xs font-bold rounded-md"
              style={{ backgroundColor: badgeBgColor, color: badgeTextColor, ...badgeTyp }}
            >
              {badgeText}
            </span>
          )}
          {title && (
            <h2 
              className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight"
              style={{ color: titleColor, ...titleTyp }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p 
              className="text-base text-gray-600 leading-relaxed font-light"
              style={{ color: descColor, ...descTyp }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const simplifyWorkflowElement = {
  type: "simplify-workflow",
  category: "ephotovn",
  label: "Simplify Workflow Section",
  icon: "solar:refresh-circle-bold-duotone",

  schema: {
    content: {
      badgeText: "Optimized workflow",
      title: "Simplify Your Workflow - Less is More",
      description: "We carefully select a high aesthetic and understanding retoucher for you. Clients will work with them throughout the collaboration. However, if you are not satisfied, we will promptly change to a new retoucher with specific notes on your requirements.",
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/retoucher/rectangle-10.jpg",
      layoutPosition: "left",
    },
    style: {
      badgeBgColor: "#fee2e2",
      badgeTextColor: "#991b1b",
      titleColor: "#111827",
      descColor: "#4b5563",
      titleTypography: {
        fontSize: 36,
        fontWeight: "800",
      },
    },
  },

  controls: [
    {
      tab: "Content",
      section: "Text Content",
      controls: [
        {
          name: "badgeText",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Badge Label" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "title",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Title" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "description",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Description" value={value || ""} onChange={onChange} rows={4} />
          ),
        },
        {
          name: "layoutPosition",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Image Alignment / Position"
              value={value ?? "left"}
              onChange={onChange}
              options={[
                { value: "left", label: "Image Left, Text Right" },
                { value: "right", label: "Image Right, Text Left" },
              ]}
            />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Visual Assets",
      controls: [
        {
          name: "image",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ImageGallery label="Showcase Image" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Color Customizations",
      controls: [
        {
          name: "badgeTextColor",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="Badge Text Color" value={value ?? "#991b1b"} onChange={onChange} />
              <ColorPickerPopup label="Badge Background Color" value={schema.style.badgeBgColor ?? "#fee2e2"} onChange={(v) => updateSchema("style", "badgeBgColor", v)} />
            </div>
          ),
        },
        {
          name: "titleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Title Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "descColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Description Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Typography Controls",
      controls: [
        {
          name: "titleTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Title Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "badgeTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Badge Typography" value={value} onChange={onChange} />
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

  render: (element: any) => <SimplifyWorkflowFrontend element={element} />,
};

export default simplifyWorkflowElement;
