var utils = (function () {
    var isCompatible = 'getElementsByClassName' in document,
        isSupportJSON = 'JSON' in window;

    //=>toArray & toJSON
    var toArray = function (classAry) {
        var ary = [];
        if (isCompatible) {
            ary = Array.prototype.slice.call(classAry);
        } else {
            for (var i = 0; i < classAry.length; i++) {
                ary[ary.length] = classAry[i];
            }
        }
        return ary;
    };

    var toJSON = function (str) {
        return isSupportJSON ? JSON.parse(str) : eval('(' + str + ')');
    };

    //=>offset & winBox
    var offset = function (curEle) {
        var l = curEle.offsetLeft,
            t = curEle.offsetTop,
            p = curEle.offsetParent;
        while (p.tagName !== 'BODY') {
            if (isCompatible === false && isSupportJSON === true) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {left: l, top: t};
    };

    var winBox = function (attr, value) {
        if (typeof value !== 'undefined') {
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    };

    //=>children
    function children(ele, attr) {
        var ary = [];
        isCompatible ? ary = toArray(ele.children) : ary = toArray(ele.childNodes);
        for (var k = 0; k < ary.length; k++) {
            var obj = ary[k];
            if (obj.nodeType === 1) {
                if (attr && attr.toLowerCase() !== obj.tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--;
                }
            } else {
                ary.splice(k, 1);
                k--;
            }
        }
        return ary;
    }

    //=>getElementsByClassName
    function getElementsByClassName(classStr, context) {
        if (arguments.length === 0) return [];
        context = context || document;
        if (isCompatible) {
            return toArray(context.getElementsByClassName(classStr));
        }
        var eleList = toArray(context.getElementsByTagName("*"));
        var classList = classStr.replace(/^ +| +$/g, "").split(/ +/);
        for (var i = 0; i < classList.length; i++) {
            var cur = classList[i];
            var reg = new RegExp("(^| +)" + cur + "( +|$)");
            for (var j = 0; j < eleList.length; j++) {
                if (!reg.test(eleList[j].className)) {
                    eleList.splice(j, 1);
                    j--;
                }
            }
        }
        return eleList;
    }

    //=>css
    function getCss(curEle, attr) {
        var value = null, reg = null;
        if (isCompatible) {
            value = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === 'opacity') {
                value = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity=(.+)\)$/i;
                return reg.test(value) ? reg.exec(value)[1] / 100 : 1;
            }
            value = curEle.currentStyle[attr];
        }
        reg = /^-?\d+(.\d+)?(pt|px|rem|em)?$/i;
        return reg.test(value) ? parseFloat(value) : value;
    }

    function setCss(curEle, attr, value) {
        if (attr === 'opacity') {
            curEle.style.opacity = value;

            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        !isNaN(value) && !/(fontWeight|lineHeight|zoom|zIndex)/i.test(attr) ? value += 'px' : null;
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, options) {
        if (Object.prototype.toString.call(options) !== '[object Object]') return;
        for (var attr in options) {
            if (options.hasOwnProperty(attr)) {
                setCss(curEle, attr, options[attr])
            }
        }

    }

    function css() {
        var len = arguments.length,
            type = Object.prototype.toString.call(arguments[1]),
            fn = getCss;

        len >= 3 ? fn = setCss : (len === 2 && type === '[object Object]' ? fn = setGroupCss : null)
        return fn.apply(this, arguments);

    }

    return {
        toArray: toArray,
        toJSON: toJSON,
        offset: offset,
        winBox: winBox,
        children: children,
        getElementsByClassName: getElementsByClassName,
        css: css
    }
})();