import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useUpdateVruddha from "./useUpdateVruddha";
import useVruddhaID from "./useVruddhaID";

function EditVruddhaForm({ id }) {
  const defaultValuesRef = useRef({});
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { vruddha, isLoading } = useVruddhaID(id);
  const { updateVruddha, isUpdatingVruddha } = useUpdateVruddha();
  useEffect(() => {
    if (vruddha && vruddha.length > 0) {
      const {
        firstName,
        lastName,
        age,
        gender,
        likes,
        dislikes,
        description,
        advise,
        languages,
        healthHistory,
        image,
      } = vruddha[0];

      const defaults = {
        firstName,
        lastName,
        age,
        gender,
        likes,
        dislikes,
        description,
        advise,
        languages,
        healthHistory,
      };

      defaultValuesRef.current = { ...defaults, image };
      reset(defaults);
    }
  }, [vruddha, reset]);

  function onSubmit(data) {
    let imageToSave = defaultValuesRef.current.image;

    if (data.image && data.image.length > 0) {
      imageToSave = data.image[0];
    }

    console.log(data);
    updateVruddha(
      { newVruddha: { ...data, image: imageToSave }, id },

      {
        onSuccess: () => {
          console.log("done");
          reset();
          document.getElementById("my_modal_3")?.close();
        },
        onError: (err) => {
          console.error("5. updateVruddha onError triggered!", err);
        },
      }
    );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex flex-col gap-2 bg-base-300 p-4 rounded-2xl">
        <div className="flex gap-9 justify-center p-2">
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              type="text"
              placeholder={errors.firstName?.message || "First Name"}
              className="input input-sm form-input"
              {...register("firstName", {
                required: "*First name is required*",
              })}
              disabled={isUpdatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-sm form-input"
              {...register("lastName")}
              disabled={isUpdatingVruddha}
            />
          </div>
        </div>

        <div className="flex gap-9 justify-center p-2">
          <div className="flex flex-col">
            <label>Age</label>
            <input
              type="number"
              placeholder={errors.age?.message || "Age"}
              className="input input-sm form-input"
              {...register("age", { required: "*Age is required*" })}
              disabled={isUpdatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Gender</label>
            <select
              className="select select-sm form-input"
              {...register("gender")}
              disabled={isUpdatingVruddha}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="flex gap-9 justify-center p-2">
          <div className="flex flex-col">
            <label>Advice</label>
            <textarea
              className="textarea textarea-sm form-input"
              placeholder="Advice for young ones"
              {...register("advise")}
              disabled={isUpdatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Description</label>
            <textarea
              className="textarea textarea-sm form-input"
              placeholder="More about Vruddha..."
              {...register("description")}
              disabled={isUpdatingVruddha}
            />
          </div>
        </div>

        <div className="flex gap-9 justify-center p-2">
          <div className="flex flex-col">
            <label>Languages</label>
            <input
              type="text"
              placeholder="languages"
              className="input input-sm form-input"
              {...register("languages")}
              disabled={isUpdatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Health History</label>
            <input
              type="text"
              placeholder="Health History"
              className="input input-sm form-input"
              {...register("healthHistory")}
              disabled={isUpdatingVruddha}
            />
          </div>
        </div>

        <div className="flex gap-9 justify-center p-2">
          <div className="flex flex-col">
            <label>Likes</label>
            <input
              type="text"
              placeholder="Likes"
              className="input input-sm form-input"
              {...register("likes")}
              disabled={isUpdatingVruddha}
            />
          </div>
          <div className="flex flex-col">
            <label>Dislikes</label>
            <input
              type="text"
              placeholder="Dislikes"
              className="input input-sm form-input"
              {...register("dislikes")}
              disabled={isUpdatingVruddha}
            />
          </div>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center p-2">
          <div>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-accent"
              {...register("image")}
              disabled={isUpdatingVruddha}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => reset(defaultValuesRef.current)}
            className="btn w-20"
            disabled={isUpdatingVruddha}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-success w-20"
            disabled={isUpdatingVruddha}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditVruddhaForm;
