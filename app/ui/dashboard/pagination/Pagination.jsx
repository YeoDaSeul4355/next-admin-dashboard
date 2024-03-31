"use client";

import styles from "./pagination.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Pagination = ({ count }) => {
  // URL 쿼리 문자열, 현재 경로, replace 함수 가져옴
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 현재 페이지 번호를 가져옴. URL 쿼리 문자열에서 page 파라미터를 찾아 가져오며, 없으면 기본값 1로 설정
  const page = searchParams.get("page") || 1;

  // URLSearchParams 객체를 사용하여 URL 쿼리 문자열을 복사합니다.
  const params = new URLSearchParams(searchParams);

  // 페이지당 아이템 수를 정의
  const ITEM_PER_PAGE = 2;

  // 페이지네이션을 위해 이전 페이지와 다음 페이지가 있는지를 확인하는 변수 hasPrev와 hasNext를 계산
  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  // 페이지네이션 핸들링 함수.type 매개변수로 이전 페이지로 이동할지 다음 페이지로 이동할지를 결정
  const handleChangePage = (type) => {
    // 삼항연산자 사용
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);

    replace(`${pathname}?${params}`);
  };
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
