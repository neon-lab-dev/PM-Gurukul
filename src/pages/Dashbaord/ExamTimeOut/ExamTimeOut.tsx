import { useNavigate } from "react-router-dom";
import { ICONS } from "../../../assets";
import { useEffect, useState } from "react";

const ExamTimeOut = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/dashboard/my-courses");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" max-w-lg w-full text-center">
        <>
          <div className="flex flex-col items-center gap-3">
            <img src={ICONS.timeOut} alt="" className="w-44" />
            <h1 className="text-3xl font-bold text-red-600 mt-4">Timed Out!</h1>
            <div>
              <p className="text-lg text-gray-700 mb-2">
                Unfortunately, you have <strong>timed out</strong> the exam! You
                will be redirecting to the course page in {counter} second
                {counter !== 1 && "s"}...
              </p>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ExamTimeOut;
