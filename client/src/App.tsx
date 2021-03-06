import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PrivateRoute from 'hoc/PrivateRoute';
import ErrorBoundary from 'ErrorBoundary';

import Spinner from 'components/spinner';

// Layout
import MainTemplate from 'components/templates/mainTemplate';
import Navigation from 'components/navigation';
import Footer from 'components/Footer';

// Stats
// import ProductionStatistics from 'views/Statistics/Production';
// import EmployeesStatistics from 'views/Statistics/Employees';
// import CustomersStatistics from 'views/Statistics/Customers';

// Timetable
// import Timetable from 'views/Timetable/Timetable';
// import TimetableDay from 'views/Timetable/TimetableDay';

// Users
import Customers from 'scenes/UsersLists/Customers';
import Customer from 'scenes/UsersProfiles/Customer';
// import Employees from 'views/Employees/Employees';
// import Employee from 'views/Employee/Employee';
import AccountSettings from 'scenes/Settings/Account';
import GlobalSettings from 'scenes/Settings/Global';
// import Prices from 'views/UserPriceList/UserPriceList';

// Orders
// import Order from 'views/Order/Order';
import NewOrderForm from 'scenes/OrderForm/NewOrder';
// import EditOrderForm from 'views/OrderForm/EditOrderForm';
import OrderFormSummary from 'scenes/OrderForm/Summary';
// import Production from 'views/Production/Production';
// import PaintsOrder from 'views/Paints/PaintsOrder';
import HomePage from 'scenes/Home';

// Catalog
import Colors from 'scenes/Catalog/Colors';
import Veneers from 'scenes/Catalog/Veneers';
import Handles from 'scenes/Catalog/Handles';
import Millings from 'scenes/Catalog/Millings';
import GlassCases from 'scenes/Catalog/GlassCases';
import Customs from 'scenes/Catalog/Customs';
import Element from 'scenes/Catalog/ElementDetails';

// Other
// import Regulations from 'views/Regulations/Regulations';
import RegisterPage from 'scenes/Sign/Register';
import LoginPage from 'scenes/Sign/Login';
// import PasswordRemind from 'views/PasswordRemind/PasswordRemind';
// import AccountRecover from 'views/PasswordRemind/AccountRecover';
// import ErrorPage from 'views/Error/Error';
// import Contact from 'views/Contact/Contact';

// import UserNotAccepted from 'components/modals/UserNotAccepted';
// import AccountActive from 'components/auth/AccountActive';
// import Manual from 'components/manual/Manual';

import setAuthToken from 'services/utils/setAuthToken';
import { BackTop } from 'antd';
import { AppStateT } from 'services/store';
import { loadUserData } from 'services/store/actions/auth';
// import { loadUser, logOutUser } from 'actions/auth';

// IF IS TOKEN, SET TO HEADERS IN AXIOS REQUESTS
if (localStorage.token) {
 setAuthToken(localStorage.token);
}

// LOAD USER DATA
const App = () => {
 const dispatch = useDispatch();
 const isSpinner = useSelector((state: AppStateT) => state.view.isSpinner);
 //  const user = useSelector(state => state.auth.user);
 //  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

 //  GET USER
 useEffect(() => {
  dispatch(loadUserData());
 }, []);

 return (
  <div>
   <ErrorBoundary>
    {/* {isAuthenticated && user.isAccepted === false && (
     <UserNotAccepted id={user._id} logOut={() => dispatch(logOutUser())} />
    )} */}
    {isSpinner ? <Spinner /> : null}
    <BackTop />
    <Router>
     <MainTemplate>
      <div
       style={{ minHeight: '100vh', position: 'relative', paddingBottom: 100 }}
      >
       <Navigation />
       {/* <button onClick={() => console.log(user.emaile.bound)}>Klik</button> */}
       <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />

        <Route exact path="/" component={HomePage} />
        <Route path="/account" exact component={AccountSettings} />
        <PrivateRoute
         permissions={['admin', 'user']}
         exact
         path="/neworder"
         component={NewOrderForm}
        />
        <PrivateRoute
         permissions={['admin', 'user']}
         path="/neworder/summary"
         component={OrderFormSummary}
        />
        {/* <Route path="/passwordremind" component={PasswordRemind} />
        <Route path="/recover/:userId" component={AccountRecover} />
        <Route path="/regulations" component={Regulations} />
        <Route path="/activated" component={AccountActive} />
        <Route exact path="/order/:id" component={Order} />
        <PrivateRoute
         permissions={['admin', 'user']}
         path="/order/:id/edit"
         component={EditOrderForm}
        />
       
       
        <PrivateRoute
         permissions={['admin']}
         exact
         path="/timetable"
         component={Timetable}
        />
        <PrivateRoute
         permissions={['admin']}
         exact
         path="/timetable/:date"
         component={TimetableDay}
        />
        <PrivateRoute
         permissions={['admin']}
         exact
         path="/production"
         component={Production}
        />
        <PrivateRoute
         permissions={['admin', 'employee']}
         exact
         path="/paints"
         component={PaintsOrder}
        />
        <PrivateRoute
         permissions={['admin']}
         path="/statistics/production"
         component={ProductionStatistics}
        />
        <PrivateRoute
         permissions={['admin']}
         path="/statistics/employees"
         component={EmployeesStatistics}
        />
        <PrivateRoute
         permissions={['admin']}
         path="/statistics/customers"
         component={CustomersStatistics}
        /> */}
        <PrivateRoute
         permissions={['admin']}
         exact
         path="/customers"
         component={Customers}
        />
        <PrivateRoute
         permissions={['admin']}
         path="/customers/:id"
         component={Customer}
        />
        {/* 
        <PrivateRoute
         permissions={['user']}
         path="/prices"
         component={Prices}
        />
        <PrivateRoute
         permissions={['user']}
         path="/contact"
         component={Contact}
        />
        <PrivateRoute
         permissions={['admin']}
         exact
         path="/employees"
         component={Employees}
        />
        <PrivateRoute
         permissions={['admin']}
         path="/employees/:id"
         component={Employee}
        /> */}
        <Route path="/catalog/colors" component={Colors} />
        <Route path="/catalog/veneers" component={Veneers} />
        <Route path="/catalog/handles" component={Handles} />
        <Route path="/catalog/millings" component={Millings} />
        <Route path="/catalog/glassCases" component={GlassCases} />
        <Route path="/catalog/customs" component={Customs} />
        <Route path="/catalog/element/:name" exact component={Element} />
        {/* <PrivateRoute
         permissions={['admin', 'user']}
         path="/manual"
         exact
         component={Manual}
        />
         */}

        <PrivateRoute
         permissions={['admin']}
         path="/settings"
         exact
         component={GlobalSettings}
        />
        {/* <Route component={ErrorPage} /> */}
       </Switch>
       <Footer />
      </div>
     </MainTemplate>
    </Router>
   </ErrorBoundary>
  </div>
 );
};

export default App;
