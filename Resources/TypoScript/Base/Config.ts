config {

doctype = <!DOCTYPE html>
  headerComment (

  Services provided by Peter Industries
  Customized programming, brainstorming and TYPO3 Consultancy
  Info at http://www.peterindustries.com

  ===
  )

    # Remove generator metatag and do some cleaningup
    sourceopt {
      removeGenerator = 1
      formatHtml = 4
      formatHtml.tabSize = 3

    }
  compressCss = 1
  compressJs = 0
  removeDefaultCss =0
  removeDefaultJS =0

  # Send cacheheaders, so we can cache stuff
  sendCacheHeaders = 1

  # RealUrl configuration
  tx_realurl_enable = 1
  baseURL = http://test.peterindustries.com/

}

##############################################################################################
# Language configuration                                                                     #
##############################################################################################
config.linkVars = L
config.uniqueLinkVars = 1
config.sys_language_overlay = content_fallback
config.language = en
config.locale_all = en_EN
config.htmlTag_langKey = en-EN
config.sys_language_uid = 0
[browser = msie]
config.htmlTag_setParams = xmlns="http://www.w3.org/1999/xhtml" xmlns:v=”urn:schemas-microsoft-com:vml” xml:lang="en"

[globalVar = GP:L = 1]
config.language = nl
config.locale_all = nl_NL
config.htmlTag_langKey = nl-NL
config.sys_language_uid = 1
[globalVar = GP:L = 1] && [browser = msie]
config.htmlTag_setParams = xmlns="http://www.w3.org/1999/xhtml" xmlns:v=”urn:schemas-microsoft-com:vml” xml:lang="nl"
[global]

config.moveJsFromHeaderToFooter = 1
config.removeDefaultJS = external



