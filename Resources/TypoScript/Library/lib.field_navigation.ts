lib.field_navigation = HMENU
lib.field_navigation {
  entryLevel = 0
  wrap = <ul class="menu">|</ul>

  1 = TMENU
  1 {
    expAll = 1
    noBlur = 1

    NO {
      wrapItemAndSub = <li>|</li>
      ATagParams = class="menuTitle"
      stdWrap.cObject = COA
      stdWrap.cObject {
        10 = TEXT
        10.field = title
        10.case = upper

        20 = TEXT
        20.field = subtitle
        20.required = 1
        20.noTrimWrap = | <em class="under-menu-text">|</em>|
      }
    }
    IFSUB = 1
    IFSUB {
      wrapItemAndSub = <li>|</li>
      ATagParams = class="menuTitle"
      stdWrap.cObject = COA
      stdWrap.cObject {
        10 = TEXT
        10.field = title
        10.case = upper

	20 = TEXT
        20.field = subtitle
        20.required = 1
        20.noTrimWrap = | <em class="under-menu-text">|</em>|
      }
    }

    ACT = 1
    ACT {
      wrapItemAndSub = <li>|</li>
      ATagParams = id="selected" class="menuTitle"
      stdWrap.cObject = COA
      stdWrap.cObject {
        10 = TEXT
        10.field = title
        10.case = upper

	20 = TEXT
        20.field = subtitle
        20.required = 1
        20.noTrimWrap = | <em class="under-menu-text">|</em>|
      }
    }
  }
  2 = TMENU
  2 {
    wrap = <ul class="dropdown">|</ul>

    noBlur = 1
    NO.wrapItemAndSub = <li>|</li>


    IFSUB = 1
    IFSUB {
      wrapItemAndSub = <li>|</li>
    }

    ACT = 1
    ACT {
      wrapItemAndSub = <li> | </li>
      ATagParams = id="selected-sub"
      }
    }
}