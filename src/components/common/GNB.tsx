import React from "react";

interface Props {
  user: string;
}

const GNB: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex h-80 w-full items-center">
      <div className="flex w-full justify-center">
        <div className="max-w-1440px flex w-full flex-row items-center justify-around bg-white">
          <img
            className="h-[40px] w-[112px]"
            src="logoIcon.png"
            alt="로고 아이콘"
          />
          <div className="relative">
            <img
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform"
              src="searchIcon.png"
              alt="돋보기 아이콘"
            />
            <input
              className="h-10 w-96 rounded-md bg-gray-200 pl-16"
              type="text"
              placeholder="가게 이름으로 찾아보세요"
            />
          </div>
          {user === "logout" ? (
            <div className="flex">
              <button className="flex h-6 w-20 text-base font-bold text-gray-900">
                로그인
              </button>
              <button className="flex h-6 w-20 text-base font-bold text-gray-900">
                회원 가입
              </button>
            </div>
          ) : (
            <div className="flex">
              <button className="flex h-6 w-28 text-base font-bold text-gray-900">
                내 가게
              </button>
              <button className="flex h-6 w-20 text-base font-bold text-gray-900">
                로그아웃
              </button>
              <button className="flex h-6 w-28 items-center justify-center text-base font-bold text-gray-900">
                <img
                  className="h-5 w-5"
                  src="notification_active.png"
                  alt="notification"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GNB;
