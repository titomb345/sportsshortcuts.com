import { Route, Routes } from 'react-router-dom';
import NflGenerator from './routes/nfl/nfl-generator';
import Home from './routes/home';
import { Layout } from './components/layout/layout';
import Error from './routes/error';
import NbaGenerator from './routes/nba/nba-generator';
import { SportThemeProvider } from './theme';

function App() {
  return (
    <SportThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nfl" element={<NflGenerator />} />
          <Route path="/nba" element={<NbaGenerator />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </SportThemeProvider>
  );
}

export default App;
