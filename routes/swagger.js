// 定义模型 可以公用 schema $ref
/**
 * @swagger
 * definitions:
 *   Captcha:
 *     properties:
 *       svg:
 *         type: "string"
 *         default: "<svg>……</svg>"
 *         description: "svg码"
 *   Login:
 *     properties:
 *       code:
 *         type: number
 *         default: 200
 *         description: "状态码"
 *       message:
 *         type: "string"
 *         default: "登录成功！"
 *         description: "登录信息"
 *       obj:
 *         type: object
 *         default: {
 *                    tokenHead: 'Bearer',
 *                    token: 'eyJhbGciOiJSUzI1NiIsInR5cC……'
 *                  }
 *         description: "登录信息"
 *   Home:
 *     properties:
 *       result:
 *         type: object
 *         default: [
 *                    {
 *                      "id": 2,
 *                      "url": "/",
 *                      "path": "/home",
 *                      "component": "Home",
 *                      "name": "员工资料",
 *                      "iconCls": "fa fa-user-circle-o",
 *                      "keepAlive": null,
 *                      "requireAuth": 1,
 *                      "parentId": 1,
 *                      "enabled": 1,
 *                      "children": [
 *                                    {
 *                                      "id": 7,
 *                                      "url": "/employee/basic/**",
 *                                      "path": "/emp/basic",
 *                                      "component": "EmpBasic",
 *                                      "name": "基本资料",
 *                                      "iconCls": null,
 *                                      "keepAlive": null,
 *                                      "requireAuth": 1,
 *                                      "parentId": 2,
 *                                       "enabled": 1
 *                                    }
 *                                  ]
 *                    }
 *                  ]
 *         description: "动态路由菜单资料"
 *   Info:
 *     properties:
 *       result:
 *         type: object
 *         default: {
 *                      name: '系统管理员',
 *                      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.qq22.com.cn%2Fimg%2F2650798402%2F3798250993.jpg'
 *                  }
 *         description: "管理员个人信息"
 *   GetEmMsg:
 *     properties:
 *       result:
 *         type: object
 *         default: [
 *                    {
 *                      "id": 1,
 *                      "name": '韦梅',
 *                      "gender": '女',
 *                      "birthday": '1999-10-1',
 *                      "idCard": "341502198810196427",
 *                      "wedlock": "未婚",
 *                      "nationId": 1,
 *                      "nativePlace": "哥谭市",
 *                      "politicId": 11,
 *                      "email": "xia53@gangjing.cn",
 *                      "phone": "15567487644",
 *                      "address": "贵州省洁市清城汕尾街d座 502246",
 *                      "departmentId": 3,
 *                      "jobLevelId": 5,
 *                      "posId": 5,
 *                      "engageForm": "劳动合同",
 *                      "tiptopDegree": "博士",
 *                      "specialty": "电气工程及其自动化",
 *                      "school": "中国科学技术大学",
 *                      "beginDate": "2018-10-16",
 *                      "workState": "在职",
 *                      "workID": "00000001",
 *                      "contractTerm": 9.31,
 *                      "conversionTime": "2018-08-29",
 *                      "notWorkDate": null,
 *                      "beginContract": "2017-09-03",
 *                      "endContract": "2019-08-26",
 *                      "workAge": null,
 *                      "salaryId": 4,
 *                      "nation": {
 *                        "id": 1,
 *                        "name": "汉族"
 *                      },
 *                      "politic": {
 *                        "id": 11,
 *                        "name": "台盟盟员"
 *                      },
 *                      "department": {
 *                        "id": 3,
 *                        "name": "总办"
 *                      },
 *                      "joblevel": {
 *                        "id": 5,
 *                        "name": "初级工程师"
 *                      },
 *                      "position": {
 *                        "id": 5,
 *                        "name": "运维工程师"
 *                      }
 *                    }
 *                  ]
 *         description: "获取全部员工信息"
 *   ModEmMsg:
 *     properties:
 *       result:
 *         type: object
 *         default: {
 *                    code: 200,
 *                    message: '修改成功',
 *                    obj: null
 *                  }
 *         description: "修改员工个人信息"
 *   GetAdmins:
 *     properties:
 *       result:
 *         type: object
 *         default: [
 *                    {
 *                      "id": 2,
 *                      "name": "何淑华",
 *                      "userFace": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585830947922&d"
 *                    },
 *                  ]
 *         description: "获取其他管理员用户聊天用信息"
 */

//  tags 可以理解成接口分类  parameters 参数
/**
 * @swagger
 * /captcha:
 *   get:
 *     description: 获取验证码svg
 *     tags: [验证码获取模块]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 获取成功
 *         schema:
 *           $ref: '#/definitions/Captcha'
 * /login:
 *   post:
 *     description: 用户登入
 *     tags: [用户登入模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: 用户名.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 用户密码.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: code
 *         description: 验证码
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 登入成功
 *         schema:
 *           $ref: '#/definitions/Login'
 * /system/config/menu:
 *   get:
 *     description: 获取动态菜单路由资料，需要输入token令牌
 *     tags: [菜单路由获取模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: 令牌
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 获取成功
 *         schema:
 *           $ref: '#/definitions/Home'
 * /userinfo:
 *   get:
 *     description: 获取管理员的头像和名称，需要输入token令牌
 *     tags: [管理员个人信息获取模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: 令牌
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 获取成功
 *         schema:
 *           $ref: '#/definitions/Info'
 * /employee/emp/basic:
 *   get:
 *     description: 获取全部员工信息
 *     tags: [全部员工信息获取模块]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 获取成功
 *         schema:
 *           $ref: '#/definitions/GetEmMsg'
 * /employee/emp/modify:
 *   post:
 *     description: '修改员工个人信息，除了需要输入token令牌，还需要提供包含员工id在内的另外至少另外一项信息，包含但不限于name、gender、birthday、idCard、wedlock、nationId、nativePlace、politicId、email、phone、address、departmentId、jobLevelId、posId、engageForm、tiptopDegree、specialty、school、beginDate、workID、contractTerm、conversionTime、nowWorkDate、beginContract、endContract，如果不包含上述任何一条属性，那么改了等于没改，这里以name为例，实现修改员工名字的功能'
 *     tags: [员工个人信息修改模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: 令牌
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: 员工id.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: 员工姓名.
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: 获取成功
 *         schema:
 *           $ref: '#/definitions/ModEmMsg'
 * /getadminsinfo:
 *   get:
 *     description: 获取其他管理员用户聊天用信息，需要输入token令牌
 *     tags: [获取其他管理员用户聊天用信息]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: 令牌
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 获取成功
 *         schema:
 *           $ref: '#/definitions/GetAdmins'
 */
