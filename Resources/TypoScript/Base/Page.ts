page = PAGE
page {
  10 = USER
  10.userFunc = tx_templavoila_pi1->main_page
  shortcutIcon = fileadmin/images/favicon.ico
}
page.includeCSS {
  file1 = {$cssfolder}/style.css
  file2 = {$cssfolder}/type.css
  file3 = {$cssfolder}/color-scheme.css
  file4 = {$cssfolder}/buttons.css
  file5 = {$cssfolder}/nivo-slider.css
  file6 = {$cssfolder}/about-slider.css
  file7 = {$cssfolder}/colorbox.css
}

page.includeJSFooterlibs{
	jquery = http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
	jquery.external = 1
}


page.includeJSFooter {
  file2 = {$jspath}/jquery-ui.js
  file3 = {$jspath}/easing.js
  file4 = {$jspath}/slides.js
  file5 = {$jspath}/rotate.js
  file6 = {$jspath}/tabify.js
  file7 = {$jspath}/jquery.colorbox.js
  file8 = {$jspath}/jquery.bxSlider.js
  file9 = {$jspath}/jquery.nivo.slider.pack.js
  file10 = {$jspath}/jquery.accordion.js
  file11 = {$jspath}/tweetable.js
  file12 = {$jspath}/contact.js
  file13 = {$jspath}/custom.js
}
