'use strict';

//For each
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

//Array from
if (!Array.from) {
    Array.from = function () {
        var toStr = Object.prototype.toString;
        var isCallable = function isCallable(fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function toInteger(value) {
            var number = Number(value);
            if (isNaN(number)) {
                return 0;
            }
            if (number === 0 || !isFinite(number)) {
                return number;
            }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function toLength(value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike /*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;

            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError("Array.from requires an array-like object - not null or undefined");
            }

            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }();
}

//Access Adw
var checkAccess = document.getElementById('check_access');
var goToLink = 'https://aussiehomework.com?key_wpg=2c95888f1df9b2918d2ef0e88a87308f';

//Popups
var popupOpen = function popupOpen(popup) {
    var overlay = popup.parentNode;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

var popupClose = function popupClose(popup) {
    var overlay = popup.parentNode;
    overlay.classList.remove('active');
    document.body.removeAttribute('style');
};

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('overlay') && e.target.classList.contains('active')) {
        popupClose(e.target.querySelector('.popup'));
    }
});

//JS Links
var contactForm = document.getElementById('contact_form');
var jsLinks = document.querySelectorAll('.js-link');
var closeFormLinks = document.querySelectorAll('.popup-close');

jsLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        if (checkAccess && checkAccess.value == 0) {
            popupOpen(contactForm);
        } else {
            window.location.href = goToLink;
        }
    });
});

closeFormLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        popupClose(link.parentNode);
    });
});

//Form validate
var email = document.getElementById('contact_form_email');
var message = document.getElementById('contact_form_message');

var formElems = Array.from(contactForm.elements);

formElems.forEach(function (elem) {
    elem.addEventListener('input', function () {
        elem.classList.remove('error');
    });
});

contactForm.addEventListener('submit', function (e) {
    if (validation(email, message) === false) {
        e.preventDefault();
    }
});

var pattern = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i);

var validation = function validation(emailField, messageField) {
    var err = 0;
    var email = emailField.value.trim();
    var message = messageField.value.trim();
    if (pattern.test(email) == false || email == '') {
        emailField.classList.add('error');
        err = err + 1;
    } else {
        emailField.classList.remove('error');
    }

    if (message == '') {
        messageField.classList.add('error');
        err = err + 1;
    } else {
        messageField.classList.remove('error');
    }

    if (err > 0) {
        return false;
    }
};

$('.top-specialists-content').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    prevArrow: $('.top-specialists .controls .prev'),
    nextArrow: $('.top-specialists .controls .next'),
    responsive: [{
        breakpoint: 1200,
        settings: {
            slidesToShow: 3
        }
    }, {
        breakpoint: 992,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 650,
        settings: {
            slidesToShow: 1
        }
    }]
});

$('.iphone-items').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: $('.what-we-do .controls .prev'),
    nextArrow: $('.what-we-do .controls .next'),
    fade: true
});