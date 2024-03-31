import mongoose from "mongoose";

// connection 객체 생성 => mongoDB와의 연결 상태를 저장함.
const connection = {};

// async/await 비동기
export const connectToDB = async () => {
  try {
    // 이미 연결 되어있으면 함수 종료함 (return)
    if (connection.isConnected) return;

    // mongoDB와 연결하고 db라는 변수에 저장. 환경변수로 설정해 API키 노출 X
    const db = await mongoose.connect(process.env.MONGO);
    // 연결 완료 후, DB 연결 객체의 첫 번째 연결 상태를 저장함. readyState 속성은 현재 연결 상태를 나타냄.
    connection.isConnected = db.connections[0].readyState;

    // catch문으로 error처리
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
