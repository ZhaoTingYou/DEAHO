# 00_design_discussion.ko.md — 디자인 논의 워크플로우

## 현재 목표

현재 단계는 외부 생성 도구로 페이지를 만드는 것이 아니라, Codex와 함께 각 페이지의 디자인 세부사항을 논의하고 문서화하는 단계다.

이 문서들은 이후 코드 구현의 기준 문서로 사용된다.

## 페이지별로 정해야 할 항목

1. 페이지 목표  
   사용자가 이 페이지에서 무엇을 이해하고, 무엇을 신뢰하고, 어디로 이동해야 하는지 정의한다.

2. 페이지 구조  
   섹션 순서, 각 섹션의 역할, 정보 우선순위를 정한다.

3. 레이아웃 구조  
   데스크톱 / 모바일 레이아웃, 이미지와 텍스트의 관계, 여백, 정렬 방식을 정한다.

4. 비주얼 방향  
   배경색, 이미지 스타일, 타이포그래피, 컬러 포인트, 브랜드 무드를 정한다.

5. 모션 / 인터랙션  
   opening, scroll, hover, 전환, video, gallery, mobile 단순화 규칙을 정한다.

6. 콘텐츠 / 소재  
   필요한 이미지, 영상, 아이콘, 제품 컷, 실제 프로젝트 자료를 정리한다.

7. 개발 주의사항  
   컴포넌트 분리, 데이터 구조, 반응형 규칙, 금지해야 할 효과를 정한다.

## 권장 논의 순서

1. HOME  
   전체 사이트의 Header, opening animation, 비주얼 톤, 스크롤 리듬을 결정한다.

2. LEGACY  
   브랜드 신뢰 자산과 loyalty / credibility / achievement 세부 카테고리를 정한다.

3. SPECIALTY  
   전문 제작 역량을 정의하고 technique / collection으로 나눈다.

4. GOLF  
   독립 제품 라인의 campaign 페이지를 정한다.

5. NEWS  
   editorial 콘텐츠 페이지와 article card 규칙을 정한다.

6. CHRONICLE  
   브랜드 타임라인, 히스토리, milestone 페이지를 정한다.

## 현재 진행 상태

| 페이지 | 한국어 문서 | 상태 |
|---|---|---|
| HOME | `07_home.ko.md` | 상세 논의 시작 |
| LEGACY | `02_pages.ko.md` | 추후 상세화 필요 |
| SPECIALTY | `02_pages.ko.md` | 추후 상세화 필요 |
| GOLF | `02_pages.ko.md` | 추후 상세화 필요 |
| NEWS | `02_pages.ko.md` | 추후 상세화 필요 |
| CHRONICLE | `02_pages.ko.md` | 추후 상세화 필요 |

## HOME 현재 확정 사항

- HOME 최상단은 opening animation이다.
- 중앙 `DAEHO` 로고는 blur에서 sharp로 전환된다.
- 로고는 선명해진 뒤 축소와 이동을 동시에 수행해 Hero 상단 중앙 로고 위치로 이동한다.
- Hero 상단 bar는 `DAEHO` 중앙 배치, nav 하단 배치, 좌측 site links, 우측 LANGUAGE / LOGIN 구조다.
- Hero 배경은 최종적으로 영상이다.
- Hero에서 다음 section으로 내려갈 때 pinned scroll 전환을 사용한다.

