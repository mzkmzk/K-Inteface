import Utils from './Utils'

/**
 * 待做: 
 */
let Inteface = {
    mock: {
        /*
        url: 'http://404mzk.com',
        obj: {
            
        },
        automate: {
            {
                obj,method,params,time, num
            }
        }
        */
    },
    get_url_param: key => {
        let url = this.mock.url || location.href,
            start = url.indexOf('?'),
            args = {},
            query = url.substring(start),
            pairs = query.split('&')
        for (var i =  pairs.length - 1; i >= 0; i--) {
            var pos = pairs[i].indexOf('=')
            if ( pos === -1 ) continue
            if ( args[key] ) break //找到了元素
            var name = pairs[i].substring(0,pos)
            var value = pairs[i].substring(pos+1,pairs[i].length)
            args[name] = value
                
        }
        return args[key] || ''
    },
    obj: (obj, method, params = []) => {
        let object_type = Utils.get_type(obj),
            return_type,
            return_value

        if ( this.mock.obj && (return_value = (this.mock.obj)[object_type]) ) {

            if ( ( return_type = Utils.get_type( return_value ) ) !== 'function' ) return return_value //同步

            return_value.apply(null) //异步

        }else {
            method.apply(obj, params) //调用正常接口
        }   
        
    }
}

export default Inteface