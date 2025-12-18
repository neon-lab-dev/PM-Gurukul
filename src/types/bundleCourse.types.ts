/* eslint-disable @typescript-eslint/no-explicit-any */
export type TBundleCourse = {
  _id: string;
  title: string;
  description: string;
  basePrice: number;
  discountedPrice: number;
  thumbnail: {
    public_id: string;
    url: string;
  };
  courseIds: any[];
};
