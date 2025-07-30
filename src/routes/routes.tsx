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
import AddCourse from "../pages/Dashbaord/Admin/AddCourse/AddCourse";
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
import AddCourseVideo from "../pages/Dashbaord/Admin/AddCourse/AddCourseVideo/AddCourseVideo";
import ProtectedRoute from './ProtectedRoute';
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import ReferralsAndPayouts from "../pages/Dashbaord/Admin/ReferralsAndPayouts/ReferralsAndPayouts";
import Signup from "../pages/Auth/Signup/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import EmailSent from "../pages/Auth/EmailSent/EmailSent";
import PaymentSuccessful from "../pages/PaymentSuccessful/PaymentSuccessful";
import WeeklyPayouts from "../pages/Dashbaord/Admin/WeeklyPayouts/WeeklyPayouts";


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
        element: <ProtectedRoute><Cart /></ProtectedRoute>,
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
        path: "signup",
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
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
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
    ],
  },
  {
    path: "course-video",
    element: <ProtectedRoute><CourseVideoLayout /></ProtectedRoute>,
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
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    errorElement: <NotFound />,
    children: [
      {
        path: "referrals-and-payouts",
        element: <ReferralsAndPayouts />,
      },
      {
        path: "courses",
        element: <AdminCourses />,
      },
      {
        path: "add-course",
        element: <AddCourse />,
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
    ],
  },
]);
