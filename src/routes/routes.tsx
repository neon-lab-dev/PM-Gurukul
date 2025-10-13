import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import ContactUs from "../pages/ContactUs/ContactUs";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Courses from "../pages/Courses/Courses";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import VerifyPhoneNumber from "../pages/Auth/VerifyPhoneNumber/VerifyPhoneNumber";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/Dashbaord/DashboardHome/DashboardHome";
import MyCourses from "../pages/Dashbaord/MyCourses/MyCourses";
import MyProfile from "../pages/Dashbaord/MyProfile/MyProfile";
import ReferralPayouts from "../pages/Dashbaord/ReferralPayouts/ReferralPayouts";
import KYC from "../pages/Dashbaord/KYC/KYC";
import KYCFormPage from "../pages/Dashbaord/KYC/KYCFormPage";
import MyCourseVideo from "../pages/Dashbaord/MyCourses/MyCourseVideo";
import KYCStatusPage from "../pages/Dashbaord/KYC/KYCStatusPage";
import CourseVideoLayout from "../layouts/CourseVideoLayout/CourseVideoLayout";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import Cart from "../pages/Cart/Cart";
import AdminCourses from "../pages/Dashbaord/Admin/Courses/Courses";
import OrderDetails from "../pages/Dashbaord/Admin/OrderDetails/OrderDetails";
import Payouts from "../pages/Dashbaord/Admin/Payouts/Payouts";
import Affiliates from "../pages/Dashbaord/Admin/Affiliates/Affiliates";
import RegisteredUsers from "../pages/Dashbaord/Admin/RegisteredUsers/RegisteredUsers";
import TalentList from "../pages/Dashbaord/Admin/TalentList/TalentList";
import PurchaseHistory from "../pages/Dashbaord/Admin/PurchaseHistory/PurchaseHistory";
import ViewAffiliate from "../pages/Dashbaord/Admin/ViewAffiliate/ViewAffiliate";
import SetupProfile from "../pages/Auth/SetupProfile/SetupProfile";
import MyOrders from "../pages/Dashbaord/User/MyOrders/MyOrders";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import AboutUS from "../pages/AboutUS/AboutUS";
import Disclaimer from "../pages/Disclaimer/Disclaimer";
import ProtectedRoute from "./ProtectedRoute";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import ReferralsAndPayouts from "../pages/Dashbaord/Admin/ReferralsAndPayouts/ReferralsAndPayouts";
import Signup from "../pages/Auth/Signup/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import EmailSent from "../pages/Auth/EmailSent/EmailSent";
import PaymentSuccessful from "../pages/PaymentSuccessful/PaymentSuccessful";
import WeeklyPayouts from "../pages/Dashbaord/Admin/WeeklyPayouts/WeeklyPayouts";
import ManageExamQuestion from "../pages/Dashbaord/Admin/ManageExamQuestion/ManageExamQuestion";
import AttendExam from "../pages/Dashbaord/AttendExam/AttendExam";
import ExamResult from "../pages/Dashbaord/ExamResult/ExamResult";
import ExamTimeOut from "../pages/Dashbaord/ExamTimeOut/ExamTimeOut";
import AdminDashboardHome from "../pages/Dashbaord/Admin/AdminDashboardHome/AdminDashboardHome";
import Certificates from "../pages/Dashbaord/User/Certificates/Certificates";
import AddOrUpdateCourse from "../pages/Dashbaord/Admin/AddOrUpdateCourse/AddOrUpdateCourse";
import AddCourseVideo from "../pages/Dashbaord/Admin/AddOrUpdateCourse/AddCourseVideo/AddCourseVideo";
import ShowcaseTalent from "../pages/Dashbaord/ShowcaseTalent/ShowcaseTalent";
import TalentDetails from "../pages/Dashbaord/ShowcaseTalent/TalentDetails";
import ManageTestimonials from "../pages/Dashbaord/Admin/ManageTestimonials/ManageTestimonials";
import ManagePhotoGallery from "../pages/Dashbaord/Admin/ManagePhotoGallery/ManagePhotoGallery";
import Leaderboard from "../pages/Dashbaord/Leaderboard/Leaderboard";
import WelcomeLetter from "../pages/Dashbaord/WelcomeLetter/WelcomeLetter";
import ReferralLink from "../pages/Dashbaord/ReferralLink/ReferralLink";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/course/:id",
        element: <CourseDetails />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/about-us",
        element: <AboutUS />,
      },
      {
        path: "/disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/payment-successful/:paymentId",
        element: <PaymentSuccessful />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "signup/:referralCode",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "email-sent",
        element: <EmailSent />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "verify-phone",
        element: <VerifyPhoneNumber />,
      },
      {
        path: "setup-profile",
        element: <SetupProfile />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "my-courses",
        element: <MyCourses />,
      },
      {
        path: "referral",
        element: <ReferralPayouts />,
      },
      {
        path: "kyc",
        element: <KYC />,
      },
      {
        path: "kyc-register",
        element: <KYCFormPage />,
      },
      {
        path: "kyc-status",
        element: <KYCStatusPage />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "course/attend-exam/:id",
        element: <AttendExam />,
      },
      {
        path: "course/exam-result/:examId",
        element: <ExamResult />,
      },
      {
        path: "exam/time-out",
        element: <ExamTimeOut />,
      },
      {
        path: "certificates",
        element: <Certificates />,
      },
      {
        path: "showcase-talent",
        element: <ShowcaseTalent />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "welcome-letter",
        element: <WelcomeLetter />,
      },
      {
        path: "referral-link",
        element: <ReferralLink />,
      },
    ],
  },
  {
    path: "course-video",
    element: (
      <ProtectedRoute>
        <CourseVideoLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "my-course-video/:id",
        element: <MyCourseVideo />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "referrals-and-payouts",
        element: <ReferralsAndPayouts />,
      },
      {
        path: "dashboard",
        element: <AdminDashboardHome />,
      },
      {
        path: "courses",
        element: <AdminCourses />,
      },
      {
        path: "course/:action",
        element: <AddOrUpdateCourse />,
      },
      {
        path: "add-course-video/:id",
        element: <AddCourseVideo />,
      },
      {
        path: "order-details/:id",
        element: <OrderDetails />,
      },
      {
        path: "payouts",
        element: <Payouts />,
      },
      {
        path: "weekly-payouts",
        element: <WeeklyPayouts />,
      },
      {
        path: "affiliates",
        element: <Affiliates />,
      },
      {
        path: "registered-users",
        element: <RegisteredUsers />,
      },
      {
        path: "talent-list",
        element: <TalentList />,
      },
      {
        path: "registered-users",
        element: <RegisteredUsers />,
      },
      {
        path: "purchase-history",
        element: <PurchaseHistory />,
      },
      {
        path: "view-affiliate/:id",
        element: <ViewAffiliate />,
      },
      {
        path: "course/manage-exam/:courseId",
        element: <ManageExamQuestion />,
      },
      {
        path: "talents",
        element: <ShowcaseTalent />,
      },
      {
        path: "talent/:id",
        element: <TalentDetails />,
      },
      {
        path: "manage-testimonials",
        element: <ManageTestimonials />,
      },
      {
        path: "manage-photo-gallery",
        element: <ManagePhotoGallery />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
]);
