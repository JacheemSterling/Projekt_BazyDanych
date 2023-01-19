import LoginForm from "./components/login/loginForm";
import { createContext, useState } from "react";
import DrinkList from "./components/drinks/drinkList";
import DrinkDetails from "./components/drinks/drinkDetails";
import CommentForm from "./components/comments/commentForm";
import CommentList from "./components/comments/commentList";
import "./style.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/navBar";
import Err404 from "./components/nav/err404";
import CoctailTable from "./components/statistics/coctailTable";
export const loggedContext = createContext();
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});

  return (
    <loggedContext.Provider value={{ isLogged: isLogged, user: user }}>
      <div className="navigation">
        <div className="flex bg-gray-600">
          <div className="order-last"></div>
          <LoginForm
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            user={user}
            setUser={setUser}
          />
          <div className="order-first grow">
            <NavBar />
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<DrinkList />} />
        <Route path=":id" element={<DrinkDetails />} />
        <Route path="statistics" element={<CoctailTable />} />
        <Route path="*" element={<Err404 />} />
      </Routes>
      <div className="flex flex-col-reverse">
        <CommentForm user={user.username} />
        <CommentList />
      </div>
    </loggedContext.Provider>
  );
}

export default App;
