import React from "react";
import "./App.css";
import { RecoilDemo } from "./libraries/recoil";
import { ZustandDemo } from "./libraries/zustand";

import { RecoilRoot } from "recoil";
import { Provider } from "jotai";
import { JotaiDemo } from "./libraries/jotai";

function App() {
  return (
    <div className="App bg-gray-800 h-full w-full p-12">
      {/* <ZustandDemo /> */}
      {/* <RecoilRoot>
        <RecoilDemo />
      </RecoilRoot> */}
      <Provider>
        <JotaiDemo />
      </Provider>
    </div>
  );
}

export default App;
