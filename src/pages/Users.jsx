import CreateUserForm from "../features/Users/CreateUserForm";

function Users() {
  return (
    <div className="p-10 flex flex-col gap-10 bg-base-300 rounded-2xl">
      <span className="text-5xl">Create new User</span>
      <CreateUserForm />
    </div>
  );
}

export default Users;
