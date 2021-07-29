//jquery ready
$(document).ready(function () {
	//different window has different display way
	fbl()
	//listen for changes to window size
	$(window).resize(function () {
		fbl();
		switch (display) {
			case 'iphone':
				$('.in').css({ 'width': '96vw', 'left': '2vw' })
				break;
			case 'ipad':
				$('.in').css({ 'width': '500px', 'left': 'calc(50vw - 250px)' })
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
	$('.in').css({ 'top': '-77px' })
	switch (display) {
		case 'iphone':
			$('.in').css({ 'width': '96vw', 'left': '2vw' })
			break;
		case 'ipad':
			$('.in').css({ 'width': '500px', 'left': 'calc(50vw - 250px)' })
			break;
	}
	$('.in').animate({ top: '10px' }, 'slow');
	$('.in').find('#title').html(title)
	$('.in').find('#content').html(content)
	sessionStorage.event = event
	setTimeout("popupC()", 4000);
}
function popupC() {
	$('.in').animate({ top: '-77px' }, 'slow', function () {
		$('.in').hide()
	});
}
//sleep function
function sleep(d) {
	for (var t = Date.now(); Date.now() - t <= d;);
}
async function wait(s) {
	const loading = await loadingController.create({
		message: 'Please wait...',
		duration: s
	});

	await loading.present();
}
//darkmode , update and birthday information
function startpage() {
	birthday()
	if (display == 'iphone') {
		if (t == 'true') {
			if (localStorage.bi == 'aleardy') {
				loadApp()
			} else {
				pn.push('modal-bi')
			}
		} else {
			loadApp()
		}
	} else if (display == 'ipad') {
		if (t == 'true') {
			if (localStorage.bi == 'aleardy') {
				loadApp()
			} else {
				bi('#tab-ion')
			}
		} else {
			loadApp()
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
					biT = `<ion-text color="light"><h2>今天是<ion-text color="primary">` + json.list[i].name +
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

// Listen for changes to the prefers-color-scheme media query
prefersDark.addListener((e) => checkToggle(e.matches));

//update information
function aleardy() {
	dismissModal();
	localStorage.update = '2.3'
}
// Called when the app loads
function loadApp() {
	console.log('hello')
	// Query for the toggle that is used to change between themes
	toggle = document.querySelector('ion-list #themeToggle');
	// Listen for the toggle check/uncheck to toggle the dark class on the <body>
	toggle.addEventListener('ionChange', (ev) => {
		document.body.classList.toggle('dark', ev.detail.checked);
	});
	checkToggle(prefersDark.matches);
	checkupdate()

}
function checkupdate() {
	if (localStorage.update == '2.3') {
		localStorage.update = '2.3'
	} else {
		setTimeout('popup("提示","网站已更新，点击查看后不再提示","checkupdate()")', 1000)

	}
}
function showupdate() {
	localStorage.update = '2.3'
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
	toggle.checked = shouldCheck;
	document.body.classList.toggle('dark', shouldCheck);
}
//ipad or iphone display
var display;
function fbl() {
	console.log('h')
	if ($(window).width() > 610) {
		display = 'ipad'
		$('#ionApp')[0].classList.add('mobil')
		$('.passage')[0].classList.add('pass')
		$('.passage').show()
		/*
		console.log('下面的报错请忽略')
		if ($('ion-app').find('nav-detail')[0].innerHTML !== undefined) {
			console.log('h')
			passagenav.popToRoot()
			pn.push('nav-detail')
			$('#passage')[0].innerHTML = p
		}
		*/
	} else {
		display = 'iphone'
		$('#ionApp')[0].classList.remove('mobil')
		$('.passage')[0].classList.remove('pass')
		$('.passage').hide()
		pn.popToRoot()
	}
}
//function about model
async function createModal(ele) {
	const modal = await modalController.create({
		component: 'modal-content',
		backdropDismiss: false,
	});
	modal.presentingElement = document.querySelector(ele);
	await modal.present();
	currentModal = modal;
	modalnav = document.querySelector('#nav-modal')
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
tabnav.animated = 'false';
tabnav.swipeGesture = 'false';

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
		console.log(document.getElementById('passage'))
		document.getElementById('passage').innerHTML = p
		gitalk.render('gitalk-container');    // 渲染Gitalk评论组件
	}
});
customElements.define('nav-set', class NavSet extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('set').innerHTML
		//hey,we can show the birthday person to my website
		//and this is the update information
		startpage();
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
customElements.define('modal-bi', class MoadlPage extends HTMLElement {
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
		this.innerHTML = document.getElementById('passage-root').innerHTML
		document.getElementById('list').innerHTML = passageList;
	}
})
customElements.define('tab-page', class TabPage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = document.getElementById('tab').innerHTML
		setnav = document.querySelector('#ion-set');
		nav = document.querySelector('#ion-nav');
	}
})
customElements.define('set-page', class SetPage extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<ion-header>
				<ion-toolbar color="">
					<ion-title>update log</ion-title>
					<ion-buttons slot="start">
						<ion-back-button defaultHref="/"></ion-back-button>
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
//Passage http get
var passageList = "";
var passager = new XMLHttpRequest()
passager.open('GET', 'passage/passage-list.json', true);
passager.send();
passager.onreadystatechange = function () {
	if (passager.readyState == 4 && passager.status == 200) {
		let json = JSON.parse(passager.responseText);
		for (let i = 0; i < json.passage.length; i++) {
			passageList = passageList +
				`<ion-card onclick="passage('` + json.passage[i].passagePath + `','` + json.passage[i].musicPath + `','` + json.passage[i].musicName + `')">
					<ion-card-header>
						<ion-sub-title>`+
				json.passage[i].time +
				`</ion-sub-title>` +
				`<ion-card-title>`
				+ json.passage[i].passageName +
				`</ion-card-title>` +
				`</ion-card-header>` +
				`<ion-card-content>` +
				json.passage[i].des +
				`</ion-card-header>` +
				`</ion-card>`
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
var httpRequest = new XMLHttpRequest();

function passage(passage, music, musicn) {
	gitalk.title=passage
	wait(100)
	httpRequest.open('GET', 'passage/' + passage + '.passage', true); //get passage 
	httpRequest.send(); //send require
	//marked(data)
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState == 4) {
			if (httpRequest.status == 404) {
				console.log('err')
				p = marked(fzfp)
			} else {
				p = marked(httpRequest.responseText)
				if (music !== "none") {
					p = `
					<div class="markdown">
						<ion-card>
							<ion-card-header>
								<ion-card-title>`+ musicn + `</ion-card-title>
							</ion-card-header>
							<ion-card-content>
								<audio controls style="width:97%;left:1.5%">
									<source src="music/` + music + `">
								</audio>
							</ion-card-content>
						</ion-card>`
						+ p +
						`<div id="gitalk-container"></div>
					</div>`
				}
				if (display == "ipad") {
					pn.popToRoot()
					pn.push('nav-detail')
				} else {
					console.log('h')
					passagenav.push('nav-detail')
				}
			}
		}
	}
}

/*
gitalk
*/
var gitalk = new Gitalk({
	clientID: '0cb54c18847c58ac11d2', // GitHub Application Client ID
	clientSecret: 'f71ccddbf84f6b12abb68d9e9d7d1fc82bfebc08', // GitHub Application Client Secret
	repo: 'qikx',      // 存放评论的仓库
  	owner: 'qjasn',          // 仓库的创建者，
	admin: ['qjasn'],        // 如果仓库有多个人可以操作，那么在这里以数组形式写出
	id: 'pinlun',      // 用于标记评论是哪个页面的，确保唯一，并且长度小于50
	language:'zh-CN'
})
