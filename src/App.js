import "./App.css";
import Navbar from "./components/common/navbar";
import Login from "./pages/Login";
import GoogleSignup from "./pages/signwithgoogle";
import OpenRoute from "./components/core/Auth/OpenRoute";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import { getUserDetails } from "./services/operations/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Error from "./pages/Error";
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/Dashboard/Settings";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PersonalDetailsForm from "./components/core/Dashboard/Client/personalDetails";
import QualificationDetailsPage from "./components/core/Dashboard/Client/qualification";
import OccupationDetailsPage from "./components/core/Dashboard/Client/occupation";
import PhysicalConditionDetailsPage from "./components/core/Dashboard/Client/physicalCond";
import MaritalStatusDetailsPage from "./components/core/Dashboard/Client/meritalStatus";
import GrandparentDetailsPage from "./components/core/Dashboard/Client/grandparent";
import RelationDetailsPage from "./components/core/Dashboard/Client/relation";
import BankDetailsPage from "./components/core/Dashboard/Client/bankDetails";
import CreateClientPage from "./components/core/Dashboard/Client/Clientpage";
import CertifiedDash from "./pages/CertifiedDash"
import Mydetails from "./components/certificate-dashboard/mydetails"
import ClientDetail from "./components/certificate-dashboard/singleDetails"
import PaymentPage from "./pages/paymentStatic";
import IdCardPage from "./components/certificate-dashboard/Idcard";
import UploadIdCardPage from "./components/certificate-dashboard/Admin/uploadId";
import ShajrahForm from "./components/certificate-dashboard/shajraPage";
import CharacterCer  from "./components/certificate-dashboard/character_cer";
import MaritalCertificatePage from "./components/certificate-dashboard/MeritalCerSave"
import AdminDashboard from "./pages/AdminDash"
import AllClients from "./components/certificate-dashboard/Admin/AllClient";
import ShajrahRequests from "./components/certificate-dashboard/Admin/shajraRequest";
import SetPasswordForm from "./pages/SetPassword"
import {ACCOUNT_TYPE} from "./utils/constants"
import ContactForm from "./pages/ContactPage"
import ApplicationNotice from "./pages/NoticePage"
import AdminMaritalList from "./components/certificate-dashboard/Admin/allMerital"
import PaymentSummaryPage from "./components/certificate-dashboard/Admin/PaymentSummary"
import AdminDetailsPage from "./components/certificate-dashboard/Admin/systetemLog"
import ContactMessagesPage from "./components/certificate-dashboard/Admin/Feedback"
import CreateNotification from "./components/certificate-dashboard/Admin/CreateNotification";
function App() {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.profile);
  const userType = user?.accountType

useEffect(() => {
  if (user || !localStorage.getItem("token")) return

  const token = JSON.parse(localStorage.getItem("token"))
  dispatch(getUserDetails(token))
}, [user])

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        

<Route path="/notice/client" element={<ApplicationNotice type="client" />} />
<Route path="/notice/marital" element={<ApplicationNotice type="marital" />} />
<Route path="/notice/shajrah" element={<ApplicationNotice type="shajrah" />} />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <GoogleSignup />
            </OpenRoute>
          }
        />
        <Route
          path="setpassword"
          element={
            <OpenRoute>
              <SetPasswordForm />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

          <Route path="contact" element={<ContactForm />} />
          <Route path="certified/client/:id" element={<ClientDetail />} />
          <Route path="paymentPage" element={<PaymentPage />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}

          <Route path="dashboard/personal" element={<PersonalDetailsForm />} />
          
          <Route
            path="dashboard/qualification"
            element={<QualificationDetailsPage />}
          />
          <Route
            path="dashboard/occupation"
            element={<OccupationDetailsPage />}
          />
          <Route
            path="dashboard/physical"
            element={<PhysicalConditionDetailsPage />}
          />
          <Route
            path="dashboard/marital"
            element={<MaritalStatusDetailsPage />}
          />
          <Route
            path="dashboard/grandparent"
            element={<GrandparentDetailsPage />}
          />
          <Route path="dashboard/relation" element={<RelationDetailsPage />} />
          <Route path="dashboard/bank" element={<BankDetailsPage />} />
        </Route>

          {/* CERTIFICATE  */}
        <Route
          element={
            <PrivateRoute>
              <CertifiedDash />
            </PrivateRoute>
          }
        >
        <Route path="/dashboard/my-profile" element={<MyProfile />} />
        <Route path="/dashboard/settings" element={<Settings />} />

          <Route path="certified/profile" element={<Mydetails/>}/>
          <Route path="certified/Id-card" element={<IdCardPage/>}/>
          <Route path="certified/shajra" element={<ShajrahForm/>}/>
          <Route path="/certified/character/Certificate" element={<CharacterCer />}/>
          <Route path="/certified/meritalCertificate" element={<MaritalCertificatePage/>}/>
          

        </Route>

          {ACCOUNT_TYPE.ADMIN === userType && (
            <Route
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          <Route path="admin/clients" element={<AllClients/>}/>
          <Route path="certified/uploadIdCard" element={<UploadIdCardPage/>}/>
          <Route path="admin/shajrah" element={<ShajrahRequests/>}/>
          <Route path="admin/marital" element={<AdminMaritalList/>}/>
          <Route path="admin/payments" element={<PaymentSummaryPage/>}/>
          <Route path="admin/logs" element={<AdminDetailsPage/>}/>
          <Route path="/admin/contact-messages" element={<ContactMessagesPage/>}/>
          <Route
  path="/admin/create-notification"
  element={<CreateNotification />}
/>


        </Route>
          )}
           




        <Route
            path="dashboard/create-client"
            element={<CreateClientPage />}
          />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
