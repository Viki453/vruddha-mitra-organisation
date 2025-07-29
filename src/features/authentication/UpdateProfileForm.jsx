import { useForm } from "react-hook-form";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateProfileForm() {
  const { isLoading, user } = useUser();
  const { register, handleSubmit, formState, reset } = useForm();
  const { error } = formState;
  const { updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser();

  function onSubmit({ firstName, avatar }) {
    updateUser({ firstName, avatar }, {});
  }

  return (
    <div className="p-10 max-w-4xl">
      <p className="text-2xl font-semibold mb-10">Update User</p>
      <form
        className="grid grid-cols-2 gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-start gap-4">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center">
            {user?.user_metadata?.avatar ? (
              <img
                src={user.user_metadata.avatar}
                className="w-full h-full object-cover"
                alt="profile"
              />
            ) : (
              <img
                src="/default-user.png"
                className="w-full h-full object-cover"
                alt="default profile"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="avatar"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs file-input-accent"
            {...register("avatar")}
            disabled={isLoadingUpdateUser}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-accent w-full"
              defaultValue={user?.user_metadata?.firstName}
              {...register("firstName")}
              disabled={isLoadingUpdateUser}
            />
          </div>

          <div>
            <label className="label">Email ID</label>
            <input
              type="text"
              className="input input-accent w-full"
              value={user?.user_metadata?.email}
              disabled
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="reset" className="btn btn-neutral">
              Clear
            </button>
            <button type="submit" className="btn btn-accent">
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
