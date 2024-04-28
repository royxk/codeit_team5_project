"use client";
import { MouseEvent, useState } from "react";
import ApproveButtons from "./ApproveButtons";
import Pagination from "./Pagination";
import StatusLabel from "./StatusLabel";
import TableHeader from "./TableHeader";
import { formatApiDateData } from "@/util/formatDate";
import ModalPortal from "./ModalPortal";
import Modal from "./SignModal";

interface TableProps<T> {
  headerData: string[];
  applyData: T[];
}

interface ApplyData {
  apply_id: string;
  status: string;
  shopName?: string;
  hourlyPay?: number;
  startsAt?: string;
  workHour?: number;
  userName?: string;
  phoneNumber?: string;
  bio?: string;
}

/**
 * @param {string[]} headerData 테이블의 헤더 부분의 데이터를 받아오는 파라미터입니다.
 * @param {ApplyData} applyData 지원한 사람/지원한 공고 에 대한 데이터를 받아오는 파라미터입니다.
 */

const Table = <T extends ApplyData>({
  headerData,
  applyData,
}: TableProps<T>) => {
  const isEmployee = headerData.includes("가게");
  const [showModal, setShowModal] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [bioValue, setBioValue] = useState('');
  const currentPageData: any[] = [];

  for (let i = 0; i < applyData.length; i += 5) {
    currentPageData.push(applyData.slice(i, i + 5));
  }

  const handleData = (pageData: number) => {
    setPageData(currentPageData[pageData]);
  };
  
  const handleClick = (bio: string) => {
    setBioValue(bio)
    setShowModal(true);
  }

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    setShowModal(false);
  }

  return (
    <div className="relative w-full max-w-[964px] overflow-hidden rounded-lg border border-gray-20 mob:text-sm">
      <div className="overflow-x-auto hide-scrollbar">
        <table>
          <TableHeader headerData={headerData} />
          <tbody>
            {pageData.map((data) => {
              const {
                apply_id,
                status,
                shopName,
                hourlyPay,
                startsAt,
                workHour,
                userName,
                phoneNumber,
                bio,
              } = data;
              return (
                <>
                  <tr
                    key={apply_id}
                    className="h-[68px] border-b border-gray-20 mob:h-[50px]"
                  >
                    <td className="sticky left-0 z-10 w-full min-w-[226px] bg-white pl-3 mob:min-w-[188px]">
                      {isEmployee ? shopName : userName}
                    </td>
                    <td className="w-full min-w-[300px] bg-white pl-3 align-middle">
                      <div className="peer line-clamp-1">
                        {isEmployee
                          ? formatApiDateData(startsAt, workHour).join(" ")
                          : bio}
                      </div>
                      {!isEmployee &&
                        <div
                          className={`absolute mb-2 hidden w-[400px] line-clamp-3 rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 peer-hover:block peer-hover:opacity-100`}>
                          {bio}
                        </div>}
                    </td>
                    <td className="w-full min-w-[200px] bg-white pl-3">
                      {isEmployee ? `${hourlyPay}원` : phoneNumber}
                    </td>
                    <td className="w-full min-w-[236px] bg-white pl-3 mob:min-w-[168px]">
                      {!isEmployee && status === "pending" ? (
                        <ApproveButtons noticeApplyId={apply_id}/>
                      ) : (
                        <StatusLabel status={status} />
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination count={applyData.length} setCurrentPageData={handleData} />
      {/* <ModalPortal>
        {showModal && (
          <Modal
            onClose={handleOutsideClick}>
            <div>
              {bioValue}
            </div>
          </Modal>
        )}
      </ModalPortal> */}
    </div>
  );
};

export default Table;
