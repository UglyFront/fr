import logo from './logo.svg';
import Auth from './comp/Auth/Auth';
import Reg from './comp/Reg/Reg';
import Chats from './comp/Chats/Chats'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Chat from './comp/Chats/Chat/Chat';

function App() {


  return (
    <BrowserRouter>
    <div className="App">
      <div className="container">
        <Routes>
          <Route path = "/auth" element={<Auth/>}/>
          <Route path = "/reg" element={<Reg/>}/>
          <Route path = "/chats" element={<Chats/>}/>
          <Route path = "/chat" element={<Chat/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
