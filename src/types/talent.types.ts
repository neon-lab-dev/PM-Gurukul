
export type TTalent = {
  _id: string;
  userId: string;
  title: string;
  name: string;
  email: string;
  talentType: string;
  video: string;
  description: string;
  skills: string[];
  status: "Pending" | "Approved";
  createdAt: Date;
  updatedAt: Date;
};
