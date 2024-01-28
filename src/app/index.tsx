import "./styles/index.scss";

import { Routing } from "@/pages";

import { IsCreateProfile, WithErrorBoundary, withProviders } from "./providers";

const App = () => (
  <IsCreateProfile>
    <div className="app">
      <WithErrorBoundary>
        <Routing />
      </WithErrorBoundary>
    </div>
  </IsCreateProfile>
);

export default withProviders(App);
