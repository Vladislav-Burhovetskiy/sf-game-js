var x = Object.defineProperty;
var $ = (e, t, a) => (t in e ? x(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[t] = a));
var w = (e, t, a) => ($(e, typeof t != 'symbol' ? t + '' : t, a), a),
    D = (e, t, a) => {
        if (!t.has(e)) throw TypeError('Cannot ' + a);
    };
var k = (e, t, a) => (D(e, t, 'read from private field'), a ? a.call(e) : t.get(e)),
    P = (e, t, a) => {
        if (t.has(e)) throw TypeError('Cannot add the same private member more than once');
        t instanceof WeakSet ? t.add(e) : t.set(e, a);
    };
(function () {
    const t = document.createElement('link').relList;
    if (t && t.supports && t.supports('modulepreload')) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
    new MutationObserver(n => {
        for (const r of n)
            if (r.type === 'childList')
                for (const c of r.addedNodes) c.tagName === 'LINK' && c.rel === 'modulepreload' && i(c);
    }).observe(document, { childList: !0, subtree: !0 });
    function a(n) {
        const r = {};
        return (
            n.integrity && (r.integrity = n.integrity),
            n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
            n.crossOrigin === 'use-credentials'
                ? (r.credentials = 'include')
                : n.crossOrigin === 'anonymous'
                ? (r.credentials = 'omit')
                : (r.credentials = 'same-origin'),
            r
        );
    }
    function i(n) {
        if (n.ep) return;
        n.ep = !0;
        const r = a(n);
        fetch(n.href, r);
    }
})();
function s({ tagName: e, className: t, attributes: a = {} }) {
    const i = document.createElement(e);
    if (t) {
        const n = t.split(' ').filter(Boolean);
        i.classList.add(...n);
    }
    return Object.keys(a).forEach(n => i.setAttribute(n, a[n])), i;
}
function K(e) {
    const { source: t, name: a } = e;
    return s({ tagName: 'img', className: 'fighter-preview___img', attributes: { src: t, title: a, alt: a } });
}
function H(e, t, a) {
    const n = s({
        tagName: 'div',
        className: `fighter-preview___root ${t === 'right' ? 'fighter-preview___right' : 'fighter-preview___left'}`
    });
    return (
        e &&
            e._id &&
            a(e._id)
                .then(r => {
                    const c = K(r);
                    n.append(c);
                    const m = s({ tagName: 'p', className: 'fighter-preview___name' });
                    (m.textContent = `Name: ${r.name}`), n.append(m);
                    const d = s({ tagName: 'p', className: 'fighter-preview___health' });
                    (d.textContent = `Health: ${r.health}`), n.append(d);
                    const f = s({ tagName: 'p', className: 'fighter-preview___attack' });
                    (f.textContent = `Attack: ${r.attack}`), n.append(f);
                    const h = s({ tagName: 'p', className: 'fighter-preview___defense' });
                    (h.textContent = `Defense: ${r.defense}`), n.append(h);
                })
                .catch(r => {
                    console.error('Error getting fighter info:', r);
                }),
        n
    );
}
const l = {
    PlayerOneAttack: 'KeyA',
    PlayerOneBlock: 'KeyD',
    PlayerTwoAttack: 'KeyJ',
    PlayerTwoBlock: 'KeyL',
    PlayerOneCriticalHitCombination: ['KeyQ', 'KeyW', 'KeyE'],
    PlayerTwoCriticalHitCombination: ['KeyU', 'KeyI', 'KeyO']
};
function j(e) {
    const { attack: t } = e,
        a = Math.random() * (2 - 1) + 1;
    return t * a;
}
function S(e) {
    const { defense: t } = e,
        a = Math.random() * (2 - 1) + 1;
    return t * a;
}
function B(e, t) {
    const a = j(e),
        i = S(t);
    return Math.max(a - i, 0);
}
async function q(e, t) {
    return new Promise(a => {
        let i = e.health,
            n = t.health,
            r = e.isBlock,
            c = t.isBlock;
        const m = [!1, !1, !1],
            d = [!1, !1, !1];
        let f = !1,
            h = !1;
        function M() {
            const u = document.getElementById('left-fighter-indicator'),
                o = document.getElementById('right-fighter-indicator'),
                g = e.health,
                A = t.health,
                C = (i / g) * 100,
                E = (n / A) * 100;
            C <= 0
                ? (u.style.width = '0')
                : E <= 0
                ? (o.style.width = '0')
                : ((u.style.width = `${C}%`), (o.style.width = `${E}%`));
        }
        function v(u) {
            const o = u.code;
            if (o === l.PlayerOneAttack && !c && !r) {
                const g = B(e, t);
                n -= g;
            } else if (o === l.PlayerTwoAttack && !r && !c) {
                const g = B(t, e);
                i -= g;
            } else
                o === l.PlayerOneBlock
                    ? (r = !0)
                    : o === l.PlayerTwoBlock
                    ? (c = !0)
                    : o === l.PlayerOneCriticalHitCombination[0]
                    ? (m[0] = !0)
                    : o === l.PlayerOneCriticalHitCombination[1]
                    ? (m[1] = !0)
                    : o === l.PlayerOneCriticalHitCombination[2]
                    ? (m[2] = !0)
                    : o === l.PlayerTwoCriticalHitCombination[0]
                    ? (d[0] = !0)
                    : o === l.PlayerTwoCriticalHitCombination[1]
                    ? (d[1] = !0)
                    : o === l.PlayerTwoCriticalHitCombination[2] && (d[2] = !0);
            if (m[0] && m[1] && m[2] && !f) {
                const g = 2 * e.attack;
                (n -= g),
                    (f = !0),
                    setTimeout(() => {
                        f = !1;
                    }, 1e4);
            }
            if (d[0] && d[1] && d[2] && !h) {
                const g = 2 * t.attack;
                (i -= g),
                    (h = !0),
                    setTimeout(() => {
                        h = !1;
                    }, 1e4);
            }
            M();
        }
        function b(u) {
            const o = u.code;
            o === l.PlayerOneBlock
                ? (r = !1)
                : o === l.PlayerTwoBlock
                ? (c = !1)
                : o === l.PlayerOneCriticalHitCombination[0]
                ? (m[0] = !1)
                : o === l.PlayerOneCriticalHitCombination[1]
                ? (m[1] = !1)
                : o === l.PlayerOneCriticalHitCombination[2]
                ? (m[2] = !1)
                : o === l.PlayerTwoCriticalHitCombination[0]
                ? (d[0] = !1)
                : o === l.PlayerTwoCriticalHitCombination[1]
                ? (d[1] = !1)
                : o === l.PlayerTwoCriticalHitCombination[2] && (d[2] = !1),
                (i <= 0 || n <= 0) &&
                    (document.removeEventListener('keydown', v),
                    document.removeEventListener('keyup', b),
                    a(i > n ? e : t));
        }
        document.addEventListener('keydown', v), document.addEventListener('keyup', b);
    });
}
function R() {
    return document.getElementById('root');
}
function G() {
    const e = document.getElementsByClassName('modal-layer')[0];
    e == null || e.remove();
}
function J(e, t) {
    const a = s({ tagName: 'div', className: 'modal-header' }),
        i = s({ tagName: 'span' }),
        n = s({ tagName: 'div', className: 'close-btn' });
    (i.innerText = e), (n.innerText = '×');
    const r = () => {
        G(), t();
    };
    return n.addEventListener('click', r), a.append(i, n), a;
}
function W({ title: e, bodyElement: t, onClose: a }) {
    const i = s({ tagName: 'div', className: 'modal-layer' }),
        n = s({ tagName: 'div', className: 'modal-root' }),
        r = J(e, a);
    return n.append(r, t), i.append(n), i;
}
function U({ title: e, bodyElement: t, onClose: a = () => {} }) {
    const i = R(),
        n = W({ title: e, bodyElement: t, onClose: a });
    i.append(n);
}
function Y(e) {
    const t = `Winner: ${e.name}`,
        a = document.createElement('div'),
        i = s({ tagName: 'img', className: 'modal-winner-img', attributes: { src: e.source, alt: e.name } });
    a.append(i), U({ title: t, bodyElement: a });
}
function F(e, t) {
    const a = K(e),
        n = s({
            tagName: 'div',
            className: `arena___fighter ${t === 'right' ? 'arena___right-fighter' : 'arena___left-fighter'}`
        });
    return n.append(a), n;
}
function Z(e, t) {
    const a = s({ tagName: 'div', className: 'arena___battlefield' }),
        i = F(e, 'left'),
        n = F(t, 'right');
    return a.append(i, n), a;
}
function T(e, t) {
    const { name: a } = e,
        i = s({ tagName: 'div', className: 'arena___fighter-indicator' }),
        n = s({ tagName: 'span', className: 'arena___fighter-name' }),
        r = s({ tagName: 'div', className: 'arena___health-indicator' }),
        c = s({ tagName: 'div', className: 'arena___health-bar', attributes: { id: `${t}-fighter-indicator` } });
    return (n.innerText = a), r.append(c), i.append(n, r), i;
}
function Q(e, t) {
    const a = s({ tagName: 'div', className: 'arena___fight-status' }),
        i = s({ tagName: 'div', className: 'arena___versus-sign' }),
        n = T(e, 'left'),
        r = T(t, 'right');
    return a.append(n, i, r), a;
}
function V(e) {
    const t = s({ tagName: 'div', className: 'arena___root' }),
        a = Q(...e),
        i = Z(...e);
    return t.append(a, i), t;
}
function z(e) {
    const t = document.getElementById('root'),
        a = V(e);
    (t.innerHTML = ''),
        t.append(a),
        q(e[0], e[1])
            .then(i => {
                Y(i);
            })
            .catch(i => {
                console.error('Error during fight:', i);
            });
}
const X = '/sf-game-js/assets/versus-768a076e.png',
    ee = [
        { _id: '1', name: 'Ryu', source: 'https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif' },
        {
            _id: '2',
            name: 'Dhalsim',
            source: 'https://i.pinimg.com/originals/c0/53/f2/c053f2bce4d2375fee8741acfb35d44d.gif'
        },
        { _id: '3', name: 'Guile', source: 'https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif' },
        { _id: '4', name: 'Zangief', source: 'https://media1.giphy.com/media/nlbIvY9K0jfAA/source.gif' },
        {
            _id: '5',
            name: 'Ken',
            source: 'https://i.pinimg.com/originals/46/4b/36/464b36a7aecd988e3c51e56a823dbedc.gif'
        },
        { _id: '6', name: 'Bison', source: 'http://www.fightersgeneration.com/np5/char/ssf2hd/bison-hdstance.gif' }
    ],
    te = [
        {
            _id: '1',
            name: 'Ryu',
            health: 45,
            attack: 4,
            defense: 3,
            source: 'https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif'
        },
        {
            _id: '2',
            name: 'Dhalsim',
            health: 60,
            attack: 3,
            defense: 1,
            source: 'https://i.pinimg.com/originals/c0/53/f2/c053f2bce4d2375fee8741acfb35d44d.gif'
        },
        {
            _id: '3',
            name: 'Guile',
            health: 45,
            attack: 4,
            defense: 3,
            source: 'https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif'
        },
        {
            _id: '4',
            name: 'Zangief',
            health: 60,
            attack: 4,
            defense: 1,
            source: 'https://media1.giphy.com/media/nlbIvY9K0jfAA/source.gif'
        },
        {
            _id: '5',
            name: 'Ken',
            health: 45,
            attack: 3,
            defense: 4,
            source: 'https://i.pinimg.com/originals/46/4b/36/464b36a7aecd988e3c51e56a823dbedc.gif'
        },
        {
            _id: '6',
            name: 'Bison',
            health: 45,
            attack: 5,
            defense: 4,
            source: 'http://www.fightersgeneration.com/np5/char/ssf2hd/bison-hdstance.gif'
        }
    ];
function ae(e) {
    const t = e.lastIndexOf('/'),
        a = e.lastIndexOf('.json'),
        i = e.substring(t + 1, a);
    return te.find(n => n._id === i);
}
async function ne(e) {
    const t = e === 'fighters.json' ? ee : ae(e);
    return new Promise((a, i) => {
        setTimeout(() => (t ? a(t) : i(Error('Failed to load'))), 500);
    });
}
async function O(e, t = 'GET') {
    return ne(e);
}
var _;
class ie {
    constructor() {
        P(this, _, 'fighters.json');
    }
    async getFighters() {
        try {
            return await O(k(this, _));
        } catch (t) {
            throw t;
        }
    }
    async getFighterDetails(t) {
        try {
            const a = `details/fighter/${t}.json`;
            return await O.call(this, a);
        } catch (a) {
            throw a;
        }
    }
}
_ = new WeakMap();
const L = new ie(),
    I = new Map();
async function N(e) {
    let t = I.get(e);
    return t || ((t = await L.getFighterDetails(e)), I.set(e, t)), t;
}
function re(e) {
    z(e);
}
function se(e) {
    const t = e.filter(Boolean).length === 2,
        a = () => re(e),
        i = s({ tagName: 'div', className: 'preview-container___versus-block' }),
        n = s({ tagName: 'img', className: 'preview-container___versus-img', attributes: { src: X } }),
        c = s({ tagName: 'button', className: `preview-container___fight-btn ${t ? '' : 'disabled'}` });
    return c.addEventListener('click', a, !1), (c.innerText = 'Fight'), i.append(n, c), i;
}
function oe(e) {
    const t = document.querySelector('.preview-container___root'),
        [a, i] = e,
        n = H(a, 'left', N),
        r = H(i, 'right', N),
        c = se(e);
    (t.innerHTML = ''), t.append(n, c, r);
}
function ce() {
    let e = [];
    return async (t, a) => {
        const i = await N(a),
            [n, r] = e;
        (e = [n ?? i, n ? r ?? i : r]), oe(e);
    };
}
function le(e) {
    const { source: t, name: a } = e;
    return s({ tagName: 'img', className: 'fighter___fighter-image', attributes: { src: t, title: a, alt: a } });
}
function me(e, t) {
    const a = s({ tagName: 'div', className: 'fighters___fighter' }),
        i = le(e),
        n = r => t(r, e._id);
    return a.append(i), a.addEventListener('click', n, !1), a;
}
function de(e) {
    const t = ce(),
        a = s({ tagName: 'div', className: 'fighters___root' }),
        i = s({ tagName: 'div', className: 'preview-container___root' }),
        n = s({ tagName: 'div', className: 'fighters___list' }),
        r = e.map(c => me(c, t));
    return n.append(...r), a.append(i, n), a;
}
const p = class {
    static async startApp() {
        try {
            p.loadingElement.style.visibility = 'visible';
            const t = await L.getFighters(),
                a = de(t);
            p.rootElement.appendChild(a);
        } catch (t) {
            console.warn(t), (p.rootElement.innerText = 'Failed to load data');
        } finally {
            p.loadingElement.style.visibility = 'hidden';
        }
    }
};
let y = p;
w(y, 'rootElement', document.getElementById('root')),
    w(y, 'loadingElement', document.getElementById('loading-overlay'));
y.startApp();
