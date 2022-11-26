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
//var
var darkauto, darkmode, darktoggle
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
        darkauto.checked = localStorage.darkauto
        darktoggle.addEventListener('ionChange', (ev) => {
            document.body.classList.toggle('dark', ev.detail.checked);
            result = ev.detail.checked
            localStorage.darkmode = /^true$/i.test(result);
        });

        darkmode = window.matchMedia('(prefers-color-scheme: dark)');
        darkmode.addListener((e) => checkToggle(e.matches));

        function loadApp() {
            checkToggle(prefersDark.matches);
        }

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
    styletoggle.addEventListener('ionChange', (ev) => {
        localStorage.style = styletoggle.value
        alertReload();
    })

}
//Get passage
var httpRequest = new XMLHttpRequest(), httpget = new XMLHttpRequest();
var passageJson, passageList = "";
var gitalk = new Array();

function passageShow() {

    httpget.open('GET', 'passage/passage-list.json', true);
    httpget.send();
    httpget.onreadystatechange = function () {

        if (httpget.readyState == 4 && httpget.status == 200) {
            passageJson = JSON.parse(httpget.responseText)
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
                /*
                gitalk[i] = new Gitalk({
                     clientID: '0cb54c18847c58ac11d2', // GitHub Application Client ID
                     clientSecret: '9f8aee11a77f8bdcaaa4c5e496902af7c6ec118d', // GitHub Application Client Secret
                     repo: 'qjasn.github.io', // 存放评论的仓库
                     owner: 'qjasn', // 仓库的创建者，
                     admin: ['qjasn'], // 如果仓库有多个人可以操作，那么在这里以数组形式写出
                     id: item.passageName, // 用于标记评论是哪个页面的，确保唯一，并且长度小于50

                 })

                 */


            })
            SharingCheck();
            document.getElementById("list").innerHTML += "<div style='text-align: center'><ion-text color='medium'><sub>主页最多显示5个文章，其余请在更多页面中查看</sub></ion-text></div>"
        }
    }
}

var p, passagen, describe, number, title, text;
var fzfp = `
<h3>404 not found</h3>
`

function passageGet(passage, passagename, music, musicn, des, num) {
    document.title = passagename
    title = passagename
    passagen = passagename
    describe = des;
    window.location.hash = "#passage," + passage
    text = "true"
    wait(1000)
    httpRequest.open('GET', 'passage/' + passage + '.md', true); //get passage
    httpRequest.send(); //send require
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 404) {
                p = "<ion-content class=\"ion-padding\"><div  class=\"ion-padding\">" + marked(fzfp) + "</div></ion-content>"
            } else {
                p = "<ion-content class='markdown'>" + marked(httpRequest.responseText) + "<div id=\"gitalk\"></div></ion-content>"
                if (music !== "none") {
                    p = `
                    <ion-content class="markdown">
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
                        p + `</div></ion-content>`
                }
                number = num
                toPage('passage-show')
            }
        }
    }
}

var nav

function toPage(page) {
    nav = document.querySelectorAll("#passageNav")

    if (display == "ipad") {
        document.getElementById("title2").innerText = title
        fadeIn(document.getElementById("ipad-back"), 10);
        fadeIn(document.getElementById("ipad-share"), 10);
        nav[0].push(page)
    } else {
        openCardModal().finally(function () {
            document.getElementById("title2").innerText = title
            nav = document.querySelectorAll("#passageNav")
            nav[0].push(page)
        })
    }

}

//modal
let currentModal = null;

async function openModal(opts = {}) {
    const modal = await modalController.create({
        component: 'nav-modal',
        ...opts,
    });
    await modal.present();
    document.getElementById("title1").innerHTML = title
    currentModal = modal;
}

function openSheetModal() {
    openModal({
        breakpoints: [0, 0.2, 0.5, 1],
        initialBreakpoint: 0.2,
    });
}

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

function dismissModal(mode) {
    if (currentModal) {
        currentModal.dismiss().then(() => {
            currentModal = null;
        });
    }
}

//Function
//JavaScript
function fadeIn(element, speed) {
    if (element.style.opacity != 1) {
        var speed = speed || 30;
        var num = 0;
        var st = setInterval(function () {
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
        var num = 10;
        var st = setInterval(function () {
            num--;
            element.style.opacity = num / 10;
            if (num <= 0) {
                clearInterval(st);
            }
        }, speed);
    }
}

function btnIn() {
    fadeIn(div1, 100);
}

function btnOut() {
    fadeOut(div1, 100);
}

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

async function alertReload(type, url) {
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
async function alertIonic(head,message,button) {
    let headT=head;
    let messageT=message;
    let buttonT=button;
    const alert = await alertController.create({
        header: headT,
        message: messageT,
        buttons:buttonT,
        backdropDismiss: false
    });

    await alert.present();
}


let sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

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
    if (localStorage.update == 0.362) {
        localStorage.update = 0.362;
    } else {
        localStorage.update = 0.362;
        upadtealert()
    }
}

async function upadtealert() {
    const toast = await toastController.create({
        color: 'dark',
        duration: 2000,
        message: '<ion-text>网站已更新</ion-text>',
        showCloseButton: true,
        buttons: [
            {
                side: 'end',
                text: '查看更新',
                handler: () => {
                    showupdate()
                }
            }]
    });

    await toast.present();
}

function showupdate() {
    p = getNav("nav-update")
    title = "更新日志"
    toPage("passage-show")

}

//share
/*
old
*/
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
    }catch(err){
        alertIonic("函数调用","该浏览器不支持调用分享函数，请复制该页面地址进行分享",[{text:'确定'}])
    }
}


// new
function SharingCheck() {
    let Hash = location.hash
    try {
        Hash = Hash.split("#")[1];
        console.log(Hash)
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
    }catch(err){
        console.log("NO Hash")
    }
}