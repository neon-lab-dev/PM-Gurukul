/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ICONS } from "../../../../assets";
import PersonalInfo from "../../../../components/MyProfilePage/PersonalInfo/PersonalInfo";
import { useForm } from "react-hook-form";
import IdentityInfo from "../../../../components/MyProfilePage/KycDetails/IdentityInfo";
import BankInfo from "../../../../components/MyProfilePage/KycDetails/BankInfo";
import { TBankInfo } from "../../../../types/profileData.types";
import KYCStatus from "../../../../components/MyProfilePage/KycDetails/KYCStatus/KYCStatus";
import UploadedProofs from "../../../../components/MyProfilePage/UploadedProofs/UploadedProofs";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useApproveKycMutation,
  useGetSingleUserByIdQuery,
  useRejectKycMutation,
  useUpdateUserDetailsMutation,
} from "../../../../redux/Features/Admin/adminApi";
import { toast } from "sonner";
import LoadingSpinner from "../../../../components/Loaders/LoadingSpinner/LoadingSpinner";
import Ripple from "../../../../components/Reusable/Ripple/Ripple";

type BankInfoField =
  | "accholderName"
  | "accNumber"
  | "accType"
  | "ifscCode"
  | "bankName"
  | "bankBranch"
  | "nominName"
  | "nomiRelation";

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
  };
} & {
  // dynamic access for bankInfo properties
  [key: `bankInfo.${number}.${keyof TBankInfo}`]: any;
};

const ViewAffiliate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // Getting user profile data
  const { data: user } = useGetSingleUserByIdQuery(id);
  const [approveKyc, { isLoading: isApproving }] = useApproveKycMutation();
  const [rejectKyc, { isLoading: isRejecting }] = useRejectKycMutation();
  const [updateUserDetails, { isLoading: isUpdating }] =
    useUpdateUserDetailsMutation();
  const [selectedDocument, setSelectedDocument] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TProfileData>();

  const [bankInfo, setBankInfo] = useState([
    {
      accholderName: "",
      accNumber: "",
      accType: "Savings",
      ifscCode: "",
      bankName: "",
      bankBranch: "",
      nominName: "",
      nomiRelation: "",
    },
  ]);

  useEffect(() => {
    if (user?.user?.bankInfo) {
      const bankData = user.user.bankInfo.map((bank: TBankInfo) => ({
        ...bank,
      }));
      setBankInfo(bankData);
    }
  }, [user]);

  const handleBankInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: BankInfoField
  ) => {
    setBankInfo((prev) => {
      const updatedBankInfo = [...prev];
      updatedBankInfo[0][field] = e.target.value;
      return updatedBankInfo;
    });
  };

  useEffect(() => {
    if (user) {
      setValue("full_name", user?.user?.full_name);
      setValue("email", user?.user?.email);
      setValue("mobileNumber", user?.user?.mobileNumber);
      setValue("gender", user?.user?.gender);
      const formattedDob = user?.user?.dob
        ? new Date(user.user.dob).toISOString().split("T")[0]
        : "";
      setValue("dob", formattedDob);
      setValue("city", user?.user?.city);
      setValue("state", user?.user?.state);
      setValue("country", user?.user?.country);
      setValue("addline1", user?.user?.addline1);
      setValue("addline2", user?.user?.addline2);
      setValue("pinCode", user?.user?.pinCode);
      setValue("occupation", user?.user?.occupation);
      setValue("language", user?.user?.language);
      setValue("refralCode", user?.user?.refralCode);
      setValue("document.documentNumber", user?.user?.document?.documentNumber);
      setValue("document.doctype", user?.user?.document?.doctype);
      setSelectedDocument(user?.user?.document?.doctype);
      setValue("panNumber", user?.user?.panCard?.panNumber);
      setValue("gstNumber", user?.user?.gstNumber);
      setValue("gstCompanyName", user?.user?.gstCompanyName);
      if (user?.user?.bankInfo) {
        user.user.bankInfo.forEach((bank: TBankInfo, index: number) => {
          setValue(
            `bankInfo.${index}.accholderName` as keyof TProfileData,
            bank.accholderName
          );
          setValue(
            `bankInfo.${index}.accNumber` as keyof TProfileData,
            bank.accNumber
          );
          setValue(
            `bankInfo.${index}.accType` as keyof TProfileData,
            bank.accType
          );
          setValue(
            `bankInfo.${index}.ifscCode` as keyof TProfileData,
            bank.ifscCode
          );
          setValue(
            `bankInfo.${index}.bankName` as keyof TProfileData,
            bank.bankName
          );
          setValue(
            `bankInfo.${index}.bankBranch` as keyof TProfileData,
            bank.bankBranch
          );
          setValue(
            `bankInfo.${index}.nominName` as keyof TProfileData,
            bank.nominName
          );
          setValue(
            `bankInfo.${index}.nomiRelation` as keyof TProfileData,
            bank.nomiRelation
          );
        });
      }
    }
  }, [user, setValue]);

  const handleApproveKyc = async () => {
    try {
      const response = await approveKyc(id).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success("KYC approved successfully!");
        navigate("/admin/affiliates");
      }
    } catch (err) {
      console.error("Error approving KYC:", err);
    }
  };

  const handleRejectKyc = async () => {
    try {
      const response = await rejectKyc(id).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success("KYC rejected");
        navigate("/admin/affiliates");
      }
    } catch (err) {
      console.error("Error rejecting KYC:", err);
    }
  };

  const [frontFileNames, setFrontFileNames] = useState({
    adImageFile: "",
    panImageFile: "",
    passbookImageFile: "",
    docImage: "",
  });

  const [backFileNames, setBackFileNames] = useState({
    adImageFile: "",
    panImageFile: "",
    passbookImageFile: "",
    docImage: "",
  });

  const [frontFiles, setFrontFiles] = useState({
    docFrontImageFile: null,
  });

  const [backFiles, setBackFiles] = useState({
    docBackImageFile: null,
  });

  // -------- For PAN Card ----- (Start)

  const [fileNames, setFileNames] = useState({
    panImageFile: "",
    passbookImageFile: "",
  });

  const [files, setFiles] = useState({
    panImageFile: null,
    passbookImageFile: null,
  });

  const handleFileChange = (name: string, file: File | null) => {
    if (file) {
      setFileNames((prev) => ({
        ...prev,
        [name]: file.name,
      }));
      setFiles((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };
  // -------- PAN Card end ------

  // Handle Front Image
  const handleFileChangeFront = (name: string, file: File | null) => {
    if (file) {
      setFrontFileNames((prev) => ({
        ...prev,
        [name]: file.name,
      }));
      setFrontFiles((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  // Handle Back Image
  const handleFileChangeBack = (name: string, file: File | null) => {
    if (file) {
      setBackFileNames((prev) => ({
        ...prev,
        [name]: file.name,
      }));
      setBackFiles((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  // Update details function
  const handleUpdateUserDetails = async (data: TProfileData) => {
    try {
      const formData = new FormData();

      // Appending text fields
      formData.append("full_name", data.full_name);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("dob", data.dob);
      formData.append("mobileNumber", data?.mobileNumber);
      formData.append("occupation", data.occupation);
      formData.append("country", data.country);
      formData.append("state", data.state);
      formData.append("city", data.city);
      formData.append("pinCode", data.pinCode);
      formData.append("panNumber", data.panNumber);
      formData.append("refralCode", data.refralCode);
      formData.append("addline1", data.addline1);
      formData.append("addline2", data.addline2);

      // Appending document details
      formData.append("doctype", selectedDocument);
      formData.append("documentNumber", data.document.documentNumber);

      // front side doc image
      if (frontFiles.docFrontImageFile) {
        if (frontFiles.docFrontImageFile) {
          formData.append("docFrontImageFile", frontFiles.docFrontImageFile);
        }
      }

      // back side doc image
      if (backFiles.docBackImageFile) {
        if (backFiles.docBackImageFile) {
          formData.append("docBackImageFile", backFiles.docBackImageFile);
        }
      }

      // Appending bank info
      formData.append("bankInfo", JSON.stringify(bankInfo));

      // Appending pan card image
      if (files.panImageFile)
        formData.append("panImageFile", files.panImageFile);
      // Appending pass book image
      if (files.passbookImageFile)
        formData.append("passbookImageFile", files.passbookImageFile);

      const response = await updateUserDetails({ id, formData }).unwrap();
      if (response?.user) {
        toast.success(response?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error((err as any)?.data?.message);
    }
  };

  return (
    <div className="flex flex-col p-6 bg-[#F8FAFC] gap-8 w-full">
      <div className="flex items-center w-full justify-between">
        <div className="flex gap-[10px] items-center">
          <Link to={"/admin/affiliates"}>
            <img src={ICONS.arrowLeft} className="w-9 h-9" alt="" />
          </Link>
          <span className="text-[#0F172A] font-Inter font-semibold leading-7 tracking-tighter text-2xl">
            View Affiliate
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          {/* Reject button that opens the modal */}
          <button
            onClick={handleRejectKyc}
            className="px-4 py-2 bg-error border-[1px] border-[#DFE2E6] rounded-lg text-white"
          >
            {isRejecting ? <LoadingSpinner /> : "Reject"}
          </button>

          <button
            disabled={isApproving}
            onClick={handleApproveKyc}
            className="px-4 py-2 bg-success border-[#051539] rounded-lg text-white"
          >
            {isApproving ? <LoadingSpinner /> : "Approve KYC"}
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdateUserDetails)}
        className="flex flex-col gap-8 mt-8"
      >
        <PersonalInfo register={register} errors={errors} />
        <div className="flex flex-col gap-4">
          <p className="text-neutral-90 font-semibold">KYC Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <KYCStatus kycStatus={user?.user?.kyc_status} />
              <IdentityInfo
                register={register}
                errors={errors}
                setSelectedDocument={setSelectedDocument}
                selectedDocument={selectedDocument}
                frontFileNames={frontFileNames}
                backFileNames={backFileNames}
                onFileChangeFront={handleFileChangeFront}
                onFileChangeBack={handleFileChangeBack}
                handleFileChange={handleFileChange}
                fileNames={fileNames}
              />
              {/* <UploadProof register={register} errors={errors} /> */}
              <UploadedProofs
                docName={user?.user?.document?.doctype}
                docImageFront={user?.user?.document?.docFrontImage?.url}
                docImageBack={user?.user?.document?.docBackImage?.url}
                panCardImage={user?.user?.panCard?.panImage?.url}
                passBookImage={user?.user?.passbookImage?.url}
              />
            </div>
            {user?.user?.bankInfo?.length > 0
              ? user?.user?.bankInfo?.map((_: TBankInfo, index: number) => (
                  <BankInfo
                    key={index}
                    handleBankInfoChange={handleBankInfoChange}
                    handleFileChange={handleFileChange}
                    fileNames={fileNames}
                    index={index}
                    register={register}
                    errors={errors}
                  />
                ))
              : [0].map((_, index) => (
                  <BankInfo
                    key={index}
                    handleBankInfoChange={handleBankInfoChange}
                    handleFileChange={handleFileChange}
                    fileNames={fileNames}
                    index={index}
                    register={register}
                    errors={errors}
                  />
                ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Ripple styles="rounded-xl">
            <Link
              to={"/admin/affiliates"}
              className="bg-neutral-60 border border-neutral-55 py-[10px] px-4 text-primary-10 text-sm leading-5 font-semibold w-full rounded-lg text-center flex items-center gap-2 justify-center"
            >
              Go Back
            </Link>
          </Ripple>
          <Ripple styles="rounded-xl">
            <button
              type="submit"
              className="bg-primary-10 border border-neutral-55 py-[10px] px-4 text-white text-sm leading-5 font-semibold w-full rounded-lg text-center"
            >
              {isUpdating ? "Loading..." : "Save Details"}
            </button>
          </Ripple>
        </div>
      </form>

      {/* ReasonForRejection Modal */}
      {/* <ReasonForRejection open={isModalOpen} onClose={closeModal} /> */}
    </div>
  );
};

export default ViewAffiliate;
