import apiClient from "../utils/api-client";
import { useQuery } from "@tanstack/react-query";

const useData = (
  endpoint: any,
  customConfig: any = {},
  queryKey: any,
  staleTime = 300_000,
) => {
  const fetchFunction = () =>
    apiClient.get(endpoint, customConfig).then((res) => res.data);

  return useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    staleTime: 600_000,
  });
};

// const useData1 = (endpoint: any, customConfig: any, deps: any) => {
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(
//     () => {
//       setIsLoading(true);
//       apiClient
//         .get(endpoint, customConfig)
//         .then((res) => {
//           if (
//             endpoint === "/products" &&
//             data &&
//             data.products &&
//             customConfig.params.page !== 1
//           ) {
//             setData((prev: any) => ({
//               ...prev,
//               products: [...prev.products, ...res.data.products],
//             }));
//           } else {
//             setData(res.data);
//           }
//           setIsLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setIsLoading(false);
//         });
//     },
//     Array.isArray(deps) ? deps : [],
//   );

//   return { data, error, isLoading };
// };

export default useData;
