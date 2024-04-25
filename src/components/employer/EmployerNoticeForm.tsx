"use client";
import React from "react";
import Input from "../common/Input";
import Button from "../common/Button";

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
  return (
    <section className="grid grid-cols-3 gap-x-5">
      <Input inputType="WAGE" />
      <Input inputType="DATE" />
      <Input inputType="WORK_HOUR" />
      <label htmlFor="noticeDescription" className="mb-2 mt-6">
        공고 설명
      </label>
      <textarea
        id="noticeDescription"
        className="col-start-1 col-end-4 min-h-[10rem] resize-none overflow-y-auto rounded-md border-[1px] border-gray-30 bg-white px-5 py-4"
      />
      <div className="col-start-2 mt-8">
        <Button size="full" color="red" onClick={() => {}}>
          {noticeDescription ? "수정하기" : "등록하기"}
        </Button>
      </div>
    </section>
  );
};

export default EmployerNoticeForm;
