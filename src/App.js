// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PostFeed from './components/PostFeed';
import Home from './components/Home';
import CreatePosts from './components/CreatePosts';
// import UserList from './components/UserList';
import './App.css';
// import UpdateProfile from './components/UpdateProfile';

function App() {
	return (
		<Router>
			<div className="app" style={{overflow:'hidden'}}>
				<nav >
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/postfeed">Post Feed</Link>
						</li>
						<li>
							<Link to="/create">Create Post</Link>
						</li>
						{/* <li>
							<Link to="/profile">User Update Profile</Link>
						</li> */}
					</ul>
				</nav>
				{/* <UserList/> */}
				<Routes>
					<Route path="/create" element={<CreatePosts />} />
					<Route path="/" element={<Home />} />
					<Route path="/postfeed" element={<PostFeed />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					{/* <Route path="/profile" element={<UpdateProfile />} /> */}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
