lib.parseFunc_RTE.nonTypoTagStdWrap.encapsLines.addAttributes.P.class=shadow
lib.fce.spotlight = COA
lib.fce.spotlight {
	5 = LOAD_REGISTER
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the lang
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0

	stdWrap.wrap = <div class="decoration"></div><div id="wrapper"><div class="slider-wrapper theme-default">|<div class="clear"></div></div><div class="slider-background"></div></div><!-- End Of Slider -->
	10 = COA
	10 {
		stdWrap.wrap = <div id="slider" class="nivoSlider">|</div>
		10 = CONTENT
		10 {
			table = tt_news
			select.pidInList.field = field_newspid
			select.orderBy = datetime desc
			select.max = 5
			select.andWhere.cObject = COA
			select.andWhere.cObject {
				10 = TEXT
				10.data = register:lang
				10.wrap = tt_news.sys_language_uid = |
			}

			renderObj = COA
			renderObj {
				3 = LOAD_REGISTER
				3 {
					counter.data = register: counter
					counter.ifEmpty = 0
					counter.stdWrap.wrap = |+ 1
					counter.stdWrap.insertData = 1
					counter.prioriCalc = intval
				}

				10 = IMG_RESOURCE
				10.format = png
				10.stdWrap.dataWrap = <img src="|" alt="" title="#htmlcaption{register:counter}" />
				10.file {
				  import = uploads/pics/
				  import.field = image
				  import.listNum = 0
				  width = 944c
				  height = 300c
				}
			}
		}
	}
	20 = CONTENT
	20 {
		table = tt_news
		select.pidInList.field = field_newspid
		select.orderBy = datetime desc
		select.max = 5
		select.andWhere.cObject = COA
		select.andWhere.cObject {
			10 = TEXT
			10.data = register:lang
			10.wrap = tt_news.sys_language_uid = |


		}
		renderObj = COA
		renderObj {

				3 = LOAD_REGISTER
				3 {
					counter2.data = register: counter2
					counter2.ifEmpty = 0
					counter2.stdWrap.wrap = |+ 1
					counter2.stdWrap.insertData = 1
					counter2.prioriCalc = intval
				}


			stdWrap.dataWrap = <div id="htmlcaption{register:counter2}" class="nivo-html-caption">|</div>
			10 = TEXT
			10.field = title
			10.wrap = <h1 class="caption-title">|</h1>

			20 = TEXT
			20.field = short
			20.wrap = <p class="caption-text">|</p>

			30 = TEXT
			30.value = ...read more
			30.typolink.parameter = #
			30.typolink.ATagParams = class="caption-more"

		}
	}
}
temp.content = CONTENT
temp.content {
	table = tt_news
	select {
		pidInList.data = register:newspid
		max = 1
		orderBy = datetime DESC
		leftjoin = tt_news_cat_mm ON tt_news.uid = tt_news_cat_mm.uid_local
		andWhere.cObject = COA
		andWhere.cObject {
			10 = TEXT
			10.data = register:newscatid
			10.if.isTrue.data = register:newscatid
			10.wrap = tt_news_cat_mm.uid_foreign IN (|)

			20 = TEXT
			20.data = register:lang
			20.wrap = tt_news.sys_language_uid = |
		}
		groupBy = tt_news.uid

		begin.data = register:newsoffset
	}
	renderObj = COA
	renderObj {


	// Add split element, so we can wrap the items inside the master objects
		stdWrap.outerWrap = |###SPLITTER###

		# Open de A-tag, html5 laat blocklevel elements toe binnen inline elements
		5 = TEXT
		5 {
			wrap = <a href="|">
			typolink {
				parameter.cObject = CASE
				parameter.cObject {
					key.field = type
					# Normale nieuws artikels
					default = TEXT
					default.data = register:newsdetailpid
					# Interne link
					1 = TEXT
					1.field = page
					# Externe link
					2 = TEXT
					2.field = ext_url
				}
				additionalParams {
					field = uid
					wrap = &tx_ttnews[tt_news]=|
					if.isFalse.field = type
				}
				useCacheHash = 1
				returnLast = url
			}
		}

		10 = TEXT
		10.field = title
		10.wrap = <h3 class="shadow">|</h3></a>

		20 = COA
		20 {
			// Generate colorbox only if there is an image
			stdWrap.if.isTrue.field = image
			10 = COA
			10 {
				stdWrap.wrap = <div class="hover-full-width-icons">|</div>

				10 = IMG_RESOURCE
				10.stdWrap.wrap (
					<a class="colorbox-big" title="Image Title" href="|">
					  <img class="hover-zoom" src="fileadmin/templates/sophie/images/columns/icon/magnifier.png" alt="img">
					</a>
					<a href="#">
					  <img class="hover-link" src="fileadmin/templates/sophie/images/columns/icon/arrow-right.png" alt="img">
					</a>
				)
				10.file{
					import = uploads/pics/
					import {
						field = image
						listNum = 0
					}
				}
			}

			20 = IMAGE
			20 {
				file {
					import = uploads/pics/
					import {
						field = image
						listNum = 0
					}
					XY = 20, 20
					width = 952c
					height = 180c
				}
				params = class="image-deco column-image"
				altText.field = title
				titleText.field = title
			}
		}

		30 = TEXT
		30.field = bodytext
		30.wrap (
			<p class="shadow">
				|
			</p>
		)
	}
}
lib.fce.one-column = COA
lib.fce.one-column {
	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	5.lang.cObject.ifEmpty = 0

	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1

   # Copy the readet content here
	10 < temp.content

	10.renderObj.20.20.file.width = 952c
	10.renderObj.20.20.file.height = 180c
	10.renderObj.30.crop = 390 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###
		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1
		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="full-width">
				|
			</div>
		)
	}

	stdWrap.wrap (
		<div class="decoration"></div>
		|
		</a>
	)
}

lib.fce.two-columns = COA
lib.fce.two-columns {

	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0

	10 < temp.content

	10.select.max = 2
	10.renderObj.20.10.stdWrap.wrap = <div class="hover-two-columns-icons">|</div>

	10.renderObj.20.20.file.width = 457c
	10.renderObj.20.20.file.height = 170c

	10.renderObj.30.cropHTML = 248 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###
		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1 || 2 || 3
		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="two-column-one">
				|
			</a>
			</div>
		)
		2.current = 1
		2.wrap (
			<div class="two-column-two">
				|
			</a>
			</div>
		)
		3.current = 1
	}
	stdWrap.wrap (
		<div class="decoration"></div>
		<div class="two-columns">
			|
			<div class="clear"></div>
		</div>
	)
}

lib.fce.three-columns = COA
lib.fce.three-columns {

	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset

	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0


	10 < temp.content

	10.select.max = 3
	10.renderObj.20.10.stdWrap.wrap = <div class="hover-three-columns-icons">|</div>

	10.renderObj.20.20.file.width = 290c
	10.renderObj.20.20.file.height = 119c
	10.renderObj.30.cropHTML = 248 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###

		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1 || 2 || 3 || 4

		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="three-column-one">
				|
			</a>
			</div>
		)
		2.current = 1
		2.wrap (
			<div class="three-column-two">
				|
			</a>
			</div>
		)
		3.current = 1
		3.wrap (
			<div class="three-column-three">
				|
			</a>
			</div>
		)
		4.current = 1
	}
	stdWrap.wrap (
		<div class="decoration"></div>
		<div class="three-columns">
			|
			<div class="clear"></div>
		</div>
	)
}

lib.fce.four-columns = COA
lib.fce.four-columns {

	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0

	10 < temp.content

	10.select.max = 4
	10.renderObj.20.10.stdWrap.wrap = <div class="hover-four-columns-icons">|</div>

	10.renderObj.20.20.file.width = 210c
	10.renderObj.20.20.file.height = 120c
	10.renderObj.30.cropHTML = 248 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###
		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1 || 2 || 3 || 4 || 5
		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="four-column-one">
				|
			</a>
			</div>
		)
		2.current = 1
		2.wrap (
			<div class="four-column-two">
				|
			</a>
			</div>
		)
		3.current = 1
		3.wrap (
			<div class="four-column-three">
				|
			</a>
			</div>
		)
		4.current = 1
		4.wrap (
			<div class="four-column-four">
				|
			</a>
			</div>
		)
		5.current = 1
	}
	stdWrap.wrap (
		<div class="decoration"></div>
		<div class="four-columns">
			|
			<div class="clear"></div>
		</div>
	)
}
lib.fce.five-columns = COA
lib.fce.five-columns {

	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0

	10 < temp.content

	10.select.max = 5
	10.renderObj.20.10.stdWrap.wrap = <div class="hover-five-columns-icons">|</div>

	10.renderObj.20.20.file.width = 158c
	10.renderObj.20.20.file.height = 100c

	10.renderObj.30.cropHTML = 154 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###
		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1 || 2 || 3 || 4 || 5 || 6
		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="five-column-one">
				|
			</a>
			</div>
		)
		2.current = 1
		2.wrap (
			<div class="five-column-two">
				|
			</a>
			</div>
		)
		3.current = 1
		3.wrap (
			<div class="five-column-three">
				|
			</a>
			</div>
		)
		4.current = 1
		4.wrap (
			<div class="five-column-four">
				|
			</a>
			</div>
		)
		5.current = 1
		5.wrap (
			<div class="five-column-five">
				|
			</a>
			</div>
		)
		6.current = 1
	}
	stdWrap.wrap (
		<div class="decoration"></div>
		<div class="five-columns">
			|
			<div class="clear"></div>
		</div>
	)
}

lib.field_top_heading_text = TEXT
lib.field_top_heading_text.value = Welcome! Just perfect chromatics!

lib.latest_blogposts = COA
lib.latest_blogposts {

    5 = LOAD_REGISTER
    5.detailpid.field = field_detailpid

	10 = TEXT
	10.value = Latest from our blog!
	10.wrap = <h3 class="footer-title">|</h3>

	20 = CONTENT
	20 {
		table = tt_news
		select.pidInList.field = field_newspid
		select.orderBy = datetime desc
		select.max = 3
		renderObj = COA
		renderObj {
			# wrap the item around a link
			stdWrap.wrap = |<div class="clear"></div>

			stdWrap.typolink {
			    parameter.data = register:detailpid

				additionalParams {
					field = uid
					wrap = &tx_ttnews[tt_news]=|
				}
				useCacheHash = 1


				ATagParams = class="recent-blog-link"
			}

			10 = COA
			10 {
				stdWrap.wrap = <div class="blog-footer-recent-item">|</div>

				10 = IMG_RESOURCE
				10.format = png
				10.stdWrap.dataWrap = <img src="|" alt="" />
				10.stdWrap.required = 1
				10.file {
				  import = uploads/pics/
				  import.field = image
				  import.listNum = 0
				  width = 45c
				  height = 45c
				}

				20 = TEXT
				20.field = title
				20.crop = 50|...|1
				20.wrap = <strong>|</strong>

				30 = TEXT
				30.field = datetime
				30.strftime = %d %B %Y
				30.noTrimWrap = |<em>Posted on |</em>|
				30.noTrimWrap.lang.nl = |<em>Gepost op |</em>|
			}
		}
	}
}

lib.field_footer_left = COA
lib.field_footer_left {
  10 = TEXT
  10.data = date:Y
  10.noTrimWrap = |&copy; | Peter Ruijter. All Rights Reserved|
}

lib.field_footer_right = COA
lib.field_footer_right {
  10 = HMENU
  10 {
	#wrap = |
	special = list
	special.value = 170, 171
	1 = TMENU
	1.noBlur = 1
	1.NO.allWrap = |
  }

  20 = COA
  20 {
	wrap = |
	10 = TEXT
	10 {
	  value = Linkedin
	  typolink.parameter = {$link.linkedin} _blank
	  typolink.wrap = |
	}

	20 = TEXT
	20 {
	  value = Twitter
	  typolink.parameter = {$link.twitter} _blank
	  typolink.wrap = |
	}

	30 = TEXT
	30 {
	  value = Top
	  typolink.parameter = # _self top
	  typolink.wrap = |
	}
  }
}lib.parseFunc_RTE.nonTypoTagStdWrap.encapsLines.addAttributes.P.class=shadow
lib.fce.spotlight = COA
lib.fce.spotlight {
	5 = LOAD_REGISTER
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the lang
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0

	stdWrap.wrap = <div class="decoration"></div><div id="wrapper"><div class="slider-wrapper theme-default">|<div class="clear"></div></div><div class="slider-background"></div></div><!-- End Of Slider -->
	10 = COA
	10 {
		stdWrap.wrap = <div id="slider" class="nivoSlider">|</div>
		10 = CONTENT
		10 {
			table = tt_news
			select.pidInList.field = field_newspid
			select.orderBy = datetime desc
			select.max = 5
			select.andWhere.cObject = COA
			select.andWhere.cObject {
				10 = TEXT
				10.data = register:lang
				10.wrap = tt_news.sys_language_uid = |
			}

			renderObj = COA
			renderObj {
				3 = LOAD_REGISTER
				3 {
					counter.data = register: counter
					counter.ifEmpty = 0
					counter.stdWrap.wrap = |+ 1
					counter.stdWrap.insertData = 1
					counter.prioriCalc = intval
				}

				10 = IMG_RESOURCE
				10.format = png
				10.stdWrap.dataWrap = <img src="|" alt="" title="#htmlcaption{register:counter}" />
				10.file {
				  import = uploads/pics/
				  import.field = image
				  import.listNum = 0
				  width = 944c
				  height = 300c
				}
			}
		}
	}
	20 = CONTENT
	20 {
		table = tt_news
		select.pidInList.field = field_newspid
		select.orderBy = datetime desc
		select.max = 5
		select.andWhere.cObject = COA
		select.andWhere.cObject {
			10 = TEXT
			10.data = register:lang
			10.wrap = tt_news.sys_language_uid = |


		}
		renderObj = COA
		renderObj {

				3 = LOAD_REGISTER
				3 {
					counter2.data = register: counter2
					counter2.ifEmpty = 0
					counter2.stdWrap.wrap = |+ 1
					counter2.stdWrap.insertData = 1
					counter2.prioriCalc = intval
				}


			stdWrap.dataWrap = <div id="htmlcaption{register:counter2}" class="nivo-html-caption">|</div>
			10 = TEXT
			10.field = title
			10.wrap = <h1 class="caption-title">|</h1>

			20 = TEXT
			20.field = short
			20.wrap = <p class="caption-text">|</p>

			30 = TEXT
			30.value = ...read more
			30.typolink.parameter = #
			30.typolink.ATagParams = class="caption-more"

		}
	}
}
temp.content = CONTENT
temp.content {
	table = tt_news
	select {
		pidInList.data = register:newspid
		max = 1
		orderBy = datetime DESC
		leftjoin = tt_news_cat_mm ON tt_news.uid = tt_news_cat_mm.uid_local
		andWhere.cObject = COA
		andWhere.cObject {
			10 = TEXT
			10.data = register:newscatid
			10.if.isTrue.data = register:newscatid
			10.wrap = tt_news_cat_mm.uid_foreign IN (|)

			20 = TEXT
			20.data = register:lang
			20.wrap = tt_news.sys_language_uid = |
		}
		groupBy = tt_news.uid

		begin.data = register:newsoffset
	}
	renderObj = COA
	renderObj {


	// Add split element, so we can wrap the items inside the master objects
		stdWrap.outerWrap = |###SPLITTER###

		# Open de A-tag, html5 laat blocklevel elements toe binnen inline elements
		5 = TEXT
		5 {
			wrap = <a href="|">
			typolink {
				parameter.cObject = CASE
				parameter.cObject {
					key.field = type
					# Normale nieuws artikels
					default = TEXT
					default.data = register:newsdetailpid
					# Interne link
					1 = TEXT
					1.field = page
					# Externe link
					2 = TEXT
					2.field = ext_url
				}
				additionalParams {
					field = uid
					wrap = &tx_ttnews[tt_news]=|
					if.isFalse.field = type
				}
				useCacheHash = 1
				returnLast = url
			}
		}

		10 = TEXT
		10.field = title
		10.wrap = <h3 class="shadow">|</h3></a>

		20 = COA
		20 {
			// Generate colorbox only if there is an image
			stdWrap.if.isTrue.field = image
			10 = COA
			10 {
				stdWrap.wrap = <div class="hover-full-width-icons">|</div>

				10 = IMG_RESOURCE
				10.stdWrap.wrap (
					<a class="colorbox-big" title="Image Title" href="|">
					  <img class="hover-zoom" src="fileadmin/templates/sophie/images/columns/icon/magnifier.png" alt="img">
					</a>
					<a href="#">
					  <img class="hover-link" src="fileadmin/templates/sophie/images/columns/icon/arrow-right.png" alt="img">
					</a>
				)
				10.file{
					import = uploads/pics/
					import {
						field = image
						listNum = 0
					}
				}
			}

			20 = IMAGE
			20 {
				file {
					import = uploads/pics/
					import {
						field = image
						listNum = 0
					}
					XY = 20, 20
					width = 952c
					height = 180c
				}
				params = class="image-deco column-image"
				altText.field = title
				titleText.field = title
			}
		}

		30 = TEXT
		30.field = bodytext
		30.wrap (
			<p class="shadow">
				|
			</p>
		)
	}
}
lib.fce.one-column = COA
lib.fce.one-column {
	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	5.lang.cObject.ifEmpty = 0

	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1

   # Copy the readet content here
	10 < temp.content

	10.renderObj.20.20.file.width = 952c
	10.renderObj.20.20.file.height = 180c
	10.renderObj.30.crop = 390 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###
		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1
		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="full-width">
				|
			</div>
		)
	}

	stdWrap.wrap (
		<div class="decoration"></div>
		|
		</a>
	)
}

lib.fce.two-columns = COA
lib.fce.two-columns {

	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0

	10 < temp.content

	10.select.max = 2
	10.renderObj.20.10.stdWrap.wrap = <div class="hover-two-columns-icons">|</div>

	10.renderObj.20.20.file.width = 457c
	10.renderObj.20.20.file.height = 170c

	10.renderObj.30.cropHTML = 248 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###
		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1 || 2 || 3
		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="two-column-one">
				|
			</a>
			</div>
		)
		2.current = 1
		2.wrap (
			<div class="two-column-two">
				|
			</a>
			</div>
		)
		3.current = 1
	}
	stdWrap.wrap (
		<div class="decoration"></div>
		<div class="two-columns">
			|
			<div class="clear"></div>
		</div>
	)
}

lib.fce.three-columns = COA
lib.fce.three-columns {

	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset

	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0


	10 < temp.content

	10.select.max = 3
	10.renderObj.20.10.stdWrap.wrap = <div class="hover-three-columns-icons">|</div>

	10.renderObj.20.20.file.width = 290c
	10.renderObj.20.20.file.height = 119c
	10.renderObj.30.cropHTML = 248 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###

		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1 || 2 || 3 || 4

		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="three-column-one">
				|
			</a>
			</div>
		)
		2.current = 1
		2.wrap (
			<div class="three-column-two">
				|
			</a>
			</div>
		)
		3.current = 1
		3.wrap (
			<div class="three-column-three">
				|
			</a>
			</div>
		)
		4.current = 1
	}
	stdWrap.wrap (
		<div class="decoration"></div>
		<div class="three-columns">
			|
			<div class="clear"></div>
		</div>
	)
}

lib.fce.four-columns = COA
lib.fce.four-columns {

	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0

	10 < temp.content

	10.select.max = 4
	10.renderObj.20.10.stdWrap.wrap = <div class="hover-four-columns-icons">|</div>

	10.renderObj.20.20.file.width = 210c
	10.renderObj.20.20.file.height = 120c
	10.renderObj.30.cropHTML = 248 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###
		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1 || 2 || 3 || 4 || 5
		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="four-column-one">
				|
			</a>
			</div>
		)
		2.current = 1
		2.wrap (
			<div class="four-column-two">
				|
			</a>
			</div>
		)
		3.current = 1
		3.wrap (
			<div class="four-column-three">
				|
			</a>
			</div>
		)
		4.current = 1
		4.wrap (
			<div class="four-column-four">
				|
			</a>
			</div>
		)
		5.current = 1
	}
	stdWrap.wrap (
		<div class="decoration"></div>
		<div class="four-columns">
			|
			<div class="clear"></div>
		</div>
	)
}
lib.fce.five-columns = COA
lib.fce.five-columns {

	# Load specific settings for the FCE from the flexform
	5 = LOAD_REGISTER
	5.newspid.field = field_newspid
	5.newsdetailpid.field = field_detailpid
	5.newscatid.field = field_newscat
	5.newsoffset.field = field_newsoffset
	5.lang.cObject = TEXT
	5.lang.cObject.data = GP:L
	# To avoid SQL-Injections you have to set intval - so the param
	# will always an integer.
	5.lang.cObject.intval = 1
	5.lang.cObject.ifEmpty = 0

	10 < temp.content

	10.select.max = 5
	10.renderObj.20.10.stdWrap.wrap = <div class="hover-five-columns-icons">|</div>

	10.renderObj.20.20.file.width = 158c
	10.renderObj.20.20.file.height = 100c

	10.renderObj.30.cropHTML = 154 | ... | 1

	stdWrap.split {
		# replace ###SPLITTER### with the split option
		token = ###SPLITTER###
		# the order is beeing defined in the normal optionSplit style
		cObjNum = 1 || 2 || 3 || 4 || 5 || 6
		# define the wraps on every position
		1.current = 1
		1.wrap (
			<div class="five-column-one">
				|
			</a>
			</div>
		)
		2.current = 1
		2.wrap (
			<div class="five-column-two">
				|
			</a>
			</div>
		)
		3.current = 1
		3.wrap (
			<div class="five-column-three">
				|
			</a>
			</div>
		)
		4.current = 1
		4.wrap (
			<div class="five-column-four">
				|
			</a>
			</div>
		)
		5.current = 1
		5.wrap (
			<div class="five-column-five">
				|
			</a>
			</div>
		)
		6.current = 1
	}
	stdWrap.wrap (
		<div class="decoration"></div>
		<div class="five-columns">
			|
			<div class="clear"></div>
		</div>
	)
}

lib.field_top_heading_text = TEXT
lib.field_top_heading_text.value = Welcome! Just perfect chromatics!