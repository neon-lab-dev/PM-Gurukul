// import React from "react";
// import { FieldError } from "react-hook-form";

// interface TextInputProps {
//   label: string;
//   name: string;
//   placeholder?: string;
//   type?: string;
//   error?: FieldError;
//   register?: (name: string, options: object) => void;
//   validation?: object;
// }

// const TextInput: React.FC<TextInputProps> = ({
//   label,
//   name,
//   placeholder = "",
//   type = "text",
//   error,
//   register,
//   validation = {},
// }) => {
//   return (
//     <div className="flex flex-col gap-2 font-Inter">
//       <label htmlFor={name} className="text-neutral-65">
//         {label}
//         <span className="text-red-500"> *</span>
//       </label>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         className={`px-[18px] py-[14px] rounded-lg bg-neutral-70 border ${
//           error ? "border-red-500" : "border-neutral-75"
//         }`}
//         {...(register ? register(name, validation) : {})}
//       />
//       {error && (
//         <span className="text-red-500 text-sm">{error.message}</span>
//       )}
//     </div>
//   );
// };

// export default TextInput;

import { forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;

  value?: string; // Add value for controlled input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange for controlled input
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, placeholder = "", type = "text", error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 font-Inter">
        <label htmlFor={name} className="text-neutral-65">
          {label}
          <span className="text-red-600"> *</span>
        </label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={`px-[18px] py-[14px] rounded-lg bg-neutral-70 border ${
            error ? "border-red-500" : "border-neutral-75"
          }`}
          {...rest}
        />
        {error?.message && (
          <span className="text-red-500 text-sm">{String(error.message)}</span>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
