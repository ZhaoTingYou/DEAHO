# 04_motion.ko.md — Motion / Interaction Direction

## Motion Goal

DAEHO의 모션은 화려한 장식이 아니라 브랜드의 무게감과 몰입감을 만드는 역할을 한다.

키워드:

- 느림
- 부드러움
- 무게감
- 관성
- camera language
- breathing
- restrained

피해야 할 것:

- 빠른 bounce
- 과한 zoom
- neon glow
- game UI effect
- startup landing motion

## HOME Opening

1. dark opening screen이 먼저 보인다.
2. 중앙에 `DAEHO` logo만 보인다.
3. logo는 blur 상태에서 sharp 상태로 전환된다.
4. logo가 선명해진 뒤, 이동과 축소를 동시에 수행한다.
5. 목표 위치는 Hero 상단 중앙 `DAEHO` logo의 최종 위치와 크기다.
6. logo가 도착한 뒤 nav, site links, LANGUAGE, LOGIN이 fade in된다.
7. opening overlay가 사라지고 Hero content가 보인다.

주의:

- 먼저 이동하고 나중에 축소하면 안 된다.
- 먼저 축소하고 나중에 이동해도 안 된다.
- 이동과 축소는 하나의 연속된 브랜드 전환처럼 보여야 한다.

권장 시간:

- blur to sharp: 0.8s - 1.2s
- center to top-center + scale down: 1.0s - 1.6s
- top bar / Hero reveal: 0.8s - 1.2s
- total: 2.6s - 4.0s

## HOME Hero

- 배경 영상은 Hero content가 나타날 때 부드럽게 fade in된다.
- 영상은 매우 천천히 움직인다.
- blueprint / technical drawing이 어둠 속에서 미세하게 움직이는 느낌이어야 한다.
- 제목은 line reveal 또는 opacity reveal을 사용할 수 있다.
- CTA는 늦게 등장해도 좋다.

## Hero -> Featured Categories

참고 영상:

`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`

전환 구조:

- Hero를 scroll pin한다.
- Featured Categories가 viewport 아래에서 위로 올라온다.
- Featured Categories는 Hero를 덮으며 들어온다.
- Featured Categories는 처음에 `scale(0.92-0.96)` 정도로 시작해 `scale(1)`이 된다.
- Hero는 전환 중 살짝 어두워지거나 opacity가 낮아진다.
- Featured Categories는 큰 canvas / poster처럼 보인다.
- radius, soft shadow, glow를 사용할 수 있다.

권장 scroll distance:

- 120vh - 180vh

Mobile / reduced motion:

- pinned transition을 끄고 slide-up + fade로 단순화한다.

## Featured Categories Interaction

- 카테고리 hover 시 active image가 밝아진다.
- 비활성 image는 어둡게 유지한다.
- 이미지 zoom은 1.02 - 1.05 정도로 제한한다.
- 텍스트와 CTA는 crossfade한다.

## LEGACY Motion

- data panel은 horizontal scroll 또는 pinned panel을 사용할 수 있다.
- 숫자는 slow count up 가능.
- icon / line art는 fade 또는 line reveal.

## SPECIALTY / technique Motion

- timeline node가 scroll에 따라 점등된다.
- process image는 grayscale에서 opacity reveal로 나타날 수 있다.
- blue marker glow는 매우 약하게 사용한다.

## GOLF Motion

- hero product는 어둠 속에서 천천히 드러난다.
- shaft color는 crossfade로 변경한다.
- detail cards는 부드러운 slide / fade를 사용한다.

## Reduced Motion

`prefers-reduced-motion`에서는 다음을 비활성화한다.

- pinned scroll
- parallax
- count up
- heavy camera push

기본 fade는 유지할 수 있다.
