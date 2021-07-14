import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import useWindowDimensions from "./components/ScreenSize";

function App() {
  const { width, height } = useWindowDimensions();
	return (
		<BrowserRouter>
			<div className="custom-body" style={{ minWidth: width, minHeight: height }}>
				{/* <Navbar /> */}
				<Switch>
					<Route exact path="/" component={Login} />
					<Route component={Page404} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
