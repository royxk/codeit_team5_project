"use client";
import React, { RefObject, useRef, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import {
  addNoticeApiResponse,
  editSelectedNoticeApiResponse,
} from "@/util/api";
import { getCookie } from "@/util/cookieSetting";
import { usePathname } from "next/navigation";

interface EmployerNoticeForm {
  hourlyPay?: number;
  startDate?: Date;
  workHour?: number;
  noticeDescription?: string;
}

const EmployerNoticeForm = ({
  hourlyPay,
  startDate,
  workHour,
  noticeDescription,
}: EmployerNoticeForm) => {
  const hourlyPayRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const workHourRef = useRef<HTMLInputElement>(null);
  const noticeDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const currentUrl = usePathname();
  const isEditPage = currentUrl.includes("notice/");
  const noticeId = isEditPage
    ? currentUrl.split("notice/")[1].split("/edit")[0]
    : null;

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
        if (res.includes("Error:")) throw new Error();
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
        if (res.includes("Error:")) throw new Error();
      } catch {
        alert(
          "최저 시급보다 낮은 시급을 지급하거나, 과거 시간을 선택할 수는 없습니다!",
        );
      }
    }
  }

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
