/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICONS } from "../../../assets";
import PersonalInfo from "../../../components/MyProfilePage/PersonalInfo/PersonalInfo";
import IdentityInfo from "../../../components/MyProfilePage/KycDetails/IdentityInfo";
// import UploadProof from "../../../components/MyProfilePage/KycDetails/UploadProof";
import BankInfo from "../../../components/MyProfilePage/KycDetails/BankInfo";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../../redux/Features/User/userApi";
import { Helmet } from "react-helmet-async";
import UploadedProofs from "../../../components/MyProfilePage/UploadedProofs/UploadedProofs";
import KYCStatus from "../../../components/MyProfilePage/KycDetails/KYCStatus/KYCStatus";
import { TBankInfo, TProfileData } from "../../../types/profileData.types";
import { toast } from "sonner";
import { BankInfoField } from "../../Auth/SetupProfile/SetupProfile";
import Ripple from "../../../components/Reusable/Ripple/Ripple";
import { Link } from "react-router-dom";

const MyProfile = () => {
  // Getting loggedin user profile data
  const { data: user } = useGetMeQuery({});
  const [isKycClicked, setIsKycClicked] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<string>("");
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

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
      const bankData = user?.user?.bankInfo?.map((bank: TBankInfo) => ({
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

      if (updatedBankInfo.length === 0) {
        // Initialize with one empty bank object if empty
        updatedBankInfo.push({
          accholderName: "",
          accNumber: "",
          accType: "Savings",
          ifscCode: "",
          bankName: "",
          bankBranch: "",
          nominName: "",
          nomiRelation: "",
        });
      }

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

  // const [backFiles, setBackFiles] = useState({
  //     adImageFile: null,
  //     panImageFile: null,
  //     passbookImageFile: null,
  //     docImage: null,
  // });

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
  const handleUpdateProfileData = async (data: TProfileData) => {
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
      formData.append("gstNumber", data.gstNumber);
      formData.append("gstCompanyName", data.gstCompanyName);

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

      const response = await updateProfile(formData).unwrap();
      if (response?.user) {
        toast.success(response?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error((err as any)?.data?.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>PMGURUKKUL | My Profile</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img src={ICONS.ArrowLeft} alt="Profile" className="size-9" />
          <h1 className="text-2xl font-semibold text-neutral-90">My Profile</h1>
        </div>

        <div className="flex gap-5 justify-end">
          <div className="bg-white rounded-lg border border-neutral-75 p-4">
            <h1 className="">Referred By</h1>
            <h1 className="font-semibold">
              {user?.user?.referredBy?.full_name} (
              {user?.user?.referredBy?.email})
            </h1>
            <h1 className="font-semibold">
              <span className="font-normal">Referral Code : </span>
              {user?.user?.referredBy?.refralCode}
            </h1>
          </div>

          <div className="bg-white rounded-lg border border-neutral-75 p-4 flex flex-col items-center justify-center">
            <p>Submit Your KYC Information</p>
            <Ripple styles="rounded-xl w-full">
              <button
                onClick={() => setIsKycClicked(!isKycClicked)}
                type="button"
                className="mt-2 bg-primary-10 border border-neutral-55 py-[10px] px-4 text-white text-sm leading-5 font-semibold w-full rounded-lg text-center"
              >
                Submit
              </button>
            </Ripple>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleUpdateProfileData)}
        className="flex flex-col gap-8 mt-8"
      >
        <PersonalInfo register={register} errors={errors} />

        {isKycClicked && (
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
              <div className="flex flex-col gap-4">
                {(user?.user?.bankInfo?.length ? user.user.bankInfo : [{}]).map(
                  (_: TBankInfo, index: number) => (
                    <BankInfo
                      handleBankInfoChange={handleBankInfoChange}
                      key={index}
                      index={index}
                      register={register}
                      errors={errors}
                      handleFileChange={handleFileChange}
                    />
                  )
                )}

                {
                  user?.user?.passbookImage?.url &&
                  <div className="bg-white w-full rounded-2xl p-6 h-fit">
                  <div className="w-1/2">
                    <p>Pass Book Image</p>
                    {user?.user?.passbookImage?.url ? (
                      <img
                        src={user?.user?.passbookImage?.url}
                        alt=""
                        className={
                          "w-full mt-1 rounded-xl border border-neutral-65/40 min-h-[170px]"
                        }
                      />
                    ) : (
                      <p className={"text-neutral-90"}>No document submitted</p>
                    )}
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default MyProfile;
