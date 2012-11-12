lib.blogsidebar = COA
lib.blogsidebar {
	stdWrap.wrap (
		<div class="blog-sidebar">
			<div class="sidebar-recents">
				<a class="button yellow" id="recent">Recent</a>
				<a class="button yellow" id="comments">Comments</a>
				|

			</div>
		</div>
	)

	10 = COA
	10 {
		stdWrap.wrap = |<div class="decoration sidebar-width"></div>

		10 = CONTENT
		10 {
			stdWrap.wrap (
				<div id="recent-box">
					|
				</div><!-- end recent-box -->
			)

			table = tt_news
			select {
				pidInList = 12
			#	orderBy = crdate desc
				max = 3
			}
			renderObj = COA
			renderObj {
				stdWrap.wrap (
					<div class="sidebar-item-box">
						|
					</div>
				)
				stdWrap.typolink.parameter.data = TSFE: id
				stdWrap.typolink.additionalParams = &tx_ttnews[tt_news]={field:uid}
				stdWrap.typolink.additionalParams.insertData = 1

				10 = IMG_RESOURCE
				10.format = png
				10.stdWrap.dataWrap = <img class="image-deco" src="|" alt="{field:title}" />
				10.file {
					import = uploads/pics/
					import.field = image
					import.listNum = 0
					width = 50c
					height = 50c
				}

				20 = TEXT
				20.field = title
				20.wrap (
					<p class="sidebar-item-title shadow">
					|
					</p>
				)

				30 = TEXT
				30.field = datetime
				30.strftime = Posted: %eth of %B
				30.wrap (
					<p class="sidebar-item-date shadow">
					|
					</p>
				)
			}
		}

		20 = CONTENT
		20 {

			stdWrap.wrap (
				<div id="comments-box">
					|
				</div> <!-- end comments-box -->
			)

			table = tx_veguestbook_entries
			select {
				pidInList = 12
				join = tt_news ON tx_veguestbook_entries.uid_tt_news = tt_news.uid
				orderBy = tx_veguestbook_entries.crdate DESC
				max = 3
			}
			renderObj = COA
			renderObj {
				stdWrap.wrap (
					<div class="sidebar-item-box">
					|
					</div>
				)
				stdWrap.typolink.parameter.data = TSFE: id
				stdWrap.typolink.additionalParams = &tx_ttnews[tt_news]={field:uid_tt_news}
				stdWrap.typolink.additionalParams.insertData = 1

				10 = TEXT
				10.value = <img class="image-deco" src="fileadmin/templates/sophie/images/blog/sidebar-user/1.png" alt="img">

				20 = TEXT
				20.field = firstname
				20.wrap (
					<p class="sidebar-item-title shadow">
					|
					</p>
				)

				30 = TEXT
				30.field = entry
				30.crop = 25|...|1
				30.stripHtml =1
				30.wrap (
					<p class="sidebar-item-date shadow">
					|
					</p>
				)
			}
		}
	}
}

lib.blogpost = COA
lib.blogpost {
	stdWrap.wrap (
		<div class="blog-post">
		|
		</div>
		<div class="decoration blog-width"></div>
	)

	10 = TEXT
	10.field = title
	10.wrap = <h3 class="blog-post-title shadow">|</h3>
	10.typolink.parameter.data = TSFE: id
	10.typolink.additionalParams = &tx_ttnews[tt_news]={field:uid}
	10.typolink.additionalParams.insertData = 1

	20 = TEXT
	20.value (
		<div class="blog-post-title-socials">
			<a href="#"><img class="hover" src="fileadmin/templates/sophie/images/social-icons/facebook.png" alt="img"></a>
			<a href="#"><img class="hover" src="fileadmin/templates/sophie/images/social-icons/twitter.png" alt="img"></a>
			<a href="#"><img class="hover" src="fileadmin/templates/sophie/images/social-icons/mail.png" alt="img"></a>
			<a href="#"><img class="hover" src="fileadmin/templates/sophie/images/social-icons/rss.png" alt="img"></a>
		</div>
	)

	// Hover control
	30 = COA
	30 {

		stdWrap.wrap (
			<div class="blog-hover-control">
				|
			</div> <!-- end blog-hover-control -->
		)

		10 = COA
		10 {
			stdWrap.wrap (
				<div class="hover-blog-effects">
					<div class="blog-post-zoom-hover">
						|
					</div>
				<div class="hover-blog-background-expand"></div>
				</div>
			)
			stdWrap.if.isFalse.data = GP: tx_ttnews|tt_news

			10 = IMG_RESOURCE
			10.format = png
			10.stdWrap.dataWrap = <a class="colorbox-big" title="Image Title" href="|"><img class="hover-zoom" src="fileadmin/templates/sophie/images/columns/icon/magnifier.png" alt="Resize"></a>
			10.file {
			  import = uploads/pics/
			  import.field = image
			  import.listNum = 0
			  width = 660c
			  height = 218c
			}

			20 = TEXT
			20.value = <img class="hover-link" src="fileadmin/templates/sophie/images/columns/icon/arrow-right.png" alt="img" />
			20.typolink.parameter.data = TSFE: id
			20.typolink.additionalParams = &tx_ttnews[tt_news]={field:uid}
			20.typolink.additionalParams.insertData = 1

			30 = TEXT
			30.value= <img class="facebook-share" src="fileadmin/templates/sophie/images/columns/icon/facebook.png" alt="img">
			30.typolink.parameter = www.facebook.com/sharer/sharer.php
			30.typolink.additionalParams = &u=http://www.peterindustries.com?ref=pruijter

			40 = TEXT
			40.value = <img class="twitter-share" src="fileadmin/templates/sophie/images/columns/icon/twitter.png" alt="img">
			40.typolink.parameter = twitter.com/intent/tweet
			40.typolink.additionalParams = &source=webclient&amp;text=Read%20this%3A%20%2Fvia%20peterindustries.com"
		}

		20 = IMG_RESOURCE
		20.format = png
		20.stdWrap.dataWrap = <img class="blog-post-image image-deco" src="|" alt="img" />
		20.file {
		  import = uploads/pics/
		  import.field = image
		  import.listNum = 0
		  width = 660c
		  height = 216c
		}
	}

	40 = COA
	40 {
		stdWrap.wrap (
			<ul class="blog-post-details">
			|
			</ul>
			<div class="clear"></div>
		)


		10 = TEXT
		10.field = author
		10.wrap = <li class="posted-by">|</li>
		10.typolink.parameter.field = author_email
		10.typolink.ATagParams = class="blog-link"

		20 = TEXT
		20.field = datetime
		20.strftime = %d %B, %Y
		20.wrap = <li class="posted-at">|</li>
		20.typolink.parameter.data = TSFE: id
		20.typolink.additionalParams = &tx_ttnews[tt_news]={field:uid}
		20.typolink.additionalParams.insertData = 1
		20.typolink.ATagParams = class="blog-link"

		30 = CONTENT
		30 {
			table = tt_news_cat
			select {
				pidInList = 12
				join = tt_news_cat_mm ON tt_news_cat.uid =tt_news_cat_mm.uid_foreign
				andWhere.dataWrap = tt_news_cat_mm.uid_local = {field:uid}
			}
			renderObj = COA
			renderObj {
				10 = COA
				10 {
					10 = TEXT
					10.field = title
					10.noTrimWrap = ||, |
					10.typolink.parameter.data = TSFE: id
					10.typolink.additionalParams = &tx_ttnews[cat]={field:uid}
					10.typolink.additionalParams.insertData = 1
					10.typolink.ATagParams = class="blog-link"
					10.typolink.title.dataWrap = Read more from {field: title}

				}
			}
			// Remove last comma
			stdWrap.substring = 0,-2
			stdWrap.innerWrap = <li class="posted-in">|</li><!--	<li class="posted-co"><a class="blog-link" href="#">15 Comments</a></li>-->

		}

		40 = TEXT
		40.value = More
		40.wrap = <li class="posted-mo">|</li>
		40.typolink.parameter.data = TSFE: id
		40.typolink.additionalParams = &tx_ttnews[tt_news]={field:uid}
		40.typolink.additionalParams.insertData = 1
		40.typolink.ATagParams = class="blog-link"
		40.if.isFalse.data = GP: tx_ttnews|tt_news

	}

	50 = COA
	50 {

		// Preview
		10 = TEXT
		10.field = bodytext
		10.stripHtml = 1
		10.crop = 550|...|1
		10.wrap = <p class="blog-post-text shadow">|</p>
		10.if.isFalse.data = GP: tx_ttnews|tt_news

		// Singleview
		20 = TEXT
		20.field = bodytext
		20.parseFunc = < lib.parseFunc_RTE
		20.wrap = <div class="blog-post-text shadow">|</div>
		20.if.isTrue.data = GP: tx_ttnews|tt_news

	}
}


lib.blog = COA

lib.blog.10 = CONTENT
lib.blog.10 {
	stdWrap.wrap (
		<div class="decoration"></div>
			<div class="blog">
				|
			</div><!-- end blog -->
	)

	table = tt_news
	select {
		pidInList = 12
		andWhere.cObject = COA
		andWhere.cObject {
			10 = TEXT
			10.if.isTrue.data = GP: tx_ttnews|tt_news
			10.data = GP: tx_ttnews|tt_news
			10.intval = 1
			10.wrap = tt_news.uid = |

		}
		orderBy = datetime desc
		max = 5
	}
	renderObj =< lib.blogpost
}

lib.blog.30 < lib.blogsidebar
lib.blog.40 = TEXT
lib.blog.40.value = <div class="clear"></div>