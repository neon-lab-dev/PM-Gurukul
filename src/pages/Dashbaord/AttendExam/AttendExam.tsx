/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAttendExamMutation,
  useGetAllQuestionsOfCourseQuery,
} from "../../../redux/Features/Course/courseApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { TLoggedInUser } from "../../../types/user.types";
import LoadingSpinner from "../../../components/Loaders/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";
import { ICONS } from "../../../assets";

const AttendExam = () => {
  const navigate = useNavigate();
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const { id } = useParams();
  const { data, isLoading } = useGetAllQuestionsOfCourseQuery(id);
  const [attendExam, { isLoading: isSubmitting }] = useAttendExamMutation();

  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number | null>
  >({});
  console.log(selectedOptions);

  // Calculate total questions and initialize timer in seconds
  const totalQuestions = data?.exam?.questions?.length || 0;
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Set initial timeLeft when questions load
  useEffect(() => {
    if (totalQuestions > 0) {
      setTimeLeft(totalQuestions * 60); // 60 seconds per question
    }
  }, [totalQuestions]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      navigate("/dashboard/exam/time-out");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev! - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, navigate]);

  // Format timer minutes and seconds
  const minutes = Math.floor((timeLeft ?? 0) / 60);
  const seconds = (timeLeft ?? 0) % 60;

  // Submit handler for exam answers
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
        courseId: id,
        answers,
      };

      const response = await attendExam(payload).unwrap();

      if (response) {
        navigate(`/dashboard/course/exam-result/${response?.data?._id}`);
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      toast.error(err?.data?.message || "Failed to submit exam");
    }
  };

  return (
    <div className="font-Inter lg:w-[60%] w-full mx-auto">
      <Helmet>
        <title>PMGURUKKUL | Attend Exam</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h1 className="text-[#0F172A] font-semibold leading-7 tracking-tighter text-2xl">
          Submit your answers
        </h1>
        <div className="flex items-center gap-2">
          <img src={ICONS.timer} alt="timer" className="size-5" />
          <h1 className="text-[#db0000] leading-7 tracking-tighter text-xl">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes
          </h1>
        </div>
      </div>

      <div className="flex flex-col p-6 bg-white gap-6 rounded-2xl mt-5">
        {isLoading ? (
          <div className="flex flex-col gap-2 items-center justify-center mt-10">
            <div className="size-10 border-4 border-primary-10 border-t-transparent rounded-full animate-spin" />
            <p>Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
            {/* Render questions */}
            {!data?.exam?.questions ? (
              <p>No questions found</p>
            ) : (
              data?.exam?.questions?.map((question: any, idx: number) => (
                <div
                  key={idx}
                  className="mb-4 bg-neutral-15/30 p-5 rounded-2xl"
                >
                  <h1 className="text-[#0F172A] font-semibold leading-7 tracking-tighter text-xl capitalize">
                    Q{`${idx + 1}. ${question.questionText}`}
                  </h1>
                  <h1 className="text-[#0F172A] leading-7 tracking-tighter mt-2">
                    Options
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    {question?.options?.map((opt: any, optIdx: number) => (
                      <button
                        key={optIdx}
                        type="button"
                        className="flex items-center gap-2 w-full"
                        onClick={() =>
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [idx]: optIdx,
                          }))
                        }
                      >
                        <div
                          className={`size-9 rounded-full flex items-center justify-center font-semibold text-center ${
                            selectedOptions[idx] === optIdx
                              ? "bg-blue-500 text-white"
                              : "bg-white text-primary-10"
                          }`}
                        >
                          {optIdx + 1}
                        </div>
                        <div
                          className={`px-4 py-2 rounded-lg font-medium w-[92%] ${
                            selectedOptions[idx] === optIdx
                              ? "bg-blue-500 text-white"
                              : "bg-white text-primary-10"
                          }`}
                        >
                          {opt?.text}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}

            {data?.exam?.questions && (
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
                  {isSubmitting ? <LoadingSpinner /> : "Submit"}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default AttendExam;
