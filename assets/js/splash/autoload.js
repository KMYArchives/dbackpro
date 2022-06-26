window.onload = e => {

	El.text(el_splash_text, 'Loading...')

	SplashScreen.folders()
	SplashScreen.download_db()
	SplashScreen.download_sync()
	SplashScreen.download_gravatar()

	SplashScreen.close_splash()

}