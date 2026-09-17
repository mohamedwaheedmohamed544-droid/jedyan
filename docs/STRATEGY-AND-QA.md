# Jedyan website — strategy, concept and QA

## 1. Core messages (from the brand files)
- Big idea: **نُحرّك ما هو أكبر من البضائع. نُحرّك الأعمال.**
- Essence: **جاهزيةٌ تُبنى عليها الأعمال.** · Promise: لن تضطرّ إلى تأجيل نموّك بسبب عملياتك.
- Category: **Commerce Operations Infrastructure Partner** — not "storage", not "shipping".
- One statement: جديان تدير ما يحدث بين الطلب ووصوله.
- Proof pillars: readiness before demand · connected commerce · controlled execution · flexible network.
- Voice rules: no superlatives without data; "say what we can before what we want"; carrier management = decision ownership, not owning a network.

## 2. Architecture & user journey
Home is one narrative that answers, in order: who (hero) → what we run (operating layer) → see it (commerce journey) → why it's a cycle → why we exist → solutions → who for → sectors → how we start → visibility → why us → close + diagnosis CTA.
CTAs appear at decision points only: header, hero, solutions end-cap, closing, every inner page's end band.

## 3. Design language — "the fixed point that moves"
Derived from the logo's three blades and Al-Jiddi (Polaris): scattered streams converge on one steady point and leave as ordered lanes. Grey = fragmented, orange = run by Jedyan. Graphite/ink grounds from the slide templates, brand orange #FF6E06, tint #FFF1E6. Serif caps for Latin eyebrows (as in the templates), mono for operational data.

## 4. Interactive concepts
| Concept | Mechanism |
|---|---|
| Hero flow | Canvas: channel streams → operating point → lanes; pointer shifts the hub; live order ticket |
| Operating layer | Six nodes around the Jedyan core, auto-cycle + hover/focus |
| Commerce Operations Journey | Pinned, scroll-driven: parcel travels 9 stations; status, stage and data change |
| Commerce cycle | Loop of 8 stages, hover/tap details |
| Why Jedyan exists | Tangled lines resolve into ordered lanes with scroll |
| Solutions | Pinned horizontal rail (desktop), native swipe (mobile) |
| Carrier management | Scenario picker redraws the decision path incl. exception branch |
| Service visuals | Bin map · fulfillment line (B2C/B2B) · event map · returns decision · control layer |
| Contact | 5-step diagnosis, then contact details + summary |

All loops pause off-screen; `prefers-reduced-motion` removes ambient motion; scroll-linked visuals stay user-controlled.

## 5. Self-review (CD / UX / Dev / Brand)
- Reflects Jedyan: positioning is operational, not transport imagery; all copy traced to source files. ✔
- Explains the model fast: first two screens state who/what; journey demonstrates it. ✔
- Premium without noise: one motif, restrained palette, no glass/neon/stock. ✔
- Mobile: dedicated menu sheet, lighter canvas, swipe rails, compact journey, no horizontal overflow (tested 390px). ✔
- Performance: ~104–134 kB first-load JS, no animation libraries, self-hosted subset fonts, static export. ✔
- Accessibility: skip link, landmarks, focus states, ARIA tabs/radios/live regions, reduced motion. ✔
- Known gaps: real photography, licensed Shamel font, confirmed LinkedIn/address, executive sign-off on vision/mission.
