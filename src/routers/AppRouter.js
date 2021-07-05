/* eslint-disable no-console */
import React, { Suspense, useEffect, useState,  } from 'react';
import {
	HashRouter as Router,
	Switch,
	Redirect
} from 'react-router-dom';
import { firebase } from '../firebase/firebase-config'

// import { AuthRouter } from './AuthRouter';
// import  JournalScreen  from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Spinner } from '../components/Spinner';

const JournalScreen = React.lazy(() => {
	return import('../components/journal/JournalScreen')
})
const AuthRouter = React.lazy(() => {
	return import('./AuthRouter')
})




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


	if( checking ) return null

	return (
		<Router>
			<div>
				<Switch>
					<ErrorBoundary>
						<Suspense fallback={<Spinner />}>
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
						</Suspense>	
					</ErrorBoundary>	

					<Redirect to="/auth/login" />

				</Switch>
			</div>
		</Router>
	)
}
