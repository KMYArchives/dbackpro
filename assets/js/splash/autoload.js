window.onload = e => {

	El.text(el_splash_text, 'Loading...')

	SplashScreen.folders()
	SplashScreen.download_db()

	Avatar.user()
	Avatar.default()

	SplashScreen.close_splash()

}