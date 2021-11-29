import useDocumentTitle from "use-document-title";
import 'bootstrap/dist/css/bootstrap.min.css';
import Activity from "./component/Activity";

function App() {
  useDocumentTitle('Todo List');
  return (
    <Activity />
  );
}

export default App;
