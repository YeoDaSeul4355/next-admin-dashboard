"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  // 현재 URL의 쿼리 문자열을 가져옴
  const searchParams = useSearchParams();
  // 현재 경로를 가져옴
  const pathname = usePathname();
  // 라우터 훅에서 replace 함수를 가져옴. replace함수는 브라우저의 url을 변경하는 함수임.
  const { replace } = useRouter();

  // 서치 핸들링 함수. useDebouncedCallback 훅을 사용하여 입력을 디바운싱함. 검색어 입력을 300ms마다 호출
  const handleSearch = useDebouncedCallback((e) => {
    // 현재 url쿼리 문자열을 가져와 URLSearchParams 객체를 생성함. 이 객체를 사용하여 URL의 쿼리 문자열을 파싱하고 조작할 수 있음.
    const params = new URLSearchParams(searchParams);

    // page 쿼리 파라미터를 1로 설정함. 검색어가 변경될 때마다 page를 1로 설정
    params.set("page", 1);

    // 입력값의 길이가 2이상임을 확인하고 값이 있으면 q를 해당 검색어로 설정.
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      // 입력값 없으면 q제거
      params.delete("q");
    }

    // url를 replace함수를 통해 업데이트 함. pathname은 현재 경로, params에는 새로운 쿼리 문자열이 포함되어있음.
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
