import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe, isAuthSelector } from "./redux/slices/auth";
import Tags from "./pages/Tags";
import NotFound from "./pages/NotFound";
import Person from "./pages/Person";


function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelector)
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/posts/:id" element={<FullPost />}/>
          <Route path="/posts/:id/edit" element={<AddPost />}/>
          <Route path="/add-post" element={<AddPost />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Registration />}/>
          <Route path="/tags/:name" element={<Tags />}/>
          <Route path="/person/:id" element={<Person/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
