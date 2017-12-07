function resultData(success,data,message){
    return {
        success: success,
        data: data||null,
        message: message||''
    }
}
module.exports.resultData=resultData;