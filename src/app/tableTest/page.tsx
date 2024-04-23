import EmployeeTable from '@/components/common/EmployeeTable';
import EmployerTable from '@/components/common/EmployerTable';
import React from 'react';

const TableTest = () => {
  return (
    <div className='m-6'>
      <EmployeeTable />
      <EmployerTable />
    </div>
  );
};

export default TableTest;