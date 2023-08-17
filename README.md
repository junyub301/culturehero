## 실행방법

1. git clone

```
git clone https://github.com/junyub301/culturehero.git
```

2. npm install

```
npm i or npm install
```

3. npm run dev 실행 후 브라우저에서 http://localhost:3000/

## 구현 내용

-   Next 13 App Directory 사용
-   비회원 게시판이라 가정하여 생성시 id와 pw를 등록 (댓글 동일)
-   게시판 및 댓글 수정 / 삭제시 비밀번호 확인
-   데이터는 MockApi(https://mockapi.io)를 사용
-   초기 게시판 가져오기는 react-query hydrate를 이용해 ssr로 로딩
-   리스트는 무한 스크롤 형식으로 사용
-   useQuery / useMutation은 useFetch / useMutations 커스텀 훅을 만들어 사용
-   비밀번호 확인하는 Prompt창은 공통 모달로 구현

## 고민 했던 부분

-   next route handler로 모든 요청을 처리할지 고민
    -   해결방법 : 비밀번호 확인처럼 정보를 밖으로 내고싶지 않은 요청을 제외한 나머지는 useFetch / useMutations로 처리
-   Next 13 App Directory로 바뀌면서 useRouter의 events를 사용할 수없어져 url 변경시 공통 모달의 창을 어떻게 닫을지 고민
    -   해결방법: next js github의 issue [#42016](https://github.com/vercel/next.js/discussions/42016) , [#41934](https://github.com/vercel/next.js/discussions/41934) 참조하여 useNavigation훅 생성
-   에러처리
    -   해결방법 : useApiError 훅을 통해 에러 처리
