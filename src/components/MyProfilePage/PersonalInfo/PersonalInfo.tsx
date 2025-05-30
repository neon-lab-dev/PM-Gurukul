/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import SelectDropdown from "../../Reusable/Dropdown/SelectDropdown";
import { ICONS } from "../../../assets";
import { useLocation } from "react-router-dom";
import { stateOptions } from "./stateData";

type TPersonalInfo = {
  register?: any;
  errors?: any;
  mobileNumber?: string | number;
};

const PersonalInfo: React.FC<TPersonalInfo> = ({ register, errors, mobileNumber }) => {
  const location = useLocation();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
  const genderOptions = ["Male", "Female", "Other"];
  const countryOptions: string[] = ["India"];
  const occupationOptions: string[] = [
    "Students",
    "Working professionals",
    "Housewife",
    "Entrepreneurs",
    "Artists",
    "Healthcare workers",
    "Educators",
    "Service industry workers",
    "Engineers",
    "Lawyers",
    "Accountants",
    "Sales professionals",
    "Scientists",
    "Social workers",
    "Tradespeople (e.g. plumbers, electricians)",
    "Military personnel",
    "Public servants (e.g. government employees)",
    "Freelancers",
    "Information technology professionals",
    "Writers and journalists",
    "Unemployed",
    "Retired",
    "Self-Employed",
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Marketing Specialist",
    "Graphic Designer",
    "Doctor",
    "Nurse",
    "Teacher",
    "Professor",
    "Architect",
    "Civil Engineer",
    "Mechanical Engineer",
    "Electrical Engineer",
    "Pharmacist",
    "Chef",
    "Financial Analyst",
    "Dentist",
    "Veterinarian",
    "Police Officer",
    "Firefighter",
    "Journalist",
    "Writer",
    "Musician",
    "Pilot",
    "Flight Attendant",
    "Sales Manager",
    "HR Manager",
    "Business Analyst",
    "UX Designer",
    "Cybersecurity Analyst",
    "Real Estate Agent",
    "Event Planner",
    "Photographer",
    "Interior Designer"
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-neutral-90 font-semibold">Personal Information</p>
      <div
        className="bg-white w-full rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-8">
          <TextInput
            label="Full Name"
            // name="fullName"
            placeholder="Enter full name"
            error={errors.full_name}
            {...register("full_name", {
              required: "Full Name is required",
            })} />

          <TextInput
            label="Email ID"
            placeholder="Enter your email"
            type="email"
            isDisabled={true}
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {/* Password Input */}
          {
            location.pathname === "/auth/setup-profile" &&
            <>
              <div className="relative">
                <TextInput
                  label="Password"
                  placeholder="Enter your password"
                  type={isPasswordVisible ? "text" : "password"}
                  error={errors.password}
                  {...register("password", { required: "Password is required" })}
                />
                <img
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  src={isPasswordVisible ? ICONS.eyeOpen : ICONS.eyeClose}
                  alt="eye-icon"
                  className="size-5 cursor-pointer absolute top-[50px] bottom-0 right-3"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <TextInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  error={errors.confirm_password}
                  {...register("confirm_password", { required: "Confirm password is required" })}
                />
                <img
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  src={isConfirmPasswordVisible ? ICONS.eyeOpen : ICONS.eyeClose}
                  alt="eye-icon"
                  className="size-5 cursor-pointer absolute top-[50px] bottom-0 right-3" />
              </div>
            </>
          }

          <SelectDropdown
            label="Gender"
            options={genderOptions}
            error={errors.gender}
            {...register("gender", {
              required: "Gender is required",
            })}
          />

          <TextInput
            label="Date of Birth"
            placeholder="DD/MM/YYYY"
            type="date"
            error={errors.dob}
            {...register("dob", {
              required: "Date of Birth is required",
              validate: (value: any) => {
                const today = new Date();
                const dob = new Date(value);
                const age = today.getFullYear() - dob.getFullYear();
                const isBirthdayPassed =
                  today.getMonth() > dob.getMonth() ||
                  (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
                const adjustedAge = isBirthdayPassed ? age : age - 1;

                return adjustedAge >= 18 || "You must be at least 18 years old.";
              },
            })}
          />

          <TextInput
            label="Mobile Number"
            placeholder="Enter your mobile number"
            type="tel"
            error={errors.mobileNumber}
            {...register("mobileNumber", {
              required: "Mobile Number is required",
              pattern: {
                value: /^\+?[1-9]\d{1,14}$/,
                message: "Enter a valid mobile number",
              }, minLength: {
                value: 10,
                message: "Mobile Number must be at least 10 characters",
              },
              maxLength: {
                value: 10,
                message: "Mobile Number must be at most 10 characters",
              },
            })}
            defaultValue={mobileNumber ? mobileNumber : ""}
            isDisabled={true}
          />
          {/* <TextInput
            label="Occupation"
            placeholder="Enter your occupation"
            error={errors.occupation}
            {...register("occupation", {
              required: "Occupation is required",
            })} /> */}

          <SelectDropdown
            label="Occupation"
            options={occupationOptions}
            error={errors.occupation}
            {...register("occupation", {
              required: "Occupation is required",
            })}
          />

          <SelectDropdown
            label="Country"
            options={countryOptions}
            error={errors.country}
            {...register("country", {
              required: "country is required",
            })}
          />
          <SelectDropdown
            label="State"
            options={stateOptions}
            error={errors.state}
            {...register("state", {
              required: "State is required",
            })}
          />
          <TextInput
            label="Pin Code"
            placeholder="Enter your pincode"
            error={errors.pinCode}
            {...register("pinCode", {
              required: "Pin code is required",
            })}
          />
          <TextInput
            label="Address Line 1"
            placeholder="Enter your address"
            error={errors.city}
            {...register("addline1", {
              required: "Address is required",
            })}
          />
          <TextInput
            label="Address Line 2"
            placeholder="Enter your address"
            error={errors.city}
            {...register("addline2")}
            isRequired={false}
          />
          <TextInput
            label="City"
            placeholder="Enter your city"
            error={errors.city}
            {...register("city", {
              required: "City is required",
            })}
          />
          <TextInput
            label="Referral Code"
            placeholder="Enter your referral Code"
            error={errors.city}
            {...register("refralCode", {
              required: "Referral Code is required",
            })}
          />
          <TextInput
            label="GST Number"
            placeholder="Enter your GST number"
            error={errors.city}
            {...register("gstNumber")}
            isRequired={false}
          />
          <TextInput
            label="GST Company Name"
            placeholder="Enter your GST Company Name"
            error={errors.city}
            {...register("gstCompanyName")}
            isRequired={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
