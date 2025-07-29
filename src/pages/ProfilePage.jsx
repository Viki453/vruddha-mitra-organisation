import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateProfileForm from "../features/authentication/UpdateProfileForm";

function ProfilePage() {
  return (
    <div className="bg-base-300 rounded-2xl p-10">
      <p className="text-5xl font-semibold">Profile Page</p>
      <UpdateProfileForm />
      <UpdatePasswordForm />
    </div>
  );
}

export default ProfilePage;
