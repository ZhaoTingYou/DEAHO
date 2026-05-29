# DAEHO Project Docs — Korean Version

이 폴더는 DAEHO 공식 홈페이지 제작을 위한 한국어 설계 문서입니다.

원본 중국어 문서:

`/Users/tingyouzhao/Desktop/deaho官网/project-docs/`

## 문서 구성

| 문서 | 내용 |
|---|---|
| `00_design_discussion.ko.md` | 페이지별 디자인 논의 방식과 진행 순서 |
| `01_brand.ko.md` | 브랜드 정의, 정보 구조, 언어 전략 |
| `02_pages.ko.md` | 전체 페이지 구조와 각 페이지 역할 |
| `03_visual.ko.md` | 비주얼 시스템, 레이아웃, 컬러, 타이포그래피 |
| `04_motion.ko.md` | 모션 방향, 스크롤, 전환 애니메이션 |
| `05_tech.ko.md` | 기술 구조, 라우팅, 컴포넌트, 성능 규칙 |
| `06_notes.ko.md` | 선호도, 소재, 미확정 사항 |
| `07_home.ko.md` | HOME 페이지 상세 설계 |

## 현재 핵심 결정

- HOME은 5개의 연속 화면 / 섹션으로 구성한다.
- HOME 상단은 opening animation으로 시작한다.
- 중앙 `DAEHO` 로고는 blur 상태에서 sharp 상태로 전환된다.
- 로고가 선명해진 뒤, 축소와 이동을 동시에 수행하여 Hero 상단 중앙 로고 위치로 이동한다.
- Hero 배경은 최종적으로 영상 배경을 사용한다. 현재 blueprint 이미지는 poster / placeholder다.
- Hero에서 Featured Categories로 내려갈 때는 reference video처럼 pinned scroll 전환을 사용한다.

