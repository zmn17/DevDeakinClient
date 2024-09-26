/* eslint-disable react/prop-types */

const FooterCard = ({ title, lists }) => {
  return (
    <div className="flex flex-col text-lg font-semibold gap-4 font-poppins">
      <h4>{title}</h4>
      <ul className="flex flex-col items-start text-sm gap-1 font-poppins">
        {lists.map((list) => (
          <li key={list.id} className="mb-1">
            <h6 className="text-sm font-normal">{list.name}</h6>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterCard;
