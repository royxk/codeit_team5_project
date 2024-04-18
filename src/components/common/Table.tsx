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

  return (
    <div className='relative w-full max-w-[964px] border border-gray-20 rounded-lg overflow-hidden'>
      <div className='overflow-x-auto' style={{ scrollbarWidth: 'none' }}>
        <table className='table-auto'>
          <TableHeader headerData={headerData}/>
          <tbody>
            {applyData.map((data) => {
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
              const statusLabel = status === "pending" ? "대기중"
                : status === "accepted" ? "승인 완료"
                : status === "rejected" ? "거절"
                : "취소";
              return (
                <tr key={apply_id} className='border-b border-gray-20'>
                  <td className='bg-white px-3 py-5 w-full min-w-[226px] sticky z-10 left-0'>
                    {isEmployee ? shopName : userName}
                  </td>
                  <td className='bg-white px-3 py-5 w-full min-w-[300px]'>
                    {isEmployee ? `${startsAt}(${workHour}시간)` : bio}
                  </td>
                  <td className='bg-white px-3 py-5 w-full min-w-[226px]'>
                    {isEmployee ? `${hourlyPay}원` : phoneNumber}
                  </td>
                  <td className='bg-white px-3 py-5 w-full min-w-[226px]'>
                    {statusLabel}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='flex justify-center p-6'>페이지네이션 컴포넌트</div>
    </div>
  );
};

export default Table;
