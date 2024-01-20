// 参数接口
export interface LoginParams {
  /*账号 */
  account: string

  /*密码 */
  password: string

  /*提交验证码 */
  captcha: string

  /*验证码key */
  codeKey: string
}

// 响应接口
export interface LoginRes {
  /*令牌 */
  token: string

  /*刷新令牌，可以为空 */
  refreshToken: string
}

// 响应接口
export interface GetValidateCodeRes {
  /*验证码key */
  codeKey: string

  /*验证码value */
  codeValue: string
}

// 响应接口
export interface GetUserInfoRes {
  /*用户编号 */
  id: string

  /*用户名 */
  username: string

  /*账号 */
  account: string

  /*性别 */
  sex: string

  /*头像 */
  avatar: string

  /*年龄 */
  age: number

  /*邮箱 */
  email: string

  /*手机号 */
  phone: string

  /*用户登录请求参数 */
  createTime: string

  /*用户登录请求参数 */
  updateTime: string
}
