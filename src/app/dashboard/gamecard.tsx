import GameCompo from "./gameComponent";

const games = [
  {
    id: 1,
    title: "Tic Tac Toe",
    imageURL: "/image/tictactoe.png",
    desc: "Two players take turns marking spaces on a 3x3 grid with their symbol (X or O).",
  },
  {
    id: 2,
    title: "Outlast: Trial",
    imageURL: "/image/outlast.jpg",
    desc: "First-person cooperative survival horror game.",
  },
  {
    id: 3,
    title: "Fortnite",
    imageURL: "/image/fortnite.jpg",
    desc: "Battle Royale game with building mechanics.",
  },
];

export default function GameCard() {
  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCompo
          key={game.id}
          title={game.title}
          imageURL={game.imageURL}
          desc={game.desc}
        />
      ))}
    </div>
  );
}