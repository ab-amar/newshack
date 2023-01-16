import "./App.css";
import Header from "../src/components/Header";
import NewsTable from "../src/components/NewsTable";

function App() {
  return (
    <div className="App" style={{ marginLeft: "2%" }}>
      <Header />
      
      <NewsTable />
    </div>
  );
}

export default App;

