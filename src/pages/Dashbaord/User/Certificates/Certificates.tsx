import { HiDownload } from "react-icons/hi";
import { ICONS } from "../../../../assets";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { pdf } from "@react-pdf/renderer";
import { CertificatePdf } from "./CertificatePdf";

const Certificates = () => {
  const handleDownload = async () => {
    const blob = await pdf(
      <CertificatePdf
        studentName="Rahul"
        courseName="Advanced Digital Marketing"
        date="August 12, 2023"
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "certificate.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="font-Inter">
      <DashboardHeader
        pageName="Certificates"
        pageDesc="Your achieved certificates"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        <div className="flex items-center justify-between bg-white border border-neutral-15/40 px-2 rounded-2xl">
          <div className="px-3 py-5">
            <h1 className="text-xl font-semibold text-neutral-90">
              BASIC OF GOAL SETTING
            </h1>
            <div className="flex flex-col mt-1">
              <p className="text-sm text-neutral-90 flex items-center gap-2">
                {" "}
                Certificate ID: PM-76487
              </p>
              {/* <p className="text-sm text-neutral-90">|</p> */}
              <p className="text-sm text-neutral-90 flex items-center gap-2">
                Issue Date : 15th Jul, 2025
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="p-3 bg-primary-10 hover:bg-blue-10 transition duration-300 text-white rounded-lg text-xs font-semibold mt-5 flex items-center gap-2"
            >
              {/* {isLoading ? <LoadingSpinner /> : "Login"} */}
              Download Certificate <HiDownload className="text-lg" />
            </button>
          </div>
          <img src={ICONS.certificate} alt="" className="w-56" />
        </div>
      </div>
    </div>
  );
};

export default Certificates;
