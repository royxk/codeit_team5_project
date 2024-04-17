import TableHeader from "./TableHeader";

interface TableProps<T> {
  headerData: string[];
  applyData: T[];
}

interface ApplyData {
  apply_id: string,
  status: string,
  shopName: string,
  hourlyPay: number,
  startsAt: string,
  workHour: number
  userName?: string;
  phoneNumber?: string;
  bio?: string;
}

function showDate(startDate: string, workHour: number) {
  return `${startDate}(${workHour}시간)`
}

/**
 * @param applyData 지원한 사람/지원한 공고 에 대한 데이터를 받아오는 파라미터입니다. 타입은 임시로 지정해 둔 것으로 이후 api 응답에 따라 차차 바뀔 예정입니다.
 */

const Table = <T extends ApplyData>({ headerData, applyData }: TableProps<T>) => {
  const isEmployee = headerData.includes("가게");
  
  return (
    <div className='m-4 relative w-full max-w-[964px] border border-gray-20 rounded-lg overflow-hidden tab:w-[680px] mob:w-[350px]'>
      <div className='overflow-x-auto' style={{ scrollbarWidth: 'none' }}>
        <table className='table-auto'>
          <TableHeader headerData={headerData}/>
          <tbody>
            {applyData.map((data) => {
              const statusLabel = data.status === "pending" ? "대기중"
                : data.status === "accepted" ? "승인 완료"
                : data.status === "rejected" ? "거절"
                : "취소";
              return (
                <tr key={data.apply_id} className='border-b border-gray-20'>
                  <td className='bg-white px-3 py-5 w-full min-w-[226px] sticky z-10 left-0'>
                    {isEmployee ? data.shopName : data.userName}
                  </td>
                  <td className='bg-white px-3 py-5 w-full min-w-[300px]'>
                    {isEmployee ? showDate(data.startsAt, data.workHour) : data.bio}
                  </td>
                  <td className='bg-white px-3 py-5 w-full min-w-[226px]'>
                    {isEmployee ? `${data.hourlyPay}원` : data.phoneNumber}
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
