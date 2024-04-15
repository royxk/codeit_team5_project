import * as React from 'react';

type Props =  {
  headerData: string[];
}

const TableHeader = ({ headerData }: Props) => {
  return (
    <>
      <div className='grid grid-cols-4 bg-red-10 p-3 rounded-t-lg text-sm'>
          {headerData.map((colName) => {
            return <div key={colName}>{colName}</div>
          })}
      </div>
    </>
  );
};

export default TableHeader;
