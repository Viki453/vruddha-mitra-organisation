import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { sendReview } from "../../services/apiBookings";

export default function useSetReview() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate: uploadReview, isLoading: isUploadingReview } = useMutation({
    mutationFn: ({ id, review, rating }) => sendReview({ id, review, rating }),
    onSuccess: () => {
      toast.success("Uploaded Review successfully !");
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    },
  });

  return { uploadReview, isUploadingReview };
}
