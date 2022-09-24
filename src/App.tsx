import React from "react";
import "./App.css";
import { RecoilDemo } from "./libraries/recoil";
import { ZustandDemo } from "./libraries/zustand";

import { RecoilRoot } from "recoil";
import { Provider as JotaiProvider } from "jotai";
import { JotaiDemo } from "./libraries/jotai";
import { Provider as ReduxProvider } from "react-redux";

import { RematchDemo } from "./libraries/rematch/rematch";
import { init } from "@rematch/core";
import { photos } from "./libraries/rematch/rematch";
import { models } from "./libraries/rematch/models";
import { reduxStore } from "./libraries/reduxToolkit/store";
import { ReduxToolkitDemo } from "./libraries/reduxToolkit/reduxToolkit";

export const store = init({
  models,
});

function App() {
  return (
    <div className="App bg-gray-800 h-full w-full p-12">
      {/* <ZustandDemo /> */}
      {/* <RecoilRoot>
        <RecoilDemo />
      </RecoilRoot> */}
      {/* <JotaiProvider>
        <JotaiDemo />
      </JotaiProvider> */}
      {/* <ReduxProvider store={store}>
        <RematchDemo />
      </ReduxProvider> */}
      <ReduxProvider store={reduxStore}>
        <ReduxToolkitDemo />
      </ReduxProvider>
    </div>
  );
}

export default App;
