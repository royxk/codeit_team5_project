interface StatusLabelProp {
  status: Status;
}

type Status = "pending" | "accepted" | "rejected" | "canceled";

function StatusCssString(status: Status) {
  let statusCss;
  switch(status) {
    case "pending":
      statusCss = "bg-green-10 text-green-20 w-16";
      break;
    case "accepted":
      statusCss = "bg-blue-10 text-blue-20 w-20";
      break;
    default:
      statusCss = "bg-red-10 text-red-40 w-12";
      break;
  }

  return statusCss;
}

function LabelString(status: Status) {
  let labelName;
  switch(status) {
    case "pending":
      labelName= "대기중";
      break;
    case "accepted":
      labelName = "승인 완료";
      break;
    case "rejected":
    labelName = "거절";
    break;
    default:
      labelName = "취소";
      break;
  }

  return labelName;
}

const StatusLabel = ({ status }: StatusLabelProp) => {
  const statusCss = StatusCssString(status);
  const labelName = LabelString(status);
  return (
    <>
      <div className={`${statusCss} border-none rounded-[20px] text-center px-[10px] py-[6px] font-bold text-sm`}>
        {labelName}
      </div>
      <div className='flex gap-3'>
        <button type='button' className='flex items-center bg-white text-red-40 border border-red-40 rounded-md px-5 h-[38px] py-[10px] font-bold text-sm hover:bg-red-10'>
          거절하기
        </button>
        <button type='button' className='flex items-center bg-white text-blue-20 border border-blue-20 rounded-md h-[38px] px-5 py-[10px] font-bold text-sm hover:bg-blue-10'>
          승인하기
        </button>
      </div>
    </>
  );
};

export default StatusLabel;