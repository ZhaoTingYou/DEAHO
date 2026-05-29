# 05_tech.ko.md — Technical Direction

## Tech Stack

- Next.js
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis

## Route Structure

```text
/
/chronicle
/legacy
/legacy/loyalty
/legacy/credibility
/legacy/achievement
/specialty
/specialty/technique
/specialty/collection
/news
/golf
```

LEGACY 하위 카테고리는 초기 단계에서 `/legacy#loyalty` 같은 anchor 방식으로 시작할 수도 있다. 다만 최종 구조에서는 독립 route 확장이 가능해야 한다.

## Suggested App Structure

```text
app/
  page.tsx
  chronicle/page.tsx
  legacy/page.tsx
  specialty/page.tsx
  specialty/technique/page.tsx
  specialty/collection/page.tsx
  news/page.tsx
  golf/page.tsx

components/
  layout/
    Header.tsx
    Footer.tsx
    MobileMenu.tsx
  common/
    CtaButton.tsx
    PlayButton.tsx
    ScrollIndicator.tsx
    ImageReveal.tsx
  sections/
    home/
      HomeOpeningIntro.tsx
      HomeHero.tsx
      HomeFeaturedCategories.tsx
      HomeProofBento.tsx
      HomeRecentProjects.tsx
```

## Navigation Data

메인 navigation:

```ts
export const navigation = [
  { label: "HOME", href: "/" },
  { label: "CHRONICLE", href: "/chronicle" },
  {
    label: "LEGACY",
    href: "/legacy",
    children: [
      { label: "loyalty", href: "/legacy/loyalty" },
      { label: "credibility", href: "/legacy/credibility" },
      { label: "achievement", href: "/legacy/achievement" },
    ],
  },
  {
    label: "SPECIALTY",
    href: "/specialty",
    children: [
      { label: "technique", href: "/specialty/technique" },
      { label: "collection", href: "/specialty/collection" },
    ],
  },
  { label: "NEWS", href: "/news" },
  { label: "GOLF", href: "/golf" },
];
```

HOME Hero left site links:

```ts
export const homeSiteLinks = [
  { label: "대호", href: "" },
  { label: "OH", href: "" },
  { label: "VULCAN", href: "" },
];
```

`href`는 실제 링크 확정 후 입력한다.

## HOME Opening 구현

- opening logo와 Hero top-center logo의 최종 bounding box를 측정한다.
- opening logo는 blur to sharp 후 translate + scale을 동시에 실행한다.
- 애니메이션 종료 시 logo가 jump하면 안 된다.
- reduced-motion에서는 이동 애니메이션을 생략하고 짧은 fade만 사용한다.

## HOME Hero Video

- Hero background는 최종적으로 video를 사용한다.
- poster fallback이 반드시 필요하다.
- video 권장 속성:
  - muted
  - playsInline
  - loop
  - preload 전략은 성능에 따라 결정
- autoplay 여부는 성능과 UX를 고려해 확정한다.
- poster는 우선 로딩하여 첫 화면 black flash를 방지한다.

권장 파일명:

```text
public/videos/home/home-hero-blueprint-video.mp4
public/images/home/home-hero-blueprint-poster.jpg
```

## HOME Hero -> Featured Categories

GSAP ScrollTrigger로 구현한다.

- Hero transition wrapper를 pin한다.
- Featured Categories는 viewport 아래에서 시작한다.
- scroll progress에 따라 `translateY`를 0으로 이동한다.
- 동시에 `scale(0.92-0.96)`에서 `scale(1)`로 전환한다.
- Hero background layer는 후반부에 opacity를 낮추거나 dark overlay를 강화한다.
- 전환 완료 후 pin을 해제하고 일반 page flow로 돌아간다.
- mobile / reduced-motion에서는 slide-up + fade로 단순화한다.

## Performance

- Hero poster는 우선 로딩한다.
- 영상은 용량을 최적화한다.
- 영상에 사운드는 자동 재생하지 않는다.
- non-critical image는 lazy load한다.
- animation은 layout shift를 만들면 안 된다.

## Accessibility

- 모든 버튼은 keyboard accessible해야 한다.
- video가 의미 전달에 필수인 경우 fallback text / poster를 제공한다.
- play button은 aria-label을 가진다.
- dropdown navigation은 focus state를 지원한다.
- reduced-motion을 반드시 지원한다.

