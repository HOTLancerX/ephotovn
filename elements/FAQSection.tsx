"use client";

/**
 * FAQSection.tsx — Ephotovn FAQ section element.
 *
 * Layout:
 *   Left column: Subtitle, heading, description paragraph.
 *   Right column: Accordion list of FAQs (dashed divider borders).
 *
 * Fully dynamic — item count, colors, typography, spacing, border styles.
 * No custom background — uses the builder's built-in Background control.
 */

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Text,
  Textarea,
  Select,
  NumberControl,
  ColorPickerPopup,
  Typography,
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

interface FAQItem {
  question: string;
  answer: string;
}

// ── Frontend render ───────────────────────────────────────────────────────────

function FAQSectionFrontend({ element }: { element: any }) {
  const s = element.schema;

  // ── Content ──
  const subtitle: string = s.content?.subtitle || "FAQs";
  const showSubtitle: boolean = s.content?.showSubtitle ?? true;
  const heading: string = s.content?.heading || "Everything you\nneed to know\nabout Ephotovn's\nservices";
  const description: string = s.content?.description || "You might not know what to do at first. To help you get started, here are some common questions asked by our clients to help address any concerns or uncertainties you may have.";
  const showDescription: boolean = s.content?.showDescription ?? true;
  
  const faqs: FAQItem[] = s.content?.faqs ?? [
    {
      question: "Will you retouch my photos, portrait, newborn, high-end, jewelry, or estate photos?",
      answer: "Yes. Our team is capable of retouching a wide variety of photos. Just upload your photos via Google Drive, WeTransfer, or Dropbox and share the link with us. You can also place an order here.",
    },
    {
      question: "I don't like the editing. Can I have it fixed?",
      answer: "Absolutely. We offer free revisions to ensure you get exactly the result you want. Just point out the details that need adjustments.",
    },
    {
      question: "Do you offer discounts for large orders?",
      answer: "Yes, we have volume-based discounts for large-scale batches. Please contact our support team to get a custom quote.",
    },
    {
      question: "How does the free trial work?",
      answer: "You can submit up to two test images. We will retouch them for free and send them back to show you our quality before you commit.",
    },
    {
      question: "Do I pay monthly and per-image?",
      answer: "We support pay-per-project or per-image options so you only pay for what you actually use.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // ── Layout ──
  const gap: number = s.style?.gap ?? 48;
  const contentGap: number = s.style?.contentGap ?? 24;

  // ── Subtitle styles ──
  const subtitleColor: string = s.style?.subtitleColor || "#374151";
  const subtitleTyp = getTypographyStyles(s.style?.subtitleTypography || {});

  // ── Heading styles ──
  const headingColor: string = s.style?.headingColor || "#111827";
  const headingTyp = getTypographyStyles(s.style?.headingTypography || {});

  // ── Description styles ──
  const descColor: string = s.style?.descColor || "#4b5563";
  const descTyp = getTypographyStyles(s.style?.descTypography || {});

  // ── FAQ list styles ──
  const questionColor: string = s.style?.questionColor || "#111827";
  const questionTyp = getTypographyStyles(s.style?.questionTypography || {});
  const answerColor: string = s.style?.answerColor || "#4b5563";
  const answerTyp = getTypographyStyles(s.style?.answerTypography || {});
  const dividerColor: string = s.style?.dividerColor || "#e5e7eb";
  const iconColor: string = s.style?.iconColor || "#9ca3af";

  const renderLineByLine = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx} className="block w-full">{line}</span>
    ));

  // Build left content column
  const contentColumn = (
    <div className="flex flex-col justify-start" style={{ gap: `${contentGap}px` }}>
      {showSubtitle && subtitle && (
        <div
          style={{
            color: subtitleColor,
            fontWeight: "600",
            letterSpacing: "0.02em",
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

      {showDescription && description && (
        <p
          style={{
            margin: 0,
            color: descColor,
            ...descTyp,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );

  // Build right FAQ accordion column
  const faqColumn = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {faqs.map((item, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={idx}
            style={{
              borderBottom: `1px dashed ${dividerColor}`,
              padding: "20px 0",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(isActive ? -1 : idx)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
              }}
            >
              <span
                style={{
                  color: questionColor,
                  fontWeight: "700",
                  lineHeight: "1.35",
                  ...questionTyp,
                }}
              >
                {item.question}
              </span>
              <Icon
                icon={isActive ? "mdi:minus" : "mdi:plus"}
                width={20}
                height={20}
                style={{ color: iconColor, flexShrink: 0 }}
              />
            </button>

            <div
              style={{
                maxHeight: isActive ? "500px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease, opacity 0.25s ease",
                opacity: isActive ? 1 : 0,
              }}
            >
              <div
                style={{
                  paddingTop: "14px",
                  color: answerColor,
                  ...answerTyp,
                }}
              >
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full">
      <div
        className="grid grid-cols-1 md:grid-cols-2 items-start"
        style={{ gap: `${gap}px` }}
      >
        {contentColumn}
        {faqColumn}
      </div>
    </div>
  );
}

// ── FAQ repeater control ──────────────────────────────────────────────────────

function FAQControl({
  value,
  onChange,
}: {
  value: FAQItem[];
  onChange: (items: FAQItem[]) => void;
}) {
  const items: FAQItem[] = Array.isArray(value) ? value : [];

  const update = (index: number, field: keyof FAQItem, val: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const add = () =>
    onChange([...items, { question: "New Question?", answer: "Answer goes here." }]);

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
              FAQ {idx + 1}
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
            <Text label="Question" value={item.question || ""} onChange={(v) => update(idx, "question", v)} />
            <Textarea label="Answer" value={item.answer || ""} onChange={(v) => update(idx, "answer", v)} rows={3} />
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
        <Icon icon="mdi:plus" width={16} /> Add FAQ Item
      </button>
    </div>
  );
}

// ── Builder element definition ────────────────────────────────────────────────

const faqSectionElement = {
  type: "faq-section",
  category: "ephotovn",
  label: "FAQ Accordion",
  icon: "solar:question-square-bold-duotone",

  schema: {
    content: {
      subtitle: "FAQs",
      showSubtitle: true,
      heading: "Everything you\nneed to know\nabout Ephotovn's\nservices",
      description: "You might not know what to do at first. To help you get started, here are some common questions asked by our clients to help address any concerns or uncertainties you may have.",
      showDescription: true,
      faqs: [
        {
          question: "Will you retouch my photos, portrait, newborn, high-end, jewelry, or estate photos?",
          answer: "Yes. Our team is capable of retouching a wide variety of photos. Just upload your photos via Google Drive, WeTransfer, or Dropbox and share the link with us. You can also place an order here.",
        },
        {
          question: "I don't like the editing. Can I have it fixed?",
          answer: "Absolutely. We offer free revisions to ensure you get exactly the result you want. Just point out the details that need adjustments.",
        },
        {
          question: "Do you offer discounts for large orders?",
          answer: "Yes, we have volume-based discounts for large-scale batches. Please contact our support team to get a custom quote.",
        },
        {
          question: "How does the free trial work?",
          answer: "You can submit up to two test images. We will retouch them for free and send them back to show you our quality before you commit.",
        },
        {
          question: "Do I pay monthly and per-image?",
          answer: "We support pay-per-project or per-image options so you only pay for what you actually use.",
        },
      ],
    },

    style: {
      gap: 48,
      contentGap: 24,

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
        lineHeight: 44,
        lineHeightUnit: "px",
      },

      // Description
      descColor: "#4b5563",
      descTypography: {
        fontSize: 15,
        lineHeight: 24,
        lineHeightUnit: "px",
      },

      // Question
      questionColor: "#111827",
      questionTypography: {
        fontSize: 16,
        fontWeight: "700",
      },

      // Answer
      answerColor: "#4b5563",
      answerTypography: {
        fontSize: 14,
        lineHeight: 22,
        lineHeightUnit: "px",
      },

      dividerColor: "#e5e7eb",
      iconColor: "#9ca3af",
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
            <Textarea label="Main Heading (line break = new line)" value={value || ""} onChange={onChange} rows={4} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "Description",
      controls: [
        {
          name: "showDescription",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Toggle label="Show Description" value={value ?? true} onChange={onChange} />
          ),
        },
        {
          name: "description",
          responsive: false,
          render: (value: any, onChange: any) => (
            <Textarea label="Description Text" value={value || ""} onChange={onChange} rows={4} />
          ),
        },
      ],
    },
    {
      tab: "Content",
      section: "FAQs",
      controls: [
        {
          name: "faqs",
          responsive: false,
          render: (value: any, onChange: any) => (
            <FAQControl value={value ?? []} onChange={onChange} />
          ),
        },
      ],
    },

    // ═══════════════════ STYLE TAB ══════════════════
    {
      tab: "Style",
      section: "Layout",
      controls: [
        {
          name: "gap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Column Gap (px)" value={value ?? 48} onChange={onChange} min={0} max={120} />
          ),
        },
        {
          name: "contentGap",
          responsive: true,
          render: (value: any, onChange: any) => (
            <NumberControl label="Content Vertical Gap (px)" value={value ?? 24} onChange={onChange} min={0} max={80} />
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
      section: "Description Styling",
      controls: [
        {
          name: "descColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Description Color" value={value ?? "#4b5563"} onChange={onChange} />
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
      section: "FAQ Accordion Styling",
      controls: [
        {
          name: "questionColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Question Color" value={value ?? "#111827"} onChange={onChange} />
          ),
        },
        {
          name: "questionTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Question Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "answerColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Answer Color" value={value ?? "#4b5563"} onChange={onChange} />
          ),
        },
        {
          name: "answerTypography",
          responsive: true,
          render: (value: any, onChange: any) => (
            <Typography label="Answer Typography" value={value} onChange={onChange} />
          ),
        },
        {
          name: "dividerColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Dashed Divider Color" value={value ?? "#e5e7eb"} onChange={onChange} />
          ),
        },
        {
          name: "iconColor",
          responsive: false,
          render: (value: any, onChange: any) => (
            <ColorPickerPopup label="Plus/Minus Icon Color" value={value ?? "#9ca3af"} onChange={onChange} />
          ),
        },
      ],
    },
  ],

  render: (element: any) => <FAQSectionFrontend element={element} />,
};

export default faqSectionElement;
