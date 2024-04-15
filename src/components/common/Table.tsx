import * as React from 'react';
import TableColumn from '../TableColumn';

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

const HEADER_COL_NAME = ['가게', '날짜', '시급', '상태']

const Table = (props:Props) => {
  return (
    <>
      <div className='grid grid-cols-1 w-4/6 m-4 border border-gray-20 rounded-lg'>
        <div className='grid grid-cols-4 bg-red-10 p-3 rounded-t-lg text-sm'>
          {HEADER_COL_NAME.map((colName) => {
            return <div key={colName}>{colName}</div>
          })}
        </div>
        <TableColumn data={EXAMPLE}/>
      </div>
    </>
  );
};

export default Table;
