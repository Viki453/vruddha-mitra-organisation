import { TbGenderFemale, TbGenderMale } from "react-icons/tb";

function Gender({ gender, type }) {
  return (
    <div className={`text-${!type ? "2xl" : `${type}xl`}`}>
      {gender === "male" ? (
        <TbGenderMale className=" text-blue-400" />
      ) : (
        <TbGenderFemale className=" text-pink-400" />
      )}
    </div>
  );
}

export default Gender;
