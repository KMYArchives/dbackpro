window.onload = e => {

	El.text(el_splash_text, 'Loading...')

	Gravatar.download()
	
	setTimeout( e=> {
		El.text(el_splash_text, 'Download user avatar...')
	}, 1000)

	SplashScreen.folders()
	SplashScreen.download()

	SplashScreen.close_splash()

}