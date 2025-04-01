import { createBrowserRouter } from "react-router-dom";
import MyApp from "../App"; 
import BillTransactions from "./financialMisReoprt/billTransaction";
import BillingStatements from "./financialMisReoprt/billingStatement";
import ClientAdvanceReport from "./financialMisReoprt/clientAdvanceReport";
import ClientBillingCollection from "./financialMisReoprt/clientBillingCollection";
import ClientTransactions from "./financialMisReoprt/clientTransaction";
import MISReports from "./financialMisReoprt/misReport";





const router = createBrowserRouter([
    {path: '/',element: <MyApp />},
    {path:'/billTransaction',element:<BillTransactions/>},
    {path:'/billingStatement',element:<BillingStatements/>},
    {path:'/clientAdvance',element:<ClientAdvanceReport/>},
    {path:'/clientBillingCollection',element:<ClientBillingCollection/>},
    {path:'/clientTransaction',element:<ClientTransactions/>},
    {paht:'/misReport',element:<MISReports/>}
    
   
]);

export default router;