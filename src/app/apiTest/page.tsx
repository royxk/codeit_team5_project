"use client";

import {
  addNoticeApiResponse,
  alertApiResponse,
  alertReadApiResponse,
  createImageApiResponse,
  createShopApiResponse,
  editSelectedNoticeApiResponse,
  editShopInformationApiResponse,
  logout,
  mydataApiResponse,
  mydataEditApiResponse,
  searchNoticeApiResponse,
  searchSelectedNoticeApiResponse,
  searchSelectedNoticeApplyApiResponse,
  searchShopInformationApiResponse,
  searchShopNoticeApiResponse,
  searchUserApplyApiResponse,
  selectedNoticeApplyApiResponse,
  selectedNoticeApplyStatusSettingApiResponse,
  signinApiResponse,
  signupApiResponse,
} from "@/util/api";
import {
  getCookie,
  setAccessTokenCookie,
  setShopIdCookie,
  setUserIdCookie,
} from "@/util/cookieSetting";
import { useRef, useState } from "react";

export default function ApiTest() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [uid, setUid] = useState("");
  const [sid, setSid] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [noticeIdArray, setNoticeIdArray] = useState("");

  const [noticeApplyIdArray, setNoticeApplyIdArray] = useState("");
  const handleSearchNoticeClick = async () => {
    const { items } = await searchNoticeApiResponse();
    console.log(items);
  };

  const handleSigninClick = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef.current?.value;
    const { item } = await signinApiResponse({
      email: email as string,
      password: password as string,
    });
    if (item === undefined) {
      alert("먼저 로그인 id와 password를 입력하세요");
      return;
    }
    const { id: userId } = item.user.item;
    setAccessTokenCookie(item.token);
    setUserIdCookie(userId);

    setAccessToken(item.token);
    setUid(userId);

    console.log(item);
  };

  const handleSignupClick = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef.current?.value;
    const { item } = await signupApiResponse({
      email: email as string,
      password: password as string,
      type: "employer",
    });
    console.log(item);
  };

  const handleLogoutClick = () => {
    logout();
    setAccessToken("");
    setUid("");
    setSid("");
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }

    console.log("로그아웃 실행!");
  };

  const handleMydataClick = async () => {
    if (!uid) {
      alert("먼저 로그인 하세요!");
      return;
    }
    const { item } = await mydataApiResponse(uid);
    if (item.type === "employer" && item.shop) {
      const { id: shopId } = item.shop.item;
      setShopIdCookie(shopId);
      setSid(shopId);
    }
    console.log(item);
  };

  const handleMydataEditClick = async () => {
    if (!uid) {
      alert("먼저 로그인 하세요!");
      return;
    }
    const { item } = await mydataEditApiResponse({
      name: "팀5",
      phone: "01011112222",
      address: "서울시 종로구",
      bio: "아자아자 화이팅",
    });
    console.log(item);
  };

  const handleAlertListClick = async () => {
    if (!uid) {
      alert("먼저 로그인 하세요!");
      return;
    }
    const res = await alertApiResponse(uid);
    console.log(res);
  };

  const handleAlertReadedClick = async () => {
    if (!uid) {
      alert("먼저 로그인 하세요!");
      return;
    }
    if (!uid) {
      alert("알림 목록을 조회하세요!");
      return;
    }
    const res = await alertReadApiResponse("임시");
    console.log(res);
  };

  const handleCreateShopClick = async () => {
    const res = await createShopApiResponse({
      name: "음머어 소갈비",
      category: "한식",
      address1: "서울시 종로구",
      address2: "소갈비길",
      description: "싸고 맛있는집",
      imageUrl:
        "https://img.freepik.com/free-photo/front-view-raw-marbled-meat-steak-with-rosemary-stand_141793-12208.jpg?t=st=1713245078~exp=1713248678~hmac=33948da662969820f03a4938442cf3bbbf7ce00ef80e1aad5006f949ea2eb013&w=1380",
      originalHourlyPay: 50000,
    });
    console.log(res);
  };

  const handleSearchShopInformationClick = async () => {
    const shopId = getCookie("sid");
    if (shopId) {
      const res = await searchShopInformationApiResponse(shopId);
      console.log(res);
    } else {
      alert("먼저 내 정보 조회를 하세요");
    }
  };

  const handleEditShopInformationClick = async () => {
    const shopId = getCookie("sid");
    if (shopId) {
      const res = await editShopInformationApiResponse(shopId, {
        address1: "서울시 종로구",
        address2: "소갈비길",
        category: "한식",
        description: "싸고 맛있는집이라네",
        imageUrl:
          "https://img.freepik.com/free-photo/front-view-raw-marbled-meat-steak-with-rosemary-stand_141793-12208.jpg?t=st=1713245078~exp=1713248678~hmac=33948da662969820f03a4938442cf3bbbf7ce00ef80e1aad5006f949ea2eb013&w=1380",
        name: "음머어 소갈비 2호점",
        originalHourlyPay: 50000,
      });
      console.log(res);
    } else {
      alert("먼저 내 정보 조회를 하세요");
    }
  };

  const handleAddNoticeClick = async () => {
    const shopId = getCookie("sid");
    if (shopId) {
      const res = await addNoticeApiResponse(shopId, {
        hourlyPay: 50000,
        startsAt: "2024-05-01T00:00:00Z",
        workhour: 5,
        description: "테스트입니다.",
      });
      console.log(res);
    }
  };

  const handleSearchShopNoticeClick = async () => {
    const shopId = getCookie("sid");
    if (shopId) {
      const res = await searchShopNoticeApiResponse(shopId);
      const noticeIdArray = res.items.map((item: any) => item.item.id);
      setNoticeIdArray(noticeIdArray);
      console.log(res);
    }
  };

  const handleSearchSelectedNoticeClick = async () => {
    const shopId = getCookie("sid");
    if (shopId && noticeIdArray) {
      /**
       * 현재는 noticeIdArray의 0번째 인덱스 값을 가져오고 있으나
       * 실제로는 매핑하여 각 카드에 noticeId 값을 넣고
       * 클릭했을 때 해당 noticeId 가져 올 수 있도록 해야함.
       */
      const res = await searchSelectedNoticeApiResponse(
        shopId,
        noticeIdArray[0],
      );
      console.log(res);
    } else {
      alert("먼저 공고 목록을 조회하세요");
    }
  };

  const handleEditSelectedNoticeClick = async () => {
    const shopId = getCookie("sid");
    if (shopId && noticeIdArray) {
      /**
       * 현재는 noticeIdArray의 0번째 인덱스 값을 가져오고 있으나
       * 실제로는 매핑하여 각 카드에 noticeId 값을 넣고
       * 클릭했을 때 해당 noticeId 가져 올 수 있도록 해야함.
       */
      const res = await editSelectedNoticeApiResponse(
        shopId,
        noticeIdArray[0],
        {
          hourlyPay: 60000,
          startsAt: "2024-05-01T00:00:00.000Z",
          workhour: 9,
          description: "더 오른 급여",
        },
      );
      console.log(res);
    } else {
      alert("먼저 공고 목록을 조회하세요");
    }
  };

  const handleSearchSelectedNoticeApplyClick = async () => {
    const shopId = getCookie("sid");
    if (shopId && noticeIdArray) {
      /**
       * 현재는 noticeIdArray의 0번째 인덱스 값을 가져오고 있으나
       * 실제로는 매핑하여 각 카드에 noticeId 값을 넣고
       * 클릭했을 때 해당 noticeId 가져 올 수 있도록 해야함.
       */
      const { items } = await searchSelectedNoticeApplyApiResponse(
        shopId,
        noticeIdArray[0],
      );
      console.log(items);
      const noticeApplyId = items.map((item: any) => item.item.id);
      setNoticeApplyIdArray(noticeApplyId);
    } else {
      alert("먼저 공고 목록을 조회하세요");
    }
  };

  const handleSelectedNoticeApplyClick = async () => {
    const shopId = getCookie("sid");
    if (shopId && noticeIdArray) {
      /**
       * 현재는 noticeIdArray의 0번째 인덱스 값을 가져오고 있으나
       * 실제로는 매핑하여 각 카드에 noticeId 값을 넣고
       * 클릭했을 때 해당 noticeId 가져 올 수 있도록 해야함.
       */
      const res = await selectedNoticeApplyApiResponse(
        shopId,
        noticeIdArray[0],
      );
      console.log(res);
    } else {
      alert("먼저 공고 목록을 조회하세요");
    }
  };

  const handleStatusSettingClick = async () => {
    const shopId = getCookie("sid");
    if (shopId && noticeIdArray && noticeApplyIdArray) {
      /**
       * 현재는 noticeIdArray의 0번째 인덱스 값과
       * noticeApplyIdArray의 0번째 인덱스 값을 가져오고 있으나
       * 실제로는 매핑하여 각 카드에 noticeId 값을 넣고
       * 클릭했을 때 해당 noticeId 가져 올 수 있도록 해야하며
       * 지원 목록에 매핑하여 각 row에 noticeApplyId 값을 넣고
       * 클릭했을 때 해당 noticeApplyId 가져 올 수 있도록 해야함.
       */
      const res = await selectedNoticeApplyStatusSettingApiResponse(
        shopId,
        noticeIdArray[0],
        noticeApplyIdArray[0],
        { status: "accepted" },
      );
      console.log(res);
    } else {
      alert("먼저 공고를 지원 하세요");
    }
  };

  const handleUserApplyClick = async () => {
    const res = await searchUserApplyApiResponse(uid);
    console.log(res);
  };

  const handleImageApiClick = async () => {
    const res = await createImageApiResponse({ name: "test" });
    console.log(res);
  };

  return (
    <>
      <div>
        <h1 className="flex place-content-center bg-blue-300 py-5 text-lg">
          api 테스트입니다
        </h1>
        <h2 className="flex place-content-center bg-blue-300 text-sm text-red-700">
          주의: 현재 1시간마다 쿠키 값이 삭제되니 테스트 실패되면 다시 로그인
          하세요
        </h2>
        <h2 className="mb-5 flex place-content-center bg-blue-300 text-sm text-red-700">
          주의: 해당 테스트는 응답의 성공 여부에 대해서만 다루고 있습니다.
          상세한 body와 query를 포함한 요청은 각자의 페이지나 swagger에서
          해주세요
        </h2>
      </div>
      <div className="grid place-content-center">
        <div className="align-center flex flex-col">
          <div className="bg-blue-200 text-center">
            <div className="bg-blue-400">실시간 쿠키 정보</div>
            <div>
              accessToken 쿠키:{" "}
              <span className={accessToken ? `` : `text-red-40`}>
                {accessToken ? accessToken : "로그인 시 생성됨"}
              </span>
            </div>
            <div>
              userId(uid) 쿠키:{" "}
              <span className={uid ? `` : `text-red-40`}>
                {uid ? uid : "로그인 시 생성됨"}
              </span>
            </div>
            <div>
              shopId(sid) 쿠키:{" "}
              <span className={sid ? `` : `text-red-40`}>
                {sid ? sid : "사장님으로 로그인 후 내 정보 조회 시 생성됨"}
              </span>
            </div>
          </div>
          <div className=" flex flex-col text-center">
            <div className="bg-green-400">로그인 정보 입력</div>
            <input
              className="border-2 border-black"
              type="email"
              placeholder="이메일:employer@naver.com 혹은 employee@naver.com"
              ref={emailRef}
            />
            <input
              className="border-2 border-black"
              type="password"
              placeholder="비밀번호:qwer1234"
              ref={passwordRef}
            />
          </div>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleSearchNoticeClick}
          >
            공고 조회
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleSignupClick}
          >
            회원가입
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleSigninClick}
          >
            로그인
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleLogoutClick}
          >
            로그아웃
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleMydataClick}
          >
            내 정보 조회
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleMydataEditClick}
          >
            내 정보 수정
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleAlertListClick}
          >
            유저의 알림 목록 조회
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleAlertReadedClick}
          >
            알림 읽음 처리
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleCreateShopClick}
          >
            가게 등록
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleSearchShopInformationClick}
          >
            가게 정보 조회
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleEditShopInformationClick}
          >
            가게 정보 수정
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleAddNoticeClick}
          >
            가게의 공고 등록
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleSearchShopNoticeClick}
          >
            가게의 공고 목록 조회
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleSearchSelectedNoticeClick}
          >
            가게의 특정 공고 조회
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleEditSelectedNoticeClick}
          >
            가게의 특정 공고 수정
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleSearchSelectedNoticeApplyClick}
          >
            가게의 특정 공고의 지원 목록 조회
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleSelectedNoticeApplyClick}
          >
            가게의 특정 공고 지원 등록
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleStatusSettingClick}
          >
            가게의 특정 공고 지원 승인, 거절 또는 취소
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleUserApplyClick}
          >
            유저의 지원 목록
          </button>
          <button
            className="border-1 h-10 rounded-sm hover:bg-green-300 hover:font-bold"
            onClick={handleImageApiClick}
          >
            Presigned URL 생성
          </button>
        </div>
      </div>
    </>
  );
}
