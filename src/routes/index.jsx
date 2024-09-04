import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
  
  import ProblemOne from "../features/ProblemOne";
  import ProblemTwo from "../features/ProblemTwo";
  
  
  const routes = [
    {
      path: '/problemOne',
      element: <ProblemOne />
    },
    {
      path: '/problemTwo',
      element: <ProblemTwo />
    },
  ]
  
  const Navigation = () => {
    return (
      <Router>
        <Routes>
          {
            routes.map(({ path, element }, index) => {
              return(
                <Route
                  key={index} 
                  path={path}
                  element={element}
                />
              )
            })
          }
        </Routes>
      </Router>
    );
  }
  
  export default Navigation