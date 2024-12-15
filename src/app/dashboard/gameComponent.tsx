import Image from "next/image";

const GameCompo = ({ title, imageURL, desc }) => {
  return (
    <div className="game-card">
      <div className="imagine-cont">
        <Image
          src={imageURL}
          alt={title}
          width={220}
          height={130}
          className="rounded-t-lg"
          priority
        />
        <h3 className="game-title">{title}</h3>
        <p className="game-desc">{desc}</p>
      </div>
    </div>
  );
};

export default GameCompo;
