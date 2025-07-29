import { useForm } from "react-hook-form";
import useUpdatePassword from "./useUpdatePassword";

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { updatePassword, isUpdatingPassword } = useUpdatePassword();

  function onSubmit(data) {
    updatePassword(
      { password: data.password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <div className="p-10 max-w-2xl">
      <p className="text-2xl font-semibold mb-10">Update Password</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div>
          <label className="label">New Password</label>
          <input
            type="password"
            className="input input-accent w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input input-accent w-full"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button type="submit" className="btn btn-accent">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
