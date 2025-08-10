import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./Context/UserContext.jsx";
import WorkflowContext from "./Context/WorkflowContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<WorkflowContext>
			<UserContext>
				<BrowserRouter>
					<App />

				</BrowserRouter>
			</UserContext>
		</WorkflowContext>
	</React.StrictMode>
);
