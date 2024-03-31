import { Product, User } from "./models";
import { connectToDB } from "./utils";

// user데이터 가져오는 함수. q는 검색어, page는 페이지네이션. (props)
export const fetchUsers = async (q, page) => {
  // 검색어를 대소문자 구분하지 않는 정규식 반환
  const regex = new RegExp(q, "i");

  // 페이지 당 노출 시킬 user 개수 (일단 2로 설정)
  const ITEM_PER_PAGE = 2;

  try {
    // DB와 연결
    connectToDB();

    // 검색어를 포함하는 사용자의 총 수를 계산.(페이지네이션)
    const count = await User.find({ username: { $regex: regex } }).count();

    // 검색어 포함하는 사용자 찾기. limit로 결과를 페이지 당 아이템 수로 제한. skip으로 요청된 페이지에 해당하는 아이템을 스킵
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    // 검색된 사용자의 수와 사용자 목록 반환
    return { count, users };

    // catch문으로 에러처리
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};
