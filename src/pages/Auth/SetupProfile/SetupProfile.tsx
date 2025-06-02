/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import PersonalInfo from "../../../components/MyProfilePage/PersonalInfo/PersonalInfo";
import { useEffect, useState } from "react";
import { useSetupProfileMutation } from "../../../redux/Features/Auth/authApi";
import LoadingSpinner from "../../../components/Loaders/LoadingSpinner/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ICONS } from "../../../assets";
import { removeOtpDataFromLocalStorage } from "../../../utils/removeOtpDataFromLocalStorage";
import useOtpDataFromLocalStorage from "../../../hooks/useOtpDataFromLocalStorage";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/Features/Auth/authSlice";
import { Helmet } from "react-helmet-async";

type OtpFormData = {
    email: string;
    mobileNumber: string;
};

export type TSetupProfileData = {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
    gender: string;
    dob: string;
    mobileNumber: string;
    occupation: string;
    country: string;
    state: string;
    city: string;
    pinCode: string;
    panNumber: string;
    adNumber: string;
    addline1: string;
    addline2: string;
    bankInfo: [
        {
            accholderName: string;
            accNumber: string;
            accType: "Savings" | "Current" | "Other";
            ifscCode: string;
            bankName: string;
            bankBranch: string;
            nominName: string;
            nomiRelation: string;
        }
    ];
    // document: {
    doctype: string;
    documentNumber: string;
    docImage: any;
    // },
    panImageFile: any;
    adImageFile: any;
    passbookImageFile: any;
    refralCode: string;
};

export type BankInfoField = 'accholderName' | 'accNumber' | 'accType' | 'ifscCode' | 'bankName' | 'bankBranch' | 'nominName' | 'nomiRelation';

const SetupProfile = () => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    // Getting OTP data from localstorage
    const [otpData] = useOtpDataFromLocalStorage<OtpFormData>("otpData");
    // const [selectedDocument, setSelectedDocument] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<TSetupProfileData>();

    useEffect(() => {
        if (otpData) {
            setValue("mobileNumber", otpData.mobileNumber);
            setValue("email", otpData.email);
        }
    }, [otpData, setValue]);

    const navigate = useNavigate();


    const [setupProfile, { isLoading }] = useSetupProfileMutation();

    // const [bankInfo, setBankInfo] = useState([
    //     {
    //         accholderName: "",
    //         accNumber: "",
    //         accType: "Savings",
    //         ifscCode: "",
    //         bankName: "",
    //         bankBranch: "",
    //         nominName: "",
    //         nomiRelation: "",
    //     },
    // ]);

    // const [fileNames, setFileNames] = useState({
    //     adImageFile: "",
    //     panImageFile: "",
    //     passbookImageFile: "",
    //     docImage: "",
    // });

    // const [files, setFiles] = useState({
    //     adImageFile: null,
    //     panImageFile: null,
    //     passbookImageFile: null,
    //     docImage: null,
    // });

    // const handleFileChange = (name: string, file: File | null) => {
    //     if (file) {
    //         setFileNames((prev) => ({
    //             ...prev,
    //             [name]: file.name,
    //         }));
    //         setFiles((prev) => ({
    //             ...prev,
    //             [name]: file,
    //         }));
    //     }
    // };


    // const handleBankInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: BankInfoField) => {
    //     setBankInfo(prev => {
    //         const updatedBankInfo = [...prev];
    //         updatedBankInfo[0][field] = e.target.value;
    //         return updatedBankInfo;
    //     });
    // };


    const handleSetupProfile = async (data: TSetupProfileData) => {
        // if (files.adImageFile === null) {
        //     toast.error("Please upload Adhar Card Image");
        //     return;
        // } else if (files.panImageFile === null) {
        //     toast.error("Please upload PAN Card Image");
        //     return;
        // } else if (files.passbookImageFile === null) {
        //     toast.error("Please upload Passbook Image");
        //     return;
        // }
        if (!isChecked) {
            toast.error("Please agree to the Terms & Conditions");
            return;
        }

        try {
            const formData = new FormData();

            // Appending text fields
            formData.append('full_name', data.full_name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('confirm_password', data.confirm_password);
            formData.append('gender', data.gender);
            formData.append('dob', data.dob);
            if (otpData?.mobileNumber) {
                formData.append('mobileNumber', otpData?.mobileNumber);
            }
            formData.append('occupation', data.occupation);
            formData.append('country', data.country);
            formData.append('state', data.state);
            formData.append('city', data.city);
            formData.append('pinCode', data.pinCode);
            formData.append('panNumber', data.panNumber);
            formData.append('adNumber', data.adNumber);
            formData.append('refralCode', data.refralCode);
            formData.append('addline1', data.addline1);
            formData.append('addline2', data.addline2);

            // Appending document details
            // formData.append('doctype', selectedDocument);
            // formData.append('documentNumber', data.documentNumber);

            // Ensure docImage exists before appending
            // if (files.docImage) {
            //     if (files.docImage) {
            //         formData.append('docImage', files.docImage);
            //     }
            // }

            // Appending bank info
            // formData.append('bankInfo', JSON.stringify(bankInfo));

            // Appending image files
            // if (files.adImageFile) formData.append('adImageFile', files.adImageFile);
            // if (files.panImageFile) formData.append('panImageFile', files.panImageFile);
            // if (files.passbookImageFile) formData.append('passbookImageFile', files.passbookImageFile);

            const response = await setupProfile(formData).unwrap();
            if (response?.user) {
                toast.success(response?.message);
                // Setting user to redux store
                const user = {
                    _id: response?.user?._id,
                    name: response?.user?.full_name,
                    role: response?.user?.role,
                    email: response?.user?.email,
                    referralCode: response?.user?.refralCode,
                }
                dispatch(setUser({ user }));
                removeOtpDataFromLocalStorage();
                navigate("/dashboard/my-courses");
                localStorage.removeItem("otpData");
                reset();
            }
        } catch (err) {
            console.log(err);
            toast.error((err as any)?.data?.message);
        }
    };


    return (
        <>
            <Helmet>
                <title>PMGURUKKUL | Setup Profile</title>
            </Helmet>
            <div className="max-w-[1200px] mx-auto py-10">
                <form onSubmit={handleSubmit(handleSetupProfile)} className="flex flex-col gap-8">
                    <div className="flex items-center gap-3">
                        <Link to={"/auth/login"}>
                            <img src={ICONS.ArrowLeft} alt="Profile" className="size-8" />
                        </Link>
                        <h1 className="text-2xl font-semibold text-neutral-90">Setup Your Profile</h1>
                    </div>

                    <PersonalInfo register={register} errors={errors} mobileNumber={otpData?.mobileNumber} />

                    {/* <div className="flex flex-col gap-4">
                        <p className="text-neutral-90 font-semibold">KYC Details</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4">
                                <IdentityInfo register={register} errors={errors} setSelectedDocument={setSelectedDocument} selectedDocument={selectedDocument} fileNames={fileNames}
                                    onFileChange={handleFileChange}
                                />
                                
                            </div>
                            <BankInfo register={register} errors={errors} handleBankInfoChange={handleBankInfoChange} fileNames={fileNames}
                                onFileChange={handleFileChange} />
                        </div>
                    </div> */}
                    {/* Not being used */}
                    {/* <UploadProof
                                register={register}
                                errors={errors}
                                fileNames={fileNames}
                                onFileChange={handleFileChange}
                            /> */}

                    <div className="flex items-center gap-3">
                        <input id="confirmationCheckbox" type="checkbox" checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)} />
                        <label htmlFor="confirmationCheckbox" className="text-neutral-90 cursor-pointer">I've read and agree to the website <Link to={"/terms-and-conditions"} className="text-blue-10 underline">Terms & Conditions</Link></label>
                    </div>

                    <div className="flex items-center gap-5 justify-end">
                        <Link
                            to={"/auth/login"}
                            className="px-6 py-3 bg-error text-white rounded-xl text-lg font-semibold"
                        >
                            Cancel
                        </Link>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="px-6 py-3 bg-primary-10 text-white rounded-xl text-lg font-semibold">
                            {
                                isLoading ? <LoadingSpinner /> : "Submit"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SetupProfile;