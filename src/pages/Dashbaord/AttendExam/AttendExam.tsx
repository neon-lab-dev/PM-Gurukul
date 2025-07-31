/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAttendExamMutation,
  useGetAllQuestionsOfCourseQuery,
} from "../../../redux/Features/Course/courseApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../types/user.types";
import LoadingSpinner from "../../../components/Loaders/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";

const AttendExam = () => {
  const navigate = useNavigate();
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const { id } = useParams();
  const { data, isLoading } = useGetAllQuestionsOfCourseQuery(id);
  const [attendExam] = useAttendExamMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const examId = data?.exam?._id;
      const studentId = user?._id;

      if (!examId) return console.error("Missing examId");

      const answers = data?.exam?.questions.map(
        (question: any, idx: number) => ({
          questionId: question._id,
          selectedOptionIndex: selectedOptions[idx] ?? null,
        })
      );

      const payload = {
        examId,
        studentId,
        answers,
      };

      const response = await attendExam(payload).unwrap();
      if (response) {
        navigate(`/dashboard/course/exam-result/${response?.data?._id}`);
      }
      console.log("Exam submitted:", response);
    } catch (err: any) {
      console.error("Submission failed:", err);
      toast.error(err?.data?.message);
    }
  };

  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number | null>
  >({});

  const options = [1, 2, 3, 4];

  return (
    <div className="font-Inter lg:w-[60%] w-full mx-auto">
      <Helmet>
        <title>PMGURUKKUL | Attend Exam</title>
      </Helmet>
      <div className="flex justify-between items-center w-full mx-auto">
        <h1 className="text-[#0F172A] font-semibold leading-7 tracking-tighter text-2xl">
          Attend Exam
        </h1>
      </div>
      <div className="flex flex-col  p-6 bg-white gap-6 rounded-2xl mt-5">
        {isLoading ? (
          <div className="flex flex-col gap-2 items-center justify-center mt-10">
            <div className="size-10 border-4 border-primary-10 border-t-transparent rounded-full animate-spin" />
            <p>Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
            {/* Render questions here */}
            {data?.exam?.questions?.map((question: any, idx: number) => (
              <div key={idx} className="mb-4">
                <h1 className="text-[#0F172A] font-semibold leading-7 tracking-tighter text-xl capitalize">
                  Q{`${idx + 1}. ${question.questionText}`}
                </h1>
                <h1 className="text-[#0F172A] leading-7 tracking-tighter mt-2">
                  Options
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  {question?.options?.map((opt: any, optIdx: number) => (
                    <div
                      key={optIdx}
                      className="flex items-center gap-2 w-full"
                    >
                      <div className="size-9 rounded-full bg-neutral-15/40 flex items-center justify-center font-semibold text-center text-primary-10">
                        {optIdx + 1}
                      </div>
                      <div className="bg-neutral-15/20 px-4 py-2 rounded-lg text-primary-10 font-medium w-[92%]">
                        {opt?.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 justify-center mt-10">
                  {options.map((option, optIdx) => (
                    <button
                      type="button"
                      key={optIdx}
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [idx]: option,
                        }))
                      }
                      className={`px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-500 transition duration-300 hover:text-white cursor-pointer ${
                        selectedOptions[idx] === option
                          ? "bg-blue-500 text-white"
                          : "bg-neutral-15/20"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-end gap-[10px] mt-4">
              <button
                type="button"
                className="px-4 py-2 text-[#091E42] bg-[#FAFBFB] border border-[#DFE2E6] rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#051539] text-white border border-[#DFE2E6] rounded-lg"
              >
                {isLoading ? <LoadingSpinner /> : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AttendExam;
