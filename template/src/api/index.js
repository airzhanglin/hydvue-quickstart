import request from '@/utils/request'

export function getData() {
    return request({
        url: 'get',//请求接口地址
        method: 'get',
        params
    })
}

export function setData(param) {
    return request({
        url: '',
        method: 'post',
        data: param
    })
}