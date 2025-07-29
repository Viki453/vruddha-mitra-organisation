import { useForm } from "react-hook-form";
import useSignUp from "../authentication/useSignUp";

function CreateUserForm() {
  const { signup, isLoading } = useSignUp();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit({ firstName, email, password }) {
    signup(
      { firstName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <form
      className="flex flex-col gap-10 pr-80"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label>First Name</label>
        <input
          type="text"
          id="firstName"
          className="input input-accent"
          disabled={isLoading}
          {...register("firstName", {
            required: "This field is required",
          })}
        />
        {errors.firstName && (
          <p className="text-error text-sm">{errors.firstName.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label>Email ID</label>
        <input
          type="email"
          id="email"
          className="input input-accent"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
          })}
        />
        {errors.email && (
          <p className="text-error text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label>Password (Min 8 characters)</label>
        <input
          type="password"
          id="password"
          className="input input-accent"
          disabled={isLoading}
          {...register("password", {
            required: "Enter a password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-error text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label>Confirm Password</label>
        <input
          type="password"
          id="passwordConfirm"
          className="input input-accent"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
        {errors.passwordConfirm && (
          <p className="text-error text-sm">{errors.passwordConfirm.message}</p>
        )}
      </div>

      <div className="flex flex-row gap-2 justify-end">
        <button type="reset" className="btn btn-neutral">
          Clear
        </button>
        <button type="submit" className="btn btn-accent" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create User"}
        </button>
      </div>
    </form>
  );
}

export default CreateUserForm;
