import { Route, Switch } from "wouter";
import { useEffect, useState } from "react";
import { authReady } from "./lib/auth";
import Home from "./pages/home";
import {
  AboutPage,
  EventsPage,
  GroupsPage,
  SermonsPage,
  GalleryPage,
  ContactPage,
  NotFoundPage,
} from "./pages/public-pages";
import AdminPage from "./pages/admin";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    authReady.finally(() => setReady(true)).catch(() => {});
  }, []);
  if (!ready) return <div className="loading-box">Eo am-pamakiana…</div>;
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/momba" component={AboutPage} />
        <Route path="/hetsika" component={EventsPage} />
        <Route path="/vondrona" component={GroupsPage} />
        <Route path="/toriteny" component={SermonsPage} />
        <Route path="/sary" component={GalleryPage} />
        <Route path="/fifandraisana" component={ContactPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFoundPage} />
      </Switch>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
