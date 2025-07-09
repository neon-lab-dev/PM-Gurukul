/* eslint-disable @typescript-eslint/no-explicit-any */
export type TBankInfo = {
  accholderName: string;
  accNumber: string;
  accType: "Savings" | "Current" | "Other";
  ifscCode: string;
  bankName: string;
  bankBranch: string;
  nominName: string;
  nomiRelation: string;
};

export type TProfileData = {
  full_name: string;
  email: string;
  gender: string;
  language: string;
  dob: string;
  mobileNumber: string;
  occupation: string;
  country: string;
  state: string;
  city: string;
  pinCode: string;
  panNumber: string;
  adNumber: string;
  bankInfo: TBankInfo[];
  panImageFile: string;
  adImageFile: string;
  refralCode: string;
  addline1: string;
  addline2: string;
  gstNumber: string;
  gstCompanyName: string;
  document: {
    doctype: string;
    documentNumber: string;
    docImage: any;
  },
} & {
  // dynamic access for bankInfo properties
  [key: `bankInfo.${number}.${keyof TBankInfo}`]: any;
};