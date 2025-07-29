import VruddhaForm from "../features/vruddhas/VruddhaForm";

function Modal({ type, label, children }) {
  return (
    <>
      <button
        className="btn text-lg h-10 btn-accent"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        {label}
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-auto max-w-5xl p-10">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              X
            </button>
          </form>
          <h3 className="font-bold text-lg">{type}</h3>
          {children}
        </div>
      </dialog>
    </>
  );
}
``;
export default Modal;
