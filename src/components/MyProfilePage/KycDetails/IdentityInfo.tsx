/* eslint-disable @typescript-eslint/no-explicit-any */
import SelectDropdown from "../../Reusable/Dropdown/SelectDropdown";
import TextInput from "../../Reusable/TextInput/TextInput";
import UploadInput from "../../Reusable/UploadInput/UploadInput";

type TIdentityInfo = {
  register?: any;
  errors?: any;
  selectedDocument?: string;
  setSelectedDocument?: (value: string) => void;
  frontFileNames?: { [key: string]: string };
  backFileNames?: { [key: string]: string };
  onFileChangeFront?: (name: string, file: File | null) => void;
  onFileChangeBack?: (name: string, file: File | null) => void;
};

const IdentityInfo: React.FC<TIdentityInfo> = ({ register, errors, selectedDocument, setSelectedDocument, onFileChangeFront, onFileChangeBack, frontFileNames, backFileNames }) => {
  console.log(selectedDocument);

  const documentLabel1 =
    selectedDocument === "Aadhar Card" ? "Aadhaar Card Image (Front Side)" :
      selectedDocument === "Pan Card" ? "PAN Card Image (Front Side)" :
        selectedDocument === "Driving License" ? "Driving License Image (Front Side)" :
          selectedDocument === "Voter ID" ? "Voter ID Image (Front Side)" :
            selectedDocument === "Passport" ? "Passport Image (Front Side)" :
              "Identity Proof Image";

  const documentLabel2 =
    selectedDocument === "Aadhar Card" ? "Aadhaar Card Image (Back Side)" :
      selectedDocument === "Pan Card" ? "PAN Card Image (Back Side)" :
        selectedDocument === "Driving License" ? "Driving License Image (Back Side)" :
          selectedDocument === "Voter ID" ? "Voter ID Image (Back Side)" :
            selectedDocument === "Passport" ? "Passport Image (Back Side)" :
              "Identity Proof Image";
              
  return (
    <div className="bg-white w-full rounded-2xl p-6">
      <div className="flex flex-col gap-4">
        <p className="text-neutral-90 font-semibold">Identity Information</p>

        <TextInput
          label="PAN Card"
          {...register?.("panNumber", {
            pattern: {
              value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
              message: "Enter a valid PAN Number",
            },
          })}
          error={errors?.panNumber}
          placeholder="Enter your PAN Number"
          isRequired={false}
        />

        <UploadInput
          label={"PAN Card Image"}
          name="identityProofFile"
          accept="image/*"
          error={errors?.identityProofFile || ""}
          fileName={frontFileNames?.identityProofFile || ""}
          onFileChange={onFileChangeFront || (() => { })}
          isRequired={false}
        />

        {/* Dropdown for selecting document type */}
        <SelectDropdown
          label="Document Type"
          options={["Aadhar Card", "Driving License", "Voter ID", "Passport"]}
          error={errors?.documentType}
          {...register?.("documentType")}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDocument?.(e.target.value)}
          isRequired={false}
        />

        {/* Conditionally Render Inputs Based on Selection */}
        {selectedDocument === "Aadhar Card" && (
          <TextInput
            label="Aadhaar Card"
            {...register?.("documentNumber", {
              pattern: {
                value: /^[2-9]{1}[0-9]{11}$/,
                message: "Enter a valid Aadhaar Number",
              },
            })}
            error={errors?.documentNumber}
            placeholder="Enter your Aadhaar Number"
            isRequired={false}
          />
        )}

        {selectedDocument === "Driving License" && (
          <TextInput
            label="Driving License"
            {...register?.("documentNumber", {
            })}
            error={errors?.documentNumber}
            placeholder="Enter your Driving License Number"
            isRequired={false}
          />
        )}

        {selectedDocument === "Voter ID" && (
          <TextInput
            label="Voter ID"
            {...register?.("documentNumber", {
            })}
            error={errors?.documentNumber}
            placeholder="Enter your Voter ID"
            isRequired={false}
          />
        )}

        {selectedDocument === "Passport" && (
          <TextInput
            label="Passport"
            {...register?.("documentNumber", {
            })}
            error={errors?.documentNumber}
            placeholder="Enter your Passport Number"
            isRequired={false}
          />
        )}

        {
          selectedDocument &&
          <UploadInput
            label={documentLabel1}
            name="identityProofFile"
            accept="image/*"
            error={errors?.identityProofFile || ""}
            fileName={frontFileNames?.identityProofFile || ""}
            onFileChange={onFileChangeFront || (() => { })}
          />
        }

        {
          selectedDocument &&
          <UploadInput
            label={documentLabel2}
            name="identityProofFile"
            accept="image/*"
            error={errors?.identityProofFile || ""}
            fileName={backFileNames?.identityProofFile || ""}
            onFileChange={onFileChangeBack || (() => { })}
          />
        }
      </div>
    </div>
  );
};

export default IdentityInfo;
