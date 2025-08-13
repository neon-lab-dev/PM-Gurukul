/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";
import SelectDropdown from "../../Reusable/Dropdown/SelectDropdown";
import TextInput from "../../Reusable/TextInput/TextInput";
import { BankInfoField } from "../../../pages/Auth/SetupProfile/SetupProfile";
import UploadInput from "../../Reusable/UploadInput/UploadInput";

type TBankInfoProps = {
  register?: any;
  errors?: any;
  index?: number;
  handleBankInfoChange?: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>, field: BankInfoField) => void;
  fileNames?: { [key: string]: string };
  // onFileChange?: (name: string, file: File | null) => void;
  handleFileChange?: (name: string, file: File | null) => void;
};

const BankInfo: React.FC<TBankInfoProps> = ({
  register = () => ({}),
  errors = {},
  index = 0,
  handleBankInfoChange = () => { },
  fileNames,
  // onFileChange,
  handleFileChange,
}) => {
  return (
    <div className="bg-white w-full rounded-2xl p-6 h-fit">
      <div className="flex flex-col gap-4">
        <p className="text-neutral-90 font-semibold">Bank Information</p>
        <div className="flex flex-col xl:flex-row gap-4">
          <TextInput
            label="Account Holder Name"
            {...register(`bankInfo.${index}.accholderName`)}
            error={errors?.bankInfo?.[index]?.accholderName}
            placeholder="Enter Account Holder's Name"
            onChange={(e) => handleBankInfoChange(e, "accholderName")}
            isRequired={false}
          />
          <TextInput
            label="Account Number"
            {...register(`bankInfo.${index}.accNumber`, {
              pattern: {
                value: /^[0-9]*$/,
                message: "Enter a valid Account Number",
              },
            })}
            error={errors?.bankInfo?.[index]?.accNumber}
            placeholder="Enter Account Number"
            onChange={(e) => handleBankInfoChange(e, "accNumber")}
            isRequired={false}
          />
        </div>
        <SelectDropdown
          label="Account Type"
          {...register(`bankInfo.${index}.accType`)}
          error={errors?.bankInfo?.[index]?.accType}
          options={["Savings", "Current", "Other"]}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleBankInfoChange(e, "accType")}
          isRequired={false}
        />
        <TextInput
          label="IFSC Code"
          {...register(`bankInfo.${index}.ifscCode`, {
            pattern: {
              value: /^[A-Z]{4}[0][A-Z0-9]{6}$/,
              message: "Enter a valid IFSC Code",
            },
          })}
          error={errors?.bankInfo?.[index]?.ifscCode}
          placeholder="Enter IFSC Code"
          onChange={(e) => handleBankInfoChange(e, "ifscCode")}
          isRequired={false}
        />
        <div className="flex flex-col xl:flex-row gap-4 w-full">
          <TextInput
            label="Bank Name"
            {...register(`bankInfo.${index}.bankName`)}
            error={errors?.bankInfo?.[index]?.bankName}
            placeholder="Enter Bank Name"
            onChange={(e) => handleBankInfoChange(e, "bankName")}
            isRequired={false}
          />
          <TextInput
            label="Branch Name"
            {...register(`bankInfo.${index}.bankBranch`)}
            error={errors?.bankInfo?.[index]?.bankBranch}
            placeholder="Enter Branch Name"
            onChange={(e) => handleBankInfoChange(e, "bankBranch")}
            isRequired={false}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-4">
          <TextInput
            label="Nominee Name"
            {...register(`bankInfo.${index}.nominName`)}
            error={errors?.bankInfo?.[index]?.nominName}
            placeholder="Enter Nominee Name"
            onChange={(e) => handleBankInfoChange(e, "nominName")}
            isRequired={false}
          />
          <TextInput
            label="Nominee Relation"
            {...register(`bankInfo.${index}.nomiRelation`)}
            error={errors?.bankInfo?.[index]?.nomiRelation}
            placeholder="Enter Nominee Relation"
            onChange={(e) => handleBankInfoChange(e, "nomiRelation")}
            isRequired={false}
          />
        </div>
        <UploadInput
          label="Cancel Cheque/Passbook Image"
          name="passbookImageFile"
          accept="image/*"
          error={errors?.passbookImageFile || ""}
          fileName={fileNames?.passbookImageFile || ""}
          onFileChange={handleFileChange || (() => { })}
          isRequired={false}
        />
      </div>
    </div>
  );
};

export default BankInfo;
