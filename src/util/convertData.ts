// 응답 데이터 필요한 타입 정의
// 알바님(일반회원) 공고 지원 목록 데이터 타입
type ApplyListApiResponse = {
  items:
    {
      item: {
        status: string;
        shop: {
          item: {
            name: string;
          };
        };
        notice: {
          item: {
            id: string;
            hourlyPay: number;
            startsAt: string;
            workhour: number;
          };
        };
      };
    }[];
  };

// 사장님(가게) 지원자 목록 데이터 타입
type ApplicantListApiResponse = {
  items:
    {
      item: {
        status: string;
        user: {
          item: {
            id: string;
            name?: string; // optional
            phone?: string; // optional
            bio?: string; // optional
          };
        };
      };
    }[];
  };

// 새로운 데이터 타입 정의
interface CommonData {
  apply_id: string;
  status: string;
}

export interface EmployeeTableData extends CommonData {
  shopName: string;
  hourlyPay: number;
  startsAt: string;
  workHour: number;
};

export interface EmployerTableData extends CommonData {
  userName?: string;
  phoneNumber?: string;
  bio?: string;
};

//Table 컴포넌트에서 사용할 수 있도록 데이터를 변환하는 함수.
export const convertEmployeeTableData = (responseData: ApplyListApiResponse): EmployeeTableData[] => {
  return responseData.items.map((data) => {
    const { shop, notice, status } = data.item;
    return {
      "apply_id": notice.item.id,
      "shopName": shop.item.name,
      "hourlyPay": notice.item.hourlyPay,
      "startsAt": notice.item.startsAt,
      "workHour": notice.item.workhour,
      "status": status,
    };
  });
};

export const convertEmployerTableData = (responseData: ApplicantListApiResponse): EmployerTableData[] => {
  return responseData.items.map((data) => {
    const { user, status } = data.item;
    return {
      "apply_id": user.item.id,
      "userName": user.item.name,
      "phoneNumber": user.item.phone,
      "bio": user.item.bio,
      "status": status,
    };
  });
};