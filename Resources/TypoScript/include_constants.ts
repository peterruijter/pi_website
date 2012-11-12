link{
# cat=page/links/1; type=; label= Linkedin link: This is used for the link inside the socialmediabar
linkedin = http://www.linkedin.com/in/peterruijter
# cat=page/links/2; type=; label= Twitter link: This is used for the link inside the socialmediabar
twitter = http://www.twitter.com/ruijter
}

cssfolder = fileadmin/templates/sophie/css

[useragent = *iPhone*]||[useragent = *iPod*]||[useragent = *Android*]||[useragent = *Opera Mini*]||[useragent = *BlackBerry*]
	cssfolder = fileadmin/templates/sophie/mobile/css
[end]
jspath = fileadmin/templates/sophie/scripts

[useragent = *iPhone*]||[useragent = *iPod*]||[useragent = *Android*]||[useragent = *Opera Mini*]||[useragent = *BlackBerry*]
jspath = fileadmin/templates/sophie/mobile/scripts
[end]
