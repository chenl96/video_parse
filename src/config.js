import pako from 'pako'

const baseWebUrl = 'https://ip2787265136.mobgslb.tbcache.com/'
const token = "1060t4a9836j7jnot4grat9fmqvdkg"

let decodeM3u8 = function (_0x331b30, _0x291698) {
    var _0x58d3fa = {
        'jWTei': function (_0x205be1, _0x19f846) {
            return _0x205be1(_0x19f846);
        },
        'SjbJN': function (_0x487ab3, _0x53a1ff) {
            return _0x487ab3 + _0x53a1ff;
        },
        'jFaNX': 'Function(arguments[0]+"',
        'gXeWC': '")()',
        'PPYcV': function (_0x28d1ab, _0xa89fb1) {
            return _0x28d1ab % _0xa89fb1;
        },
        'WVSQr': function (_0x441309, _0x30087e) {
            return _0x441309 - _0x30087e;
        },
        'srsqe': function (_0x5df777, _0x5399bf) {
            return _0x5df777 >= _0x5399bf;
        },
        'ZMYzQ': 'QtiQP',
        'GIIbC': function (_0x199a4f, _0x55fee8) {
            return _0x199a4f + _0x55fee8;
        },
        'RNdkh': function (_0x153885, _0xd9ca22) {
            return _0x153885 ^ _0xd9ca22;
        },
        'dBhMj': function (_0x3eb993, _0x2c9801) {
            return _0x3eb993 < _0x2c9801;
        }
    };
    let _0x3648d8 = '',
        _0x2433d4 = _0x58d3fa['PPYcV'](_0x291698, 2) ? - 1 : 1,
        _0x4d7edb = _0x291698[0];
    for (
        var _0x15859c = _0x58d3fa['WVSQr'](_0x331b30.length, 1);
        _0x58d3fa['srsqe'](_0x15859c, 0);
        _0x15859c--
    ) {
        if (_0x58d3fa['ZMYzQ'] !== 'MFqAL') {
            _0x3648d8 += String.fromCharCode(
                _0x58d3fa['GIIbC'](
                    _0x58d3fa['RNdkh'](_0x331b30['charCodeAt'](_0x15859c), _0x4d7edb),
                    _0x2433d4
                )
            );
        } else {
            return _0x58d3fa['jWTei'](
                Function,
                _0x58d3fa['SjbJN'](_0x58d3fa['jFaNX'], a) + _0x58d3fa['gXeWC']
            );
        }
    }
    _0x331b30 = atob(_0x3648d8);
    _0x3648d8 = [];
    for (
        var _0x15859c = 0,
        _0x5d82f6 = _0x331b30.length;
        _0x58d3fa['dBhMj'](_0x15859c, _0x5d82f6);
        ++_0x15859c
    ) _0x3648d8.push(_0x331b30.charCodeAt(_0x15859c));
    _0x331b30 = new Uint8Array(_0x3648d8);
    return pako['ungzip'](_0x331b30, {
        'to': 'string'
    });
};

let xmlParse = function(xmlStr) {
    const parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlStr, 'text/xml');
    let urlElements = xmlDoc.getElementsByTagName('BaseURL');
    const videoAudio = {
        'video': urlElements[0].textContent.replace(/&amp;/g, '&'),
        'audio': urlElements[1].textContent.replace(/&amp;/g, '&')
    }
    return videoAudio;
}

export {
    baseWebUrl,
    token,
    decodeM3u8,
    xmlParse
}