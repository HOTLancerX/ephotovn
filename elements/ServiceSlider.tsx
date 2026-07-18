"use client";

/**
 * ServiceSlider.tsx — Ephotovn services slider element.
 *
 * Uses Embla Carousel to render a responsive carousel of before/after service cards.
 * Each card displays:
 *   - A double image block: Before image (left) + After image (right) side by side.
 *   - Service Title below.
 *   - Links to a dedicated service landing page.
 *
 * Fully dynamic — slide cards, titles, links, colors, typography.
 */

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@iconify/react";
import {
  Text,
  Textarea,
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

interface SlideItem {
  beforeImage: string;
  afterImage: string;
  title: string;
  link: any;
}

// ── Frontend render ───────────────────────────────────────────────────────────

function ServiceSliderFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const subtitle: string = s.content?.subtitle || "Ephotovn's other services";
  const showSubtitle: boolean = s.content?.showSubtitle ?? true;
  const heading: string = s.content?.heading || "to build your one-of-a-kind";
  const slides: SlideItem[] = s.content?.slides ?? [
    {
      beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/before-7.jpg",
      afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/after-7.jpg",
      title: "Children Photo Retouching",
      link: { url: "/children-photo-retouching/" },
    },
    {
      beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/before-1.jpg",
      afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/after-1.jpg",
      title: "Headshot Photo Retouching",
      link: { url: "/headshot-retouching/" },
    },
    {
      beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/before-2.jpg",
      afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/after-2.jpg",
      title: "Model Photo Retouching",
      link: { url: "/model-retouching-service/" },
    },
    {
      beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/before-3.jpg",
      afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/after-3.jpg",
      title: "High-end Photo Retouching",
      link: { url: "/highend-photo-retouching/" },
    },
  ];

  // ── Embla Carousel setup ──
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // ── Style overrides ──
  const gap: number = s.style?.gap ?? 30;
  const headerGap: number = s.style?.headerGap ?? 40;
  const slideWidthMobile: number = s.style?.slideWidthMobile ?? 100;
  const slideWidthDesktop: number = s.style?.slideWidthDesktop ?? 33.33;

  // ── Heading styles ──
  const subtitleColor: string = s.style?.subtitleColor || "#374151";
  const subtitleTyp = getTypographyStyles(s.style?.subtitleTypography || {});
  const headingColor: string = s.style?.headingColor || "#111827";
  const headingTyp = getTypographyStyles(s.style?.headingTypography || {});

  // ── Card styles ──
  const cardTitleColor: string = s.style?.cardTitleColor || "#111827";
  const cardTitleTyp = getTypographyStyles(s.style?.cardTitleTypography || {});
  const imageBorderRadius: number = s.style?.imageBorderRadius ?? 8;

  // ── Nav Button styles ──
  const navBg: string = s.style?.navBg || "rgba(255, 255, 255, 0.9)";
  const navColor: string = s.style?.navColor || "#111827";
  const navHoverBg: string = s.style?.navHoverBg || "#ff3b00";
  const navHoverColor: string = s.style?.navHoverColor || "#ffffff";
  const navSize: number = s.style?.navSize ?? 48;

  const renderLineByLine = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">{line}</span>
    ));

  const elementId = `service-slider-${element.id}`;

  return (
    <div className={`w-full relative ${elementId}`}>
      <style>{`
        .${elementId} .embla {
          overflow: hidden;
          width: 100%;
        }
        .${elementId} .embla__container {
          display: flex;
          margin-left: -${gap}px;
        }
        .${elementId} .embla__slide {
          flex: 0 0 ${slideWidthMobile}%;
          padding-left: ${gap}px;
          min-width: 0;
        }
        @media (min-width: 768px) {
          .${elementId} .embla__slide {
            flex: 0 0 ${slideWidthDesktop}%;
          }
        }
        .${elementId} .nav-btn {
          width: ${navSize}px;
          height: ${navSize}px;
          border-radius: 50%;
          background-color: ${navBg};
          color: ${navColor};
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .${elementId} .nav-btn:hover {
          background-color: ${navHoverBg};
          color: ${navHoverColor};
        }
      `}</style>

      {/* Header: title + subtitle */}
      <div style={{ textAlign: "center", marginBottom: `${headerGap}px` }}>
        {showSubtitle && subtitle && (
          <div
            style={{
              color: subtitleColor,
              fontWeight: "600",
              marginBottom: "12px",
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

      {/* Slider viewport */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, idx) => (
            <div className="embla__slide" key={idx}>
              <a
                href={slide.link?.url || "#"}
                target={slide.link?.target || undefined}
                rel={slide.link?.nofollow ? "nofollow" : undefined}
                style={{ textDecoration: "none", display: "block" }}
              >
                {/* Images Container */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2px",
                    overflow: "hidden",
                    borderRadius: `${imageBorderRadius}px`,
                    aspectRatio: "16 / 10",
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  {slide.beforeImage ? (
                    <img
                      src={slide.beforeImage}
                      alt="Before"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-gray-200">
                      <Icon icon="mdi:image-outline" width={24} style={{ color: "#9ca3af" }} />
                    </div>
                  )}

                  {slide.afterImage ? (
                    <img
                      src={slide.afterImage}
                      alt="After"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-gray-300">
                      <Icon icon="mdi:image-outline" width={24} style={{ color: "#9ca3af" }} />
                    </div>
                  )}
                </div>

                {/* Service Title */}
                {slide.title && (
                  <div
                    style={{
                      marginTop: "16px",
                      textAlign: "center",
                      color: cardTitleColor,
                      fontWeight: "700",
                      ...cardTitleTyp,
                    }}
                  >
                    {slide.title}
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Nav Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "32px",
        }}
      >
        <button className="nav-btn" onClick={scrollPrev} aria-label="Previous slide">
          <Icon icon="mdi:chevron-left" width={24} height={24} />
        </button>
        <button className="nav-btn" onClick={scrollNext} aria-label="Next slide">
          <Icon icon="mdi:chevron-right" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}

// ── Slides repeater control ──────────────────────────────────────────────────

function SlidesControl({
  value,
  onChange,
}: {
  value: SlideItem[];
  onChange: (items: SlideItem[]) => void;
}) {
  const items: SlideItem[] = Array.isArray(value) ? value : [];

  const update = (index: number, field: keyof SlideItem, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const add = () =>
    onChange([
      ...items,
      {
        beforeImage: "",
        afterImage: "",
        title: "New Service",
        link: { url: "#" },
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>
              Slide {idx + 1}
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
            <ImageGallery label="Before Image (Left)" value={item.beforeImage || ""} onChange={(v) => update(idx, "beforeImage", v)} />
            <ImageGallery label="After Image (Right)" value={item.afterImage || ""} onChange={(v) => update(idx, "afterImage", v)} />
            <Text label="Service Title" value={item.title || ""} onChange={(v) => update(idx, "title", v)} />
            <Url label="Landing Page URL" value={item.link || { url: "" }} onChange={(v) => update(idx, "link", v)} />
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
        <Icon icon="mdi:plus" width={16} /> Add Slide Card
      </button>
    </div>
  );
}

// ── Builder element definition ────────────────────────────────────────────────

const serviceSliderElement = {
  type: "service-slider",
  category: "ephotovn",
  label: "Service Slider",
  icon: "mynaui:grid",

  schema: {
    content: {
      subtitle: "Ephotovn's other services",
      showSubtitle: true,
      heading: "to build your one-of-a-kind",
      slides: [
        {
          beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/before-7.jpg",
          afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/after-7.jpg",
          title: "Children Photo Retouching",
          link: { url: "/children-photo-retouching/" },
        },
        {
          beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/before-1.jpg",
          afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/after-1.jpg",
          title: "Headshot Photo Retouching",
          link: { url: "/headshot-retouching/" },
        },
        {
          beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/before-2.jpg",
          afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/after-2.jpg",
          title: "Model Photo Retouching",
          link: { url: "/model-retouching-service/" },
        },
        {
          beforeImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/before-3.jpg",
          afterImage: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/portrait/after-3.jpg",
          title: "High-end Photo Retouching",
          link: { url: "/highend-photo-retouching/" },
        },
      ],
    },

    style: {
      gap: 30,
      headerGap: { desktop: 40, tablet: 40, mobile: 40 },
      slideWidthMobile: 100,
      slideWidthDesktop: 33.33,

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
      },

      // Card Title
      cardTitleColor: "#111827",
      cardTitleTypography: {
        fontSize: 16,
        fontWeight: "700",
      },

      imageBorderRadius: 8,

      // Nav buttons
      navBg: "rgba(255, 255, 255, 0.9)",
      navColor: "#111827",
      navHoverBg: "#ff3b00",
      navHoverColor: "#ffffff",
      navSize: 48,
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
      section: "Slide Cards",
      controls: [
        {
          name: "slides",
          responsive: false,
          render: (value: any, onChange: any) => (
            <SlidesControl value={value ?? []} onChange={onChange} />
          ),
        },
      ],
    },

    // ═══════════════════ STYLE TAB ══════════════════
    {
      tab: "Style",
      section: "Layout & Gap",
      controls: [
        {
          name: "gap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Slide Cards Gap (px)" value={value ?? 30} onChange={onChange} min={0} max={80} />
          ),
        },
        {
          name: "headerGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Header to Slider Gap (px)" value={value ?? 40} onChange={onChange} min={0} max={100} />
          ),
        },
        {
          name: "slideWidthDesktop",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Slide Width on Desktop (%)" value={value ?? 33.33} onChange={onChange} min={10} max={100} />
          ),
        },
        {
          name: "slideWidthMobile",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Slide Width on Mobile (%)" value={value ?? 100} onChange={onChange} min={10} max={100} />
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
      section: "Card Title Styling",
      controls: [
        {
          name: "cardTitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Card Title Color" value={value ?? "#111827"} onChange={onChange} />
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
          name: "imageBorderRadius",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Image Border Radius (px)" value={value ?? 8} onChange={onChange} min={0} max={100} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Nav Buttons",
      controls: [
        {
          name: "navBg",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Button Bg" value={value ?? "rgba(255, 255, 255, 0.9)"} onChange={onChange} />
          ),
        },
        {
          name: "navColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Button Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "navHoverBg",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Button Hover Bg" value={value ?? "#ff3b00"} onChange={onChange} />
          ),
        },
        {
          name: "navHoverColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Button Hover Color" value={value ?? "#ffffff"} onChange={onChange} />
          ),
        },
        {
          name: "navSize",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Button Size (px)" value={value ?? 48} onChange={onChange} min={24} max={80} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <ServiceSliderFrontend element={element} />,
};

export default serviceSliderElement;
