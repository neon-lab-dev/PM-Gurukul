export type TUser = {
    panCard: {
      panImage: {
        public_id: string;
        url: string;
      };
      panNumber: string;
    };
    addharCard: {
      adImage: {
        public_id: string;
        url: string;
      };
      adNumber: string;
    };
    passbookImage: {
      public_id: string;
      url: string;
    };
    earnings: {
      total: number;
    };
    _id: string;
    email: string;
    mobileNumber: string;
    referredBy: string | null;
    role: "user" | "admin" | "instructor";
    verified: boolean;
    kyc_status: "Pending" | "Approved" | "Rejected";
    otp: string | null;
    otp_expiry: string | null;
    purchasedCourses: string[];
    createdAt: string;
    bankInfo: {
      accholderName: string;
      accNumber: string;
      accType: "Savings" | "Current";
      ifscCode: string;
      bankName: string;
      bankBranch: string;
      nominName: string;
      nomiRelation: string;
      _id: string;
    }[];
    __v: number;
    city: string;
    country: string;
    dob: string;
    full_name: string;
    gender: "Male" | "Female" | "Other";
    language: string;
    occupation: string;
    pinCode: string;
    refralCode: string;
    state: string;
    status : "active" | "suspended"
    assignedPages : string[];
  };

  export type TLoggedInUser = {
    _id: string;
    name: string;
    role: "user" | "admin";
    email: string;
    referralCode: string;
    assignedPages : string[];
  };
  