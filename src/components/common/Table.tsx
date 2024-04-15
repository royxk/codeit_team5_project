import * as React from 'react';

interface TableProps {
  pageType: string;
  applyData: any[];
};

const EMPLOYEE_TABLE_HEADER = ['가게', '날짜', '시급', '상태'];
const EMPLOYER_TABLE_HEADER = ['신청자', '소개', '전화번호', '상태'];

/**
 * @param {string} pageType 컴포넌트를 사용할 페이지에 따라 thead에 들어갈 데이터를 정하는 파라미터입니다.
 * @param {any[]} applyData 지원한 사람/지원한 공고 에 대한 데이터를 받아오는 파라미터입니다.타입은 임시로 지정해 둔 것으로 이후 api 응답에 따라 차차 바뀔 예정입니다.
 */

const Table = ({ pageType = "employer", applyData }: TableProps) => {
  const headerData = pageType === "employee" ? EMPLOYEE_TABLE_HEADER : EMPLOYER_TABLE_HEADER;

  return (
    <div className='m-4 relative w-full max-w-[964px] border border-gray-20 rounded-lg overflow-hidden mob:w-[328px]'>
      <div className='overflow-x-auto' style={{ scrollbarWidth: 'none' }}>
        <table className='table-fixed'>
          <thead>
            <tr className='bg-red-10 text-left text-sm'>
              {headerData.map((item, idx) => {
                return <th key={item} className={`bg-red-10 font-normal p-3 ${idx === 0 ? 'sticky z-10 left-0' : ''}`}>{item}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {applyData.map(({id, title, date, cost, status}) => {
              return (
                <tr key={id} className='border-b border-gray-20'>
                  <td className='bg-white p-3 w-full min-w-[226px] sticky z-10 left-0'>{title}</td>
                  <td className='bg-white p-3 w-full min-w-[226px]'>{date}</td>
                  <td className='bg-white p-3 w-full min-w-[226px]'>{cost}원</td>
                  <td className='bg-white p-3 w-full min-w-[226px]'>{status ? '승인 완료' : '거절'}</td>
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
