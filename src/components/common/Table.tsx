'use client';
import { useState } from "react";
import ApproveButtons from "./ApproveButtons";
import Pagination from "./Pagination";
import StatusLabel from "./StatusLabel";
import TableHeader from "./TableHeader";

interface TableProps<T> {
  headerData: string[];
  applyData: T[];
}


interface ApplyData {
  apply_id: string,
  status: string,
  shopName?: string,
  hourlyPay?: number,
  startsAt?: string,
  workHour?: number
  userName?: string;
  phoneNumber?: string;
  bio?: string;
}

/**
 * @param {string[]} headerData 테이블의 헤더 부분의 데이터를 받아오는 파라미터입니다.
 * @param {ApplyData} applyData 지원한 사람/지원한 공고 에 대한 데이터를 받아오는 파라미터입니다.
 */

const Table = <T extends ApplyData>({ headerData, applyData }: TableProps<T>) => {
  const isEmployee = headerData.includes("가게");
  const [pageData, setPageData] = useState([]);
  const currentPageData: any[] = [];
  
  for (let i = 0; i < applyData.length; i += 5) {
    currentPageData.push(applyData.slice(i, i + 5));
  }

  const handleData = (pageData: number) => {
    setPageData(currentPageData[pageData]);
  }

  return (
    <div className='relative w-full max-w-[964px] border border-gray-20 rounded-lg overflow-hidden mob:text-sm'>
      <div className='overflow-x-auto' style={{ scrollbarWidth: 'none' }}>
        <table className='table-auto'>
          <TableHeader headerData={headerData}/>
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
                bio
              } = data;
              return (
                <tr key={apply_id} className='border-b border-gray-20 max-h-[51px]'>
                  <td className='bg-white px-3 py-5 w-full min-w-[226px] sticky z-10 left-0'>
                    {isEmployee ? shopName : userName}
                  </td>
                  <td className='bg-white px-3 py-5 w-full min-w-[300px] align-middle'>
                    <div className='line-clamp-2'>
                      {isEmployee ? `${startsAt}(${workHour}시간)` : bio}
                    </div>
                  </td>
                  <td className='bg-white px-3 py-5 w-full min-w-[200px]'>
                    {isEmployee ? `${hourlyPay}원` : phoneNumber}
                  </td>
                  <td className='bg-white px-3 py-5 w-full min-w-[236px]'>
                    {!isEmployee && status === "pending" ? <ApproveButtons />
                      : <StatusLabel status={status}/>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination rawPageData={applyData} setCurrentPageData={handleData}/>
    </div>
  );
};

export default Table;
