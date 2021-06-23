import React, { useEffect, useState } from 'react';
import {
	HashRouter as Router,
	Switch,
	Redirect
} from 'react-router-dom';
import { firebase } from '../firebase/firebase-config'

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

	const dispatch = useDispatch()

	const [checking, setChecking] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	
	useEffect(() => {

		firebase.auth().onAuthStateChanged( (user) => {
			if(user?.uid) {

				dispatch( login( user.uid, user.displayName))
				setIsLoggedIn( true )
				dispatch( startLoadingNotes(user.uid) )

			} else {
				setIsLoggedIn( false )
			}
			setChecking(false)
		} )
	}, [dispatch])


	if( checking ) return <h2 style={{color: 'white'}} >Wait</h2>

	return (
		<Router>
			<div>
					<Switch>
						<PublicRoute 
							path="/auth"
							component={ AuthRouter }
							isAuthenticated={isLoggedIn}
						/>

						<PrivateRoute 
							exact
							path="/"
							component={ JournalScreen }
							isAuthenticated={isLoggedIn}
						/>

						<Redirect to="/auth/login" />


					</Switch>
			</div>
		</Router>
	)
}
