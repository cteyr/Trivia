import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import {QuestionsContainer} from "./containers/QuestionsContainer";

import { HomeContainer } from "./containers/HomeContainer";

const root = createRoot(document.getElementById("app"));

root.render(
  <StrictMode>
  <BrowserRouter>
   <Routes>
     <Route path="/" element={ <MainLayout />}>
       <Route index element={<HomeContainer />} />
       <Route path="/questions/" element={<QuestionsContainer />} />
     </Route>
   </Routes>
 </BrowserRouter>
</StrictMode>
);
