import "./styles/index.scss";

import { Routing } from "@/pages";

import { withProviders } from "./providers";

const App = () => (
  <div className="app">
    <Routing />
  </div>
);

export default withProviders(App);
