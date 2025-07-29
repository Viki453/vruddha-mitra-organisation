import { redirect, useNavigate, useParams } from "react-router";
import useVruddhaID from "../features/vruddhas/useVruddhaID";
import Spinner from "../ui/Spinner";
import Gender from "../ui/Gender";
import Badge from "../ui/Badge";
import { HiPencil } from "react-icons/hi2";
import Button from "../ui/Button";
import EditVruddhaForm from "../features/vruddhas/EditVruddhaForm";
import Modal from "../ui/Modal";
import useSeeAllBookings from "../features/vruddhas/useSeeAllBookings";

function Vruddha() {
  const { id } = useParams();
  const { vruddha, isLoading } = useVruddhaID();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!vruddha?.[0]) return <div>No data found</div>;

  const {
    firstName,
    lastName,
    age,
    gender,
    likes,
    dislikes,
    description,
    visits,
    currentStatus,
    advise,
    languages,
    healthHistory,
    image,
  } = vruddha[0];

  function handleClick() {
    redirect;
    navigate(`/bookings?id=${id}`);
  }

  return (
    <div className="flex justify-center p-6 bg-base-200 min-h-screen">
      <div className="w-full max-w-6xl bg-base-300 rounded-2xl shadow-md p-12 grid gap-12 text-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <img
            src={image}
            alt={`${firstName}'s Profile`}
            className="rounded-full h-60 w-60 object-cover justify-self-center"
          />

          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <h1 className="text-6xl font-bold">
              {firstName} {lastName}
            </h1>
            <p className="text-4xl font-medium">Age: {age}</p>
            <Gender gender={gender} type={5} />
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <Badge currentStatus={currentStatus} />
            <p className="text-3xl">Visits: {visits}</p>
            <Modal
              type="Edit profile"
              label={<HiPencil className="text-4xl cursor-pointer" />}
            >
              <EditVruddhaForm id={id} />
            </Modal>
            <div className="flex justify-center">
              <button className="btn btn-accent" onClick={handleClick}>
                See All Bookings
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-5xl font-semibold mb-3">About Me</h2>
          <p className="text-2xl ">{description}</p>
        </div>

        <div>
          <h2 className="text-5xl font-semibold mb-3">My Advice</h2>
          <p className="text-2xl ">{advise}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-4xl font-semibold mb-3">Languages spoken</h3>
            <ul className="list-disc list-inside text-2xl ">
              {languages?.split(",").map((language, i) => (
                <li key={i}>{language.trim()}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-4xl font-semibold mb-3">Health History</h3>
            <ul className="list-disc list-inside text-2xl ">
              {healthHistory?.split(",").map((history, i) => (
                <li key={i}>{history.trim()}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-4xl font-semibold mb-3">Likes</h3>
            <ul className="list-disc list-inside text-2xl ">
              {likes.split(",").map((like, i) => (
                <li key={i}>{like.trim()}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-4xl font-semibold mb-3">Dislikes</h3>
            <ul className="list-disc list-inside text-2xl ">
              {dislikes.split(",").map((dislike, i) => (
                <li key={i}>{dislike.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vruddha;
