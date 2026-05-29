# 07_home.ko.md — HOME 상세 설계

## 참고 파일

- HOME 전체 러프: `/Users/tingyouzhao/Desktop/戒指/素材/HOME PLAN 1.png`
- Hero top bar: `/Users/tingyouzhao/Desktop/戒指/素材/HOMEPAGE1.png`
- Hero to next section transition: `/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`
- Featured Categories still: `/Users/tingyouzhao/Desktop/戒指/素材/page3.png`

## HOME 목표

HOME은 DAEHO 공식 홈페이지의 첫인상이다.

사용자는 몇 초 안에 다음을 느껴야 한다.

- DAEHO는 프리미엄 맞춤 제작 브랜드다.
- DAEHO는 챔피언십 링, 명예, 기념, 정밀 제작과 연결된다.
- 사이트는 일반 ecommerce가 아니라 고급 brand campaign이다.
- 사용자는 Legacy, Specialty, Collection, News, Golf로 이어질 수 있다.

한 문장 방향:

HOME은 고급 챔피언 브랜드의 opening film + product campaign + portfolio entrance처럼 느껴져야 한다.

## 전체 구조

HOME은 5개 연속 화면 / 섹션으로 구성한다.

1. Opening Intro
2. Hero
3. Featured Categories
4. Legacy / Proof Bento
5. Recent Projects

## Section 1 — Opening Intro

### 목적

Opening Intro는 loading이 아니라 의식적인 브랜드 입장 장면이다.

사용자가 먼저 DAEHO라는 이름을 기억하고, 자연스럽게 Hero로 들어가게 만든다.

### 초기 상태

- 전체 화면 dark background.
- 중앙에 `DAEHO` logo만 표시한다.
- logo는 white 또는 soft gray.
- navigation, image, text는 아직 나타나지 않는다.

### 애니메이션 순서

1. `DAEHO` logo가 blur 상태로 나타난다.
2. logo가 천천히 선명해진다.
3. logo가 완전히 선명해진 뒤, 이동과 축소를 동시에 시작한다.
4. logo는 중앙에서 Hero 상단 중앙 `DAEHO` logo 위치로 이동한다.
5. logo는 이동하면서 Hero top bar logo의 최종 크기로 축소된다.
6. logo가 도착하면 navigation, 좌측 site links, 우측 buttons가 나타난다.
7. opening overlay가 사라지고 Hero content가 보인다.

### 중요한 구현 규칙

- logo가 먼저 이동하고 나중에 축소되면 안 된다.
- logo가 먼저 축소되고 나중에 이동해도 안 된다.
- translate와 scale은 동시에 진행되어야 한다.
- 최종 logo 위치와 크기는 Hero top bar 중앙 logo와 정확히 일치해야 한다.
- jump, flicker, re-render 느낌이 나면 안 된다.

## Section 2 — Hero

### 역할

Hero는 opening을 이어받아 DAEHO의 브랜드 세계를 보여준다.

일반 랜딩페이지가 아니라 챔피언십 링 campaign poster처럼 보여야 한다.

### Top Bar 구조

- `DAEHO` logo는 상단 중앙에 위치한다.
- navigation은 logo 아래에 위치한다.
- 좌측 상단에는 `대호` / `OH` / `VULCAN` 세 개의 site link를 배치한다.
- 세 site link는 실제 클릭 가능한 링크다.
- 우측 상단에는 `LANGUAGE` / `LOGIN` white outline pill button을 배치한다.
- HOME active state는 subtle gray translucent pill이다.
- top bar는 video background 위에 투명하게 overlay된다.

### Hero Background

- 최종 background는 video다.
- 현재 blueprint image는 video poster / placeholder다.
- 영상은 championship ring blueprint, technical drawing, dark grid, metallic line art를 포함한다.
- motion은 매우 느리고 subtle해야 한다.
- 영상은 title, CTA, navigation보다 강하면 안 된다.
- poster fallback을 반드시 제공한다.

### Hero Content

- 오른쪽 중심에 main headline을 둔다.
- headline 예시: `DESIGN TO BE REMEMBERED`
- 상단 작은 label: `VICTORY. PRIDE. LEGACY`
- 한국어 subtitle은 짧게 유지한다.
- CTA: `DISCOVER COLLECTION`
- 하단에는 작은 `SCROLL` indicator를 둔다.

## Hero -> Featured Categories Transition

### 참고

`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`

### 목표

Hero에서 Featured Categories로 내려갈 때 일반적인 scroll 연결이 아니라, reference video처럼 pinned canvas transition을 사용한다.

### 구조

- Hero는 먼저 viewport에 고정된다.
- Featured Categories는 viewport 아래에서 위로 올라온다.
- Featured Categories는 Hero를 덮으며 들어온다.
- Hero는 뒤에서 살짝 어두워지거나 opacity가 낮아진다.
- Featured Categories는 처음에 약간 작게 시작하고 최종 크기로 커진다.
- Featured Categories container는 큰 radius, soft shadow, glow를 가진 poster처럼 보여야 한다.

권장 수치:

- scroll distance: 120vh - 180vh
- initial scale: 0.92 - 0.96
- final scale: 1

Mobile:

- pinned transition을 생략하고 slide-up + fade로 단순화할 수 있다.

## Section 3 — Featured Categories

### 역할

DAEHO의 주요 제품 방향을 보여주는 section이다.

이 section은 상품 리스트가 아니라 제품 category campaign이다.

### 카테고리

- 우승반지 / Championship Ring
- 경력배지 / Career Badge
- 주문배치 / Custom Badge

### 레이아웃

- black stage background.
- 큰 horizontal visual canvas.
- 왼쪽은 active category의 큰 제품 이미지와 title.
- 오른쪽은 narrow image panels.
- panel 사이에는 어두운 overlay와 vertical separation이 있다.
- `CLICK` CTA는 은은하게 표현한다.

### 인터랙션

- hover 또는 focus 시 active category가 변경된다.
- active image는 밝아진다.
- inactive image는 어둡게 유지된다.
- transition은 slow crossfade.
- image zoom은 미세하게만 사용한다.

## Section 4 — Legacy / Proof Bento

### 역할

브랜드 신뢰도를 빠르게 증명한다.

데이터:

- 38년의 업력
- 100% 전공정 자체 진행
- 0% 납품사고
- 20,000+ 누적 납품
- 5,000+ 매년 제작

### 비주얼

- dark navy / black bento layout.
- thin line icons.
- map, shield, process, factory graphics.
- dashboard처럼 보이면 안 된다.

## Section 5 — Recent Projects

### 역할

실제 프로젝트와 챔피언 팀 이미지를 보여준다.

### 방향

- white 또는 warm white editorial section.
- staggered gallery.
- championship team photo + ring overlay.
- 넉넉한 여백.
- 일반 blog grid처럼 보이면 안 된다.

## 미확정 질문

1. Hero headline을 `DESIGN TO BE REMEMBERED`로 확정할지.
2. Hero video에 어느 정도의 camera push를 넣을지.
3. Featured Categories의 세 카테고리명을 그대로 확정할지.
4. Legacy / Proof Bento를 HOME에서 full section으로 보여줄지 preview로만 보여줄지.
5. Recent Projects에 실제 이미지가 준비되어 있는지.
6. Opening Intro를 첫 방문에서만 재생할지, 매 refresh마다 재생할지.
