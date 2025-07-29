// src/features/reviews/Review.jsx
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useSetReview from "./useSetReview";

function Review() {
  const [value, setValue] = useState(0);
  const { register, handleSubmit, formState, reset } = useForm();
  const { uploadReview, isUploadingReview } = useSetReview();
  const { errors } = formState;
  const { id } = useParams();
  function onSubmit(data) {
    if (!value) return console.log("Rating is required");
    uploadReview(
      { id, review: data.review, rating: value },
      {
        onSuccess: () => {
          reset({ review: "" });
          setValue(0);
          document.getElementById("my_modal_3")?.close();
        },
      }
    );
  }

  return (
    <div className="bg-base-100 w-full max-w-lg p-6 rounded-lg shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-5"
      >
        <label className="text-4xl font-semibold">Review</label>
        <textarea
          {...register("review", { required: "Please submit a review" })}
          className="textarea textarea-bordered w-full"
          placeholder="How was the experience?"
          id="review"
          disabled={isUploadingReview}
        />
        {errors.review && (
          <span className="text-error text-sm">{errors.review.message}</span>
        )}

        <label className="text-4xl font-semibold">Rating</label>
        <Box>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>

        <button className="btn btn-accent" disabled={isUploadingReview}>
          {isUploadingReview ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Review;
