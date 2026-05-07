# Design System Document

## 1. Overview & Creative North Star: "The Digital Storybook"

This design system is built to transcend the "utility-first" nature of childcare platforms, transforming the user experience into a tactile, nurturing, and immersive journey. We are moving away from the rigid, sterile grids of modern SaaS and toward **The Digital Storybook**—a North Star that prioritizes warmth, hand-crafted charm, and editorial whimsy.

The system breaks the "template" look through:
*   **Intentional Asymmetry:** Illustrations and text blocks should feel "placed by hand," often breaking the vertical axis to mimic a scrapbooked layout.
*   **Overlapping Geometries:** Pill-shaped containers and SVG animal mascots should overlap section boundaries to create a sense of organic movement.
*   **High-Contrast Scale:** Dramatically oversized "Luckiest Guy" headlines paired with generous whitespace to ensure the brand feels premium yet approachable.

---

## 2. Colors & Tonal Depth

Our palette is inspired by natural, earthy pigments—clay, sage, and sun-bleached parchment. 

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to define sections or containers. Modern elegance in this system comes from **Edge-less Transitions**. Define boundaries solely through background color shifts. For example, a `surface-container-low` (#f4f3f1) card should sit on a `surface` (#faf9f7) background to create a soft, "pillowy" lift.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, like stacked sheets of heavy-stock construction paper.
*   **Base:** `surface` (#faf9f7) for the primary canvas.
*   **Nesting Level 1:** Use `surface-container-low` (#f4f3f1) for secondary content blocks.
*   **Nesting Level 2:** Use `surface-container-highest` (#e3e2e0) for interactive elements like input fields or inset cards.

### Signature Textures & Gradients
To avoid a flat, "cheap" vector look, use subtle radial gradients on main CTAs. Transition from `primary` (#3c674b) to `primary_container` (#8dbb9a) at a 45-degree angle to give buttons a "3D-molded" feel without using dated drop shadows.

---

## 3. Typography: Whimsical Editorial

The typography scale is designed to balance the "play" of a preschool with the "professionalism" required by parents.

*   **Display & Headlines (H1/H2):** 'Luckiest Guy' (Sage Green). This is our "Hero" voice. Use `display-lg` (3.5rem) for impact. It should feel bubbly, rounded, and celebratory.
*   **The Narrative Voice (Page Titles/Sub-headings):** 'Amatic SC' or 'Pacifico' (Peach/Salmon). This adds the "handwritten" touch of a teacher’s note. Use for quotes, callouts, or secondary titles.
*   **The Anchor (Body):** 'Raleway' Regular. Our dark charcoal (#2E2B27) provides high legibility. 
*   **The Label (H6/Accents):** 'Raleway' Bold (Peach). Used for high-utility metadata and small caps labels to maintain a premium editorial structure.

---

## 4. Elevation & Depth: Tonal Layering

We eschew traditional "Box Shadows" in favor of **Ambient Presence**.

*   **The Layering Principle:** Achieve depth by stacking surface tiers. A `surface-container-lowest` (#ffffff) card on a `surface-container` (#efeeec) background creates a natural highlight.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, use a large blur (20px+) with 4% opacity, tinted with our `secondary` (#835339) tone. This creates a "warm glow" rather than a grey "void."
*   **The Ghost Border:** If accessibility requires a stroke, use `outline-variant` at 15% opacity. It should be felt, not seen.
*   **Glassmorphism:** Use for navigation bars and floating action buttons. Apply a 12px `backdrop-blur` with a semi-transparent `surface` color to allow the whimsical illustrations to peek through as the user scrolls.

---

## 5. Components

### Buttons
*   **Primary:** Pill-shaped (`rounded-full`), 50px radius. Use the Sage Green gradient. Text: White.
*   **Secondary:** Pill-shaped, Peach outline-only (Ghost Border).
*   **Interaction:** On hover, a subtle "squish" animation (scale 0.98) enhances the tactile, toy-like feel.

### Cards & Lists
*   **No Dividers:** Forbid the use of horizontal lines. Use the Spacing Scale (e.g., `spacing-8`) to create "islands" of content.
*   **Lists:** Leading elements should be one of the whimsical SVG mascots (e.g., a small Rabbit for "Quick Facts" or an Owl for "Educational Philosophy").

### Input Fields
*   **Styling:** Use `surface-container-high` (#e9e8e6) with a `rounded-md` (1.5rem) corner. No borders.
*   **Focus State:** A soft 2px glow using `primary_fixed` (#beeeca).

### Whimsical Dividers
*   Instead of lines, use "Soft Decorative Dividers"—scalloped edges or a subtle "wave" SVG that transitions between two surface colors.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** lean into asymmetry. Place the Giraffe SVG so it "peeks" from the bottom right of a text container.
*   **Do** use `soft-rose` (#D28080) sparingly for "heart-centered" CTAs like "Apply Now" or "Sponsor a Child."
*   **Do** maximize whitespace. The brand should feel like an expensive, airy children’s boutique.

### Don’t:
*   **Don’t** use sharp 90-degree corners. Everything must be rounded (Minimum `rounded-sm`: 0.5rem).
*   **Don’t** use pure black (#000000). Always use Dark Charcoal (#2E2B27) for text to maintain the organic, ink-on-paper feel.
*   **Don’t** use standard icons (Material/Lucide) where a custom animal SVG illustration could be used instead. If you must use icons, ensure they are "Rounded" or "Duo-tone" variants.