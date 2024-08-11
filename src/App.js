import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Situation from './pages/Situation/Situation';
import Chat from './pages/Chat/Chat';
import ChooseRole from './pages/ChooseRole/ChooseRole';
import Result from './pages/Result/Result';
import TotalResult from './pages/TotalResult/TotalResult';
import VoiceManage from './pages/VoiceManage/VoiceManage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/situation" element={<Situation />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/result/:historyId" element={<Result />} />
        <Route path="/total-result" element={<TotalResult />} />
        <Route path="/voice-manage" element={<VoiceManage />} />
      </Routes>
    </Router>
  );
}

export default App;

