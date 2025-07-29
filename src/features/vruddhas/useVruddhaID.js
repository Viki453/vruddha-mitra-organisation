import { useQuery } from "@tanstack/react-query";
import { getVruddha } from "../../services/apiVruddhas";
import { useParams } from "react-router";

function useVruddhaID() {
  const { id } = useParams();
  const {
    data: vruddha,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vruddha", id],
    queryFn: () => getVruddha(id),
    retry: false,
  });

  if (error) console.log(Error);

  return { vruddha, isLoading, error };
}

export default useVruddhaID;
