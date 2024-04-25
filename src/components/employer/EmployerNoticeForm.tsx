"use client";
import React, { RefObject, useRef } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

interface EmployerNoticeForm {
  hourlyPay?: number;
  startDate?: Date;
  workHour?: number;
  noticeDescription?: string;
  onClick: (
    payRef: RefObject<HTMLInputElement>,
    dateRef: RefObject<HTMLInputElement>,
    hourRef: RefObject<HTMLInputElement>,
    descRef: RefObject<HTMLTextAreaElement>,
  ) => void;
}

const EmployerNoticeForm = ({
  hourlyPay,
  startDate,
  workHour,
  noticeDescription,
  onClick,
}: EmployerNoticeForm) => {
  const hourlyPayRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const workHourRef = useRef<HTMLInputElement>(null);
  const noticeDescriptionRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section className="grid grid-cols-3 gap-x-5">
      <Input
        inputType="WAGE"
        inputRef={hourlyPayRef}
        defaultValue={hourlyPay ? String(hourlyPay) : ""}
      />
      <Input
        inputType="DATE"
        inputRef={startDateRef}
        defaultValue={startDate ? String(startDate) : ""}
      />
      <Input
        inputType="WORK_HOUR"
        inputRef={workHourRef}
        defaultValue={workHour ? String(workHour) : ""}
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
        <Button
          size="full"
          color="red"
          onClick={() =>
            onClick(
              hourlyPayRef,
              startDateRef,
              workHourRef,
              noticeDescriptionRef,
            )
          }
        >
          {noticeDescription ? "수정하기" : "등록하기"}
        </Button>
      </div>
    </section>
  );
};

export default EmployerNoticeForm;
