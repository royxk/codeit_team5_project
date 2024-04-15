import * as React from 'react';

type Props = {};

const EXAMPLE= [
  {
    id: 1,
    title: 'HS 과일주스',
    date: '2023.04.15',
    cost: 15000,
    status: true,
  },
  {
    id: 2,
    title: '너구리네 라면집',
    date: '2023.04.12',
    cost: 12000,
    status: true,
  },
  {
    id: 3,
    title: '써니 레스토랑',
    date: '2023.04.16',
    cost: 21000,
    status: false,
  },
  {
    id: 4,
    title: '초가을집',
    date: '2023.04.19',
    cost: 18000,
    status: false,
  },
]

const Table = (props:Props) => {
  return (
    <>
    <div className='flex flex-col w-3/6 border border-gray-20 rounded-lg m-4'>
      <div className='grid grid-cols-4 bg-red-10 p-3 text-sm'>
        <div>가게</div>
        <div>날짜</div>
        <div>시급</div>
        <div>상태</div>
      </div>
      {EXAMPLE.map((item) => {
        return (
          <ul key={item.id} className='grid grid-cols-4 p-3 text-base'>
            <li>{item.title}</li>
            <li>{item.date}</li>
            <li>{item.cost}원</li>
            <li>{item.status ? '승인완료' : '거절'}</li>
          </ul>
        )
      })}
    </div>
    </>
  );
};

export default Table;
