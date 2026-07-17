"use client";

import React from "react";
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

function ProfessionalTeamFrontend({ element }: { element: any }) {
  const s = element.schema;

  // Content configurations
  const subTitle: string = s.content?.subTitle || "Master photo editors";
  const title: string = s.content?.title || "Professional photo editing team in Ephotovn.";
  
  const cards: any[] = s.content?.cards || [
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/solution/rectangle-141.jpg",
      badge: "Experienced retouchers",
      description: "With over 200 image editing professionals boasting at least 5 years of experience, we cater to all levels of editing you may require. Working with us eliminates concerns about time loss and inconsistencies in the quality of work, which can often occur when dealing with freelancers or service providers.",
    },
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/solution/rectangle-142.jpg",
      badge: "QC Team",
      description: "We have a QC team of experienced editors to minimize errors. The QC team carefully examines every order, paying close attention to even the tiniest details to reduce errors and guarantee that you get the finest results possible.",
    },
    {
      image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/solution/rectangle-143.jpg",
      badge: "Support team",
      description: "Despite the apparent complexity, all post-production work is operated within a unified system, and you will only work with a single support person from our team. This helps optimize post-production work and saves a significant amount of working time.",
    },
  ];

  // Colors & Styling
  const subTitleColor: string = s.style?.subTitleColor || "#1f2937";
  const titleColor: string = s.style?.titleColor || "#111827";
  const cardDescColor: string = s.style?.cardDescColor || "#4b5563";
  const badgeTextColor: string = s.style?.badgeTextColor || "#991b1b";
  const badgeBgColor: string = s.style?.badgeBgColor || "#fee2e2";

  // Typography
  const subTitleTyp = getTypographyStyles(s.style?.subTitleTypography || {});
  const titleTyp = getTypographyStyles(s.style?.titleTypography || {});
  const cardDescTyp = getTypographyStyles(s.style?.cardDescTypography || {});
  const badgeTyp = getTypographyStyles(s.style?.badgeTypography || {});

  // Split cards dynamically: if odd size, render last card as full width at the bottom.
  // If even size, render all in 2-column grid.
  const isOdd = cards.length % 2 !== 0;
  const gridCards = isOdd ? cards.slice(0, cards.length - 1) : cards;
  const bottomCard = isOdd ? cards[cards.length - 1] : null;

  return (
    <div className="w-full py-16 bg-transparent select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column - Heading Title */}
        <div className="lg:col-span-4 space-y-4">
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

        {/* Right Column - Image & Grid Cards Info */}
        <div className="lg:col-span-8 space-y-12">
          {gridCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gridCards.map((card, idx) => (
                <div key={idx} className="space-y-4">
                  {card.image && (
                    <div className="w-full h-64 rounded-2xl overflow-hidden shadow-md">
                      <img 
                        src={card.image} 
                        alt={card.badge} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {card.badge && (
                    <span 
                      className="inline-block px-3 py-1 text-xs font-bold rounded-md"
                      style={{ backgroundColor: badgeBgColor, color: badgeTextColor, ...badgeTyp }}
                    >
                      {card.badge}
                    </span>
                  )}
                  {card.description && (
                    <p 
                      className="text-sm leading-relaxed text-gray-600 font-light"
                      style={{ color: cardDescColor, ...cardDescTyp }}
                    >
                      {card.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Bottom full width card (for odd items) */}
          {bottomCard && (
            <div className="space-y-4">
              {bottomCard.image && (
                <div className="w-full h-80 rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={bottomCard.image} 
                    alt={bottomCard.badge} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {bottomCard.badge && (
                <span 
                  className="inline-block px-3 py-1 text-xs font-bold rounded-md"
                  style={{ backgroundColor: badgeBgColor, color: badgeTextColor, ...badgeTyp }}
                >
                  {bottomCard.badge}
                </span>
              )}
              {bottomCard.description && (
                <p 
                  className="text-sm leading-relaxed text-gray-600 font-light"
                  style={{ color: cardDescColor, ...cardDescTyp }}
                >
                  {bottomCard.description}
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const professionalTeamElement = {
  type: "professional-team",
  category: "ephotovn",
  label: "Professional Team Showcase",
  icon: "solar:users-group-two-rounded-bold-duotone",

  schema: {
    content: {
      subTitle: "Master photo editors",
      title: "Professional photo editing team in Ephotovn.",
      cards: [
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/solution/rectangle-141.jpg",
          badge: "Experienced retouchers",
          description: "With over 200 image editing professionals boasting at least 5 years of experience, we cater to all levels of editing you may require. Working with us eliminates concerns about time loss and inconsistencies in the quality of work, which can often occur when dealing with freelancers or service providers.",
        },
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/solution/rectangle-142.jpg",
          badge: "QC Team",
          description: "We have a QC team of experienced editors to minimize errors. The QC team carefully examines every order, paying close attention to even the tiniest details to reduce errors and guarantee that you get the finest results possible.",
        },
        {
          image: "https://ephotovn.com/wp-content/themes/ephotovn/assets/images/solution/rectangle-143.jpg",
          badge: "Support team",
          description: "Despite the apparent complexity, all post-production work is operated within a unified system, and you will only work with a single support person from our team. This helps optimize post-production work and saves a significant amount of working time.",
        },
      ],
    },
    style: {
      subTitleColor: "#6b7280",
      titleColor: "#111827",
      cardDescColor: "#4b5563",
      badgeTextColor: "#991b1b",
      badgeBgColor: "#fee2e2",
      titleTypography: {
        fontSize: 36,
        fontWeight: "800",
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
      section: "Team Showcase Items",
      controls: [
        {
          name: "cards",
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
                image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
                badge: "Team Badge / Title",
                description: "Description of this team's specialization or achievements.",
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
                  <label className="text-xs font-semibold text-gray-500">Showcase Cards</label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="py-1 px-2.5 bg-indigo-50 text-indigo-600 rounded-md text-xs font-bold hover:bg-indigo-100 transition"
                  >
                    + Add Card
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
                    <div className="text-xs font-bold text-gray-400">Card # {idx + 1} ({idx < 2 ? "Top Row" : "Bottom Row"})</div>
                    <ImageGallery
                      label="Card Image"
                      value={item.image || ""}
                      onChange={(v) => updateItem(idx, "image", v)}
                    />
                    <Text
                      label="Badge / Title"
                      value={item.badge || ""}
                      onChange={(v) => updateItem(idx, "badge", v)}
                    />
                    <Textarea
                      label="Description Content"
                      value={item.description || ""}
                      onChange={(v) => updateItem(idx, "description", v)}
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
          name: "cardDescColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Card Description Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
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
          name: "cardDescTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Card Description Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "badgeTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Badge Typography" value={value} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <ProfessionalTeamFrontend element={element} />,
};

export default professionalTeamElement;
