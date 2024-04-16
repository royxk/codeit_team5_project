interface TableProps {
  pageType: string;
  applyData: unknown[];
};

const EMPLOYEE_TABLE_HEADER = ['가게', '일자', '시급', '상태'];
const EMPLOYER_TABLE_HEADER = ['신청자', '소개', '전화번호', '상태'];

function showDate(startDate: string, workHour: number) {
  return `${startDate}(${workHour}시간)`
}

/**
 * @param {string} pageType 컴포넌트를 사용할 페이지에 따라 table에 들어갈 데이터를 정하는 파라미터입니다.
 * @param {any[]} applyData 지원한 사람/지원한 공고 에 대한 데이터를 받아오는 파라미터입니다. 타입은 임시로 지정해 둔 것으로 이후 api 응답에 따라 차차 바뀔 예정입니다.
 */

const Table = ({ pageType = "employer", applyData }: TableProps) => {
  const isEmployee = pageType === "employee";
  const headerData = isEmployee ? EMPLOYEE_TABLE_HEADER : EMPLOYER_TABLE_HEADER;

  return (
    <div className='m-4 relative w-full max-w-[964px] border border-gray-20 rounded-lg overflow-hidden tab:w-[680px] mob:w-[350px]'>
      <div className='overflow-x-auto' style={{ scrollbarWidth: 'none' }}>
        <table>
          <thead>
            <tr className='bg-red-10 text-left text-sm'>
              {headerData.map((item, idx) => {
                return <th key={item} className={`bg-red-10 font-normal p-3 ${idx === 0 ? 'sticky z-10 left-0' : ''}`}>{item}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {applyData.map((data) => {
              const statusLabel = data.status === "pending" ? "대기중"
                : data.status === "accepted" ? "승인 완료"
                : data.status === "rejected" ? "거절"
                : "취소";
              return (
                <tr key={data.apply_id} className='border-b border-gray-20'>
                  <td className='bg-white p-3 w-full min-w-[226px] sticky z-10 left-0'>
                    {isEmployee ? data.shopName : data.userName}
                  </td>
                  <td className='bg-white p-3 w-full min-w-[300px]'>
                    {isEmployee ? showDate(data.startsAt, data.workHour) : data.bio}
                  </td>
                  <td className='bg-white p-3 w-full min-w-[226px]'>
                    {isEmployee ? `${data.hourlyPay}원` : data.phoneNumber}
                  </td>
                  <td className='bg-white p-3 w-full min-w-[226px]'>
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
