import './app.css';
import Grid from './components/Grid/Grid';
import TopBar from "./components/TopBar/TopBar";
import useControlRobot, { DIRECTIONS, type Direction } from './hooks/useControlRobot';
import { useState } from 'react';

function App() {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [initialRow, setInitialRow] = useState<number>(0);
  const [initialCol, setInitialCol] = useState<number>(0);
  const [initialDirection, setInitialDirection] = useState<Direction>(DIRECTIONS.NORTH);

  const {
    robotPos,
    handleRightRotation,
    handleForward,
    handleLeftRotation,
    logFinalPosition,
    resetPosition
  } = useControlRobot(rows, cols, initialRow, initialCol, initialDirection);

  return (
    <>
      {/* Top Bar 
      - Det var en topbar men slutade som en sidebar
      */}
      <TopBar 
        robotPos={robotPos}
        handleRightRotation={handleRightRotation}
        handleLeftRotation={handleLeftRotation}
        handleForward={handleForward}
        logFinalPosition={logFinalPosition}
        rows={rows}
        cols={cols}
        setRows={setRows}
        setCols={setCols}
        resetPosition={resetPosition}
        initialRow={initialRow}
        initialCol={initialCol}
        initialDirection={initialDirection}
        setInitialRow={setInitialRow}
        setInitialCol={setInitialCol}
        setInitialDirection={setInitialDirection}
      />
      <Grid rows={rows} cols={cols} robotPos={robotPos} />
    </>
  )
}

export default App
