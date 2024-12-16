import Image from "next/image";
import Link from "next/link";

const GameCompo = ({ title, imageURL, desc, route }) => {
  return (
    <Link href={route} target="_blank" rel="noopener noreferrer" passHref>
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
    </Link>
  );
};

export default GameCompo;
