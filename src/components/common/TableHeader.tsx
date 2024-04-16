interface Props {
  headerType: string;
}

const EMPLOYEE_TABLE_HEADER = ['가게', '일자', '시급', '상태'];
const EMPLOYER_TABLE_HEADER = ['신청자', '소개', '전화번호', '상태'];

const TableHeader = ({ headerType }: Props) => {
  const isEmployee = headerType === "employee";
  const headerData = isEmployee ? EMPLOYEE_TABLE_HEADER : EMPLOYER_TABLE_HEADER;

  return (
    <thead>
      <tr className='bg-red-10 text-left text-sm'>
        {headerData.map((item, idx) => {
          return <th key={item} className={`bg-red-10 font-normal p-3 ${idx === 0 ? 'sticky z-10 left-0' : ''}`}>{item}</th>
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
