// Nav
//first nav ,start codes
customElements.define(
    'nav-first',
    class NavDetail extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav('nav-first')
            //start codes
            start()
        }
    }
)
//nav tab
customElements.define(
    'nav-tab',
    class NavTab extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav('nav-tab')
        }
    }
)
//other
customElements.define(
    'nav-home',
    class NavHome extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav('nav-home')
            passageShow()

        }
    }
)
customElements.define(
    'nav-set',
    class NavSet extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav('nav-set')
            startSet()
        }

    }
)
customElements.define(
    'nav-ipad',
    class NavIpad extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav('nav-ipad')
        }
    }
)
customElements.define(
    'nav-passage',
    class NavPassage extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav('nav-passage')
        }
    }
)
customElements.define(
    'nav-modal',
    class NavModal extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav('nav-modal')
        }
    }
)
customElements.define(
    'passage-show',
    class PassageShow extends HTMLElement {
        connectedCallback() {
            this.innerHTML = p
        }
    }
)
customElements.define(
    'nav-more',
    class NavMore extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav("nav-more")
            startMore()
        }
    }
)
customElements.define(
    'nav-tools',
    class NavTools extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav("nav-tools")
        }
    }
)
customElements.define(
    'nav-more-archive',
    class NavMoreArchive extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav("nav-more-archive")
            PassageAchieveDate();

        }
    }
)
customElements.define(
    'nav-more-talking',
    class NavMoreTalking extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav("nav-more-talking")
        }
    }
)
customElements.define(
    'nav-gitalk',
    class NavGitalk extends HTMLElement {
        connectedCallback() {
            this.innerHTML = getNav("nav-gitalk")
        }
    }
)
//var
var darkmode
//Start running
if (localStorage.style == undefined) {
    localStorage.style = 'md'
}
if (location.search.split("&")[0] !== "?ionic:mode=" + localStorage.style) {
    location.search = "?ionic:mode=" + localStorage.style
}

start = function () {
    //themes
    if (localStorage.darkauto == 'true') {
        const darkmode = window.matchMedia('(prefers-color-scheme: dark)');
        toggleDarkTheme(darkmode.matches);
        darkmode.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

        function toggleDarkTheme(shouldAdd) {
            document.body.classList.toggle('dark', shouldAdd);
        }
    } else {
        document.body.classList.toggle('dark', /^true$/i.test(localStorage.darkmode));
    }
    //display
    checkWindow()
    //update
    checkupdate()
    //CDN warns
    warnCDN()
    //Share Check
    SharingCheck();

}

startSet = function () {
    const darkauto = document.querySelector('#autodark');
    const darktoggle = document.querySelector('#darkmode');
    if (localStorage.darkauto == undefined) {
        localStorage.darkauto = false;
    } else if (localStorage.darkauto == 'false') {
        darkauto.checked = localStorage.darkauto
        darktoggle.checked = localStorage.darkmode
        darktoggle.addEventListener('ionChange', (ev) => {
            document.body.classList.toggle('dark', ev.detail.checked);
            result = ev.detail.checked
            localStorage.darkmode = /^true$/i.test(result);
        });
    } else if (localStorage.darkauto == 'true') {
        darkauto.checked = localStorage.darkauto
        darktoggle.addEventListener('ionChange', (ev) => {
            document.body.classList.toggle('dark', ev.detail.checked);
            result = ev.detail.checked
            localStorage.darkmode = /^true$/i.test(result);
        });

        darkmode = window.matchMedia('(prefers-color-scheme: dark)');
        darkmode.addListener((e) => checkToggle(e.matches));

        function checkToggle(shouldCheck) {
            darktoggle.checked = shouldCheck;
        }
    }
    darktoggle.disabled = localStorage.darkauto
    darkauto.addEventListener('ionChange', (ev) => {
        localStorage.darkauto = ev.detail.checked;
        darktoggle.disabled = localStorage.darkauto
        alertReload();
    });
    const styletoggle = document.querySelector('#styles')
    styletoggle.value = localStorage.style;
    styletoggle.addEventListener('ionChange', () => {
        localStorage.style = styletoggle.value
        alertReload();
    })

}
startMore = function () {
    const pageRoot = document.querySelector('#ionSegment')
    const pageName = document.querySelector('#nav-more-page')
    pageName.setRoot(pageRoot.value)
    pageRoot.addEventListener('ionChange', () => {
        const pageName = document.querySelector('#nav-more-page')
        pageName.setRoot(pageRoot.value)
    })
}
//Get passage
var httpRequest = new XMLHttpRequest(), httpget = new XMLHttpRequest(), httpGETfunction = new XMLHttpRequest()
var passageJson, passageList = "";
var gitalk = {};

function passageShow() {

    httpget.open('GET', 'passage/passage-list.json', true);
    httpget.send();
    httpget.onreadystatechange = function () {

        if (httpget.readyState == 4 && httpget.status == 200) {
            let json = JSON.parse(httpget.responseText);
            json.passage.forEach(function (item, i) {
                passageList = passageList +
                    `<ion-card>
					<ion-card-header>
						<ion-sub-title>` +
                    item.time + `  作者：` + item.author +
                    `</ion-sub-title>` +
                    `<ion-card-title>` +
                    item.passageName +
                    `</ion-card-title>` +
                    `</ion-card-header>` +
                    `<ion-card-content>` +
                    item.des +
                    `</ion-card-content>` +
                    `<ion-button onclick="passageGet('` + item.passagePath + `','` + item
                        .passageName + `','` + item.musicPath + `','` + item.musicName + `','` +
                    item.des + `',` + i + `)" fill="clear">阅读</ion-button>` +
                    `</ion-card>`
                if (i < 6) {
                    document.getElementById("list").innerHTML = passageList
                }

                gitalk[item.passagePath] = new Gitalk({
                    clientID: '0cb54c18847c58ac11d2', // GitHub Application Client ID
                    clientSecret: '8411f9c8490d471a1b016adfbcfaae53677b28a1', // GitHub Application Client Secret
                    repo: 'qjasn.github.io', // 存放评论的仓库
                    owner: 'qjasn', // 仓库的创建者，
                    admin: ['qjasn'], // 如果仓库有多个人可以操作，那么在这里以数组形式写出
                    id: item.passagePath, // 用于标记评论是哪个页面的，确保唯一，并且长度小于50
                    title: item.passageName
                })


            })
            document.getElementById("list").innerHTML += "<div style='text-align: center'><ion-text color='medium'><sub>主页最多除过置顶显示5个文章，其余请在更多页面中查看</sub></ion-text></div>"
        }
    }
}

var p, passagen, describe, gitalkname, title, text;
var fzfp = `
<h3>404 not found</h3>
`

function passageGet(passage, passagename, music, musicn, des, num) {
    document.title = passagename
    title = passagename
    passagen = passagename
    describe = des;
    window.location.hash = "#passage," + passage
    gitalkname = passage
    text = "true"
    toastAlert("dark", 600, "<ion-text>正在加载，请耐心等待</ion-text>", true, 'bottom', '')
    httpRequest.open('GET', 'passage/' + passage + '.md', true); //get passage
    httpRequest.send(); //send require
    let progressBar = document.querySelector("#progress")
    progressBar.value = 0
    fadeIn(document.getElementById("progress"), 5)
    httpRequest.onreadystatechange = function () {
        let progressBar = document.querySelector("#progress")

        progressBar.value = httpRequest.readyState * 0.25

        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 404) {
                p = "<ion-content class=\"ion-padding\"><div  class=\"ion-padding\">" + marked(fzfp) + "</div></ion-content>"
            } else {
                p = marked(httpRequest.responseText)
                if (music !== "none") {
                    p = `
					<div>
						<ion-card>
							<ion-card-header>
								<ion-card-title>` + musicn + `</ion-card-title>
							</ion-card-header>
							<ion-card-content>
								<audio controls style="width:97%;left:1.5%">
									<source src="music/` + music + `">
								</audio>
							</ion-card-content>
						</ion-card>` +
                        p + `</div>`
                }

                if (gitalkname != "update") {
                    p = p + `<ion-fab onclick='openGitalk()' slot="fixed" vertical="bottom" horizontal="end"><ion-fab-button><ion-icon name="chatbox-ellipses-outline"></ion-icon></ion-fab-button>`
                }
                p = "<ion-content class='markdown'>" + p + "</ion-content>"
                number = num
                Page('passage-show', "to", true)
                wait(200).finally(() => {
                    fadeOut(document.getElementById("progress"))
                })
            }
        }
    }
}

var nav

function Page(page, type, share) {
    nav = document.querySelectorAll("#passageNav")
    let shareButton = document.querySelector("#share-button")
    let backButton = document.querySelector("#back-button")
    switch (type) {
        case "to":
            if (display == "ipad") {
                backButton.disabled = "false"
                document.getElementById("title2").innerText = title
                fadeIn(document.getElementById("ipad-back"), 10);
                if (share == true) {
                    console.log("share true")
                    shareButton.disabled = "false"
                    fadeIn(document.getElementById("ipad-share"), 10);
                }
                nav[0].push(page)
            } else {
                backButton.disabled = "false"
                document.getElementById("title2").innerText = title
                fadeIn(document.getElementById("ipad-back"), 10);
                if (share == true) {
                    console.log("share true")
                    shareButton.disabled = "false"
                    fadeIn(document.getElementById("ipad-share"), 10);
                }
                openCardModal().finally(function () {
                    document.getElementById("title2").innerText = title
                    nav = document.querySelectorAll("#passageNav")
                    nav[0].push(page)
                })
            }
            break;
        case "backRoot":
            gobackroot(page)
            if (display == "ipad") {
                backButton.disabled = "true"
                shareButton.disabled = "true"
                fadeOut(document.getElementById('ipad-share'), 10);
                fadeOut(document.getElementById('ipad-back'), 10);
            } else {
                dismissModal();
                backButton.disabled = "true"
                shareButton.disabled = "true"
                fadeOut(document.getElementById('ipad-share'), 10);
                fadeOut(document.getElementById('ipad-back'), 10);
            }
            text = false;
            document.getElementById('title2').innerText = '';
            location.hash = '';
            document.title = 'Qjasn\'s Blog'
            break;
    }
}

//modal
let currentModal = null;
let GitalkModal = null;

async function openModal(opts = {}) {
    const modal = await modalController.create({
        component: 'nav-modal',
        ...opts,
    });
    await modal.present();
    document.getElementById("title1").innerHTML = title
    currentModal = modal;
}

async function openGitalkModal(opts = {}) {
    const modal = await modalController.create({
        component: 'nav-gitalk',
        ...opts,
    });
    await modal.present();
    document.getElementById("titleA").innerHTML = "评论"
    GitalkModal = modal;
}

async function openGitalk() {
    openGitalkModal({presentingElement: document.querySelector('ion-nav')}).finally(() => {
        gitalk[gitalkname].render("gitalk")
    })

}

/*
function openSheetModal() {
    openModal({
        breakpoints: [0, 0.2, 0.5, 1],
        initialBreakpoint: 0.2,
    });
}
 */

async function openCardModal() {
    if (window.innerWidth > 770) {
        openModal({
            presentingElement: document.querySelector('.all-screen'),
        });
    } else {
        openModal({
            presentingElement: document.querySelector('ion-tabs'),
        });
    }
}

function dismissModal() {
    if (currentModal) {
        currentModal.dismiss().then(() => {
            currentModal = null;
        });
    }
}

function dismissGitModal() {
    if (GitalkModal) {
        GitalkModal.dismiss().then(() => {
            GitalkModal = null;
        });
    }
}

//Function
//JavaScript

function repeat(arr) {
    let temp = []
    for (let i = 0; i < arr.length; i++) {

        if (temp.indexOf(arr[i]) == -1) {
            temp.push(arr[i])
        }
    }
    return temp;

}

function fadeIn(element, speed) {
    if (element.style.opacity != 1) {
        var speed = speed || 30;
        let num = 0;
        let st = setInterval(function () {
            num++;
            element.style.opacity = num / 10;
            if (num >= 10) {
                clearInterval(st);
            }
        }, speed);
    }
}

function fadeOut(element) {
    if (element.style.opacity != 0) {
        var speed = speed || 30;
        let num = 10;
        let st = setInterval(function () {
            num--;
            element.style.opacity = num / 10;
            if (num <= 0) {
                clearInterval(st);
            }
        }, speed);
    }
}

/*
function btnIn() {
    fadeIn(div1, 100);
}

function btnOut() {
    fadeOut(div1, 100);
}

 */

function gobackroot(page) {
    nav = document.querySelectorAll(page);
    nav[0].popToRoot()
}

getNav = function (id) {
    return document.getElementById(id).innerHTML
}

async function wait(s) {
    const loading = await loadingController.create({
        message: '正在刷新',
        duration: s,
    });

    await loading.present();

}

async function alertReload() {
    const alert = await alertController.create({
        header: '提示',
        message: '更改需在刷新网页后生效',
        buttons: [{
            text: '刷新网页', handler: () => {
                wait(100).finally(function () {
                    location.reload();
                })
            }
        }],
        backdropDismiss: false
    });

    await alert.present();
}

async function alertIonic(head, message, button) {
    const alert = await alertController.create({
        header: head,
        message: message,
        buttons: button,
        backdropDismiss: false
    });

    await alert.present();
}


// let sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

//display
function checkWindow() {
    if (window.innerWidth > 700) {

        if (text == "true" && display == "iphone") {
            dismissModal();
        }
        display = 'ipad'
        document.getElementById('ionApp').classList.remove('mobil')
    } else {

        document.getElementById('ionApp').classList.add('mobil')
        if (text == "true" && display == "ipad") {

            openCardModal();
        }
        display = 'iphone'
    }
}

window.onresize = function () {
    checkWindow();
}

//check update
function checkupdate() {
    if (localStorage.version == "038a") {
        localStorage.version = "038a";
    } else {
        localStorage.version = "038a";
        toastAlert('dark', 2000,
            '<ion-text>网站已更新</ion-text>', true, 'top', [
                {
                    side: 'end',
                    text: '查看更新',
                    handler: () => {
                        showupdate()
                    }
                }])
    }
}

async function toastAlert(color, duration, message, showCloseButton, position, buttons) {
    const toast = await toastController.create({
        color: color,
        duration: duration,
        message: message,
        showCloseButton: showCloseButton,
        position: position,
        buttons: buttons
    });

    await toast.present();
}

function showupdate() {
    p = getNav("nav-update")
    title = "更新日志"
    Page("passage-show", "to")

}

//share
var nativeShare = new NativeShare()

function share(title, des) {
    var shareData = {
        title: title,
        desc: des,
        // 不要过于依赖以下两个回调，很多浏览器是不支持的
    }
    nativeShare.setShareData(shareData)
    try {
        nativeShare.call()
    } catch (err) {
        alertIonic("函数调用错误", "该浏览器不支持调用分享函数，请复制该页面地址进行分享", [{text: '确定'}])
    }
}

function SharingCheck() {
    let Hash = location.hash
    try {
        Hash = Hash.split("#")[1];
        let type = Hash.split(",")[0];
        switch (type) {
            case "passage":
                console.log(passageJson);
                passageJson.passage.forEach(function (item, i) {
                    if (item.passagePath == Hash.split(",")[1]) {
                        console.log(Hash.split(",")[1])
                        passageGet(item.passagePath, item.passageName, item.musicPath, item.musicName, item.des, i)
                    }
                })
                break;
        }
    } catch (err) {
        console.log("Not from sharing")
    }
}

//passage achieve
var DATETEST

function PassageAchieveDate() {
    httpGETfunction.open('GET', 'passage/passage-list.json', true);
    httpGETfunction.send();
    httpGETfunction.onreadystatechange = function () {
        if (httpGETfunction.readyState == 4 && httpGETfunction.status == 200) {
            passageJson = JSON.parse(httpGETfunction.responseText)
            let date = [];
            let i = 0;
            let temp = [];
            let temp2;
            passageJson.passage.forEach((item) => {
                item.time.split(",").forEach((item) => {
                    date[i] = item.split(".")[0]
                    i++;
                })
            })
            date = repeat(date)
            date.sort()
            date.forEach((item) => {
                temp.push({"year": item - 0, "month": []})
            })
            date = temp;
            i = 0
            passageJson.passage.forEach((item) => {
                item.time.split(",").forEach((item) => {
                    date.forEach((itemD, indexD) => {
                        if (itemD.year == item.split(".")[0]) {
                            temp[indexD].month.push(item.split(".")[1] - 0)
                        }
                        i++
                    })
                })
            })
            temp.forEach((item, index) => {
                temp2 = item;
                temp[index].month = repeat(temp[index].month)
                temp[index].month.sort()
                temp[index].month.forEach((item1, index1) => {
                    temp[index].month[index1] = {"month": item1, "day": []}
                })
            })
            date = temp
            passageJson.passage.forEach((item) => {
                item.time.split(",").forEach((item) => {
                    date.forEach((itemD, indexD) => {
                        itemD.month.forEach((item1, index1) => {
                            if (item.split(".")[1] == item1.month) {
                                temp[indexD].month[index1].day.push(item.split(".")[2] - 0)
                            }
                            temp[indexD].month[index1].day = repeat(temp[indexD].month[index1].day);
                            temp[indexD].month[index1].day.sort()
                        })
                    })
                })
            })
            date = temp
            DATETEST = date
            PassageAchieve();
            SharingCheck();
        }
    }
}

function PassageAchieve() {
    let yearSelect = document.querySelector("#DateYearSelect");
    let monthSelect = document.querySelector("#DateMonthSelect")
    let daySelect = document.querySelector("#DateDaySelect")
    PassageFind(yearSelect.value, monthSelect.value, daySelect.value)
    let YearInnerHTML = "", MonthInnerHTML = "", DayInnerHTML = ""
    DATETEST.forEach((item) => {
        YearInnerHTML = YearInnerHTML + `<ion-select-option value="` + item.year + `">` + item.year + `</ion-select-option>`
    })
    yearSelect.innerHTML = YearInnerHTML
    yearSelect.addEventListener('ionChange', (e) => {
        MonthInnerHTML = "";
        DayInnerHTML = ""
        monthSelect.value = undefined;
        daySelect.value = undefined
        monthSelect.innerHTML = MonthInnerHTML
        daySelect.innerHTML = DayInnerHTML
        PassageFind(yearSelect.value, monthSelect.value, daySelect.value)
        DATETEST.forEach((itemY) => {
            if (itemY.year == yearSelect.value) {
                itemY.month.forEach((itemM) => {
                    MonthInnerHTML = MonthInnerHTML + `<ion-select-option value="` + itemM.month + `">` + itemM.month + `</ion-select-option>`
                })
            }
        })
        monthSelect.innerHTML = MonthInnerHTML
    })
    monthSelect.addEventListener('ionChange', (e) => {
        DayInnerHTML = ""
        daySelect.value = undefined
        daySelect.innerHTML = DayInnerHTML
        PassageFind(yearSelect.value, monthSelect.value, daySelect.value)
        DATETEST.forEach((item) => {
            if (item.year == yearSelect.value) {
                item.month.forEach((itemM) => {
                    if (itemM.month == monthSelect.value) {
                        itemM.day.forEach((i) => {
                            DayInnerHTML = DayInnerHTML + `<ion-select-option value="` + i + `">` + i + `</ion-select-option>`
                        })
                    }
                })
            }
        })
        daySelect.innerHTML = DayInnerHTML;
    })
    daySelect.addEventListener('ionChange', () => {
        PassageFind(yearSelect.value, monthSelect.value, daySelect.value)
    })
}

function PassageFind(year, month, day) {
    let test = false;
    let passageListSelect = "";
    passageJson.passage.forEach(function (item) {
        item.time.split(",").forEach(function (itemT) {
            if (itemT.split(".")[0] == year) {
                if (month == undefined) {
                    test = true
                } else if (itemT.split(".")[1] == month) {
                    if (day == undefined) {
                        test = true
                    } else if (itemT.split(".")[2] == day) {
                        test = true
                    }
                }
            } else if (year == undefined) {
                test = true
            }
        })
        if (test == true) {
            passageListSelect = passageListSelect +
                `<ion-card>
					<ion-card-header>
						<ion-sub-title>` +
                item.time + `  作者：` + item.author +
                `</ion-sub-title>` +
                `<ion-card-title>` +
                item.passageName +
                `</ion-card-title>` +
                `</ion-card-header>` +
                `<ion-card-content>` +
                item.des +
                `</ion-card-content>` +
                `<ion-button onclick="passageGet('` + item.passagePath + `','` + item
                    .passageName + `','` + item.musicPath + `','` + item.musicName + `','` +
                item.des + `',)" fill="clear">阅读</ion-button></ion-card>`
            test = false
        }
    })
    document.getElementById("passage-achieve").innerHTML = passageListSelect

}