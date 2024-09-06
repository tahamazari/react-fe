import { useState,   } from "react";
import Routes from "./routes"

const App = () => {
  const [data, setData] = useState({ message: "Hello World!" });
  return (
      <div className="App">
        <Routes />
      </div>
  );
}

export default App;
