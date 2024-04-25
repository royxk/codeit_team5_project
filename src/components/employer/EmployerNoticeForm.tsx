"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import {
  addNoticeApiResponse,
  editSelectedNoticeApiResponse,
  searchSelectedNoticeApiResponse,
} from "@/util/api";
import { getCookie } from "@/util/cookieSetting";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { formatApiDateData } from "@/util/formatDate";

interface EmployerNoticeForm {
  hourlyPay?: number;
  startDate?: string;
  workHour?: number;
  noticeDescription?: string;
}

const EmployerNoticeForm = ({}: EmployerNoticeForm) => {
  const router = useRouter();

  const hourlyPayRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const workHourRef = useRef<HTMLInputElement>(null);
  const noticeDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const currentUrl = usePathname();
  const isEditPage = currentUrl.includes("notice/");
  const noticeId = isEditPage
    ? currentUrl.split("notice/")[1].split("/edit")[0]
    : null;

  const [hourlyPay, sethourlyPay] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [workHour, setWorkHour] = useState(0);
  const [noticeDescription, setNoticeDescription] = useState<string>("");

  const [payError, setPayError] = useState("");
  const [dateError, setDateError] = useState("");
  const [hourError, setHourError] = useState("");

  const handleInputBlur = (
    ref: RefObject<HTMLInputElement>,
    setErr: (errType: string) => void,
  ) => {
    setErr("");
    if (ref.current!.value === "") {
      setErr("BLANK_REQUIRE_VALUE");
    }
  };

  async function handleEditPage() {
    const shopId = getCookie("sid")!;
    const noticeData = await searchSelectedNoticeApiResponse(shopId, noticeId!);

    const hourlyPay = noticeData.item.hourlyPay;
    const workHour = noticeData.item.workhour;
    const startDate = formatApiDateData(noticeData.item.startsAt, workHour);
    const noticeDescription = noticeData.item.description;
    const startDateString = startDate[0] + "T" + startDate[1].split("~")[0];

    sethourlyPay(hourlyPay);
    setWorkHour(workHour);
    setNoticeDescription(noticeDescription);
    setStartDate(startDateString);
  }

  async function handleButtonClick() {
    const hourlyPay = hourlyPayRef.current!.value;
    const startDate = startDateRef.current!.value;
    const workHour = workHourRef.current!.value;
    const noticeDescription = noticeDescriptionRef.current!.value;
    let isError = false;
    const noticeData = [hourlyPay, startDate, workHour];

    noticeData.map((item, i) => {
      if (item === "") {
        isError = true;
      }
      return;
    });

    if (isError) {
      handleInputBlur(hourlyPayRef, setPayError);
      handleInputBlur(startDateRef, setDateError);
      handleInputBlur(workHourRef, setHourError);
      return;
    }
    const shopId = getCookie("sid")!;
    const localDate = new Date(startDate);

    // 시차를 고려하여 RFC 3339 형식으로 변환
    const rfc3339DateTime = localDate.toISOString().replace("0Z", "Z");

    if (isEditPage) {
      try {
        const res = await editSelectedNoticeApiResponse(shopId, noticeId!, {
          hourlyPay: Number(hourlyPay),
          startsAt: String(rfc3339DateTime),
          workhour: Number(workHour),
          description: noticeDescription,
        });
        if (typeof res === "string") throw new Error();
        router.push(`/employer/notice/${res.item.id}`);
      } catch {
        alert(
          "최저 시급보다 낮은 시급을 지급하거나, 과거 시간을 선택할 수는 없습니다!",
        );
      }
    } else {
      try {
        const res = await addNoticeApiResponse(shopId, {
          hourlyPay: Number(hourlyPay),
          startsAt: String(rfc3339DateTime),
          workhour: Number(workHour),
          description: noticeDescription,
        });
        if (typeof res === "string") throw new Error();

        router.push(`/employer/notice/${res.item.id}`);
      } catch {
        alert(
          "최저 시급보다 낮은 시급을 지급하거나, 과거 시간을 선택할 수는 없습니다!",
        );
      }
    }
  }

  useEffect(() => {
    if (isEditPage) {
      handleEditPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="grid grid-cols-3 gap-x-5">
      <Input
        inputType="WAGE"
        inputRef={hourlyPayRef}
        defaultValue={hourlyPay ? String(hourlyPay) : ""}
        errorType={payError}
        blurEvent={() => handleInputBlur(hourlyPayRef, setPayError)}
      />
      <Input
        inputType="DATE"
        inputRef={startDateRef}
        defaultValue={startDate ? String(startDate) : ""}
        errorType={dateError}
        blurEvent={() => handleInputBlur(startDateRef, setDateError)}
      />
      <Input
        inputType="WORK_HOUR"
        inputRef={workHourRef}
        defaultValue={workHour ? String(workHour) : ""}
        errorType={hourError}
        blurEvent={() => handleInputBlur(hourlyPayRef, setHourError)}
      />
      <label htmlFor="noticeDescription" className="mb-2 mt-6">
        공고 설명
      </label>
      <textarea
        id="noticeDescription"
        className="col-start-1 col-end-4 min-h-[10rem] resize-none overflow-y-auto rounded-md border-[1px] border-gray-30 bg-white px-5 py-4"
        ref={noticeDescriptionRef}
        defaultValue={noticeDescription}
      />
      <div className="col-start-2 mt-8">
        <Button size="full" color="red" onClick={() => handleButtonClick()}>
          {isEditPage ? "수정하기" : "등록하기"}
        </Button>
      </div>
    </section>
  );
};

export default EmployerNoticeForm;
