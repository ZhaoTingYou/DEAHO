# 02_pages.ko.md — DAEHO 페이지 구조

## 기본 원칙

- 현재 제공된 러프 디자인을 기준으로 페이지 구조를 정리한다.
- 디자인이 있는 페이지는 레이아웃, 비율, 분위기를 최대한 유지한다.
- 디자인이 미완성인 페이지는 브랜드 방향과 기존 페이지 디자인 및 스타일을 기준으로 보완한다.
- 텍스트가 디자인에 보이는 경우 디자인의 문구를 우선한다.
- 모든 주요 페이지는 Header, language switch, login entry, scroll rhythm, premium visual language를 공유한다.

## 사이트 정보 구조

| Category | Route | 역할 |
|---|---|---|
| HOME | `/` | 첫인상, 브랜드 톤 앤 무드, 핵심 제품, 신뢰도 |
| CHRONICLE | `/chronicle` | 브랜드 타임라인, 히스토리, 발전 과정 |
| LEGACY | `/legacy` | 신뢰 자산, 경험, 납품 성과, 안정성 |
| SPECIALTY | `/specialty` | 전문 제작 역량, 공정, 제품군 연결 |
| NEWS | `/news` | 뉴스, 브랜드 콘텐츠, 프로젝트 기사 |
| GOLF | `/golf` | Golf bracelet 독립 제품 라인 |

## 하위 카테고리

LEGACY:

| Sub Category | 권장 route | 역할 |
|---|---|---|
| loyalty | `/legacy/loyalty` | 장기 고객 관계, 지속 납품, 브랜드 신뢰 |
| credibility | `/legacy/credibility` | 자체 공정, 납품 무사고, 품질 신뢰 |
| achievement | `/legacy/achievement` | 챔피언 프로젝트, 누적 납품, 대표 사례 |

SPECIALTY:

| Sub Category | 권장 route | 역할 |
|---|---|---|
| technique | `/specialty/technique` | 제작 공정, 설비, 세공, 검품, 납품 |
| collection | `/specialty/collection` | 프로젝트들 |

## HOME

참고:

- `/Users/tingyouzhao/Desktop/戒指/素材/HOME PLAN 1.png`
- `/Users/tingyouzhao/Desktop/戒指/素材/HOMEPAGE1.png`
- `/Users/tingyouzhao/Desktop/戒指/素材/page3.png`
- `/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`

HOME은 총 5개의 연속 화면 / 섹션으로 구성한다.

1. Opening Intro  
   중앙 `DAEHO` 로고가 blur에서 sharp로 전환되고, 이후 축소와 이동을 동시에 수행해 Hero 상단 중앙 로고 위치로 이동한다.

2. Hero  
   blueprint / technical drawing 영상 배경, 중앙 상단 DAEHO 로고, 하단 navigation, 오른쪽 headline / CTA를 가진 campaign hero.

3. Featured Categories  
   우승반지, 경력배지, 주문배치 세 가지 제품 진입점. Hero에서 이 section으로 내려갈 때 pinned scroll 전환을 사용한다.

4. Legacy / Proof Bento  
   38년, 100%, 0%, 20,000+, 5,000+ 등 브랜드 신뢰 데이터를 보여준다.

5. Recent Projects  
   챔피언 팀 사진과 링 / 프로젝트 이미지를 editorial gallery로 보여준다.

## HOME Hero top bar

- `DAEHO` 로고는 상단 중앙에 배치한다.
- 메인 nav는 로고 아래 한 줄로 배치한다.
- 좌측 상단에는 `대호` / `OH` / `VULCAN` 세 개의 site link를 배치한다.
- 우측 상단에는 LANGUAGE / LOGIN white outline pill button을 배치한다.
- HOME active state는 반투명 gray pill로 표현한다.
- top bar는 hero video background 위에 투명하게 overlay된다.

## CHRONICLE

브랜드의 시간 흐름, 발전 과정, milestone을 보여주는 페이지다.

권장 구조:

1. Hero: dark background, brand archive mood
2. Timeline: 연도별 주요 사건과 이미지
3. Milestone Gallery: 대표 프로젝트, 제작 변화, 고객 사례
4. Brand Statement: LEGACY 또는 SPECIALTY로 연결

## LEGACY

브랜드 신뢰 자산을 보여주는 페이지다.

주요 내용:

- `PROVEN WITHOUT EXCEPTION`
- 38년의 업력
- 100% 전공정 자체 진행
- 0% 납품사고
- 20,000+ 누적 납품
- 5,000+ 매년 제작

LEGACY 하위 페이지는 loyalty / credibility / achievement의 세 관점으로 나눌 수 있다.

## SPECIALTY

전문 제작 역량의 입구 페이지다.

Technique은 제작 과정을 설명하고, Collection은 결과물과 제품 라인을 보여준다.

## SPECIALTY / technique

제작 공정을 설명하는 페이지다.

주요 단계:

1. 디자인 : 수작업 / 2D 디자인
2. 3D 렌더링 작업
3. 기계 / 세공 / 광
4. 검품 및 납품

세로 timeline, blue point marker, dark blue-black background, grayscale process image를 사용할 수 있다.

## SPECIALTY / collection

제품 campaign 성격의 페이지다.

주요 섹션:

- H-LEAGUE CHAMPIONS RING
- CRAFTED TO LAST FOREVER
- CHAMPIONSHIP RINGS
- THE DAEHO HERITAGE
- bottom value icons

## NEWS

브랜드 콘텐츠, 제작 과정, 프로젝트 소식, 인터뷰, 비하인드 스토리를 보여주는 editorial 페이지다.

구조:

- Featured Article
- Category Filters
- Article Grid

## GOLF

Golf bracelet 독립 제품 라인 페이지다.

주요 섹션:

- Hero: FORM OF THE GAME
- Design in Every Detail
- Shaft Color
- Crafted to Last
- More Than a Bracelet, a Statement
- Brand Value Banner

