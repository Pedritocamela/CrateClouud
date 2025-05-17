import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Home from './pages/Home';
import Album from './pages/Album';
import Usuario from './pages/Usuario';
import Albums from "./pages/Albums";
import CreateChart from './pages/CreateChart';
import ArtistPage from "./pages/ArtistPage";




function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/Albums" element={<Albums/>}/>
        <Route path="/createchart" element={<CreateChart />} />
        <Route path="/artist/:artistName" element={<ArtistPage />} />
      </Routes>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
