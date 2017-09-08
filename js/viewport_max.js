! function (N) {
	function L() {
		var a = I.getBoundingClientRect().width;
		var d = a / 20 * 0.9;
		I.style.fontSize = d + "px";
		window.rootFontSize = d;
	}
	var K, H, J = N.document,
		I = J.documentElement,
		F = 0,
		E = 0,
		v = N.devicePixelRatio;
	F = v;
	E = 1 / F;
	I.setAttribute("data-dpr", F);
	if (H = J.createElement("meta"), H.setAttribute("name", "viewport"), H.setAttribute("content", "initial-scale=" + 1 + ", maximum-scale=" + 1 + ", minimum-scale=" + 1 + ", user-scalable=no"), I.firstElementChild) {
		I.firstElementChild.appendChild(H)
	}
	N.addEventListener("resize", function () {
		clearTimeout(K), K = setTimeout(L, 300)
	}, !1), L();
}(window);
