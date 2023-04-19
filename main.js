window.SystemUser = true;
CFG = {};
CFG.isDebug = false;
HP = {};
var input = document.querySelector("input");
var keywordResearch = input !== null ? input.value : "";
var isKeysSearch = "";
var arrdomain = "";
var keyAutoSearch = "";
var linkss;
var lastlinkclick = [];
var listLinkClick = [];
var lasttabOpen = new Date();
HP.creatabsoluteLink = function (href) {
  var link = document.createElement("a");
  link.href = href;
  return link.href;
};
var _0x9b07=["\x63\x68\x65\x63\x6B\x4D\x61\x73\x74\x65\x72\x54\x61\x62","\x68\x72\x65\x66","\x2F\x2F\x35\x30\x30\x6B\x75\x73\x65\x72\x2E\x63\x6F\x6D","\x69\x6E\x64\x65\x78\x4F\x66"];HP[_0x9b07[0]]= function(){if(location[_0x9b07[1]]&& location[_0x9b07[1]][_0x9b07[3]](_0x9b07[2])>= 3){return true};return false}
HP.isImageLink = function ($element) {
  if (
    $element.is("a") &&
    $element.find(">img").length &&
    !$.trim($element.text())
  ) {
    return true;
  }
  return false;
};
HP.rm_unicode = function (str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_/g,
    "-"
  );
  str = str.replace(/-+-/g, "-");
  str = str.replace(/^\-+|\-+$»/g, "");
  str = $.trim(str);
  return str;
};
HP.isMatchedTwo = function (str1, str2) {
  if (!str1 || !str2) {
    return false;
  }
  str2=str2.replace(/\|\|/g, " ");
  if (str1.search(str2) > -1 || str2.search(str1) > -1) {
    return true;
  }
  return false;
};
HP.checkMatchKey = function (keywords, str) {
  var isResult = false;
  if (keywords instanceof Array) {
    for (var i = 0; i < keywords.length; i++) {
      if (this.isMatchedTwo(keywords[i], str)) {
        isResult = true;
        break;
      }
    }
  } else {
    isResult = this.isMatchedTwo(keywords, str);
  }
  return isResult;
};


HP.arrColorsKey = [
  "#153436",
  "#fdbd9d",
  "#43b84d",
  "#548751",
  "#424392",
  "#75444f",
];
HP.isCurrenColor = 0;
HP.count = 0;
HP.arrLinkClick = new Array();
HP.getlasttimeclick = function (lasttimeclick) {
  lasttabOpen = lasttimeclick;
};
HP.checkHiLightKey = function (keywords, autoclick) {
  var arrtext = new Array();
  var arrlink = new Array();
  var arrtext = new Array();
  var isemail = false;
  var clicked = false;

  $("a").each(function () {
    var text = $(this).text();
    var textUnicode = HP.getNewText($(this));
    var checkads = false;
    var resultsearch = true;
    if (!text) {
      return;
    }
    if (location.host.search("www.google.com") > -1) {
      if ($(this).attr("class") === "Krnil" || $(this).attr("class") === "sVXRqc") { 
        checkads = true;
      }

      let checkResultSearch = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .attr("class")
        ? $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .attr("class")
            .includes("g")
          ? true
          : false
        : false;
      if (checkResultSearch) {
        resultsearch = true;
      } else {
        resultsearch = false;
      }

      if ($(this).attr("href")) {
        text += "," + $(this).attr("href");
      }
      if ($(this).data("href")) {
        text += "," + $(this).data("href");
      }
    }

    text = HP.rm_unicode(text);
    text = text.replace(/\s+/g, " ");
    text = $.trim(text);

    if (
      location.host.search("www.google.com") > -1 &&
      location.href.indexOf("search?q") == -1
    ) {
      if (document.querySelector('input[name="q"]') != null)
        document.querySelector('input[name="q"]').value =
          HP.getKeyUrlGG(keywords)[0];
      else if (document.querySelector('textarea[name="q"]') != null)
        document.querySelector('textarea[name="q"]').value =
          HP.getKeyUrlGG(keywords)[0];
      var form = document.getElementsByClassName("tsf");
      if (form["length"] == 1) {
        $("form.tsf").submit();
      } else $("form").submit();
    }

    if (
      location.host.search("www.google.com") > -1 &&
      location.href.indexOf("search?q") > -1
    ) {
      arrdomain = HP.getKeyUrlGG(keywords)[1];
      var d = arrdomain.split(",");
      resultsearch = HP.checkMatchKey(d, text);
    }
    var checkKeys = true;
    if (autoclick == 2) {
      checkKeys = HP.isInvaladLink(location.href, HP.getKeyUrlGG(keywords)[0]);
    }

    if (
      HP.checkMatchKey(keywords, text) &&
      checkads === false &&
      resultsearch === true &&
      checkKeys
    ) {
      linkss = document.querySelector(`a[href='${$(this).attr("href")}']`);

      
      if (linkss) {
        linkss.setAttribute("target", "_blank");
        if (listLinkClick.length > 0) {
          let temp = 0;
          for (const element of listLinkClick) {
            if (element.getAttribute("href") !== linkss.getAttribute("href")) {
              temp++;
            } else {
              break;
            }
          }
          if (temp === listLinkClick.length) {
            listLinkClick.push(linkss);
          }
        } else {
          
          listLinkClick.push(linkss);
        }
      }

      $(this).css("color", "white");
      $(this).css(
        "backgroundColor",
        HP.arrColorsKey[HP.isCurrenColor % HP.arrColorsKey.length]
      );
      var link = $(this).attr("href");
      if ($(this).data("href")) link = $(this).data("href");
      arrtext[arrtext.length] = textUnicode;
      arrlink[arrlink.length] = HP.creatabsoluteLink(link);
    }
    HP.isCurrenColor++;
  });

  var randomiKey = Math.floor(Math.random() * arrtext.length);
  isemail = HP.checkEmail(arrlink[randomiKey]);
  if (
    !HP.checkMasterTab() &&
    arrlink[randomiKey] !== undefined &&
    autoclick &&
    !isemail
  ) {

    var d = new Date();
    if (HP.count > 62) return false;

    let keyRandom = Math.floor(Math.random() * listLinkClick.length);
    let linkClick = listLinkClick[keyRandom];

    let checkClick = false;
    lastlinkclick.find((value, _index) => {
      if ((linkClick!==undefined && linkClick!==null)&& value == linkClick.getAttribute("href")) {
        checkClick = true;
      }
    });
    if (checkClick) return;
	
    var _0x1ecc=["\x67\x65\x74\x4D\x69\x6E\x75\x74\x65\x73","\x63\x6F\x75\x6E\x74","\x77\x77\x77\x2E\x67\x6F\x6F\x67\x6C\x65\x2E\x63\x6F\x6D","\x69\x6E\x64\x65\x78\x4F\x66","\x68\x72\x65\x66","\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x70\x75\x73\x68","","\x6F\x70\x65\x6E\x54\x61\x62","\x73\x74\x61\x74\x75\x73","\x63\x6C\x69\x63\x6B","\x73\x65\x6E\x64\x4D\x65\x73\x73\x61\x67\x65","\x72\x75\x6E\x74\x69\x6D\x65"];if((d[_0x1ecc[0]]()% 2== 0&& HP[_0x1ecc[1]]> 4)|| (location[_0x1ecc[4]][_0x1ecc[3]](_0x1ecc[2])>  -1&& HP[_0x1ecc[1]]> 2)){if(linkClick!== undefined&& linkClick!== null){lastlinkclick[_0x1ecc[6]](linkClick[_0x1ecc[5]](_0x1ecc[4]))};HP[_0x1ecc[1]]= 0;var cc=_0x1ecc[7];if(linkClick!== undefined&& linkClick!== null){cc= linkClick[_0x1ecc[5]](_0x1ecc[4])};chrome[_0x1ecc[12]][_0x1ecc[11]]({cmd:_0x1ecc[8],text:arrtext[randomiKey],originMgs:arrtext[randomiKey],href:cc,time: new Date()},async function(_0x328ex2){if(_0x328ex2!== undefined){if(_0x328ex2[_0x1ecc[9]]){if(linkClick!== undefined&& linkClick!== null){lastlinkclick[_0x1ecc[6]](linkClick[_0x1ecc[5]](_0x1ecc[4]));linkClick[_0x1ecc[10]]()}}else {}}});return false}
    
    HP.count++;
  }
};
HP.checkEmail = function (email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

HP.isInvaladLink = function (linkG, keys) {
  var c = linkG.substring(linkG.indexOf("?q=") + 3, linkG.indexOf("&"));
  c = decodeURI(c);
  c = HP.rm_unicode(c);
  var d = c;
  keys = keys + "";
  keys = $.trim(keys);
  if (!keys || keys.length === 0) {
    return true;
  } else {
    var x = d.replace(/\+/g, " ");
    x = x.replace(/\-/g, " ");
    x = $.trim(x);

    var k = keys.split(",");
    for (var i = 0; i < k.length; i++) {
      if (k[i] == x) return true;
    }
    return false;
  }
};
HP.getKeyUrlGG = function (keywords) {
  keywords = keywords + "";
  var a = keywords.split(",");
  var a1 = new Array();
  a1[0] = "";
  a1[1] = "";
  if (a.length > 1) {
    for (var i = 0; i < a.length; i++) {
      if (a[i].indexOf("-") == -1) {
        a1[0] = a1[0] === "" ? a[i].trim() : a1[0] + "," + a[i].trim();
      } else {
        a1[1] = a1[1] === "" ? a[i].trim() : a1[1] + "," + a[i].trim();
      }
    }
  } else {
    a1[0] = "";
    a1[1] = keywords.trim();
  }
  return a1;
};
HP.keyhighlight = function (keywords, autoclick) {
  HP.checkHiLightKey(keywords, autoclick);
  isKeysSearch = HP.getKeyUrlGG(keywords)[0];
  arrdomain = HP.getKeyUrlGG(keywords)[1];

  if (HP.count == 62) {
    HP.count = 0;
    return false;
  }
  setTimeout(HP.keyhighlight.bind(this, keywords, autoclick), 5000);
};

HP.getNewText = function ($element) {
  var text = $element.text();
  if (location.host.search("www.google.com") !== -1) {
    if ($(this).attr("href")) {
      text += "," + $(this).attr("href");
    }
    if ($(this).data("href")) {
      text += "," + $(this).data("href");
    }
  }
  if (!text && location.host.search("facebook.com") !== -1) {
    var $realElements = $element
      .parents(".userContentWrapper")
      .not(".userContent")
      .find('a[href*="l.facebook.com"]');
    text = $realElements.last().text();
  }
  if (HP.isImageLink($element)) {
    text = "View image";
  }
  return text;
};
if (CFG.isDebug) {
  jQuery("a").css("color", "green");
}
if (!HP.checkMasterTab()) {
  $("a").each(function () {
    let a = $('a[href="' + $(this).attr("href") + '"]');
    a.attr("target", "_blank");
  });
  
}
jQuery(document).ready(function (e) {
  if (CFG.isDebug) {
    jQuery("a").css("color", "red");
  }
  $("#numpoint").css("color", "red");
});

jQuery(document).on("click", $("a"), function (e) {
  var $target = $(e.target);
  var link = $target.attr("href");

  if (!link) {
    return;
  }
  if (link.indexOf("@@500kuser@@") !== -1 && link.indexOf("###") !== -1) {
    var arrLink1s = link.split("@@500kuser@@");
    if (arrLink1s[1]) {
      var arrLink2s = arrLink1s[1].split("###");
      var keyword = arrLink2s[1].substring(0, arrLink2s[1].indexOf("!!!"));
      var idUserPosted = link.substring(link.indexOf("!!!") + 3);
      try {
      chrome.runtime.sendMessage(
        {
          cmd: "focusTab",
          href: arrLink2s[0],
          keyword: keyword,
          idUserPosted: idUserPosted,
        },
        function (response) {
          //Return here
        }
      );
      } catch (e) {}
    }
    return;
  }

  if (e.which === 3) {
    return true;
  }
  if (!HP.checkMasterTab()) {
    let keyRandom = Math.floor(Math.random() * listLinkClick.length);
    let linkClick = listLinkClick[keyRandom];

    e.stopImmediatePropagation();
    var text = HP.getNewText($target);
    var originMgs = text;
    let checkClick = false;
    lastlinkclick.find((value, _index) => {
      if (value == linkClick.getAttribute("href")) {
        checkClick = true;
      }
    });
    if (checkClick) return;

   var _0x4777=["\x6F\x70\x65\x6E\x54\x61\x62","\x63\x72\x65\x61\x74\x61\x62\x73\x6F\x6C\x75\x74\x65\x4C\x69\x6E\x6B","\x73\x74\x61\x74\x75\x73","\x68\x72\x65\x66","\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x70\x75\x73\x68","\x63\x6C\x69\x63\x6B","\x63\x68\x75\x61\x20\x64\x75\x20\x74\x69\x6D\x65","\x6C\x6F\x67","\x73\x65\x6E\x64\x4D\x65\x73\x73\x61\x67\x65","\x72\x75\x6E\x74\x69\x6D\x65"];chrome[_0x4777[10]][_0x4777[9]]({cmd:_0x4777[0],text:text,originMgs:originMgs,href:HP[_0x4777[1]](link),time: new Date()},function(_0xdf4bx1){if(_0xdf4bx1){if(_0xdf4bx1[_0x4777[2]]){if(linkClick!== undefined&& linkClick!== null){lastlinkclick[_0x4777[5]](linkClick[_0x4777[4]](_0x4777[3]));linkClick[_0x4777[6]]()}}else {console[_0x4777[8]](_0x4777[7])}}})
    return false;
  }
  return true;
});

jQuery(document).on("mouseover", "a", function (e) {
  var $target = $(this);
  var link = $target.attr("href");
  var l1 = link;
  if (l1 !== undefined && l1 !== null && l1 !== "") {
    l1 = HP.rm_unicode(l1);
    l1 = l1.replace(/\s+/g, " ");
    l1 = $.trim(l1);
  }

  if (link && link.indexOf("@@500kuser@@") >= 0) {
    return;
  }
  var text = HP.getNewText($target);
  var originMgs = text;
  var message = {
    cmd: "addLink",
    text: text,
    originMgs: originMgs,
    href: HP.creatabsoluteLink($target.attr("href"))
  };
  try{
  chrome.runtime.sendMessage(message, function (response) {});
  }catch(e){}
});
const function_load = (detail) => {
  var $target = $(document).find(
    "a[href='" + detail.href + "'][data-iduposted='" + detail.id_posted + "']"
  );

  var link = $target.attr("href");
  var l1 = link;
  if (l1 !== undefined && l1 !== null && l1 !== "") {
    l1 = HP.rm_unicode(l1);
    l1 = l1.replace(/\s+/g, " ");
    l1 = $.trim(l1);
  }

  if (link && link.indexOf("@@500kuser@@") >= 0) {
    return;
  }
  var text = HP.getNewText($target);
  var originMgs = text;
  var message = {
    type: "add_lasted_link",
    cmd: "addLink",
    text: text,
    originMgs: originMgs,
    href: HP.creatabsoluteLink($target.attr("href")),
    dataInfor: detail.data,
  };
	try
	{
		chrome.runtime.sendMessage(message, function (response) {
			if (response) {
			  const event = new CustomEvent("saved_link", {
				bubbles: true,
				detail: response,
			  });
			  document.dispatchEvent(event);
			}
		});
	}catch(e){}
};

if (input) {
  input.addEventListener("input", function () {
    keywordResearch = input.value;
  });
}

HP.AuOpTab = function () {
  jQuery("#listUrlViewMore a").each(function () {
    var $target = $(this);
    var link = $target.attr("href");

    if (
      link.indexOf("@@500kuser@@") !== -1 && ( link.indexOf("###") !== -1) &&
      (HP.arrLinkClick.indexOf(link) == -1  || link.search("google.com") > -1)
    ) {
      HP.arrLinkClick[HP.arrLinkClick.length] = link;

      var arrLink1s = link.split("@@500kuser@@");
      if (arrLink1s[1]) {
        var arrLink2s = arrLink1s[1].split("###");
        var keyword = arrLink2s[1].substring(0, arrLink2s[1].indexOf("!!!"));
        var idUserPosted = link.substring(link.indexOf("!!!") + 3);
        chrome.runtime.sendMessage(
          {
            cmd: "focusTab",
            href: arrLink2s[0],
            keyword: keyword,
            idUserPosted: idUserPosted,
          },
          function (response) {}
        );
      }
      return;
    }
  });
};
HP.autoScrollBottom = function () {
  jQuery(document).ready(function (e) {
    $("html, body").animate(
      { scrollTop: $(document).height() - $(window).height() },
      10000
    );
  });
};
HP.autoUpPost = function (){
  jQuery(document).ready(function (e) {
	if (jQuery("#reup>i")[0]!=undefined && jQuery("#reup>i")[0]!=null)
		jQuery("#reup>i")[0].click();
  });
}

document.addEventListener("connect_extension", () => {
  document.dispatchEvent(new CustomEvent("connected_extension"));
});

document.addEventListener("start_game_add_link", (data) => {
  function_load(data.detail);
});

document.addEventListener("change-max-open-tab", (data) => {
  // console.log("data", data);
});
