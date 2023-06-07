import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Zagruzka from "./components/Zagruzka";
import Grid from "./components/Grid";

function checkWinner(grid) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

for (let combo of winningCombos) {
    const [a, b, c] = combo;

    if (
      grid[a].text &&
      grid[a].text === grid[b].text &&
      grid[b].text === grid[c].text
    ) {
      return grid[a].text; 
    }
  }

  return null;
}

function App() {
  const [grid, setGrid] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
    { id: 5, text: "" },
    { id: 6, text: "" },
    { id: 7, text: "" },
    { id: 8, text: "" },
    { id: 9, text: "" },
  ]);
  const [user, setUser] = useState(true);
  const [winner, setWinner] = useState(null);

  function handlePlay(elementID) {
    //NO NO push splice pop shift unshift
    //OK map forEach slice  filter find some
    if (winner) return;

    const newGrid = grid.map((item) => {
      if (item.id === elementID && !item.text) {
        return { ...item, text: user ? "X" : "O" };
      } else return item;
    });
    setUser(!user);
    setGrid(newGrid);

    const winnerText = checkWinner(newGrid);
    if (winnerText) {
      setWinner(winnerText);
    }
  }

  // if (!user) {
  //   return (
  //     <MainLayout>
  //       <Zagruzka />
  //     </MainLayout>
  //   );
  // }

  return (
    <MainLayout>
      {winner ? (
        <div>Winner: {winner}</div>
      ) : (
        <Grid grid={grid} handlePlay={handlePlay} />
      )}
    </MainLayout>
  );
}

export default App;
