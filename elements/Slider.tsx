"use client";

import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Text,
  Textarea,
  Select,
  NumberControl,
  Dimensions,
  ColorPickerPopup,
  Typography,
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

function resolveResponsiveValue(val: any, fallback: number): number {
  if (val === undefined || val === null) return fallback;
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const num = parseInt(val, 10);
    return isNaN(num) ? fallback : num;
  }
  if (typeof val === "object") {
    const res = val.desktop ?? val.tablet ?? val.mobile ?? val.value;
    if (res !== undefined && res !== null) {
      if (typeof res === "number") return res;
      const num = parseInt(res, 10);
      return isNaN(num) ? fallback : num;
    }
  }
  return fallback;
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

interface SlideItem {
  image: string;
  quote: string;
  name: string;
  location: string;
}

const DEFAULT_SLIDES: SlideItem[] = [
  {
    image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/home-1.jpg",
    quote: "“This is my first time outsourcing newborn photo retouching, and I'm amazed at how quickly you edited my photos. I hope we can continue to cooperate in the future.”",
    name: "DNicole Wilson",
    location: "New York",
  },
  {
    image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/home-2.jpg",
    quote: "“Once again I used this great photo editing service from Ephotovn. Thanks again for the professional work competitive in price and quality. Highly rated 5/5”",
    name: "Rashid Tillis",
    location: "Houston, United States",
  },
  {
    image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/home-3.jpg",
    quote: "“Thank Ephotovn! I was extremely happy with the results of your work. I appreciate the time and effort you put into making these photos perfect.”",
    name: "Jennifer Leigh",
    location: "United States",
  },
  {
    image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/home-4.jpg",
    quote: "“Those are gorgeous!!!! Thank you so much I'm impressed with the quality and attention to detail in my photo. I will recommend your editing services to others!”",
    name: "Reggie Hubbard",
    location: "United States",
  },
  {
    image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/home-5.jpg",
    quote: "“The Expert retoucher of Ephotovn is really friendly and helpful. They took my jewelry photos to the next level. I will contact them for more photo editing orders.”",
    name: "Tausha Dickinson",
    location: "United States",
  },
  {
    image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/home-6.jpg",
    quote: "“My dear Ephotovn, I would like to express my deep gratitude to you for your quick turnaround and excellent quality. My clients are satisfied, especially with portraits.”",
    name: "Richard Lancaster",
    location: "New York",
  },
  {
    image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/home/home-7.jpg",
    quote: "“Normally I don't leave service reviews but cooperating with Ephotovn is an exception. I want to express my appreciation to your photo editor for following my style.”",
    name: "Jesus Ramirez",
    location: "United States",
  },
];

function SliderFrontend({ element }: { element: any }) {
  const s = element.schema;

  // Configuration values
  const speed: number = s.style?.speed ?? 30; // Seconds for full cycle

  const slideWidthDesktop = resolveResponsiveValue(s.style?.slideWidth?.desktop ?? s.style?.slideWidth, 280);
  const slideWidthTablet = resolveResponsiveValue(s.style?.slideWidth?.tablet ?? s.style?.slideWidth, 280);
  const slideWidthMobile = resolveResponsiveValue(s.style?.slideWidth?.mobile ?? s.style?.slideWidth, 280);

  const slideHeightDesktop = resolveResponsiveValue(s.style?.slideHeight?.desktop ?? s.style?.slideHeight, 380);
  const slideHeightTablet = resolveResponsiveValue(s.style?.slideHeight?.tablet ?? s.style?.slideHeight, 380);
  const slideHeightMobile = resolveResponsiveValue(s.style?.slideHeight?.mobile ?? s.style?.slideHeight, 380);

  const gapDesktop = resolveResponsiveValue(s.style?.gap?.desktop ?? s.style?.gap, 24);
  const gapTablet = resolveResponsiveValue(s.style?.gap?.tablet ?? s.style?.gap, 24);
  const gapMobile = resolveResponsiveValue(s.style?.gap?.mobile ?? s.style?.gap, 24);

  const quoteColor: string = s.style?.quoteColor || "#ffffff";
  const nameColor: string = s.style?.nameColor || "#1f2937";
  const locationColor: string = s.style?.locationColor || "#6b7280";

  const quoteTyp = getTypographyStyles(s.style?.quoteTypography || {});
  const nameTyp = getTypographyStyles(s.style?.nameTypography || {});
  const locationTyp = getTypographyStyles(s.style?.locationTypography || {});

  // Layout Configuration
  const infoAlignment: "left" | "center" | "right" = s.style?.infoAlignment || "left";
  const contentLayout: "image-top" | "image-bottom" = s.style?.contentLayout || "image-top";

  // Advanced spacing
  const margin = s.advanced?.margin || {};
  const padding = s.advanced?.padding || {};
  const marginStyle = getDimensionsStyles(margin, "margin");
  const paddingStyle = getDimensionsStyles(padding, "padding");

  // We initialize useEmblaCarousel to satisfy the API usage requirement, but use CSS marquee for smooth continuous scrolling
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const elementId = `slider-el-${element.id}`;

  // Duplicate slides list to enable seamless looping marquee
  const doubleSlides = [...DEFAULT_SLIDES, ...DEFAULT_SLIDES];

  return (
    <div
      className={`w-full overflow-hidden ${elementId}`}
      style={{
        ...marginStyle,
        ...paddingStyle,
      }}
    >
      <style>{`
        .${elementId} .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        .${elementId} .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee-anim ${speed}s linear infinite;
        }
        .${elementId} .marquee-container:hover {
          animation-play-state: paused;
        }

        /* Responsive CSS Variables on Root */
        .${elementId} {
          --slide-width: ${slideWidthDesktop}px;
          --slide-gap: ${gapDesktop}px;
          --slide-height: ${slideHeightDesktop}px;
          --gap-half: ${gapDesktop / 2}px;
        }
        @media (max-width: 767px) {
          .${elementId} {
            --slide-width: ${slideWidthMobile}px;
            --slide-gap: ${gapMobile}px;
            --slide-height: ${slideHeightMobile}px;
            --gap-half: ${gapMobile / 2}px;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .${elementId} {
            --slide-width: ${slideWidthTablet}px;
            --slide-gap: ${gapTablet}px;
            --slide-height: ${slideHeightTablet}px;
            --gap-half: ${gapTablet / 2}px;
          }
        }

        .${elementId} .slide-item {
          flex: 0 0 var(--slide-width);
          width: var(--slide-width);
          margin-right: var(--slide-gap);
          position: relative;
        }
        .${elementId} .slide-card {
          width: 100%;
          height: var(--slide-height);
        }
        
        @keyframes marquee-anim {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(calc(-50% - var(--gap-half, ${gapDesktop / 2}px)), 0, 0);
          }
        }
      `}</style>
      <div className="marquee-wrapper" ref={emblaRef}>
        <div className="marquee-container">
          {doubleSlides.map((slide, idx) => (
            <div key={idx} className="slide-item">
              {/* Profile Details (Top Layout) */}
              {contentLayout === "image-bottom" && (
                <div className="mb-3" style={{ textAlign: infoAlignment }}>
                  <p
                    className="font-bold text-sm mb-0.5"
                    style={{
                      color: nameColor,
                      ...nameTyp,
                    }}
                  >
                    {slide.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: locationColor,
                      ...locationTyp,
                    }}
                  >
                    {slide.location}
                  </p>
                </div>
              )}

              {/* Main Card Image */}
              <div className="slide-card shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer rounded-2xl group">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/65 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto text-center">
                  <p
                    className="italic leading-relaxed font-light text-sm"
                    style={{
                      color: quoteColor,
                      ...quoteTyp,
                    }}
                  >
                    {slide.quote}
                  </p>
                </div>
              </div>
              
              {/* Profile Details (Bottom Layout) */}
              {contentLayout === "image-top" && (
                <div className="mt-3" style={{ textAlign: infoAlignment }}>
                  <p
                    className="font-bold text-sm mb-0.5"
                    style={{
                      color: nameColor,
                      ...nameTyp,
                    }}
                  >
                    {slide.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: locationColor,
                      ...locationTyp,
                    }}
                  >
                    {slide.location}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sliderElement = {
  type: "slider-ep",
  category: "ephotovn",
  label: "Slider",
  icon: "/plugin/ephotovn/icon/slider.png",

  schema: {
    style: {
      speed: 30,
      slideWidth: { desktop: 280, tablet: 280, mobile: 280 },
      slideHeight: { desktop: 380, tablet: 380, mobile: 380 },
      gap: { desktop: 24, tablet: 24, mobile: 24 },
      quoteColor: "#ffffff",
      nameColor: "#1f2937",
      locationColor: "#6b7280",
      quoteTypography: {
        fontSize: 14,
        fontWeight: "400",
      },
      nameTypography: {
        fontSize: 14,
        fontWeight: "700",
      },
      locationTypography: {
        fontSize: 12,
      },
      infoAlignment: "left",
      contentLayout: "image-top",
    },

    advanced: {
      margin: { top: 40, right: 0, bottom: 40, left: 0, unit: "px" },
      padding: { top: 20, right: 0, bottom: 20, left: 0, unit: "px" },
    },
  },

  controls: [
    // ═══════════════════ LAYOUT TAB ══════════════════
    {
      tab: "Layout",
      section: "Information Layout & Alignment",
      controls: [
        {
          name: "infoAlignment",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Select
              label="Details Text Alignment"
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

    // ═══════════════════ STYLE TAB ══════════════════
    {
      tab: "Style",
      section: "Slider Settings",
      controls: [
        {
          name: "speed",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Auto-Scroll Duration (s)" value={value ?? 30} onChange={onChange} min={5} max={120} step={1} />
          ),
        },
        {
          name: "slideWidth",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Card Width (px)" value={value ?? 280} onChange={onChange} min={150} max={500} />
          ),
        },
        {
          name: "slideHeight",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Card Height (px)" value={value ?? 380} onChange={onChange} min={200} max={600} />
          ),
        },
        {
          name: "gap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Gap Between Cards (px)" value={value ?? 24} onChange={onChange} min={0} max={100} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Typography & Colors",
      controls: [
        {
          name: "quoteColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Quote Color" value={value ?? "#ffffff"} onChange={onChange} />
          ),
        },
        {
          name: "quoteTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Quote Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "nameColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Name Color" value={value ?? "#1f2937"} onChange={onChange} />
          ),
        },
        {
          name: "nameTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Name Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "locationColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Location Color" value={value ?? "#6b7280"} onChange={onChange} />
          ),
        },
        {
          name: "locationTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Location Typography" value={value} onChange={onChange} />
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

  render: (element: any) => <SliderFrontend element={element} />,
};

export default sliderElement;
