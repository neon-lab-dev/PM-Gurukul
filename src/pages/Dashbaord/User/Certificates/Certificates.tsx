import { HiDownload } from "react-icons/hi";
import { ICONS } from "../../../../assets";
import DashboardHeader from "../../../../components/Reusable/DashboardHeader/DashboardHeader";
import { pdf } from "@react-pdf/renderer";
import { CertificatePdf } from "./CertificatePdf";
import { useGetMyCertificatesQuery } from "../../../../redux/Features/Certificate/certificateApi";
import { formatDate } from "../../../../utils/formatDate";
import NoDataFound from "../../../../components/Shared/NoDataFound/NoDataFound";
import Spinner from "../../../../components/Loaders/Spinner/Spinner";

type TCertificate = {
  _id : string;
  certificateId : string;
  studentName: string;
  courseName: string;
  createdAt: string;

}
const Certificates = () => {
  const {data, isLoading} = useGetMyCertificatesQuery({});
  const handleDownload = async (certificate:TCertificate) => {
    const blob = await pdf(
      <CertificatePdf
      certificateId={certificate?.certificateId}
        studentName={certificate?.studentName}
        courseName={certificate?.courseName}
        date={formatDate(certificate?.createdAt)}
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

      {
        isLoading ?
        <div className="flex items-center justify-center mt-5">
                  <Spinner />
                </div>
                :
        data?.certificates?.length < 1 ?
        <div className="flex items-center justify-center mt-10">
          <NoDataFound message="You haven’t received any certificate."/>
        </div>
        :
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
       {
        data?.certificates?.map((certificate:TCertificate) => 
           <div key={certificate?._id} className="flex items-center justify-between bg-white border border-neutral-15/40 px-2 rounded-2xl">
          <div className="px-3 py-5">
            <h1 className="text-xl font-semibold text-neutral-90">
              {certificate?.courseName}
            </h1>
            <div className="flex flex-col mt-1">
              <p className="text-sm text-neutral-90 flex items-center gap-2">
                {" "}
                Certificate ID: {certificate?.certificateId}
              </p>
              {/* <p className="text-sm text-neutral-90">|</p> */}
              <p className="text-sm text-neutral-90 flex items-center gap-2">
                Issue Date : {formatDate(certificate?.createdAt)}
              </p>
            </div>

            <button
              onClick={() => handleDownload(certificate)}
              className="p-3 bg-primary-10 hover:bg-blue-10 transition duration-300 text-white rounded-lg text-xs font-semibold mt-5 flex items-center gap-2"
            >
              {/* {isLoading ? <LoadingSpinner /> : "Login"} */}
              Download Certificate <HiDownload className="text-lg" />
            </button>
          </div>
          <img src={ICONS.certificate} alt="" className="w-56" />
        </div>
        )
       }
      </div>
      }
    </div>
  );
};

export default Certificates;
