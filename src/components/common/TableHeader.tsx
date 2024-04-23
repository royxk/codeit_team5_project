interface Props {
  headerData: string[];
}

const TableHeader = ({ headerData }: Props) => {

  return (
    <thead>
      <tr className='bg-red-10 text-left text-sm h-[50px] mob:text-xs mob:h-[40px]'>
        {headerData.map((item, idx) => {
          return <th key={item} className={`bg-red-10 font-normal p-3 ${idx === 0 ? 'sticky z-10 left-0' : ''}`}>{item}</th>
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
