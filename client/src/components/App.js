import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Dummy data
const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = (props) => {
  return (
    <div>
      {/* BrowserRouter can only have one child */}
      <BrowserRouter>
        <div>
          {/* Show Header regardless of route */}
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
