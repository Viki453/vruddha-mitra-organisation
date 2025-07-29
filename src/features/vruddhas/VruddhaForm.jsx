import { useForm } from "react-hook-form";
import { useCreateVruddha } from "./useCreateVruddha";

function VruddhaForm() {
  const { register, handleSubmit, formState, reset, getValues } = useForm();

  const { errors } = formState;

  const { isCreatingVruddha, createVruddha } = useCreateVruddha();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image?.[0];
    createVruddha(
      { ...data, image: image },
      {
        onSuccess: () => {
          reset();
          document.getElementById("my_modal_3")?.close();
        },
      }
    );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex flex-col gap-2 bg-base-300 p-4 justify-center content-center rounded-2xl">
        <div className="flex gap-9 content-center justify-center p-2 ">
          <div className="flex flex-col">
            <label>First Name </label>
            <input
              type="text"
              placeholder={
                !errors.firstName ? "First Name" : errors?.firstName?.message
              }
              className="input input-sm form-input"
              id="firstName"
              {...register("firstName", {
                required: "*First name is required*",
              })}
              disabled={isCreatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-sm form-input"
              id="lastName"
              {...register("lastName")}
              disabled={isCreatingVruddha}
            />
          </div>
        </div>

        <div className="flex gap-9 content-center justify-center p-2  ">
          <div className="flex flex-col">
            <label>Age</label>
            <input
              type="number"
              placeholder={!errors.age ? "Age" : errors?.age?.message}
              className="input input-sm form-input"
              id="age"
              {...register("age", { required: "*Age is required*" })}
              disabled={isCreatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Gender</label>
            <select
              className="select select-sm form-input"
              id="gender"
              {...register("gender")}
              disabled={isCreatingVruddha}
            >
              <option disabled selected>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="flex gap-9 content-center justify-center p-2 ">
          <div className="flex flex-col">
            <label>Advise</label>
            <textarea
              className=" textarea textarea-sm form-input"
              placeholder="Advise for young ones "
              id="advise"
              {...register("advise")}
              disabled={isCreatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Description</label>
            <textarea
              className=" textarea textarea-sm form-input"
              placeholder="More about Vruddha..."
              id="description"
              {...register("description")}
              disabled={isCreatingVruddha}
            />
          </div>
        </div>

        <div className="flex gap-9 content-center justify-center p-2 ">
          <div className="flex flex-col">
            <label>Likes</label>
            <input
              type="text"
              placeholder="Likes"
              className="input input-sm form-input"
              id="likes"
              {...register("likes")}
              disabled={isCreatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Dislikes</label>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-sm form-input"
              id="lastName"
              {...register("dislikes")}
              disabled={isCreatingVruddha}
            />
          </div>
        </div>
        <div className="flex gap-9 content-center justify-center p-2 ">
          <div className="flex flex-col">
            <label>Languages spoken:</label>
            <input
              type="text"
              placeholder="Languages Spoken"
              className="input input-sm form-input"
              id="languages"
              {...register("languages")}
              disabled={isCreatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Health history</label>
            <input
              type="text"
              placeholder="Health History"
              className="input input-sm form-input"
              id="healthHistory"
              {...register("healthHistory")}
              disabled={isCreatingVruddha}
            />
          </div>
        </div>

        <div className="flex gap-9 content-center justify-center p-2 ">
          <div>
            <label>Image</label>
            <input
              type="file"
              placeholder="Likes"
              className=" file-input file-input-accent"
              id="image"
              accept="image/*"
              {...register("image", { required: "Please attatch an image" })}
              disabled={isCreatingVruddha}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="reset"
            className="btn w-20"
            disabled={isCreatingVruddha}
          >
            Clear
          </button>
          <button
            className="btn btn-success w-20"
            type="submit"
            disabled={isCreatingVruddha}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default VruddhaForm;
