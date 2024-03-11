import { toast } from "react-toastify";
import { JobContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({request}) => {

  console.log("hello");
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  console.log(params);

  try {


    const { data } = await customFetch.get("/jobs", { params });
    return { data, searchValue: params };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValue } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{data, searchValue}}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
