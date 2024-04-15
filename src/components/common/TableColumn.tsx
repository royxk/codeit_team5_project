import * as React from 'react';

type Props = {
  data: any[]
};

const TableColumn = ({ data } : Props) => {
  return (
    <>
        {data.map((item: any) => {
            return (
              <div key={item.id} className='grid grid-cols-4 text-base border-t border-gray-20 p-3'>
                <div>{item.title}</div>
                <div>{item.date}</div>
                <div>{item.cost}원</div>
                <div>{item.status ? '승인완료' : '거절'}</div>
              </div>
            )
          })}
    </>
  );
};

export default TableColumn;
