import * as React from 'react';
import TableColumn from './TableColumn';
import TableHeader from './TableHeader';

interface shopData {
  id: number;
  title: string;
  date: string;
  cost: number;
  status: boolean;
}

type Props = {
  headerData: string[];
  data: shopData[]
};

const Table = ({ headerData, data }: Props) => {
  return (
    <>
      <div className='grid grid-cols-1 m-4 border border-gray-20 rounded-lg'>
        <TableHeader headerData={headerData}/>
        <TableColumn data={data}/>
      </div>
    </>
  );
};

export default Table;
