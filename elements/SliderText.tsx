"use client";

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@iconify/react";
import {
  Text,
  Textarea,
  Select,
  NumberControl,
  Dimensions,
  ColorPickerPopup,
  Typography,
  IconPicker,
  Section,
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

interface SliderTextItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const DEFAULT_ITEMS: SliderTextItem[] = [
  {
    id: "1",
    icon: "mdi:clock-outline",
    title: "Fast Turnaround",
    description: "Receive high-quality, stunning, and professional edits within 24 hours.",
  },
  {
    id: "2",
    icon: "mdi:piggy-bank-outline",
    title: "No Subscription",
    description: "We charge per image, and you only pay when you’re fully satisfied with our service.",
  },
  {
    id: "3",
    icon: "mdi:infinity",
    title: "Unlimited Revisions",
    description: "Customer satisfaction is our top priority. We offer unlimited revisions until you are completely happy with the results.",
  },
  {
    id: "4",
    icon: "mdi:account-group-outline",
    title: "One-on-One Approach",
    description: "Work directly with one of our editors for consistent results and personalized support.",
  },
  {
    id: "5",
    icon: "mdi:shield-check-outline",
    title: "We Don’t Own Your Photos",
    description: "Your photos remain entirely yours. We do not claim any copyright after editing and delivering them. All data will be permanently removed from our system within 30 days.",
  },
];

function SliderTextFrontend({ element }: { element: any }) {
  const s = element.schema;

  // Content Configuration
  const subTitle: string = s.content?.subTitle || "Assurances";
  const title: string = s.content?.title || "Do you want to boost your business growth? The solution is here.";
  const description: string = s.content?.description || "We'll handle the detailed work so you can concentrate on strategic growth and the success of your business.";
  const items: SliderTextItem[] = s.content?.items || DEFAULT_ITEMS;

  // Layout Configuration
  const infoAlignment: "left" | "center" | "right" = s.style?.infoAlignment || "left";
  const cardWidth: number = s.style?.cardWidth ?? 300;
  const cardHeight: number = s.style?.cardHeight ?? 240;
  const gap: number = s.style?.gap ?? 24;

  // Colors & Styles
  const subTitleColor: string = s.style?.subTitleColor || "#ff5c35";
  const titleColor: string = s.style?.titleColor || "#111827";
  const descColor: string = s.style?.descColor || "#4b5563";

  const cardBg: string = s.style?.cardBg || "#f9fafb";
  const cardBorderRadius: number = s.style?.cardBorderRadius ?? 16;
  const iconColor: string = s.style?.iconColor || "#3b82f6";
  const iconBg: string = s.style?.iconBg || "#eff6ff";

  const cardTitleColor: string = s.style?.cardTitleColor || "#111827";
  const cardDescColor: string = s.style?.cardDescColor || "#4b5563";

  // Typography
  const subTitleTyp = getTypographyStyles(s.style?.subTitleTypography || {});
  const titleTyp = getTypographyStyles(s.style?.titleTypography || {});
  const descTyp = getTypographyStyles(s.style?.descTypography || {});
  const cardTitleTyp = getTypographyStyles(s.style?.cardTitleTypography || {});
  const cardDescTyp = getTypographyStyles(s.style?.cardDescTypography || {});

  // Navigation Button styling
  const navBtnBg: string = s.style?.navBtnBg || "#ffffff";
  const navBtnBorderColor: string = s.style?.navBtnBorderColor || "#e5e7eb";
  const navBtnHoverBg: string = s.style?.navBtnHoverBg || "#f3f4f6";
  const navBtnColor: string = s.style?.navBtnColor || "#374151";

  // Spacing
  const margin = s.advanced?.margin || {};
  const padding = s.advanced?.padding || {};
  const marginStyle = getDimensionsStyles(margin, "margin");
  const paddingStyle = getDimensionsStyles(padding, "padding");

  // Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const onSelect = () => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const elementId = `slider-text-el-${element.id}`;

  return (
    <div
      className={`w-full overflow-hidden ${elementId}`}
      style={{
        ...marginStyle,
        ...paddingStyle,
      }}
    >
      <style>{`
        .${elementId} .embla__viewport {
          overflow: hidden;
          width: 100%;
        }
        .${elementId} .embla__container {
          display: flex;
          user-select: none;
          touch-action: pan-y;
        }
        .${elementId} .embla__slide {
          flex: 0 0 ${cardWidth}px;
          min-width: ${cardWidth}px;
          margin-right: ${gap}px;
        }
        .${elementId} .slide-card {
          background-color: ${cardBg};
          border-radius: ${cardBorderRadius}px;
          height: ${cardHeight}px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
        }
        .${elementId} .slide-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }
        .${elementId} .icon-circle {
          background-color: ${iconBg};
          color: ${iconColor};
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .${elementId} .nav-btn {
          background-color: ${navBtnBg};
          border: 1px solid ${navBtnBorderColor};
          color: ${navBtnColor};
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .${elementId} .nav-btn:hover {
          background-color: ${navBtnHoverBg};
        }
        .${elementId} .nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>

      {/* Header section with title and description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 w-full gap-6">
        <div className="flex-1 max-w-4xl text-left">
          {subTitle && (
            <span
              className="text-xs font-semibold tracking-wider uppercase block mb-2"
              style={{
                color: subTitleColor,
                ...subTitleTyp,
              }}
            >
              {subTitle}
            </span>
          )}
          {title && (
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              style={{
                color: titleColor,
                ...titleTyp,
              }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              className="text-[15px] leading-relaxed max-w-2xl"
              style={{
                color: descColor,
                ...descTyp,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <button
            type="button"
            className="nav-btn"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
          >
            <Icon icon="solar:arrow-left-outline" width="18" />
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next slide"
          >
            <Icon icon="solar:arrow-right-outline" width="18" />
          </button>
        </div>
      </div>

      {/* Embla Viewport for the list of cards */}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item) => (
            <div key={item.id} className="embla__slide">
              <div
                className="slide-card p-6 flex flex-col justify-between"
                style={{
                  alignItems: infoAlignment === "left" ? "flex-start" : infoAlignment === "right" ? "flex-end" : "center",
                  textAlign: infoAlignment,
                }}
              >
                {/* Icon circle */}
                <div className="icon-circle mb-4 shrink-0">
                  <Icon icon={item.icon || "mdi:check"} width="22" height="22" />
                </div>
                
                {/* Header title */}
                <div className="flex-1 w-full flex flex-col justify-start">
                  <h3
                    className="text-[17px] font-bold mb-2.5"
                    style={{
                      color: cardTitleColor,
                      ...cardTitleTyp,
                    }}
                  >
                    {item.title}
                  </h3>
                  
                  {/* Paragraph details */}
                  <p
                    className="text-[13.5px] leading-relaxed font-normal"
                    style={{
                      color: cardDescColor,
                      ...cardDescTyp,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sliderTextElement = {
  type: "slider-text-ep",
  category: "ephotovn",
  label: "Text Slider",
  icon: "/plugin/ephotovn/icon/ass.png",

  schema: {
    content: {
      subTitle: "Assurances",
      title: "Do you want to boost your business growth? The solution is here.",
      description: "We'll handle the detailed work so you can concentrate on strategic growth and the success of your business.",
      items: DEFAULT_ITEMS,
    },

    style: {
      infoAlignment: "left",
      cardWidth: 300,
      cardHeight: 240,
      gap: 24,

      subTitleColor: "#ff5c35",
      titleColor: "#111827",
      descColor: "#4b5563",
      cardBg: "#f9fafb",
      cardBorderRadius: 16,
      iconColor: "#3b82f6",
      iconBg: "#eff6ff",
      cardTitleColor: "#111827",
      cardDescColor: "#4b5563",

      navBtnBg: "#ffffff",
      navBtnBorderColor: "#e5e7eb",
      navBtnHoverBg: "#f3f4f6",
      navBtnColor: "#374151",

      subTitleTypography: {
        fontSize: 12,
        fontWeight: "600",
      },
      titleTypography: {
        fontSize: 32,
        fontWeight: "700",
      },
      descTypography: {
        fontSize: 15,
      },
      cardTitleTypography: {
        fontSize: 17,
        fontWeight: "700",
      },
      cardDescTypography: {
        fontSize: 13,
      },
    },

    advanced: {
      margin: { top: 40, right: 0, bottom: 40, left: 0, unit: "px" },
      padding: { top: 20, right: 20, bottom: 20, left: 20, unit: "px" },
    },
  },

  controls: [
    // ═══════════════════ CONTENT TAB ════════════════
    {
      tab: "Layout",
      section: "Header Copy",
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
            <Textarea label="Main Title heading" value={value || ""} onChange={onChange} rows={2} />
          ),
        },
        {
          name: "description",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Description paragraph" value={value || ""} onChange={onChange} rows={3} />
          ),
        },
      ],
    },

    {
      tab: "Layout",
      section: "Assurance Cards List",
      controls: [
        {
          name: "items",
          responsive: false,
          render: (value: any, onChange: any) => (
            <div className="space-y-4">
              {(value || []).map((item: any, idx: number) => (
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => onChange((value || []).filter((_: any, i: number) => i !== idx))}
                        className="text-[11px] text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        Remove Card
                      </button>
                    </div>

                    <IconPicker
                      label="Card Icon"
                      value={item.icon || "mdi:check"}
                      onChange={(v: string) => {
                        const u = [...value]; u[idx] = { ...u[idx], icon: v }; onChange(u);
                      }}
                    />

                    <Text
                      label="Card Title"
                      value={item.title || ""}
                      onChange={(v: string) => {
                        const u = [...value]; u[idx] = { ...u[idx], title: v }; onChange(u);
                      }}
                    />

                    <Textarea
                      label="Card Description"
                      value={item.description || ""}
                      onChange={(v: string) => {
                        const u = [...value]; u[idx] = { ...u[idx], description: v }; onChange(u);
                      }}
                      rows={3}
                    />
                  </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const newItem: SliderTextItem = {
                    id: `st_${Date.now()}`,
                    icon: "mdi:check",
                    title: "New Assurance",
                    description: "Describe the assurance details here.",
                  };
                  onChange([...(value || []), newItem]);
                }}
                className="w-full flex items-center justify-center gap-1 py-2.5 bg-gray-700 hover:bg-gray-800 text-white rounded text-[13px] font-semibold cursor-pointer transition-colors"
              >
                + Add Assurance Card
              </button>
            </div>
          ),
        },
      ],
    },

    // ═══════════════════ LAYOUT TAB ══════════════════
    {
      tab: "Layout",
      section: "Card Sizing & Layout",
      controls: [
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
          name: "cardWidth",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Card Width (px)" value={value ?? 300} onChange={onChange} min={200} max={600} />
          ),
        },
        {
          name: "cardHeight",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Card Height (px)" value={value ?? 240} onChange={onChange} min={150} max={500} />
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

    // ═══════════════════ STYLE TAB ══════════════════
    {
      tab: "Style",
      section: "Header Styling",
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
            <ColorPickerPopup label="Title Text Color" value={value ?? "#111827"} onChange={onChange} />
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
      section: "Assurance Cards Styling",
      controls: [
        {
          name: "cardBg",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="Card Background Color" value={value ?? "#f9fafb"} onChange={onChange} />
              <NumberControl
                label="Card Border Radius (px)"
                value={schema.style.cardBorderRadius ?? 16}
                onChange={(v) => updateSchema("style", "cardBorderRadius", v)}
                min={0}
                max={60}
              />
            </div>
          ),
        },
        {
          name: "iconColor",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="Icon Color" value={value ?? "#3b82f6"} onChange={onChange} />
              <ColorPickerPopup
                label="Icon Circle Background"
                value={schema.style.iconBg ?? "#eff6ff"}
                onChange={(v) => updateSchema("style", "iconBg", v)}
              />
            </div>
          ),
        },
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
          name: "cardDescColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Card Description Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
        {
          name: "cardDescTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Card Description Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },

    {
      tab: "Style",
      section: "Navigation Buttons Design",
      controls: [
        {
          name: "navBtnBg",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => (
            <div className="space-y-4">
              <ColorPickerPopup label="Button Background Color" value={value ?? "#ffffff"} onChange={onChange} />
              <ColorPickerPopup
                label="Button Border Color"
                value={schema.style.navBtnBorderColor ?? "#e5e7eb"}
                onChange={(v) => updateSchema("style", "navBtnBorderColor", v)}
              />
              <ColorPickerPopup
                label="Button Icon Color"
                value={schema.style.navBtnColor ?? "#374151"}
                onChange={(v) => updateSchema("style", "navBtnColor", v)}
              />
              <ColorPickerPopup
                label="Button Hover Background"
                value={schema.style.navBtnHoverBg ?? "#f3f4f6"}
                onChange={(v) => updateSchema("style", "navBtnHoverBg", v)}
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

  render: (element: any) => <SliderTextFrontend element={element} />,
};

export default sliderTextElement;
