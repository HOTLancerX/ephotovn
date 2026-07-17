"use client";

import React from "react";
import {
  Text,
  Textarea,
  ImageGallery,
  Typography,
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

function IntroductionFrontend({ element }: { element: any }) {
  const s = element.schema;

  // Content configurations
  const title: string = s.content?.title || "Upload & Request";
  const description: string = s.content?.description || "Upload your images through integrated storage platforms like Google Drive and Dropbox. Indicate your specifications and guidelines, which we will store to use as reference for future orders. This information is editable and changeable as needed, ensuring that your preferences are always up to date and accurately reflected in every project.";
  const showImage: boolean = s.content?.showImage !== false;
  const imageLeft: string = s.content?.imageLeft || "";
  const imageRight: string = s.content?.imageRight || "";
  const layoutPosition: "left" | "right" = s.content?.layoutPosition || "left"; // left = text left/image right, right = image left/text right

  // Typography / Dynamic Inline styles
  const titleTyp = getTypographyStyles(s.style?.titleTypography || {});
  const descTyp = getTypographyStyles(s.style?.descTypography || {});

  return (
    <div 
      className="flex flex-col md:flex-row gap-8 items-center"
      style={{
        flexDirection: layoutPosition === "right" ? "row-reverse" : "row"
      }}
    >
      {/* Text Side (normally Left Side: Icon image + text) */}
      <div className="flex-1 flex flex-col items-start space-y-6">
        {showImage && imageLeft && (
          <div className="w-16 h-16 flex items-center justify-center rounded-xl overflow-hidden shadow-xs">
            <img
              src={imageLeft}
              alt="Icon"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <h2
          className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight"
          style={titleTyp}
        >
          {title}
        </h2>
        <p
          className="text-base text-gray-600 leading-relaxed font-light"
          style={descTyp}
        >
          {description}
        </p>
      </div>

      {/* Showcase Image Side (normally Right Side) */}
      <div className="flex-1 flex items-center justify-center">
        {imageRight && (
          <img
            src={imageRight}
            alt="Showcase"
            className="w-full h-auto object-cover"
          />
        )}
      </div>
    </div>
  );
}

const introductionElement = {
  type: "introduction",
  category: "ephotovn",
  label: "Introduction Section",
  icon: "solar:widget-3-bold-duotone",

  schema: {
    content: {
      title: "Upload & Request",
      description: "Upload your images through integrated storage platforms like Google Drive and Dropbox. Indicate your specifications and guidelines, which we will store to use as reference for future orders. This information is editable and changeable as needed, ensuring that your preferences are always up to date and accurately reflected in every project.",
      showImage: true,
      imageLeft: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      imageRight: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
      layoutPosition: "left",
    },
    style: {
      titleTypography: {
        fontSize: 36,
        fontWeight: "800",
      },
      descTypography: {
        fontSize: 16,
      },
    },
  },

  controls: [
    {
      tab: "Content",
      section: "Text Content",
      controls: [
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
          render: (value: any, onChange: any, { schema, updateSchema }: any) => {
            const currentVal = value ?? "left";
            return (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500">Image Alignment / Position</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onChange("left")}
                    className={`flex-1 py-2 px-3 text-xs font-semibold border rounded-lg transition ${
                      currentVal === "left"
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Image Right
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange("right")}
                    className={`flex-1 py-2 px-3 text-xs font-semibold border rounded-lg transition ${
                      currentVal === "right"
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Image Left
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    },
    {
      tab: "Content",
      section: "Visual Assets",
      controls: [
        {
          name: "showImage",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Left Icon Image" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "imageLeft",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ImageGallery label="Left Icon Image" value={value} onChange={onChange} />
          ),
        },
        {
          name: "imageRight",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ImageGallery label="Right Showcase Image" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Typography",
      controls: [
        {
          name: "titleTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Title Typography" value={value} onChange={onChange} />
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

  render: (element: any) => <IntroductionFrontend element={element} />,
};

export default introductionElement;
