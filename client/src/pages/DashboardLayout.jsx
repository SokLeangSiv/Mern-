import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, SmallSidebar, Navbar, Loading } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDeafaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const DashboardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");

    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();

  const navigate = useNavigate();

  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDeafaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setSideBar((showSidebar) => !showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logout successfully");
  };

  return (
    <DashboardContext.Provider
      value={{
        showSidebar,
        user,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />

            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashBoardContext = () => useContext(DashboardContext);
export default DashboardLayout;
