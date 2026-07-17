/**
 * plugin/ephotovn/index.ts — Ephotovn plugin registry.
 */

import { addBuilderElement, type PluginMeta } from "@/hook";
import heroElement from "./elements/HeRo";
import sliderElement from "./elements/Slider";
import sliderTextElement from "./elements/SliderText";
import sliderBeforeAfterElement from "./elements/SliderBeforeAfter";
import photographerElement from "./elements/Photographer";
import personalizedElement from "./elements/Personalized";
import featureCardsElement from "./elements/FeatureCards";
import accordionShowcaseElement from "./elements/AccordionShowcase";
import stepsSectionElement from "./elements/StepsSection";
import faqSectionElement from "./elements/FAQSection";
import serviceSliderElement from "./elements/ServiceSlider";
import beforeAfterTabssElement from "./elements/BeforeAfterTabs";
import exploreResourcesElement from "./elements/ExploreResources";
import testimonialSliderElement from "./elements/TestimonialSlider";
import featuresGridElement from "./elements/FeaturesGrid";
import beforeAfterSlidersElement from "./elements/BeforeAfterSliders";
import eBoxElement from "./elements/eBox";
import eBoxsElement from "./elements/eBoxs";
import beforeAfterBoxElement from "./elements/BeforeAfterBox";
import introductionElement from "./elements/introduction";
import testimonialSliderEmblaElement from "./elements/testimonialSliderEmbla";
import professionalTeamElement from "./elements/professionalTeam";
import partnerBannerElement from "./elements/partnerBanner";
import simplifyWorkflowElement from "./elements/simplifyWorkflow";
import beforeAfterTabElement from "./elements/BeforeAfterTab";

export const PLUGINS: PluginMeta = {
    nx:          "com.system.ephotovn",
    name:        "ephotovn",
    version:     "1.0.0",
    description: "Ephotovn elements with dynamic configuration options.",
    author:      "Ephotovn Team",
    path:        "https://github.com/HOTLancerX/ephotovn.git",
    icon:        "solar:home-bold-duotone",
    color:       "from-blue-500 to-indigo-600",
};

export function register() {
    addBuilderElement(heroElement, PLUGINS.nx);
    addBuilderElement(sliderElement, PLUGINS.nx);
    addBuilderElement(sliderTextElement, PLUGINS.nx);
    addBuilderElement(sliderBeforeAfterElement, PLUGINS.nx);
    addBuilderElement(photographerElement, PLUGINS.nx);
    addBuilderElement(personalizedElement, PLUGINS.nx);
    addBuilderElement(featureCardsElement, PLUGINS.nx);
    addBuilderElement(accordionShowcaseElement, PLUGINS.nx);
    addBuilderElement(stepsSectionElement, PLUGINS.nx);
    addBuilderElement(faqSectionElement, PLUGINS.nx);
    addBuilderElement(serviceSliderElement, PLUGINS.nx);
    addBuilderElement(beforeAfterTabssElement, PLUGINS.nx);
    addBuilderElement(exploreResourcesElement, PLUGINS.nx);
    addBuilderElement(testimonialSliderElement, PLUGINS.nx);
    addBuilderElement(featuresGridElement, PLUGINS.nx);
    addBuilderElement(beforeAfterSlidersElement, PLUGINS.nx);
    addBuilderElement(eBoxElement, PLUGINS.nx);
    addBuilderElement(eBoxsElement, PLUGINS.nx);
    addBuilderElement(beforeAfterBoxElement, PLUGINS.nx);
    addBuilderElement(introductionElement, PLUGINS.nx);
    addBuilderElement(testimonialSliderEmblaElement, PLUGINS.nx);
    addBuilderElement(professionalTeamElement, PLUGINS.nx);
    addBuilderElement(partnerBannerElement, PLUGINS.nx);
    addBuilderElement(simplifyWorkflowElement, PLUGINS.nx);
    addBuilderElement(beforeAfterTabElement, PLUGINS.nx);
}



