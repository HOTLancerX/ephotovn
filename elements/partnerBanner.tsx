"use client";

import React from "react";
import { Icon } from "@iconify/react";
import {
  Text,
  Textarea,
  ImageGallery,
  Typography,
  ColorPickerPopup,
  Url,
  IconPicker,
  NumberControl,
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

function PartnerBannerFrontend({ element }: { element: any }) {
  const s = element.schema;

  // Content configurations
  const subTitle: string = s.content?.subTitle || "200+ PHOTO EDITING EXPERTS";
  const title: string = s.content?.title || "Photo retouchers";
  const description: string = s.content?.description || "Many years of experience and regular training in photo editing and photography knowledge.";
  const buttonText: string = s.content?.buttonText || "Let’s free trial here";
  const buttonLink: any = s.content?.buttonLink || { url: "/form-trial/" };

  const imageLeft: string = s.content?.imageLeft || "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/retoucher/rectangle-129.jpg";
  const imageRight: string = s.content?.imageRight || "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/retoucher/group-54.jpg";

  const listItems: any[] = s.content?.listItems || [
    {
      icon: "solar:add-linear",
      text: "We have developed workflow processes to achieve optimal results. We always want each customer's work to achieve outstanding image quality that is both highly aesthetic and reflects the style of each photographer.",
    },
    {
      icon: "solar:add-linear",
      text: "Whether you are a professional photographer or an amateur, rest assured that a professional photo editor will complete the job according to your preferences.",
    },
  ];

  // Colors & Styling
  const rightBgColor: string = s.style?.rightBgColor || "#f0f7ff"; // Sleek gradient background color representation
  const subTitleColor: string = s.style?.subTitleColor || "#1f2937";
  const titleColor: string = s.style?.titleColor || "#111827";
  const descColor: string = s.style?.descColor || "#4b5563";
  const btnBgColor: string = s.style?.btnBgColor || "#ff3b00"; // Vibrant orange button
  const btnTextColor: string = s.style?.btnTextColor || "#ffffff";
  const listTextColor: string = s.style?.listTextColor || "#374151";
  const listIconColor: string = s.style?.listIconColor || "#111827";
  const listIconSize: number = s.style?.listIconSize ?? 20;

  // Typography
  const subTitleTyp = getTypographyStyles(s.style?.subTitleTypography || {});
  const titleTyp = getTypographyStyles(s.style?.titleTypography || {});
  const descTyp = getTypographyStyles(s.style?.descTypography || {});
  const listTextTyp = getTypographyStyles(s.style?.listTextTypography || {});

  return (
    <div className="w-full py-16 px-6 bg-transparent select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Info & Action Button */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-start">
          {subTitle && (
            <span 
              className="text-xs font-bold uppercase tracking-wider text-gray-500"
              style={{ color: subTitleColor, ...subTitleTyp }}
            >
              {subTitle}
            </span>
          )}
          {title && (
            <h2 
              className="text-5xl font-black text-gray-900 leading-none tracking-tight"
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
          {buttonText && (
            <a
              href={buttonLink?.url || "#"}
              target={buttonLink?.target || undefined}
              rel={buttonLink?.nofollow ? "nofollow" : undefined}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-md"
              style={{ backgroundColor: btnBgColor, color: btnTextColor }}
            >
              {buttonText}
            </a>
          )}
        </div>

        {/* Right Column - Images & Dynamic List Content */}
        <div 
          className="lg:col-span-7 rounded-3xl p-8 md:p-12 space-y-8"
          style={{ background: `linear-gradient(135deg, ${rightBgColor} 0%, rgba(255,255,255,0.7) 100%)` }}
        >
          {/* Images Top Row Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
            {imageLeft && (
              <div className="rounded-2xl overflow-hidden shadow-md h-64 sm:h-80">
                <img 
                  src={imageLeft} 
                  alt="Feature Left" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {imageRight && (
              <div className="rounded-2xl overflow-hidden shadow-md h-64 sm:h-80">
                <img 
                  src={imageRight} 
                  alt="Feature Right" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Dynamic List Items */}
          <div className="space-y-6">
            {listItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="p-1 shrink-0" style={{ color: listIconColor }}>
                  <Icon icon={item.icon || "solar:add-linear"} width={listIconSize} className="stroke-[3]" />
                </div>
                <p 
                  className="text-sm leading-relaxed text-gray-600"
                  style={{ color: listTextColor, ...listTextTyp }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

const partnerBannerElement = {
  type: "partner-banner",
  category: "ephotovn",
  label: "Retoucher Partner Banner",
  icon: "solar:flag-bold-duotone",

  schema: {
    content: {
      subTitle: "200+ PHOTO EDITING EXPERTS",
      title: "Photo retouchers",
      description: "Many years of experience and regular training in photo editing and photography knowledge.",
      buttonText: "Let’s free trial here",
      buttonLink: { url: "/form-trial/" },
      imageLeft: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/retoucher/rectangle-129.jpg",
      imageRight: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/retoucher/group-54.jpg",
      listItems: [
        {
          icon: "solar:add-linear",
          text: "We have developed workflow processes to achieve optimal results. We always want each customer's work to achieve outstanding image quality that is both highly aesthetic and reflects the style of each photographer.",
        },
        {
          icon: "solar:add-linear",
          text: "Whether you are a professional photographer or an amateur, rest assured that a professional photo editor will complete the job according to your preferences.",
        },
      ],
    },
    style: {
      rightBgColor: "#f0f7ff",
      subTitleColor: "#1f2937",
      titleColor: "#111827",
      descColor: "#4b5563",
      btnBgColor: "#ff3b00",
      btnTextColor: "#ffffff",
      listTextColor: "#374151",
      listIconColor: "#111827",
      listIconSize: 20,
      titleTypography: {
        fontSize: 48,
        fontWeight: "900",
      },
      listTextTypography: {
        fontSize: 14,
      },
    },
  },

  controls: [
    {
      tab: "Content",
      section: "Text Content",
      controls: [
        {
          name: "subTitle",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Subtitle" value={value || ""} onChange={onChange} />
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
            <Textarea label="Description" value={value || ""} onChange={onChange} rows={3} />
          ),
        },
        {
          name: "buttonText",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Text label="Button Text" value={value || ""} onChange={onChange} />
          ),
        },
        {
          name: "buttonLink",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Url label="Button Link" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Visual Elements",
      controls: [
        {
          name: "imageLeft",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ImageGallery label="Left Image (Narrower Grid)" value={value} onChange={onChange} />
          ),
        },
        {
          name: "imageRight",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ImageGallery label="Right Image (Wider Grid)" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "List Features",
      controls: [
        {
          name: "listItems",
          responsive: false,
          render: (value: any, onChange: any) => {
            const list = Array.isArray(value) ? value : [];
            const updateItem = (index: number, key: string, val: any) => {
              const newList = [...list];
              newList[index] = { ...newList[index], [key]: val };
              onChange(newList);
            };
            const addItem = () => {
              onChange([...list, { icon: "solar:add-linear", text: "New feature detail paragraph goes here." }]);
            };
            const removeItem = (index: number) => {
              onChange(list.filter((_, i) => i !== index));
            };
            return (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-500">List Items</label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="py-1 px-2.5 bg-indigo-50 text-indigo-600 rounded-md text-xs font-bold hover:bg-indigo-100 transition"
                  >
                    + Add List Item
                  </button>
                </div>
                {list.map((item: any, idx: number) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Delete
                    </button>
                    <div className="text-xs font-bold text-gray-400">List Item # {idx + 1}</div>
                    <IconPicker
                      label="Select Icon"
                      value={item.icon || "solar:add-linear"}
                      onChange={(v) => updateItem(idx, "icon", v)}
                    />
                    <Textarea
                      label="Text Description"
                      value={item.text || ""}
                      onChange={(v) => updateItem(idx, "text", v)}
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            );
          },
        },
      ],
    },
    {
      tab: "Style",
      section: "Color Customizations",
      controls: [
        {
          name: "rightBgColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Right Container Background" value={value ?? "#f0f7ff"} onChange={onChange} />
          ),
        },
        {
          name: "subTitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Subtitle Text Color" value={value ?? "#1f2937"} onChange={onChange} />
          ),
        },
        {
          name: "titleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Title Text Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "descColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Description Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
        {
          name: "btnBgColor",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="Button Background" value={value ?? "#ff3b00"} onChange={onChange} />
              <ColorPickerPopup label="Button Text Color" value={schema.style.btnTextColor ?? "#ffffff"} onChange={(v) => updateSchema("style", "btnTextColor", v)} />
            </div>
          ),
        },
        {
          name: "listTextColor",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="List Text Color" value={value ?? "#374151"} onChange={onChange} />
              <ColorPickerPopup label="List Icon Color" value={schema.style.listIconColor ?? "#111827"} onChange={(v) => updateSchema("style", "listIconColor", v)} />
              <NumberControl label="List Icon Size (px)" value={schema.style.listIconSize ?? 20} onChange={(v) => updateSchema("style", "listIconSize", v)} min={10} max={60} />
            </div>
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
          name: "listTextTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="List Text Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <PartnerBannerFrontend element={element} />,
};

export default partnerBannerElement;
