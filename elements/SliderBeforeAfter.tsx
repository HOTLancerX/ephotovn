"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
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
  Section,
  ImageGallery,
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

/* ── Interactive Before-After Slider Component for each card ── */
function CardBeforeAfterSlider({
  beforeImage,
  afterImage,
  height = 220,
  borderRadius = 12,
  handleBg = "#ffffff",
  handleIconColor = "#4b5563",
}: {
  beforeImage: string;
  afterImage: string;
  height?: number;
  borderRadius?: number;
  handleBg?: string;
  handleIconColor?: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const stopDrag = () => setIsDragging(false);
    const onGlobalMouseMove = (e: MouseEvent) => handleMove(e.clientX);

    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
    window.addEventListener("mousemove", onGlobalMouseMove);

    return () => {
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
      window.removeEventListener("mousemove", onGlobalMouseMove);
    };
  }, [isDragging]);

  const placeholderBefore = "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/newborn/before.jpg";
  const placeholderAfter = "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/newborn/after.jpg";

  const imgBefore = beforeImage || placeholderBefore;
  const imgAfter = afterImage || placeholderAfter;

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      className="relative w-full overflow-hidden select-none cursor-ew-resize"
      style={{
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* AFTER IMAGE (Background) */}
      <img
        src={imgAfter}
        alt="After"
        className="w-full h-full object-cover pointer-events-none block"
      />

      {/* BEFORE IMAGE (Clipped Foreground) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <img
          src={imgBefore}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none block"
          style={{ maxWidth: "none" }}
        />
      </div>

      {/* Vertical Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white z-10 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle circle */}
        <div
          className="absolute rounded-full shadow flex items-center justify-center pointer-events-none border border-black/5"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "28px",
            height: "28px",
            backgroundColor: handleBg,
            color: handleIconColor,
          }}
        >
          <Icon icon="mdi:chevron-left-right" width="14" />
        </div>
      </div>
    </div>
  );
}

interface ServiceBeforeAfterItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  title: string;
  price: string;
  readMoreText?: string;
  link: any;
}

const DEFAULT_SERVICES: ServiceBeforeAfterItem[] = [
  {
    id: "1",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/newborn/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/newborn/after.jpg",
    title: "Newborn Photo Retouching",
    price: "3 USD per image",
    readMoreText: "Read more",
    link: { url: "/newborn-baby-photo-retouching/" },
  },
  {
    id: "2",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/martenity/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/martenity/after.jpg",
    title: "Maternity Photo Retouching",
    price: "3 USD per image",
    readMoreText: "Read more",
    link: { url: "/maternity-retouching-and-photo-editing/" },
  },
  {
    id: "3",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/children/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/children/after.jpg",
    title: "Children Photo Retouching",
    price: "3 USD per image",
    readMoreText: "Read more",
    link: { url: "/children-photo-retouching/" },
  },
  {
    id: "4",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/family/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/family/after.jpg",
    title: "Family Photo Retouching",
    price: "3 USD per image",
    readMoreText: "Read more",
    link: { url: "/family-photo-retouching/" },
  },
  {
    id: "5",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/portrait/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/portrait/after.jpg",
    title: "Portrait Photo Retouching",
    price: "3 USD per image",
    readMoreText: "Read more",
    link: { url: "/portrait-retouching-services/" },
  },
  {
    id: "6",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/heashot/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/heashot/after.jpg",
    title: "Headshot Photo Retouching",
    price: "3 USD per image",
    readMoreText: "Read more",
    link: { url: "/headshot-retouching/" },
  },
  {
    id: "7",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/model/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/model/after.jpg",
    title: "Model Photo Retouching",
    price: "5 USD per image",
    readMoreText: "Read more",
    link: { url: "/model-retouching-service/" },
  },
  {
    id: "8",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/highend/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/highend/after.jpg",
    title: "High-end Photo Retouching",
    price: "8 USD per image",
    readMoreText: "Read more",
    link: { url: "/highend-photo-retouching/" },
  },
  {
    id: "9",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/wedding/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/wedding/after.jpg",
    title: "Wedding Photo Retouching",
    price: "Start from 1 USD per image",
    readMoreText: "Read more",
    link: { url: "/wedding-photo-editing-services/" },
  },
  {
    id: "10",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/ecommerce/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/ecommerce/after.jpg",
    title: "E-commerce Photo Retouching",
    price: "Start from 0.5 USD per image",
    readMoreText: "Read more",
    link: { url: "/e-commerce-photo-editing-services/" },
  },
  {
    id: "11",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/jewelry/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/jewelry/after.jpg",
    title: "Jewelry Photo Retouching",
    price: "Start from 2 USD per image",
    readMoreText: "Read more",
    link: { url: "/jewelry-photo-retouching-services/" },
  },
  {
    id: "12",
    beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/real/before.jpg",
    afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/real/after.jpg",
    title: "Real Estate Photo Editing",
    price: "Start from 2 USD per image",
    readMoreText: "Read more",
    link: { url: "/real-estate-photo-editing/" },
  },
];

function SliderBeforeAfterFrontend({ element }: { element: any }) {
  const s = element.schema;

  // Header content
  const subTitle: string = s.content?.subTitle || "Get started to discover";
  const title: string = s.content?.title || "Our services";
  const description: string = s.content?.description || "";
  const showHeader: boolean = s.content?.showHeader ?? true;

  const items: ServiceBeforeAfterItem[] = s.content?.items || DEFAULT_SERVICES;

  // Grid/Layout settings
  const colsDesktop: number = s.style?.colsDesktop ?? 3;
  const colsTablet: number = s.style?.colsTablet ?? 2;
  const colsMobile: number = s.style?.colsMobile ?? 1;
  const gap: number = s.style?.gap ?? 32;
  const imageHeight: number = s.style?.imageHeight ?? 220;
  const cardBorderRadius: number = s.style?.cardBorderRadius ?? 12;

  // Layout Positions
  const infoAlignment: "left" | "center" | "right" = s.style?.infoAlignment || "left";
  const contentLayout: "image-top" | "image-bottom" = s.style?.contentLayout || "image-top";

  // Colors & Typography styling
  const subTitleColor: string = s.style?.subTitleColor || "#ff5c35";
  const titleColor: string = s.style?.titleColor || "#1f2937";
  const descColor: string = s.style?.descColor || "#4b5563";

  const cardTitleColor: string = s.style?.cardTitleColor || "#1f2937";
  const priceColor: string = s.style?.priceColor || "#4b5563";
  const linkTextColor: string = s.style?.linkTextColor || "#2563eb";

  const subTitleTyp = getTypographyStyles(s.style?.subTitleTypography || {});
  const titleTyp = getTypographyStyles(s.style?.titleTypography || {});
  const descTyp = getTypographyStyles(s.style?.descTypography || {});
  const cardTitleTyp = getTypographyStyles(s.style?.cardTitleTypography || {});
  const priceTyp = getTypographyStyles(s.style?.priceTypography || {});
  const linkTextTyp = getTypographyStyles(s.style?.linkTextTypography || {});

  // Slider interactive settings
  const handleBg: string = s.style?.handleBg || "#ffffff";
  const handleIconColor: string = s.style?.handleIconColor || "#4b5563";

  // Advanced spacing
  const margin = s.advanced?.margin || {};
  const padding = s.advanced?.padding || {};
  const marginStyle = getDimensionsStyles(margin, "margin");
  const paddingStyle = getDimensionsStyles(padding, "padding");

  const elementId = `slider-ba-el-${element.id}`;

  // Render text helper for line by line split
  const renderLineByLine = (text: string) => {
    return text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">
        {line}
      </span>
    ));
  };

  const getFlexAlign = (align: "left" | "center" | "right") => {
    if (align === "left") return "items-start text-left";
    if (align === "right") return "items-end text-right";
    return "items-center text-center";
  };

  return (
    <div
      className={`w-full ${elementId}`}
      style={{
        ...marginStyle,
        ...paddingStyle,
      }}
    >
      <style>{`
        .${elementId} .services-grid {
          display: grid;
          grid-template-columns: repeat(${colsMobile}, minmax(0, 1fr));
          gap: ${gap}px;
        }
        @media (min-width: 768px) {
          .${elementId} .services-grid {
            grid-template-columns: repeat(${colsTablet}, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .${elementId} .services-grid {
            grid-template-columns: repeat(${colsDesktop}, minmax(0, 1fr));
          }
        }
        .${elementId} .service-card {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .${elementId} .service-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .${elementId} .details-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
          gap: 12px;
          flex-direction: column;
        }
      `}</style>

      {/* Header section (Centered) */}
      {showHeader && (subTitle || title || description) && (
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          {subTitle && (
            <span
              className="text-xs font-semibold tracking-wider uppercase block mb-2"
              style={{
                color: subTitleColor,
                ...subTitleTyp,
              }}
            >
              {renderLineByLine(subTitle)}
            </span>
          )}
          {title && (
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight font-serif mb-4 flex flex-col items-center"
              style={{
                color: titleColor,
                ...titleTyp,
              }}
            >
              {renderLineByLine(title)}
            </h2>
          )}
          {description && (
            <p
              className="text-[15px] leading-relaxed flex flex-col items-center"
              style={{
                color: descColor,
                ...descTyp,
              }}
            >
              {renderLineByLine(description)}
            </p>
          )}
        </div>
      )}

      {/* Services Grid list */}
      <div className="services-grid">
        {items.map((item) => (
          <div key={item.id} className="service-card">
            {/* DETAILS ON TOP */}
            {contentLayout === "image-bottom" && (
              <div className="service-details mb-4">
                <a
                  href={item.link?.url || "#"}
                  target={item.link?.target || undefined}
                  rel={item.link?.nofollow ? "nofollow" : undefined}
                  className="no-underline block group"
                >
                  <div className="details-row">
                    <h3
                      className={`text-base font-bold m-0 group-hover:text-blue-600 transition-colors flex flex-col ${getFlexAlign(infoAlignment)}`}
                      style={{
                        color: cardTitleColor,
                        ...cardTitleTyp,
                        textAlign: infoAlignment,
                      }}
                    >
                      {renderLineByLine(item.title)}
                    </h3>
                    <p
                      className={`text-sm m-0 font-medium flex flex-col ${getFlexAlign(infoAlignment)}`}
                      style={{
                        color: priceColor,
                        ...priceTyp,
                        textAlign: infoAlignment,
                      }}
                    >
                      {renderLineByLine(item.price)}
                    </p>
                    <span
                      className="text-xs font-semibold uppercase group-hover:underline shrink-0"
                      style={{
                        color: linkTextColor,
                        ...linkTextTyp,
                      }}
                    >
                      {renderLineByLine(item.readMoreText || "Read more")}
                    </span>
                  </div>
                </a>
              </div>
            )}

            {/* Interactive Before/After Slider */}
            <CardBeforeAfterSlider
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              height={imageHeight}
              borderRadius={cardBorderRadius}
              handleBg={handleBg}
              handleIconColor={handleIconColor}
            />

            {/* DETAILS ON BOTTOM */}
            {contentLayout === "image-top" && (
              <div className="service-details mt-4">
                <a
                  href={item.link?.url || "#"}
                  target={item.link?.target || undefined}
                  rel={item.link?.nofollow ? "nofollow" : undefined}
                  className="no-underline block group"
                >
                  <div className="details-row">
                    <h3
                      className={`text-base font-bold m-0 group-hover:text-blue-600 transition-colors flex flex-col ${getFlexAlign(infoAlignment)}`}
                      style={{
                        color: cardTitleColor,
                        ...cardTitleTyp,
                        textAlign: infoAlignment,
                      }}
                    >
                      {renderLineByLine(item.title)}
                    </h3>
                    <p
                      className={`text-sm m-0 font-medium flex flex-col ${getFlexAlign(infoAlignment)}`}
                      style={{
                        color: priceColor,
                        ...priceTyp,
                        textAlign: infoAlignment,
                      }}
                    >
                      {renderLineByLine(item.price)}
                    </p>
                    <span
                      className="text-xs font-semibold uppercase group-hover:underline shrink-0"
                      style={{
                        color: linkTextColor,
                        ...linkTextTyp,
                      }}
                    >
                      {renderLineByLine(item.readMoreText || "Read more")}
                    </span>
                  </div>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const sliderBeforeAfterElement = {
  type: "slider-before-after-ep",
  category: "ephotovn",
  label: "Before/After Services Grid",
  icon: "solar:slider-minimalistic-horizontal-bold-duotone",

  schema: {
    content: {
      subTitle: "Get started to discover",
      title: "Our services",
      description: "",
      showHeader: true,
      items: DEFAULT_SERVICES,
    },

    style: {
      colsDesktop: 3,
      colsTablet: 2,
      colsMobile: 1,
      gap: 32,
      imageHeight: 220,
      cardBorderRadius: 12,

      infoAlignment: "left",
      contentLayout: "image-top",

      subTitleColor: "#ff5c35",
      titleColor: "#1f2937",
      descColor: "#4b5563",
      cardTitleColor: "#1f2937",
      priceColor: "#4b5563",
      linkTextColor: "#2563eb",

      handleBg: "#ffffff",
      handleIconColor: "#4b5563",

      subTitleTypography: {
        fontSize: 12,
        fontWeight: "600",
      },
      titleTypography: {
        fontSize: 32,
        fontWeight: "700",
        fontFamily: "Georgia, serif",
      },
      descTypography: {
        fontSize: 15,
      },
      cardTitleTypography: {
        fontSize: 16,
        fontWeight: "700",
      },
      priceTypography: {
        fontSize: 14,
      },
      linkTextTypography: {
        fontSize: 12,
        fontWeight: "600",
      },
    },

    advanced: {
      margin: { top: 40, right: 0, bottom: 40, left: 0, unit: "px" },
      padding: { top: 20, right: 20, bottom: 20, left: 20, unit: "px" },
    },
  },

  controls: [
    // ═══════════════════ LAYOUT TAB ══════════════════
    {
      tab: "Layout",
      section: "Grid Settings",
      controls: [
        {
          name: "colsDesktop",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Columns (Desktop)" value={value ?? 3} onChange={onChange} min={1} max={6} />
          ),
        },
        {
          name: "colsTablet",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Columns (Tablet)" value={value ?? 2} onChange={onChange} min={1} max={4} />
          ),
        },
        {
          name: "colsMobile",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Columns (Mobile)" value={value ?? 1} onChange={onChange} min={1} max={3} />
          ),
        },
        {
          name: "gap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Gap Size (px)" value={value ?? 32} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "imageHeight",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Image Height (px)" value={value ?? 220} onChange={onChange} min={150} max={500} />
          ),
        },
        {
          name: "cardBorderRadius",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Card Border Radius (px)" value={value ?? 12} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "infoAlignment",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Card Text Alignment"
              value={value ?? "left"}
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
          name: "contentLayout",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Card Content Ordering"
              value={value ?? "image-top"}
              onChange={onChange}
              options={[
                { value: "image-top", label: "Image Top, Info Bottom" },
                { value: "image-bottom", label: "Info Top, Image Bottom" },
              ]}
            />
          ),
        },
      ],
    },

    {
      tab: "Layout",
      section: "Header Settings",
      controls: [
        {
          name: "showHeader",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Header Section" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "subTitle",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Header Subtitle (Split by new line)" value={value || ""} onChange={onChange} rows={2} />
          ),
        },
        {
          name: "title",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Header Title (Split by new line)" value={value || ""} onChange={onChange} rows={2} />
          ),
        },
        {
          name: "description",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Header Description (Split by new line)" value={value || ""} onChange={onChange} rows={3} />
          ),
        },
      ],
    },

    {
      tab: "Layout",
      section: "Service Items List",
      controls: [
        {
          name: "items",
          responsive: false,
          render: (value: any, onChange: any) => (
            <div className="space-y-4">
              {(value || []).map((item: any, idx: number) => (
                <div key={item.id || idx} className="border border-gray-200 rounded p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">Service Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => onChange((value || []).filter((_: any, i: number) => i !== idx))}
                      className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>

                  <ImageGallery
                    label="Before Image"
                    value={item.beforeImage || ""}
                    onChange={(v: string) => {
                      const u = [...value]; u[idx] = { ...u[idx], beforeImage: v }; onChange(u);
                    }}
                  />

                  <ImageGallery
                    label="After Image"
                    value={item.afterImage || ""}
                    onChange={(v: string) => {
                      const u = [...value]; u[idx] = { ...u[idx], afterImage: v }; onChange(u);
                    }}
                  />

                  <Textarea
                    label="Service Title (Split by new line)"
                    value={item.title || ""}
                    onChange={(v: string) => {
                      const u = [...value]; u[idx] = { ...u[idx], title: v }; onChange(u);
                    }}
                    rows={2}
                  />

                  <Textarea
                    label="Service Price (Split by new line)"
                    value={item.price || ""}
                    onChange={(v: string) => {
                      const u = [...value]; u[idx] = { ...u[idx], price: v }; onChange(u);
                    }}
                    rows={2}
                  />

                  <Text
                    label="Read More Text Label"
                    value={item.readMoreText || "Read more"}
                    onChange={(v: string) => {
                      const u = [...value]; u[idx] = { ...u[idx], readMoreText: v }; onChange(u);
                    }}
                  />

                  <Url
                    label="Service Link Destination"
                    value={item.link || { url: "" }}
                    onChange={(v: any) => {
                      const u = [...value]; u[idx] = { ...u[idx], link: v }; onChange(u);
                    }}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const newItem: ServiceBeforeAfterItem = {
                    id: `ba_${Date.now()}`,
                    beforeImage: "",
                    afterImage: "",
                    title: "New Service Retouching",
                    price: "3 USD per image",
                    readMoreText: "Read more",
                    link: { url: "" },
                  };
                  onChange([...(value || []), newItem]);
                }}
                className="w-full py-2 bg-gray-800 text-white rounded text-sm font-semibold cursor-pointer hover:bg-gray-900 transition-colors"
              >
                + Add Service Card
              </button>
            </div>
          ),
        },
      ],
    },

    // ═══════════════════ STYLE TAB ══════════════════
    {
      tab: "Style",
      section: "Header Colors & Fonts",
      controls: [
        {
          name: "subTitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Subtitle Text Color" value={value ?? "#ff5c35"} onChange={onChange} />
          ),
        },
        {
          name: "subTitleTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Subtitle Typography" value={value} onChange={onChange} />
          ),
        },
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
        {
          name: "descColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Description Text Color" value={value ?? "#4b5563"} onChange={onChange} />
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
      section: "Cards Info styling",
      controls: [
        {
          name: "cardTitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Card Title Color" value={value ?? "#1f2937"} onChange={onChange} />
          ),
        },
        {
          name: "cardTitleTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Card Title Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "priceColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Price Text Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
        {
          name: "priceTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Price Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "linkTextColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Read More Link Color" value={value ?? "#2563eb"} onChange={onChange} />
          ),
        },
        {
          name: "linkTextTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Link Text Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },

    {
      tab: "Style",
      section: "Before/After Slider Handle",
      controls: [
        {
          name: "handleBg",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="Handle Background Color" value={value ?? "#ffffff"} onChange={onChange} />
              <ColorPickerPopup
                label="Handle Icon Color"
                value={schema.style.handleIconColor ?? "#4b5563"}
                onChange={(v) => updateSchema("style", "handleIconColor", v)}
              />
            </div>
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

  render: (element: any) => <SliderBeforeAfterFrontend element={element} />,
};

export default sliderBeforeAfterElement;
