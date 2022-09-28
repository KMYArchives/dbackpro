window.onload = e => {

	El.text(el_splash_text, 'Loading...')

	SplashScreen.folders()
	SplashScreen.download_db()
	SplashScreen.download_sync()

	Avatar.user()
	Avatar.default()

	SplashScreen.close_splash()

}