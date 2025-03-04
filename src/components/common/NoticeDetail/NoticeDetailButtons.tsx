"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import {
  mydataApiResponse,
  searchUserApplyApiResponse,
  selectedNoticeApplyApiResponse,
  selectedNoticeApplyStatusSettingApiResponse,
} from "@/util/api";
import { getCookie } from "@/util/cookieSetting";
import useShopId from "@/components/employer/Hook/useShopId";
import useNoticeId from "@/components/employer/Hook/useNoticeId";

/**
 * @param {boolean} isClosed post데이터에서 closed를 받아, 현재 공고가 마감된 상태인지를 표시하는 인자입니다.
 * @returns
 */
const StoreDetailButtons = ({ isClosed = false }: { isClosed?: boolean }) => {
  const [reloadSwitch, setReloadSwitch] = useState(false);
  const [isUserEmployer, setIsUserEmployer] = useState(false);
  const [isUserSignToWork, setIsUserSignToWork] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userSignId, setUserSignId] = useState("");

  const router = useRouter();
  const shopId = useShopId()!;
  const noticeId = useNoticeId()!;
  const userId = getCookie("uid")!;
  const currentUserShopId = getCookie("sid");
  const isNoticeMine = currentUserShopId === shopId;

  // 현재 유저가 사장인지 아닌지, 현재 보고있는 공고에 지원했는지 하지않았는지의 여부를 판단하는 함수입니다.
  async function handleUserCheck() {
    const userData = await mydataApiResponse(userId);
    const isUserEmployer = userData.item.type === "employer";
    setIsUserEmployer(isUserEmployer);

    if (!isUserEmployer) {
      const applyCount = await searchUserApplyApiResponse(userId, { limit: 1 });
      const count = applyCount.count;
      const entireSignList = await searchUserApplyApiResponse(userId, {
        limit: count,
      });

      const workerVerification = entireSignList.items.filter(
        (item: any) =>
          item.item.notice.item.id === noticeId &&
          item.item.shop.item.id === shopId &&
          item.item.status === "pending",
      );

      const isWorkerSigned = workerVerification.length > 0;

      if (isWorkerSigned) {
        setIsUserSignToWork(isWorkerSigned);
        setUserSignId(workerVerification[0].item.id);
      }
    }
    setIsLoading(false);
  }

  const handleSignApply = async () => {
    const res = await mydataApiResponse(userId);

    if (res.item.name !== undefined) {
      await selectedNoticeApplyApiResponse(shopId, noticeId);
      setIsUserSignToWork(true);
      setUserSignId(res.item.id);
      setReloadSwitch(!reloadSwitch);
    } else {
      alert("먼저 내 정보를 등록해 주세요!");
    }
  };

  const handleCancelApply = async () => {
    const res = await selectedNoticeApplyStatusSettingApiResponse(
      shopId,
      noticeId,
      userSignId,
      { status: "canceled" },
    );

    setIsUserSignToWork(false);
    setReloadSwitch(!reloadSwitch);
    router.refresh();
  };

  useEffect(() => {
    handleUserCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadSwitch]);

  return (
    <>
      {!isLoading && (
        <>
          {isClosed ? (
            <Button size="full" color="gray">
              {isUserEmployer ? "마감함" : "신청 불가"}
            </Button>
          ) : (
            <>
              {isUserEmployer ? (
                <>
                  {isNoticeMine ? (
                    <Button
                      size="full"
                      color="white"
                      onClick={() =>
                        router.push(`/user/employer/notice/${noticeId}/edit`)
                      }
                    >
                      공고 편집
                    </Button>
                  ) : (
                    <Button size="full" color="gray">
                      사장은 신청이 불가합니다.
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {isUserSignToWork ? (
                    <Button
                      size="full"
                      color="white"
                      onClick={() => handleCancelApply()}
                    >
                      취소하기
                    </Button>
                  ) : (
                    <Button
                      size="full"
                      color="red"
                      onClick={() => handleSignApply()}
                    >
                      신청하기
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      {isLoading && (
        <Button size="full" color="gray">
          잠시만 기다려 주세요...
        </Button>
      )}
    </>
  );
};

export default StoreDetailButtons;
