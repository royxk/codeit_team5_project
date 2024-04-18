interface StatusLabelProp {
  status: Status;
}

export type Status = "pending" | "accepted" | "rejected" | "canceled";

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
    <div className={`${statusCss} border-none rounded-[20px] text-center px-[10px] py-[6px] font-bold text-sm`}>
      {labelName}
    </div>
  );
};

export default StatusLabel;