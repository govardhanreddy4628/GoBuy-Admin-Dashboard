import { lazy, Suspense } from 'react';
import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom";
// import { theme } from './themes/theme';
// import Sticky from './components/sticky/sticky';


import { ThemeProvider } from './context/themeContext';
//import NotFound from "./pages/NotFound";
//import { Dashboard } from "./components/admin/DashBoard/dashboard.tsx";
import { AuthProvider } from "./context/authContext";
import OtpVerify from "./components/auth/otpVerify.tsx";
import ResetPassword from "./components/auth/resetPassword";
import ForgotPassword from "./components/auth/forgotPassword";
import Toaster from "./ui/Toaster";
import CreateProduct from "./components/admin/products/CreateProduct/createProduct";
import AdminLayout from "./components/admin/layout";
import CustomersTable from "./components/admin/customers/index.tsx";
import GuestRoute from "./routes/GuestRoute";
//import ProtectedRoute from "./routes/ProtectedRoute";
import Chat from "./components/admin/chat/chat";
import Calendar2 from "./components/admin/calendar2/calendar2";
//import Cp from "./components/admin/cp";
import CreateProduct3 from "./components/admin/products/CreateProduct/CreateProduct3";
//import { CreateProduct2 } from "./components/admin/products/CreateProduct";
import AdminAgentLayout2 from "./components/admin/Agents/chatBot";
import { CategoryProvider } from './components/admin/context/categoryContext.tsx'
import SubCategory from "./components/admin/categories/subCategory";
const SignUpPage = lazy(() => import ("./pages/SignUpPage.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
import AdminProfile from "./components/admin/pages/ADProfile";
import AdminSettings from "./components/admin/pages/ADSettings";
import AdminChangePassword from "./components/admin/pages/ADchangePW";
import CategoryManager from "./components/admin/categories/Categories.tsx";
import UnderConstruction from "./components/admin/components/underConstruction.tsx";
import AdminReviewPage from "./components/admin/reviews/ReviewPage.tsx";
import { AdminAgentLayout } from "./components/admin/AI/AdminAgentLayout.tsx";
import Orders from "./components/admin/orders/Orders.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Calendar } from "./components/admin/calendar/Calendar.tsx";

import { Dashboard } from "./components/admin/DashBoard/dashboard.tsx";
import { CustomerProvider } from "./components/admin/context/customerContext.tsx";
import AdminBlogs from "./components/admin/Blogs/BlogsManage.tsx";
import Loader from './ui/Loader.tsx';
import Products from './components/admin/products/AllProducts/Products.tsx';
import LogoManager from './components/admin/logo/logoManagement.tsx';
//import { ProductProvider } from "./components/admin/context/productsContext.tsx";



const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <ThemeProvider defaultTheme="system" storageKey="marketpulse-ui-theme">
        <AuthProvider>
    
              <CategoryProvider>
                <CustomerProvider>
                  <QueryClientProvider client={queryClient}>

                    {/* ✅ Suspense wrapper */}
                    <Suspense fallback={<Loader/>}>

                    {/* <RegisterForm/> */}
                    {/* <Counter/> */}

                    <Routes>
                      {/* <Route path='/' element={<Layout/>}>
      
      </Route>
      
      <Route path='sticky' element={<Sticky/>}></Route>
      <Route path='calendar2' element={<Calendar2/>}></Route>
      <Route path='calendar3' element={<Calendar3/>}></Route>

              {/* <Route element={<ProtectedRoute />}> */}
                      {/* </Route> */}

                      {/* <Route element={<AdminRoute />}> */}
                      <Route path="/" element={<AdminLayout />}>
                        <Route index element={<Dashboard />}></Route>
                        <Route path="adminprofile" element={<AdminProfile />} />
                        <Route path="adminsettings" element={<AdminSettings />} />
                        <Route path="adminchangepassword" element={<AdminChangePassword />} />
                        <Route path="categories/manage" element={<CategoryManager />} />
                        <Route path="categories/create-subcategory" element={<SubCategory />} />
                        <Route path="orders" element={<Orders />}></Route>
                        <Route path="customers" element={<CustomersTable />} />
                        <Route path="agents" element={<AdminAgentLayout />} />
                        <Route path="admin-profile" element={<AdminProfile />} />
                        <Route path="blogs" element={<AdminBlogs />} />
                        <Route path="logos" element={<LogoManager />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="calendar2" element={<Calendar2 />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="products/all" element={<Products />} />
                        <Route path="products/create" element={<CreateProduct3 />} />
                        <Route path="products/edit/:id" element={<CreateProduct3 />} />
                        <Route path="createproduct3" element={<CreateProduct />} />
                        <Route path="adminagents" element={<AdminAgentLayout2 />} />
                        <Route path="reviews" element={<AdminReviewPage />} />
                        <Route path="underconstruction" element={<UnderConstruction />} />
                        {/* <Route path="createproduct" element={<CreateProduct2/>} /> */}

                      </Route>
                      {/* </Route> */}

                      <Route element={<GuestRoute />}>
                        <Route path="signup" element={<SignUpPage />}></Route>
                        <Route path="login" element={<LoginPage />}></Route>
                        <Route path="otpverify" element={<OtpVerify />}></Route>
                        <Route path="forgot-password/:email" element={<ForgotPassword />}></Route>
                        <Route path="reset-password" element={<ResetPassword />}></Route>
                      </Route>

                      {/* <Route path='*' element={<NotFound />}></Route>  */}
                      {/* or */}
                      <Route path="*" element={<Navigate to="/" replace />} />

                    </Routes>
                    </Suspense>

                    {/*</ThemeProvider> */}
                    <Toaster />
                  </QueryClientProvider>
                </CustomerProvider>
              </CategoryProvider>
        
        
        </AuthProvider>
      </ThemeProvider >
    </>
  )
};

export default App;
