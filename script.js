//jquery ready
$(document).ready(function () {
	//different window has different display way
	fbl()
	//listen for changes to window size
	$(window).resize(function () {
		fbl();
		switch (display) {
			case 'iphone':
				$('.in').css({
					'width': '96vw',
					'left': '2vw'
				})
				break;
			case 'ipad':
				$('.in').css({
					'width': '500px',
					'left': 'calc(50vw - 250px)'
				})
				break;
		}
	})

})
// 禁用缩放
try {
	// 禁用双击缩放
	document.addEventListener("touchstart", function (event) {
		if (event.touches.length > 1) {
			event.preventDefault();
		}
	});
	var lastTouchEnd = 0;
	document.addEventListener(
		"touchend",
		function (event) {
			var now = new Date().getTime();
			if (now - lastTouchEnd <= 300) {
				event.preventDefault();
			}
			lastTouchEnd = now;
		},
		false
	);
	// 禁用双指手势操作
	document.addEventListener("gesturestart", function (event) {
		event.preventDefault();
	});
} catch (error) { }
document.documentElement.addEventListener('touchmove', function (event) {
	if (event.touches.length > 1) {
		event.preventDefault();
	}
}, false);
//information
function popup(title, content, event) {
	$('.in').show()
	$('.in').css({
		'top': '-77px'
	})
	switch (display) {
		case 'iphone':
			$('.in').css({
				'width': '96vw',
				'left': '2vw'
			})
			break;
		case 'ipad':
			$('.in').css({
				'width': '500px',
				'left': 'calc(50vw - 250px)'
			})
			break;
	}
	$('.in').animate({
		top: '10px'
	}, 'slow');
	$('.in').find('#title').html(title)
	$('.in').find('#content').html(content)
	sessionStorage.event = event
	setTimeout("popupC()", 4000);
}

function popupC() {
	$('.in').animate({
		top: '-77px'
	}, 'slow', function () {
		$('.in').hide()
	});
}
//sleep function
function sleep(d) {
	for (var t = Date.now(); Date.now() - t <= d;);
}

function wait(s) {
	$('.wait').fadeIn(400);
	setTimeout("closewait()", s)
}

function closewait() {
	$('.wait').fadeOut("fast");
}
//darkmode , update and birthday information
function startpage() {
	birthday()
	if (display == 'iphone') {
		if (t == 'true') {
			if (localStorage.bi == 'aleardy') {
				checkupdate()
			} else {
				pn.push('modal-bi')
			}
		} else {
			checkupdate()
		}
	} else if (display == 'ipad') {
		if (t == 'true') {
			if (localStorage.bi == 'aleardy') {
				checkupdate()
			} else {
				bi('#tab-ion')
			}
		} else {
			checkupdate()
		}
	}
}
//birthday http get
var biT;
var t;

function birthday() {
	var birthday = new XMLHttpRequest();
	birthday.open('GET', './birthday.json', true);
	birthday.send();
	birthday.onreadystatechange = function () {
		let date = new Date()
		if (birthday.readyState == 4 && birthday.status == 200) {
			let json = JSON.parse(birthday.responseText);
			for (let i = 0; i < json.list.length; i++) {
				if (json.list[i].month == date.getMonth() + 1 && json.list[i].day == date.getDate()) {
					biT = `<ion-text color="light"><h2>今天是<ion-text >` + json.list[i].name +
						`</ion-text>的生日</h2></ion-text><ion-text color="danger"><h1>让我们祝他（她）生日快乐🎂</h1></ion-text>`
					t = "true"
				}
			}
		}
	}
}
// Query for the toggle that is used to change between themes
var toggle;
//dark mode's listen service
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const toggleDark = window.matchMedia('(prefers-color-scheme: dark)');
// Listen for changes to the prefers-color-scheme media query
toggleDark.addListener((e) => checkToggle(e.matches));
// Listen for changes to the prefers-color-scheme media query
prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
toggleDarkTheme(prefersDark.matches);
// Add or remove the "dark" class based on if the media query matches
function toggleDarkTheme(shouldAdd) {
	setTimeout("document.body.classList.toggle('dark', " + shouldAdd + ");", 100)
}
//update information
function aleardy() {
	dismissModal();
	localStorage.update = '3.0'
}
var darkmode;
// Called when the app loads
function loadApp() {
	// Query for the toggle that is used to change between themes
	toggle = document.querySelector('ion-list #themeToggle');
	// Listen for the toggle check/uncheck to toggle the dark class on the <body>
	toggle.addEventListener('ionChange', (ev) => {
		document.body.classList.toggle('dark', ev.detail.checked);
		darkmode = ev.detail.checked
	});
	checkToggle(toggleDark.matches);

}

function checkupdate() {
	if (localStorage.update == '3.0') {
		localStorage.update = '3.0'
	} else {
		setTimeout('popup("提示","网站已更新，点击查看后不再提示","checkupdate()")', 1000)

	}
}

function showupdate() {
	localStorage.update = '3.0'
	popupC()
	switch (display) {
		case 'iphone':
			createModal('#tab-ion');
			break;
		case 'ipad':
			pn.push('modal-content')
			break;
	}
}
// Called by the media query to check/uncheck the toggle
function checkToggle(shouldCheck) {
	if (darkmode == true) {
		toggle.checked = darkmode;
		document.body.classList.toggle('dark', darkmode);
	} else if (darkmode == false) {
		toggle.checked = shouldCheck;
		document.body.classList.toggle('dark', shouldCheck);
	}
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
	nativeShare.call()
}
//ipad or iphone display
var display;

function fbl() {
	if ($(window).width() > 610) {
		display = 'ipad'
		$('#ionApp')[0].classList.add('mobil')
		$('.passage')[0].classList.add('pass')
		$('.passage').show()
	} else {
		display = 'iphone'
		$('#ionApp')[0].classList.remove('mobil')
		$('.passage')[0].classList.remove('pass')
		$('.passage').hide()
		pn.popToRoot()
	}
}
//function about model
var mod, modnv, modeH,replace;
async function modalpage(root, ele, how) {
	modeH = how
	switch (display) {
		case 'iphone':
			const modct = await modalController.create({
				component: 'modal-content',
			});
			modct.presentingElement = document.querySelector(ele);
			await modct.present();
			mod = modct;
			modnv = document.querySelector('#nav-modal')
			replace='<ion-button onclick="dismodalpage()">完成</ion-button>'
			modnv.setRoot(root)

			break;
		case 'ipad':
			switch (how) {
				case 'only':
					
					replace='<ion-button onclick="dismodalpage()"><ion-icon name="chevron-back-outline"></ion-icon>返回<ion-button>'
					pn.push(root)


					break;
				case 'more':
					replace = '<ion-button onclick="tabnav.popTo()"><ion-icon name="chevron-back-outline"></ion-icon>返回</ion-back-button>'
					GoToPage(root)

					break;
			}
			break;
	}

}



function dismodalpage() {
	if (mod) {
		mod.dismiss().then(() => {
			mod = null;
		});
	} else {
		pn.popToRoot();
	}
	modnv = null;
}
async function createModal(ele) {
	const modal = await modalController.create({
		component: 'modal-content',
		backdropDismiss: false,
	});
	modal.presentingElement = document.querySelector(ele);
	await modal.present();
	currentModal = modal;
	modalnav = document.querySelector('#nav-modal')
	modalnav.setRoot("modal-page")
}
async function bi(ele) {
	const bia = await modalController.create({
		component: 'modal-bi',
		swipeToClose: false,
		backdropDismiss: false
	});
	bia.presentingElement = document.querySelector(ele);
	await bia.present();

	bib = bia;
}

function dismissModal() {
	if (currentModal) {
		currentModal.dismiss().then(() => {
			currentModal = null;
		});
	} else {
		pn.popToRoot();
	}
	modalnav = null;
}
let currentModal = null;

function bic() {
	if (bib) {
		bib.dismiss().then(() => {
			bib = null;
		});
	} else {
		pn.popToRoot();
	}
	localStorage.bi = "aleardy"
	loadApp()
}
var his
//function about pages
function goto(pageName, element, how) {
	let pages = document.querySelector(element);
	switch (how) {
		case 'pop':
			pages.popTo(pageName);
			break;
		case 'root':
			pages.popToRoot();
			break;
		case 'push':
			pages.push(pageName);
			break;
	}
}
//Nav and menu
var nav;
var setnav;
var modalnav;
var passagenav
const tabnav = document.querySelector('#tab-ion');
const pn = document.querySelector('#cbl-c')

function GoToPage(place) {
	if (place == 'home') {
		tabnav.popToRoot()
		his = place
	} else if (place == his) {
		//do nothing
	} else if (document.getElementsByTagName(place).innerHTML !== undefined) {
		tabnav.popTo(place)
	} else {
		his = place
		tabnav.push(place)
	}
	menuController.close('custom')
}
//pages
customElements.define('nav-home', class NavHome extends HTMLElement {
	connectedCallback() {

		this.innerHTML = document.getElementById('page').innerHTML
	}
});
customElements.define('nav-detail', class NavDetail extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('page1').innerHTML
		document.getElementById('passage').innerHTML = p
		$('#passage-title')[0].innerHTML = passagen
	}
});
customElements.define('nav-set', class NavSet extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('set').innerHTML
		loadApp()
	}
});
customElements.define('modal-content', class ModalContent extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('modal').innerHTML
	}
})
customElements.define('cbl-p', class ModalContent extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('cbl').innerHTML
	}
})
customElements.define('modal-page', class MoadlPage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('moda-page').innerHTML
	}
})
customElements.define('modal-bi', class MoadlBi extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('moda-bi').innerHTML
		document.getElementById('text').innerHTML = biT
	}
})
customElements.define('passage-home', class PassageHome extends HTMLElement {
	connectedCallback() {

		this.innerHTML = document.getElementById('passage-home').innerHTML
		passagenav = document.querySelector('#passage-nav')
	}
})

customElements.define('passage-root', class PassageRoot extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('passage-root').innerHTML.replace('{{button}}',replace)
		document.getElementById('list').innerHTML = passageList;
	}
})
customElements.define('tab-page', class TabPage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('tab').innerHTML
		setnav = document.querySelector('#ion-set');
		nav = document.querySelector('#ion-nav');
		passageStart();
		//hey,we can show the birthday person to my website
		//and this is the update information
		startpage();
	}
})
customElements.define('set-page', class SetPage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<ion-header>
				<ion-toolbar >
					<ion-title>update log</ion-title>
					<ion-buttons slot="start" id="modal-back">`+replace+`
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content>` +
			marked(document.getElementById('update').innerHTML) + `
			</ion-content>`
	}
})

//ios theme
if (location.search.split('&')[0] !== '?ionic:mode=ios') {
	location.search = '?ionic:mode=ios'
}
//Passage url
if (location.hash == "") {

}
//Passage http get
var passagen
var passageList = "";
var passager = new XMLHttpRequest()

function passageStart() {
	passager.open('GET', 'passage/passage-list.json', true);
	passager.send();
	passager.onreadystatechange = function () {
		if (passager.readyState == 4 && passager.status == 200) {
			let json = JSON.parse(passager.responseText);
			for (let i = 0; i < json.passage.length; i++) {
				passageList = passageList +
					`<ion-card onclick="passage('` + json.passage[i].passagePath + `','` + json.passage[i]
						.passageName + `','` + json.passage[i].musicPath + `','` + json.passage[i].musicName + `,` + json.passage[i].des + `')">
					<ion-card-header>
						<ion-sub-title>` +
					json.passage[i].time +
					`</ion-sub-title>` +
					`<ion-card-title>` +
					json.passage[i].passageName +
					`</ion-card-title>` +
					`</ion-card-header>` +
					`<ion-card-content>` +
					json.passage[i].des +
					`</ion-card-header>` +
					`</ion-card>`
				if (window.location.hash == '#' + json.passage[i].passagePath) {

					var fin = modalpage('passage-home', '#tab-ion', 'more')

					fin.finally(function () {
						passage(json.passage[i].passagePath, json.passage[i].passageName, json.passage[i].musicPath,
							json.passage[i].musicName, json.passage[i].des)
					})
				}
			}
		}
	}
}
/*
	
passage get
loacl to string:p
	
*/
var p;
var fzfp = "# 404 not find";
var audio;
var describe;
var httpRequest = new XMLHttpRequest();

function passage(passage, passagename, music, musicn, des) {
	document.title = passagename
	passagen = passagename
	describe = des;
	window.location.hash = "#" + passage
	wait(1000)
	httpRequest.open('GET', 'passage/' + passage + '.md', true); //get passage 
	httpRequest.send(); //send require
	//marked(data)
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState == 4) {
			if (httpRequest.status == 404) {
				p = marked(fzfp)
			} else {
				p = marked(httpRequest.responseText)
				if (music !== "none") {
					p = `
					<div class="markdown">
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
						p +
						`<div id="gitalk-container"></div>
					</div>`
				}
				if (display == "ipad") {
					pn.push('nav-detail')
				} else {
					sleep(100)
					passagenav.push('nav-detail')
				}
			}
		}
	}
}
