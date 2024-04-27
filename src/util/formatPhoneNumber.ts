export function formatPhoneNumber(phoneNum: string) {
  if (phoneNum.length === 10) {
    return phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  if (phoneNum.length > 10) {
    return phoneNum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phoneNum;
}