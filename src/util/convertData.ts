//응답 데이터 필요한 타입 정의
export type ApplyShopApiResponse = {
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

export interface ConvertApplyShopData {
  apply_id: string;
  shopName: string;
  hourlyPay: number;
  startsAt: string;
  workHour: number;
  status: string;
};

//Table 컴포넌트에서 사용할 수 있도록 데이터를 변환하는 함수.
export const convertApplyShopData = (responseData: ApplyShopApiResponse): ConvertApplyShopData[] => {
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
