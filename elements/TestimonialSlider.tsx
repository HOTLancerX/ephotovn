"use client";

/**
 * TestimonialSlider.tsx — Ephotovn testimonial slider element.
 *
 * Uses Embla Carousel to slide between customer quotes.
 * Layout per slide:
 *   Left column: Quote text, Author name, Author business/title.
 *   Right column: Testimonial Image.
 *   Bottom left: Prev / Next arrow buttons.
 *
 * Fully dynamic — slide cards, images, quote text, names, fonts, sizes.
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

interface TestimonialItem {
  quote: string;
  authorName: string;
  authorSubtitle: string;
  image: string;
}

// ── Frontend render ───────────────────────────────────────────────────────────

function TestimonialSliderFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const testimonials: TestimonialItem[] = s.content?.testimonials ?? [
    {
      quote: "“I highly recommend Ephotovn, they did amazing jobs on my photos. They always come back fast and high quality results.”",
      authorName: "Kylie Maree Stanley",
      authorSubtitle: "KM Studios",
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/1.jpg",
    },
    {
      quote: "“Great! After months spent retouching portraits, correcting skin tones, and removing facial blemishes, I found an excellent image editing partner.”",
      authorName: "Sophia Benham",
      authorSubtitle: "Beside The Seaside Photography",
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/2.jpg",
    },
    {
      quote: "“Image editing services are great to work with! They are always happy to complete a specific order and will edit images the way you want.”",
      authorName: "Martha Ramirez",
      authorSubtitle: "UDS Wedding Photography",
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/3.jpg",
    },
  ];

  // ── Embla Carousel setup ──
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // ── Style configurations ──
  const gap: number = s.style?.gap ?? 48;
  const quoteColor: string = s.style?.quoteColor || "#111827";
  const quoteTyp = getTypographyStyles(s.style?.quoteTypography || {});
  
  const nameColor: string = s.style?.nameColor || "#111827";
  const nameTyp = getTypographyStyles(s.style?.nameTypography || {});
  
  const subtitleColor: string = s.style?.subtitleColor || "#4b5563";
  const subtitleTyp = getTypographyStyles(s.style?.subtitleTypography || {});

  const imageBorderRadius: number = s.style?.imageBorderRadius ?? 16;
  const imageWidth: number = s.style?.imageWidth ?? 376;

  // Nav Arrow Style
  const navBg: string = s.style?.navBg || "transparent";
  const navBorderColor: string = s.style?.navBorderColor || "#111827";
  const navColor: string = s.style?.navColor || "#111827";
  const navHoverBg: string = s.style?.navHoverBg || "#111827";
  const navHoverColor: string = s.style?.navHoverColor || "#ffffff";

  const elementId = `testimonial-slider-${element.id}`;

  return (
    <div className={`w-full relative ${elementId}`}>
      <style>{`
        .${elementId} .embla {
          overflow: hidden;
          width: 100%;
        }
        .${elementId} .embla__container {
          display: flex;
        }
        .${elementId} .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
        }
        .${elementId} .nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: ${navBg};
          color: ${navColor};
          border: 1px solid ${navBorderColor};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .${elementId} .nav-btn:hover {
          background-color: ${navHoverBg};
          color: ${navHoverColor};
          border-color: ${navHoverBg};
        }
      `}</style>

      {/* Slider Viewport */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {testimonials.map((item, idx) => (
            <div className="embla__slide" key={idx}>
              <div
                className="grid grid-cols-1 md:grid-cols-12 items-center"
                style={{ gap: `${gap}px` }}
              >
                {/* Left Block */}
                <div className="md:col-span-8 flex flex-col justify-center">
                  <h1
                    style={{
                      margin: "0 0 24px 0",
                      color: quoteColor,
                      lineHeight: "1.35",
                      fontWeight: "700",
                      ...quoteTyp,
                    }}
                  >
                    {item.quote}
                  </h1>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p
                      style={{
                        margin: 0,
                        color: nameColor,
                        fontWeight: "700",
                        ...nameTyp,
                      }}
                    >
                      {item.authorName}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: subtitleColor,
                        ...subtitleTyp,
                      }}
                    >
                      {item.authorSubtitle}
                    </p>
                  </div>
                  {/* Nav Arrow controls - Left aligned */}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "24px",
                      justifyContent: "flex-start",
                    }}
                  >
                    <button className="nav-btn" onClick={scrollPrev} aria-label="Previous testimonial">
                      <Icon icon="mdi:arrow-left" width={20} height={20} />
                    </button>
                    <button className="nav-btn" onClick={scrollNext} aria-label="Next testimonial">
                      <Icon icon="mdi:arrow-right" width={20} height={20} />
                    </button>
                  </div>
                </div>

                {/* Right Block */}
                <div className="md:col-span-4 flex items-center justify-center md:justify-end">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.authorName}
                      style={{
                        width: "100%",
                        maxWidth: `${imageWidth}px`,
                        aspectRatio: "3 / 4",
                        objectFit: "cover",
                        borderRadius: `${imageBorderRadius}px`,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        maxWidth: `${imageWidth}px`,
                        aspectRatio: "3 / 4",
                        backgroundColor: "#e5e7eb",
                        borderRadius: `${imageBorderRadius}px`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon icon="mdi:image-outline" width={64} style={{ color: "#9ca3af" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Testimonials repeater control ─────────────────────────────────────────────

function TestimonialsControl({
  value,
  onChange,
}: {
  value: TestimonialItem[];
  onChange: (items: TestimonialItem[]) => void;
}) {
  const items: TestimonialItem[] = Array.isArray(value) ? value : [];

  const update = (index: number, field: keyof TestimonialItem, val: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const add = () =>
    onChange([
      ...items,
      {
        quote: "“Testimonial quote text goes here.”",
        authorName: "Author Name",
        authorSubtitle: "Company or Project name",
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>
              Testimonial {idx + 1}
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
            <Textarea label="Quote" value={item.quote || ""} onChange={(v) => update(idx, "quote", v)} rows={3} />
            <Text label="Author Name" value={item.authorName || ""} onChange={(v) => update(idx, "authorName", v)} />
            <Text label="Author Subtitle" value={item.authorSubtitle || ""} onChange={(v) => update(idx, "authorSubtitle", v)} />
            <ImageGallery label="Author Image" value={item.image || ""} onChange={(v) => update(idx, "image", v)} />
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
        <Icon icon="mdi:plus" width={16} /> Add Slide
      </button>
    </div>
  );
}

// ── Builder element definition ────────────────────────────────────────────────

const testimonialSliderElement = {
  type: "testimonial-slider",
  category: "ephotovn",
  label: "Testimonial Slider",
  icon: "solar:chat-square-like-bold-duotone",

  schema: {
    content: {
      testimonials: [
        {
          quote: "“I highly recommend Ephotovn, they did amazing jobs on my photos. They always come back fast and high quality results.”",
          authorName: "Kylie Maree Stanley",
          authorSubtitle: "KM Studios",
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/1.jpg",
        },
        {
          quote: "“Great! After months spent retouching portraits, correcting skin tones, and removing facial blemishes, I found an excellent image editing partner.”",
          authorName: "Sophia Benham",
          authorSubtitle: "Beside The Seaside Photography",
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/2.jpg",
        },
        {
          quote: "“Image editing services are great to work with! They are always happy to complete a specific order and will edit images the way you want.”",
          authorName: "Martha Ramirez",
          authorSubtitle: "UDS Wedding Photography",
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/photo-retouching/3.jpg",
        },
      ],
    },

    style: {
      gap: 48,

      // Quote text
      quoteColor: "#111827",
      quoteTypography: {
        fontSize: 28,
        fontWeight: "700",
      },

      // Author Name
      nameColor: "#111827",
      nameTypography: {
        fontSize: 15,
        fontWeight: "700",
      },

      // Author Subtitle
      subtitleColor: "#4b5563",
      subtitleTypography: {
        fontSize: 14,
      },

      // Image
      imageBorderRadius: 16,
      imageWidth: 376,

      // Nav controls
      navBg: "transparent",
      navColor: "#111827",
      navBorderColor: "#111827",
      navHoverBg: "#111827",
      navHoverColor: "#ffffff",
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
      section: "Testimonials",
      controls: [
        {
          name: "testimonials",
          responsive: false,
          render: (value: any, onChange: any) => (
            <TestimonialsControl value={value ?? []} onChange={onChange} />
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
            <NumberControl label="Column Gap (px)" value={value ?? 48} onChange={onChange} min={0} max={100} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Quote Text Styling",
      controls: [
        {
          name: "quoteColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Quote Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "quoteTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Quote Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Author Name Styling",
      controls: [
        {
          name: "nameColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Name Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "nameTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Name Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
    {
      tab: "Style",
      section: "Author Subtitle Styling",
      controls: [
        {
          name: "subtitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Subtitle Color" value={value ?? "#4b5563"} onChange={onChange} />
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
      section: "Image Styling",
      controls: [
        {
          name: "imageWidth",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Image Width (px)" value={value ?? 376} onChange={onChange} min={100} max={600} />
          ),
        },
        {
          name: "imageBorderRadius",
          responsive: false,
          render: (value: any, onChange: any) => (
            <NumberControl label="Image Border Radius (px)" value={value ?? 16} onChange={onChange} min={0} max={100} />
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
            <ColorPickerPopup label="Arrow Button Bg" value={value ?? "transparent"} onChange={onChange} />
          ),
        },
        {
          name: "navBorderColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Arrow Border Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "navColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Arrow Icon Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "navHoverBg",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Arrow Hover Bg" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "navHoverColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Arrow Hover Icon Color" value={value ?? "#ffffff"} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <TestimonialSliderFrontend element={element} />,
};

export default testimonialSliderElement;
