"use client";
import { useState } from "react";
import DataTable from "../../Components/DataTable";

const Home = () => {
  const [region, setRegion] = useState("USA");
  const [errors, setErrors] = useState(0);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 10000));

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 10000));
  };

  return (
    <div>
      <h1>Fake User Data Generator</h1>
      <label>
        Region:
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="USA">USA</option>
          <option value="Poland">Poland</option>
          <option value="Georgia">Georgia</option>
        </select>
      </label>
      <label>
        Errors:
        <input
          type="range"
          min="0"
          max="10"
          value={errors}
          onChange={(e) => setErrors(parseFloat(e.target.value))}
        />
        <input
          type="number"
          value={errors}
          onChange={(e) => setErrors(parseFloat(e.target.value))}
          max="1000"
        />
      </label>
      <label>
        Seed:
        <input
          type="number"
          value={seed}
          onChange={(e) => setSeed(parseInt(e.target.value))}
        />
        <button onClick={handleRandomSeed}>Random Seed</button>
      </label>
      <DataTable region={region} errors={errors} seed={seed} />
    </div>
  );
};

export default Home;
