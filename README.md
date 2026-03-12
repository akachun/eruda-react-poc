# React + Eruda Mobile Debug POC

모바일 환경에서 **PC 없이 프론트엔드 디버깅** 가능한 최소 예제입니다.

## 핵심
- 모바일 접속 시 `eruda` 자동 활성화
- PC에서도 `?debug=1` 붙이면 강제 활성화
- 콘솔/네트워크/DOM 확인 버튼 포함

## 실행
```bash
npm install
npm run dev
```

## 배포
GitHub Pages 자동 배포(메인 브랜치 push 시) 워크플로 포함.

## 사용법
1. 모바일 브라우저로 배포 URL 접속
2. 하단/우측 Eruda 패널에서 Console/Network/Elements 탭 확인
3. `콘솔 테스트`, `네트워크 테스트` 버튼으로 동작 점검
