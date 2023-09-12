import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Sample component imports (I'll create these later)
// import HomePage from './pages/HomePage';
// import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* <HomePage /> */}
          Home Page Placeholder
        </Route>
        <Route path="/details/:id">
          {/* <DetailPage /> */}
          Detail Page Placeholder
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
