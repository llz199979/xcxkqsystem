const {request} = require("../utils/request.js")
export const chartAllData=(data,token)=>{
  return request({
    url:'/',
    method:'POST',
    token:token,
    data
  })
}
