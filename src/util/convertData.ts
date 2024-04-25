// 응답 데이터 필요한 타입 정의

import type { Address } from "./api";

// 알바님(일반회원) 공고 지원 목록 데이터 타입
type ApplyListApiResponse = {
  items: {
    item: {
      id: string;
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
  items: {
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
}

export interface EmployerTableData extends CommonData {
  userName?: string;
  phoneNumber?: string;
  bio?: string;
}

//Table 컴포넌트에서 사용할 수 있도록 데이터를 변환하는 함수.
export const convertEmployeeTableData = (
  responseData: ApplyListApiResponse,
): EmployeeTableData[] => {
  return responseData.items.map((data) => {
    const { id, shop, notice, status } = data.item;
    return {
      apply_id: id,
      shopName: shop.item.name,
      hourlyPay: notice.item.hourlyPay,
      startsAt: notice.item.startsAt,
      workHour: notice.item.workhour,
      status: status,
    };
  });
};

export const convertEmployerTableData = (
  responseData: ApplicantListApiResponse,
): EmployerTableData[] => {
  return responseData.items.map((data) => {
    const { user, status } = data.item;
    return {
      apply_id: user.item.id,
      userName: user.item.name,
      phoneNumber: user.item.phone,
      bio: user.item.bio,
      status: status,
    };
  });
};
//쿼리 정렬 타입
export type SortType = "마감임박순" | "시급많은순" | "시간적은순" | "가나다순";
export type ConvertedSortType = "time" | "pay" | "hour" | "shop";
export interface AdvancedFilterQuery {
  address?: Address[];
  startsAtGte?: string;
  hourlyPayGte?: number;
}
export function convertSortType(sortType: SortType): ConvertedSortType {
  let convertedType: ConvertedSortType;
  switch (sortType) {
    case "마감임박순":
      convertedType = "time";
      break;
    case "시급많은순":
      convertedType = "pay";
      break;
    case "시간적은순":
      convertedType = "hour";
      break;
    case "가나다순":
      convertedType = "shop";
      break;
  }
  return convertedType;
}
