import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import { RecoilDemo } from "./libraries/recoil";
import { ZustandDemo } from "./libraries/zustand";

function App() {
  return (
    <div className="App bg-gray-800 h-full w-full p-12">
      {/* <ZustandDemo /> */}
      <RecoilRoot>
        <RecoilDemo />
      </RecoilRoot>
    </div>
  );
}

export default App;
