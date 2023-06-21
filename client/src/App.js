import logo from "./logo.svg";
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { BrowserRouter, Route, Link, Switch, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Cartscreen from "./screens/Cartscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Ordersscreen from "./screens/Ordersscreen";
import Profilescreen from "./screens/user/Profilescreen";
import FeedbackScreen from "./screens/Feedbackscreen";
import Footer from "./components/Footer";
import AdminProfilescreen from "./screens/AdminProfilescreen";
import Adminloginscreen from "./screens/Adiminloginscreen";
import { useSelector } from "react-redux";
import Notificationmanagementscreen from "./screens/Notificationmanagementscreen";
import Errorscreen from "./screens/Errorscreen";
import AboutScreen from "./screens/Aboutscreen";
import FAQScreen from "./screens/FAQscreen";
import Customermanagementscreen from "./screens/Customermanagementscreen";
import Feedbackmanagementscreen from "./screens/Feedbackmanagementscreen";
import Detailsscreen from "./screens/user/Detailsscreen";
import Ordermanagementscreen from "./screens/Ordermanagementscreen";
import Ticketsscreen from "./screens/user/ticketsScreen";
import SelectionFN from "./screens/SelectionFN";
import Foodcataloguescreen from "./screens/Foodcataloguescreen";
import Newsfeedscreen from "./screens/Newsfeedsrcreen";
import SelectionUserAndCareer from "./screens/SelectionUserAndCareer";
import Beveragesscreen from "./screens/Beveragesscreen";
import Newsfeedmanagement from "./screens/NewsfeedManagement";
import JobPortalscreen from "./screens/JobPortalscreen";
import JobportalManagementScreen from "./screens/JobportalManagementScreen";
import JobApplicantsManagementScreen from "./screens/JobApplicantsManagementScreen";
import JobApplyScreen from "./screens/JobApplyScreen";
import TicketsManagementScreen from "./screens/TicketsManagementScreen";
import FinanceManagerScreen from "./screens/FinanceManagerScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SalesScreen from "./screens/SalesScreen";
import RefundRequestScreen from "./screens/RefundRequestScreen";
import Driverloginscreen from "./screens/driver/Driverloginscreen";
import Yourdeliveryscreen from "./screens/driver/Yourdeliveryscreen";
import Deliveryrequestscreen from "./screens/driver/Deliveryrequestsscreen";
import Driverprofilescreen from "./screens/driver/Driverprofilescreen";
import Deliverymapscreen from "./screens/driver/Deliverymapscreen";
import Myearningsscreen from "./screens/driver/Myearningsscreen";

function App() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const adminloginstate = useSelector((state) => state.adminloginReducer);
  const { currentAdmin } = adminloginstate;
  const driverloginstate = useSelector(state => state.driverloginReducer)
  const { currentDriver } = driverloginstate

  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homescreen />} />
          <Route path="/cart" exact element={<Cartscreen />} />
          <Route path="/beverages" exact element={<Beveragesscreen />} />
          <Route path="/login" exact element={<Loginscreen />} />
          <Route path="/admin/login" exact element={<Adminloginscreen />} />
          <Route path="/driver/login" exact element={<Driverloginscreen />} />
          <Route path="/register" exact element={<Registerscreen />} />
          <Route path="/orders" exact element={<Ordersscreen />} />
          <Route path="/jobportal" exact element={<JobPortalscreen />} />
          <Route path="/jobapply" exact element={<JobApplyScreen />} />

          {currentUser ? (
            <Route path="/feedback" exact element={<FeedbackScreen />} />
          ) : <Route path="/feedback" exact element={<FeedbackScreen />} /> &&
            currentAdmin ? (
            <Route path="/error" exact element={<Errorscreen />} />
          ) : (
            <Route path="/feedback" exact element={<FeedbackScreen />} />
          )}

          {currentUser ? (
            <Route path="/tickets" exact element={<Ticketsscreen />} />
          ) : <Route path="/error" exact element={<Errorscreen />} /> &&
            currentAdmin ? (
            <Route path="/error" exact element={<Errorscreen />} />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/notifications"
              exact
              element={<Notificationmanagementscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
          {currentAdmin ? (
            <Route
              path="admin/orders"
              exact
              element={<Ordermanagementscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/notifications"
              exact
              element={<Notificationmanagementscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route path="admin/selectionfn" exact element={<SelectionFN />} />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
          {currentAdmin ? (
            <Route
              path="admin/selectionUC"
              exact
              element={<SelectionUserAndCareer />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
          {currentAdmin ? (
            <Route
              path="admin/addfoodcatalogue"
              exact
              element={<Foodcataloguescreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/customers"
              exact
              element={<Customermanagementscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
          {currentAdmin ? (
            <Route
              path="admin/feedback"
              exact
              element={<Feedbackmanagementscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/newsfeedmanagement"
              exact
              element={<Newsfeedmanagement />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
          {currentAdmin ? (
            <Route
              path="admin/jobportalManage"
              exact
              element={<JobportalManagementScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
          {currentAdmin ? (
            <Route
              path="admin/jobApplicantManage"
              exact
              element={<JobApplicantsManagementScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/ticketsmanage"
              exact
              element={<TicketsManagementScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/financemanager"
              exact
              element={<FinanceManagerScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} /> 
          )}

          {currentAdmin ? (
            <Route
              path="admin/financemanager/history"
              exact
              element={<HistoryScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/financemanager/sales"
              exact
              element={<SalesScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentAdmin ? (
            <Route
              path="admin/financemanager/requests"
              exact
              element={<RefundRequestScreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

          {currentDriver ? (
            <Route
              path="driver/requests"
              exact
              element={<Deliveryrequestscreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
          {currentDriver ? (
            <Route
              path="driver/delivery"
              exact
              element={<Yourdeliveryscreen />}
            />
          ) :  

          (
            <Route path="/error" exact element={<Errorscreen />} />
          )}
            {/* changed */}
          {currentDriver ? (
            <Route
              path="driver/map"
              exact
              element={<Deliverymapscreen />}
            />
          ) :  

          (
            <Route path="/error" exact element={<Errorscreen />} />
          )}  

            {/* changed */}
          {currentDriver ? (
            <Route
              path="driver/earnings"
              exact
              element={<Myearningsscreen />}
            />
          ) :  

          (
            <Route path="/error" exact element={<Errorscreen />} />
          )}  

          <Route path="/profile" exact element={<Profilescreen />} />
          <Route path="/profile/details" exact element={<Detailsscreen />} />
          <Route path="/admin" exact element={<AdminProfilescreen />} />
          <Route path="/about" exact element={<AboutScreen />} />
          <Route path="/faq" exact element={<FAQScreen />} />
          <Route path="/newsfeed" exact element={<Newsfeedscreen />} />
          <Route path="/driver" exact element={<Driverprofilescreen />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
