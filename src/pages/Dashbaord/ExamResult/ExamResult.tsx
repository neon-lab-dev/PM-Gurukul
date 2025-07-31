import { useParams } from "react-router-dom";
import { useGetSingleExamResultQuery } from "../../../redux/Features/Course/courseApi";
import { ICONS } from "../../../assets";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../types/user.types";

const ExamResult = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const { examId } = useParams();

  const { data, isLoading } = useGetSingleExamResultQuery(examId);
  console.log(data);

  if (isLoading) {
    return <div className="text-center py-10 text-lg">Loading result...</div>;
  }

  if (!data?.examResult) {
    return (
      <div className="text-center py-10 text-red-500">Result not found.</div>
    );
  }

  console.log(data?.examResult?.answers?.length);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" max-w-lg w-full text-center">
        {data?.examResult.passed ? (
          <div className="flex flex-col items-center gap-3">
            <img src={ICONS.trophy} alt="" className="w-72" />
            <h1 className="text-3xl font-bold text-green-600 mt-4">
              Congratulations {user?.name}!
            </h1>
            <div>
              <p className="text-lg text-gray-700 mb-2">
                You have <strong>passed</strong> the exam!
              </p>
              <p className="text-xl font-semibold text-green-700">
                Score: {data?.examResult.score} /{" "}
                {data?.examResult?.answers?.length}
              </p>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-[#051539] text-white border border-[#DFE2E6] rounded-lg"
            >
              View Certificate
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-3">
              <img src={ICONS.sad} alt="" className="w-44" />
              <h1 className="text-3xl font-bold text-red-600 mt-4">
                Sorry {user?.name}!
              </h1>
              <div>
                <p className="text-lg text-gray-700 mb-2">
                  Unfortunately, you did not pass the exam. Continue studying.
                </p>
                <p className="text-xl font-semibold text-red-700">
                  Score: {data?.examResult.score} /{" "}
                  {data?.examResult?.answers?.length}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExamResult;
