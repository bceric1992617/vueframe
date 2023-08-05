import  request  from '@/utils/request'

export function handleDeliveryInfo(data) {
    return request({
        url: '/api/yydg/handleDeliveryInfo',
        method: 'post',
        data,
    })
}

export function getBingo(data) {
    return request({
        url: '/api/yydg/getBingo',
        method: 'get',
        params: data,
    })
}
export function getYydgIndex(data) {
    return request({
        url: '/api/yydg/index',
        method: 'get',
        params: data,
    })
}
export function getUserBingoList(data) {
    return request({
        url: '/api/yydg/getUserBingoList',
        method: 'get',
        params: data,
    })
}

export function getMemberInfo(data) {
    return request({
        url: '/api/member/get_member_info',
        method: 'post',
        data,

    })
}


export function paySubmit(data) {
    return request({
        url: '/api/pay/paySubmit',
        method: 'post',
        data,
    })
}
export function payConfig(data) {
    return request({
        url: '/api/pay/payConfig',
        method: 'get',
        params: data,
    })
}
export function payChannel(data) {
    return request({
        url: '/api/pay/payChannel',
        method: 'get',
        params: data,
    })
}

export function getTglUrl(data) {
    return request({
        url: '/api/info/tglUrl',
        method: 'post',
        data,
    })
}


export function fileMsg(data) {
    return request({
        url: '/api/yydg/getFileInfo',
        method: 'get',
        params: data,
    })
}

export function bankMsg(data) {
    return request({
        url: '/api/yydg/getBankInfo',
        method: 'get',
        params: data,
    })
}
export function doRecv(data) {
    return request({
        url: 'api/info/recv',
        method: 'post',
        data,
    })
}

export function userRegister(data) {
    return request({
        url: '/api/member/get_member_info',
        method: 'post',
        data,
    })
}

export function authInfo(data) {
    return request({
        url: '/api/info/get',
        method: 'post',
        data,
    })
}

export function goodInfo(data) {
    return request({
        url: '/api/yydg/getGoodInfo',
        method: 'get',
        params: data,
    })
}
export function userIp(data) {
    return request({
        url: '/api/yydg/getUserIp',
        method: 'get',
        params: data,
    })
}
export function takeShareUrl(data) {
    return request({
        url: '/api/yydg/getShareUrl',
        method: 'get',
        params: data,
    })
}
export function inviteRecord(data) {
    return request({
        url: '/api/yydg/doInviteRecord',
        method: 'post',
        data,
    })
}
