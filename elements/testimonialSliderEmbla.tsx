"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@iconify/react";
import {
  Text,
  Textarea,
  ImageGallery,
  Typography,
  ColorPickerPopup,
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

function TestimonialSliderFrontend({ element }: { element: any }) {
  const s = element.schema;

  // Content configurations
  const subTitle: string = s.content?.subTitle || "Customer trusted & loved";
  const title: string = s.content?.title || "Testimonials from customers";
  const testimonials: any[] = s.content?.testimonials || [
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/platform/5.jpg",
      quote: "“Had a great experience working with retouchers from Ephotovn. Ordering is fast and easy, the RS dashboard allows me to track the status of my order history. This makes my project management much easier.”",
      name: "Anita Black",
      location: "Sweden",
    },
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/platform/6.jpg",
      quote: "“I received a prompt response from the manager and asked the team to do photo editing of the jewelry image. Since I had a tight deadline, they helped me a lot. My edited photos came back pretty quickly and the results were as perfect as could be.”",
      name: "Marc Mreh",
      location: "Germany",
    },
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/platform/7.jpg",
      quote: "“I often work with these professionals whenever I need portrait retouching. This is exactly what I expected to get from a professional image editing service. I like their RS Platform system. Highly recommended.”",
      name: "Raffaella Fasano",
      location: "Italy",
    },
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/platform/8.jpg",
      quote: "“Ephotovn has been my trusted image editing assistant for over 1 year. The ordering process is very simple and fast, I can follow the whole process in detail. Highly recommended for both new and experienced photographers, as well as casual users.”",
      name: "Sara Gi",
      location: "Italy",
    },
  ];

  // Slider layout configurations
  const desktopSlides: number = s.content?.desktopSlides ?? 2;
  const tabletSlides: number = s.content?.tabletSlides ?? 1.5;
  const mobileSlides: number = s.content?.mobileSlides ?? 1;

  // Colors & Styling
  const sectionBgColor: string = s.style?.sectionBgColor || "#ffffff";
  const leftColBgColor: string = s.style?.leftColBgColor || "transparent";
  const rightColBgColor: string = s.style?.rightColBgColor || "transparent";
  const subTitleColor: string = s.style?.subTitleColor || "#1f2937";
  const titleColor: string = s.style?.titleColor || "#111827";
  const quoteColor: string = s.style?.quoteColor || "#4b5563";
  const nameColor: string = s.style?.nameColor || "#111827";
  const locationColor: string = s.style?.locationColor || "#6b7280";
  const buttonBgColor: string = s.style?.buttonBgColor || "#ffffff";
  const buttonBorderColor: string = s.style?.buttonBorderColor || "#e5e7eb";
  const buttonIconColor: string = s.style?.buttonIconColor || "#374151";

  // Typography
  const subTitleTyp = getTypographyStyles(s.style?.subTitleTypography || {});
  const titleTyp = getTypographyStyles(s.style?.titleTypography || {});
  const quoteTyp = getTypographyStyles(s.style?.quoteTypography || {});
  const nameTyp = getTypographyStyles(s.style?.nameTypography || {});
  const locationTyp = getTypographyStyles(s.style?.locationTypography || {});

  // Embla setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const elementId = `testimonial-slider-el-${element.id}`;

  return (
    <div className={`w-full ${elementId}`}>
      <style>{`
        .${elementId} .embla-slide-item {
          flex: 0 0 ${100 / mobileSlides}%;
          min-width: 0;
        }
        @media (min-width: 768px) {
          .${elementId} .embla-slide-item {
            flex: 0 0 ${100 / tabletSlides}%;
          }
        }
        @media (min-width: 1024px) {
          .${elementId} .embla-slide-item {
            flex: 0 0 ${100 / desktopSlides}%;
          }
        }
      `}</style>
      <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-8 gap-2 items-stretch">
        
        {/* Left Column (Static Info Header) */}
        <div 
          className="lg:col-span-4 flex flex-col justify-between md:p-6 rounded-2xl"
          style={{ backgroundColor: leftColBgColor }}
        >
          <div className="space-y-4">
            {subTitle && (
              <p 
                className="text-sm font-semibold tracking-wider uppercase text-gray-500" 
                style={{ color: subTitleColor, ...subTitleTyp }}
              >
                {subTitle}
              </p>
            )}
            {title && (
              <h2 
                className="text-4xl font-extrabold tracking-tight text-gray-900 leading-tight" 
                style={{ color: titleColor, ...titleTyp }}
              >
                {title}
              </h2>
            )}
          </div>

          {/* Desktop Arrow Navigation */}
          <div className="hidden lg:flex items-center gap-3 mt-8">
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all disabled:opacity-40"
              style={{
                backgroundColor: buttonBgColor,
                borderColor: buttonBorderColor,
                color: buttonIconColor,
              }}
            >
              <Icon icon="solar:alt-arrow-left-linear" width="22" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all disabled:opacity-40"
              style={{
                backgroundColor: buttonBgColor,
                borderColor: buttonBorderColor,
                color: buttonIconColor,
              }}
            >
              <Icon icon="solar:alt-arrow-right-linear" width="22" />
            </button>
          </div>
        </div>

        {/* Right Column (Embla Carousel Showcase) */}
        <div 
          className="lg:col-span-8 md:p-6 rounded-2xl overflow-hidden"
          style={{ backgroundColor: rightColBgColor }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((item, idx) => (
                <div 
                  key={idx} 
                  className="embla-slide-item flex flex-col justify-between bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="space-y-6">
                    {item.image && (
                      <div className="w-full h-64 rounded-xl overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {item.quote && (
                      <p 
                        className="text-base italic leading-relaxed text-gray-600"
                        style={{ color: quoteColor, ...quoteTyp }}
                      >
                        {item.quote}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-50">
                    <h4 
                      className="text-base font-bold text-gray-900"
                      style={{ color: nameColor, ...nameTyp }}
                    >
                      {item.name}
                    </h4>
                    {item.location && (
                      <span 
                        className="text-sm text-gray-500 font-medium"
                        style={{ color: locationColor, ...locationTyp }}
                      >
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Arrow Navigation */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-40"
              style={{
                backgroundColor: buttonBgColor,
                borderColor: buttonBorderColor,
                color: buttonIconColor,
              }}
            >
              <Icon icon="solar:alt-arrow-left-linear" width="18" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-40"
              style={{
                backgroundColor: buttonBgColor,
                borderColor: buttonBorderColor,
                color: buttonIconColor,
              }}
            >
              <Icon icon="solar:alt-arrow-right-linear" width="18" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

const testimonialSliderElement = {
  type: "testimonial-slider-embla",
  category: "ephotovn",
  label: "Testimonial Slider (Embla)",
  icon: "solar:chat-square-like-bold-duotone",

  schema: {
    content: {
      subTitle: "Customer trusted & loved",
      title: "Testimonials from customers",
      desktopSlides: 2,
      tabletSlides: 1.5,
      mobileSlides: 1,
      testimonials: [
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/platform/5.jpg",
          quote: "“Had a great experience working with retouchers from Ephotovn. Ordering is fast and easy, the RS dashboard allows me to track the status of my order history. This makes my project management much easier.”",
          name: "Anita Black",
          location: "Sweden",
        },
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/platform/6.jpg",
          quote: "“I received a prompt response from the manager and asked the team to do photo editing of the jewelry image. Since I had a tight deadline, they helped me a lot. My edited photos came back pretty quickly and the results were as perfect as could be.”",
          name: "Marc Mreh",
          location: "Germany",
        },
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/platform/7.jpg",
          quote: "“I often work with these professionals whenever I need portrait retouching. This is exactly what I expected to get from a professional image editing service. I like their RS Platform system. Highly recommended.”",
          name: "Raffaella Fasano",
          location: "Italy",
        },
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/platform/8.jpg",
          quote: "“Ephotovn has been my trusted image editing assistant for over 1 year. The ordering process is very simple and fast, I can follow the whole process in detail. Highly recommended for both new and experienced photographers, as well as casual users.”",
          name: "Sara Gi",
          location: "Italy",
        },
      ],
    },
    style: {
      sectionBgColor: "#ffffff",
      leftColBgColor: "transparent",
      rightColBgColor: "transparent",
      subTitleColor: "#6b7280",
      titleColor: "#111827",
      quoteColor: "#4b5563",
      nameColor: "#111827",
      locationColor: "#9ca3af",
      buttonBgColor: "#ffffff",
      buttonBorderColor: "#e5e7eb",
      buttonIconColor: "#374151",
      titleTypography: {
        fontSize: 36,
        fontWeight: "800",
      },
      quoteTypography: {
        fontSize: 16,
        fontStyle: "italic",
      },
    },
  },

  controls: [
    {
      tab: "Content",
      section: "Header Content",
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
            <Textarea label="Title" value={value || ""} onChange={onChange} rows={2} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Slider Settings",
      controls: [
        {
          name: "desktopSlides",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => {
            const currentVal = value ?? 2;
            return (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500">Desktop Visible Slides</label>
                <div className="flex gap-2">
                  {[1, 1.5, 2, 2.5, 3].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => onChange(val)}
                      className={`flex-1 py-1.5 px-2 text-xs font-semibold border rounded-lg transition ${
                        currentVal === val
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            );
          },
        },
        {
          name: "tabletSlides",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => {
            const currentVal = value ?? 1.5;
            return (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500">Tablet Visible Slides</label>
                <div className="flex gap-2">
                  {[1, 1.5, 2].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => onChange(val)}
                      className={`flex-1 py-1.5 px-2 text-xs font-semibold border rounded-lg transition ${
                        currentVal === val
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            );
          },
        },
        {
          name: "mobileSlides",
          responsive: false,
          render: (value: any, onChange: any, { schema, updateSchema }: any) => {
            const currentVal = value ?? 1;
            return (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500">Mobile Visible Slides</label>
                <div className="flex gap-2">
                  {[1, 1.2, 1.5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => onChange(val)}
                      className={`flex-1 py-1.5 px-2 text-xs font-semibold border rounded-lg transition ${
                        currentVal === val
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            );
          },
        },
      ],
    },
    {
      tab: "Content",
      section: "Testimonials List",
      controls: [
        {
          name: "testimonials",
          responsive: false,
          render: (value: any, onChange: any) => {
            const list = Array.isArray(value) ? value : [];
            
            const updateItem = (index: number, key: string, val: any) => {
              const newList = [...list];
              newList[index] = { ...newList[index], [key]: val };
              onChange(newList);
            };

            const addItem = () => {
              const newItem = {
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
                quote: "“Your new testimonial quote text goes here.”",
                name: "Client Name",
                location: "Country",
              };
              onChange([...list, newItem]);
            };

            const removeItem = (index: number) => {
              const newList = list.filter((_, i) => i !== index);
              onChange(newList);
            };

            return (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-500">Testimonials</label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="py-1 px-2.5 bg-indigo-50 text-indigo-600 rounded-md text-xs font-bold hover:bg-indigo-100 transition"
                  >
                    + Add Testimonial
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
                    <div className="text-xs font-bold text-gray-400"># {idx + 1} Testimonial</div>
                    <ImageGallery
                      label="Testimonial Image"
                      value={item.image || ""}
                      onChange={(v) => updateItem(idx, "image", v)}
                    />
                    <Text
                      label="Name"
                      value={item.name || ""}
                      onChange={(v) => updateItem(idx, "name", v)}
                    />
                    <Text
                      label="Location / Country"
                      value={item.location || ""}
                      onChange={(v) => updateItem(idx, "location", v)}
                    />
                    <Textarea
                      label="Quote Copy"
                      value={item.quote || ""}
                      onChange={(v) => updateItem(idx, "quote", v)}
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
          name: "leftColBgColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Left Column Background Color" value={value ?? "transparent"} onChange={onChange} />
          ),
        },
        {
          name: "rightColBgColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Right Column Background Color" value={value ?? "transparent"} onChange={onChange} />
          ),
        },
        {
          name: "subTitleColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Subtitle Text Color" value={value ?? "#6b7280"} onChange={onChange} />
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
          name: "quoteColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Quote Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
        {
          name: "nameColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Name Text Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "locationColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Location Text Color" value={value ?? "#9ca3af"} onChange={onChange} />
          ),
        },
        {
          name: "buttonBgColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Navigation Button Background" value={value ?? "#ffffff"} onChange={onChange} />
          ),
        },
        {
          name: "buttonBorderColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Navigation Button Border" value={value ?? "#e5e7eb"} onChange={onChange} />
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
          name: "quoteTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Quote Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <TestimonialSliderFrontend element={element} />,
};

export default testimonialSliderElement;
