import "./styles/index.scss";

import { Routing } from "@/pages";

import { WithErrorBoundary, withProviders } from "./providers";

const App = () => (
  <div className="app">
    <WithErrorBoundary>
      <Routing />
    </WithErrorBoundary>
  </div>
);

export default withProviders(App);
