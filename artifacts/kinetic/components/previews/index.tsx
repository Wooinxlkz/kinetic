import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Every preview is a client component dragging the library + motion with it.
// Lazy chunks keep a page's JS limited to the previews it actually renders.
export const previews: Record<string, ComponentType> = {
  "blocks/dynamic-island": dynamic(() =>
    import("./blocks/dynamic-island.preview").then((m) => m.DynamicIslandPreview),
  ),
  "blocks/swap": dynamic(() =>
    import("./blocks/swap.preview").then((m) => m.SwapPreview),
  ),
  "blocks/command-palette": dynamic(() =>
    import("./blocks/command-palette.preview").then((m) => m.CommandPalettePreview),
  ),
  "blocks/feedback-widget": dynamic(() =>
    import("./blocks/feedback-widget.preview").then((m) => m.FeedbackWidgetPreview),
  ),
  "blocks/bloom-menu": dynamic(() =>
    import("./blocks/bloom-menu.preview").then((m) => m.BloomMenuPreview),
  ),
  "blocks/expandable-action-bar": dynamic(() =>
    import("./blocks/expandable-action-bar.preview").then((m) => m.ExpandableActionBarPreview),
  ),
  "blocks/overflow-actions": dynamic(() =>
    import("./blocks/overflow-actions.preview").then((m) => m.OverflowActionsPreview),
  ),
  "blocks/expandable-tabs": dynamic(() =>
    import("./blocks/expandable-tabs.preview").then((m) => m.ExpandableTabsPreview),
  ),
  "blocks/swipeable-list": dynamic(() =>
    import("./blocks/swipeable-list.preview").then((m) => m.SwipeableListPreview),
  ),
  "blocks/file-upload": dynamic(() =>
    import("./blocks/file-upload.preview").then((m) => m.FileUploadPreview),
  ),
  "blocks/prediction-market": dynamic(() =>
    import("./blocks/prediction-market.preview").then(
      (m) => m.PredictionMarketPreview,
    ),
  ),
  "blocks/wallet-card": dynamic(() =>
    import("./blocks/wallet-card.preview").then((m) => m.WalletCardPreview),
  ),
  "motion/table": dynamic(() =>
    import("./motion/table.preview").then((m) => m.TablePreview),
  ),
  "motion/table-editable": dynamic(() =>
    import("./motion/table-editable.preview").then(
      (m) => m.TableEditablePreview,
    ),
  ),
  "motion/table-async": dynamic(() =>
    import("./motion/table-async.preview").then((m) => m.TableAsyncPreview),
  ),
  "motion/bouncy-accordion": dynamic(() =>
    import("./motion/bouncy-accordion.preview").then(
      (m) => m.BouncyAccordionPreview,
    ),
  ),
  "motion/stat-card": dynamic(() =>
    import("./motion/stat-card.preview").then((m) => m.StatCardPreview),
  ),
  "motion/testimonial-card": dynamic(() =>
    import("./motion/testimonial-card.preview").then((m) => m.TestimonialCardPreview),
  ),
  "blocks/pricing-card": dynamic(() =>
    import("./blocks/pricing-card.preview").then((m) => m.PricingCardPreview),
  ),
  "blocks/feature-grid": dynamic(() =>
    import("./blocks/feature-grid.preview").then((m) => m.FeatureGridPreview),
  ),
  "motion/tilt-card": dynamic(() =>
    import("./motion/tilt-card.preview").then((m) => m.TiltCardPreview),
  ),
  "motion/marquee": dynamic(() =>
    import("./motion/marquee.preview").then((m) => m.MarqueePreview),
  ),
  "motion/text-animation": dynamic(() =>
    import("./motion/text-animation.preview").then((m) => m.TextAnimationPreview),
  ),
  "motion/text-shimmer": dynamic(() =>
    import("./motion/text-shimmer.preview").then((m) => m.TextShimmerPreview),
  ),
  "motion/number": dynamic(() =>
    import("./motion/number.preview").then((m) => m.NumberPreview),
  ),
  "motion/animated-number": dynamic(() =>
    import("./motion/animated-number.preview").then((m) => m.AnimatedNumberPreview),
  ),
  "motion/number-ticker": dynamic(() =>
    import("./motion/number-ticker.preview").then((m) => m.NumberTickerPreview),
  ),
  "motion/animated-badge": dynamic(() =>
    import("./motion/animated-badge.preview").then((m) => m.AnimatedBadgePreview),
  ),
  "motion/animated-toast-stack": dynamic(() =>
    import("./motion/animated-toast-stack.preview").then((m) => m.AnimatedToastStackPreview),
  ),
  "motion/action-swap": dynamic(() =>
    import("./motion/action-swap.preview").then((m) => m.ActionSwapPreview),
  ),
  "motion/action-swap-blur": dynamic(() =>
    import("./motion/action-swap-blur.preview").then((m) => m.ActionSwapBlurPreview),
  ),
  "motion/action-swap-roll": dynamic(() =>
    import("./motion/action-swap-roll.preview").then((m) => m.ActionSwapRollPreview),
  ),
  "motion/action-swap-cascade": dynamic(() =>
    import("./motion/action-swap-cascade.preview").then((m) => m.ActionSwapCascadePreview),
  ),
  "motion/bottom-sheet": dynamic(() =>
    import("./motion/bottom-sheet.preview").then((m) => m.BottomSheetPreview),
  ),
  "motion/tabs": dynamic(() =>
    import("./motion/tabs.preview").then((m) => m.TabsPreview),
  ),
  "motion/switch": dynamic(() =>
    import("./motion/switch.preview").then((m) => m.SwitchPreview),
  ),
  "motion/input": dynamic(() =>
    import("./motion/input.preview").then((m) => m.InputPreview),
  ),
  "motion/select": dynamic(() =>
    import("./motion/select.preview").then((m) => m.SelectPreview),
  ),
  "motion/select-morph": dynamic(() =>
    import("./motion/select-morph.preview").then((m) => m.SelectMorphPreview),
  ),
  "motion/checkbox": dynamic(() =>
    import("./motion/checkbox.preview").then((m) => m.CheckboxPreview),
  ),
  "motion/radio": dynamic(() =>
    import("./motion/radio.preview").then((m) => m.RadioPreview),
  ),
  "blocks/otp-input": dynamic(() =>
    import("./blocks/otp-input.preview").then((m) => m.OTPInputPreview),
  ),
  "blocks/not-found-glitch": dynamic(() =>
    import("./blocks/not-found-glitch.preview").then((m) => m.NotFoundGlitchPreview),
  ),
  "blocks/not-found-magnetic": dynamic(() =>
    import("./blocks/not-found-magnetic.preview").then((m) => m.NotFoundMagneticPreview),
  ),
  "blocks/not-found-spotlight": dynamic(() =>
    import("./blocks/not-found-spotlight.preview").then((m) => m.NotFoundSpotlightPreview),
  ),
  "blocks/not-found-stacked": dynamic(() =>
    import("./blocks/not-found-stacked.preview").then((m) => m.NotFoundStackedPreview),
  ),
  "blocks/not-found-terminal": dynamic(() =>
    import("./blocks/not-found-terminal.preview").then((m) => m.NotFoundTerminalPreview),
  ),
  "motion/drawer": dynamic(() =>
    import("./motion/drawer.preview").then((m) => m.DrawerPreview),
  ),
  "motion/shared-layout-bg": dynamic(() =>
    import("./motion/shared-layout-bg.preview").then((m) => m.SharedLayoutBgPreview),
  ),
  "motion/dock": dynamic(() =>
    import("./motion/dock.preview").then((m) => m.DockPreview),
  ),
  "motion/tooltip": dynamic(() =>
    import("./motion/tooltip.preview").then((m) => m.TooltipPreview),
  ),
  "motion/morphing-modal": dynamic(() =>
    import("./motion/morphing-modal.preview").then((m) => m.MorphingModalPreview),
  ),
  "motion/text-reveal": dynamic(() =>
    import("./motion/text-reveal.preview").then((m) => m.TextRevealPreview),
  ),
  "motion/text-cascade": dynamic(() =>
    import("./motion/text-cascade.preview").then((m) => m.TextCascadePreview),
  ),
  "motion/button": dynamic(() =>
    import("./motion/button-base.preview").then((m) => m.ButtonBasePreview),
  ),
  "motion/button-base": dynamic(() =>
    import("./motion/button-base.preview").then((m) => m.ButtonBasePreview),
  ),
  "motion/button-stateful": dynamic(() =>
    import("./motion/button-stateful.preview").then((m) => m.ButtonStatefulPreview),
  ),
  "motion/button-magnetic": dynamic(() =>
    import("./motion/button-magnetic.preview").then((m) => m.ButtonMagneticPreview),
  ),
  "motion/theme-toggle": dynamic(() =>
    import("./motion/theme-toggle.preview").then((m) => m.ThemeTogglePreview),
  ),
  "motion/smooth-scroll": dynamic(() =>
    import("./motion/smooth-scroll.preview").then((m) => m.SmoothScrollPreview),
  ),
  "motion/scroll-progress": dynamic(() =>
    import("./motion/scroll-progress.preview").then((m) => m.ScrollProgressPreview),
  ),
  "motion/parallax": dynamic(() =>
    import("./motion/parallax.preview").then((m) => m.ParallaxPreview),
  ),
  "motion/scroll-to": dynamic(() =>
    import("./motion/scroll-to.preview").then((m) => m.ScrollToPreview),
  ),
  "motion/scroll-reveal": dynamic(() =>
    import("./motion/scroll-reveal.preview").then((m) => m.ScrollRevealPreview),
  ),
  "motion/range-slider": dynamic(() =>
    import("./motion/range-slider.preview").then((m) => m.RangeSliderPreview),
  ),
  "motion/shader-background": dynamic(() =>
    import("./motion/shader-background.preview").then(
      (m) => m.ShaderBackgroundPreview,
    ),
  ),
  "motion/cylinder-carousel": dynamic(() =>
    import("./motion/cylinder-carousel.preview").then(
      (m) => m.CylinderCarouselPreview,
    ),
  ),
  "motion/loader": dynamic(() =>
    import("./motion/loader.preview").then((m) => m.LoaderPreview),
  ),
  "ai/agent-input": dynamic(() =>
    import("./ai/agent-input.preview").then((m) => m.AgentInputPreview),
  ),
  "ai/chat-bubble": dynamic(() =>
    import("./ai/chat-bubble.preview").then((m) => m.ChatBubblePreview),
  ),
  "ai/streaming-text": dynamic(() =>
    import("./ai/streaming-text.preview").then((m) => m.StreamingTextPreview),
  ),
  "ai/tool-card": dynamic(() =>
    import("./ai/tool-card.preview").then((m) => m.ToolCardPreview),
  ),
  "motion/dialog": dynamic(() =>
    import("./motion/dialog.preview").then((m) => m.DialogPreview),
  ),
  "motion/dropdown-menu": dynamic(() =>
    import("./motion/dropdown-menu.preview").then((m) => m.DropdownMenuPreview),
  ),
  "motion/popover": dynamic(() =>
    import("./motion/popover.preview").then((m) => m.PopoverPreview),
  ),
  "motion/progress": dynamic(() =>
    import("./motion/progress.preview").then((m) => m.ProgressPreview),
  ),
  "motion/textarea": dynamic(() =>
    import("./motion/textarea.preview").then((m) => m.TextareaPreview),
  ),
  "motion/skeleton": dynamic(() =>
    import("./motion/skeleton.preview").then((m) => m.SkeletonPreview),
  ),
  "motion/avatar": dynamic(() =>
    import("./motion/avatar.preview").then((m) => m.AvatarPreview),
  ),
  "motion/combobox": dynamic(() =>
    import("./motion/combobox.preview").then((m) => m.ComboboxPreview),
  ),
  "motion/text-morph": dynamic(() =>
    import("./motion/text-morph.preview").then((m) => m.TextMorphPreview),
  ),
  "motion/morphing-text": dynamic(() =>
    import("./motion/morphing-text.preview").then((m) => m.MorphingTextPreview),
  ),
  "motion/magic-card": dynamic(() =>
    import("./motion/magic-card.preview").then((m) => m.MagicCardPreview),
  ),
  "motion/border-beam": dynamic(() =>
    import("./motion/border-beam.preview").then((m) => m.BorderBeamPreview),
  ),
  "motion/orbiting-circles": dynamic(() =>
    import("./motion/orbiting-circles.preview").then((m) => m.OrbitingCirclesPreview),
  ),
  "motion/confetti": dynamic(() =>
    import("./motion/confetti.preview").then((m) => m.ConfettiPreview),
  ),
  "motion/animated-beam": dynamic(() =>
    import("./motion/animated-beam.preview").then((m) => m.AnimatedBeamPreview),
  ),
  "motion/flickering-grid": dynamic(() =>
    import("./motion/flickering-grid.preview").then((m) => m.FlickeringGridPreview),
  ),
  "blocks/hero-video-dialog": dynamic(() =>
    import("./blocks/hero-video-dialog.preview").then((m) => m.HeroVideoDialogPreview),
  ),
  "motion/wheel-picker": dynamic(() =>
    import("./motion/wheel-picker.preview").then((m) => m.WheelPickerPreview),
  ),
  "motion/popover-morph": dynamic(() =>
    import("./motion/popover-morph.preview").then((m) => m.PopoverMorphPreview),
  ),
  "motion/preview-rail": dynamic(() =>
    import("./motion/preview-rail.preview").then((m) => m.PreviewRailPreview),
  ),
  "motion/rainbow-cta": dynamic(() =>
    import("./motion/rainbow-cta.preview").then((m) => m.RainbowCtaPreview),
  ),
  "motion/page-nav": dynamic(() =>
    import("./motion/page-nav.preview").then((m) => m.PageNavPreview),
  ),
  "blocks/pro-card": dynamic(() =>
    import("./blocks/pro-card.preview").then((m) => m.ProCardPreview),
  ),
  "blocks/availability-scheduler": dynamic(() =>
    import("./blocks/availability-scheduler.preview").then((m) => m.AvailabilitySchedulerPreview),
  ),
  "blocks/knockout-bracket": dynamic(() =>
    import("./blocks/knockout-bracket.preview").then((m) => m.KnockoutBracketPreview),
  ),
  "blocks/bento-grid": dynamic(() =>
    import("./blocks/bento-grid.preview").then((m) => m.BentoGridPreview),
  ),
  "motion/globe": dynamic(() =>
    import("./motion/globe.preview").then((m) => m.GlobePreview),
  ),

  "motion/typewriter": dynamic(() =>
    import("./motion/typewriter.preview").then((m) => m.TypewriterPreview),
  ),
  "motion/avatar-circles": dynamic(() =>
    import("./motion/avatar-circles.preview").then((m) => m.AvatarCirclesPreview),
  ),
  "motion/text-scramble": dynamic(() =>
    import("./motion/text-scramble.preview").then((m) => m.TextScramblePreview),
  ),
  "motion/stagger-list": dynamic(() =>
    import("./motion/stagger-list.preview").then((m) => m.StaggerListPreview),
  ),
  // --- New components (2026-07-15) ---
  "motion/badge-group": dynamic(() =>
    import("./motion/badge-group.preview").then((m) => m.BadgeGroupPreview),
  ),
  "motion/callout": dynamic(() =>
    import("./motion/callout.preview").then((m) => m.CalloutPreview),
  ),
  "motion/kbd": dynamic(() =>
    import("./motion/kbd.preview").then((m) => m.KbdPreview),
  ),
  "motion/empty-state": dynamic(() =>
    import("./motion/empty-state.preview").then((m) => m.EmptyStatePreview),
  ),
  "motion/alert-banner": dynamic(() =>
    import("./motion/alert-banner.preview").then((m) => m.AlertBannerPreview),
  ),
  "motion/segmented-control": dynamic(() =>
    import("./motion/segmented-control.preview").then((m) => m.SegmentedControlPreview),
  ),
  "motion/flip-card": dynamic(() =>
    import("./motion/flip-card.preview").then((m) => m.FlipCardPreview),
  ),
  "motion/stepper": dynamic(() =>
    import("./motion/stepper.preview").then((m) => m.StepperPreview),
  ),
  "motion/counter-ring": dynamic(() =>
    import("./motion/counter-ring.preview").then((m) => m.CounterRingPreview),
  ),
  "motion/drag-to-confirm": dynamic(() =>
    import("./motion/drag-to-confirm.preview").then((m) => m.DragToConfirmPreview),
  ),
  "ai/suggestion-chips": dynamic(() =>
    import("./ai/suggestion-chips.preview").then((m) => m.SuggestionChipsPreview),
  ),
  "ai/model-picker": dynamic(() =>
    import("./ai/model-picker.preview").then((m) => m.ModelPickerPreview),
  ),
  "ai/thinking-indicator": dynamic(() =>
    import("./ai/thinking-indicator.preview").then((m) => m.ThinkingIndicatorPreview),
  ),
  "ai/prompt-history": dynamic(() =>
    import("./ai/prompt-history.preview").then((m) => m.PromptHistoryPreview),
  ),
  "ai/token-counter": dynamic(() =>
    import("./ai/token-counter.preview").then((m) => m.TokenCounterPreview),
  ),
  "blocks/login-form": dynamic(() =>
    import("./blocks/login-form.preview").then((m) => m.LoginFormPreview),
  ),
  "blocks/notification-center": dynamic(() =>
    import("./blocks/notification-center.preview").then((m) => m.NotificationCenterPreview),
  ),
  "blocks/user-profile-card": dynamic(() =>
    import("./blocks/user-profile-card.preview").then((m) => m.UserProfileCardPreview),
  ),
  "blocks/stats-row": dynamic(() =>
    import("./blocks/stats-row.preview").then((m) => m.StatsRowPreview),
  ),
  "blocks/activity-feed": dynamic(() =>
    import("./blocks/activity-feed.preview").then((m) => m.ActivityFeedPreview),
  ),
  "templates/hero-section": dynamic(() =>
    import("./templates/hero-section.preview").then((m) => m.HeroSectionPreview),
  ),
  "templates/pricing-section": dynamic(() =>
    import("./templates/pricing-section.preview").then((m) => m.PricingSectionPreview),
  ),
  "templates/features-section": dynamic(() =>
    import("./templates/features-section.preview").then((m) => m.FeaturesSectionPreview),
  ),
  "templates/testimonials-section": dynamic(() =>
    import("./templates/testimonials-section.preview").then((m) => m.TestimonialsSectionPreview),
  ),
  "templates/cta-section": dynamic(() =>
    import("./templates/cta-section.preview").then((m) => m.CtaSectionPreview),
  ),
};

export function getPreview(category: string, slug: string) {
  return previews[`${category}/${slug}`];
}
