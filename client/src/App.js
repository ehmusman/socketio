import { BrowserRouter as Router, Route } from "react-router-dom"
import Chat from "./components/Chat";
import Join from "./components/Join"
function App() {
  return (
    <div className="container">
      <Router>
        <Route exact path="/" component={Join} />
        <Route exact path="/chat" component={Chat} />
      </Router>

    </div>
  );
}

export default App;
