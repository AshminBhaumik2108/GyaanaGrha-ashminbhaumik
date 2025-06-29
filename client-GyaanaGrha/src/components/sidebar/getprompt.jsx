import { useQuery } from "@tanstack/react-query";
import { getAllPrompts } from "../../api/prompt/prompt"; 
import Sidebar from "./sidebar.jsx"; 

const PromptPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["prompts"], // THIS KEY Can be use for the Use of refreshing or other Perpose...
    // Like : useQueryClient.invalidateQueries(["prompts"])...
    queryFn: getAllPrompts,
  });
  // if (typeof data === "string") {
  //   console.warn("Got HTML instead of JSON. Check the endpoint.");
  // }
  // Check for the data....
  console.log(data);
  // Send it using props...
  return <Sidebar data={data?.data || []} />;
};

export default PromptPage;
