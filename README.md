# OnlyOffice PPT 预览 Demo

一个基于 OnlyOffice Document Server 的 PowerPoint 文件在线预览演示项目。

## 🚀 项目简介

这是一个使用 Express.js 和 OnlyOffice Document Server 构建的 PPT 文件上传和在线预览系统。用户可以上传 PPT/PPTX 文件，并通过浏览器直接预览文档内容，无需安装任何插件。

## ✨ 功能特性

- 📁 **文件上传**: 支持 .ppt 和 .pptx 格式文件上传
- 👀 **在线预览**: 基于 OnlyOffice Document Server 的高质量文档预览
- 🔐 **JWT 认证**: 使用 JWT 令牌保护文档访问安全
- 🌐 **跨域支持**: 完整的 CORS 配置，支持跨域访问
- 📱 **响应式设计**: 支持多种设备和屏幕尺寸
- 🔄 **实时回调**: 与 OnlyOffice Document Server 的实时通信

## 🛠️ 技术栈

- **后端**: Node.js, Express.js
- **文件上传**: Multer
- **认证**: JSON Web Token (JWT)
- **文档预览**: OnlyOffice Document Server
- **前端**: 原生 JavaScript, HTML5

## 📋 依赖项

需要安装docker，需要docker进行安装服务

```json
{
  "cors": "^2.8.5",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "multer": "^2.0.2"
}
```

## 🚦 前置要求

1. **Node.js** (版本 22.1.0 推荐)
2. **OnlyOffice Document Server**
   - 可以通过 Docker 快速部署：
   ```bash
   docker run -i -t -d -p 8080:80 onlyoffice/documentserver
   ```
3. **npm** 或 **yarn** 包管理器

## 📦 安装与运行

### 1. 克隆项目
```bash
git clone <repository-url>
cd onlyoffice-demo
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动 OnlyOffice Document Server
```bash
# 使用 Docker 启动 OnlyOffice Document Server
docker run -i -t -d -p 8080:80 onlyoffice/documentserver
```

### 4. 启动项目
```bash
node server.js
```

### 5. 访问应用
打开浏览器访问: `http://localhost:3000`

## 🔧 配置说明

### 服务器配置
- **端口**: 3000 (可在 server.js 中修改)
- **上传目录**: `public/uploads/`
- **静态文件**: `public/` 目录

### OnlyOffice 配置
- **Document Server 地址**: `http://localhost:8080`
- **API 脚本**: `http://localhost:8080/web-apps/apps/api/documents/api.js`

[预览页面](./assets/onlyoffice-server.png)

### JWT 配置
```javascript
const JWT_SECRET = "zFEdwSUA4sCHnONB7TeHsXOGc7ClU2fw"; // 生产环境请使用环境变量
```

## 📁 项目结构

```
onlyoffice-demo/
├── server.js              # 主服务器文件
├── package.json           # 项目配置文件
├── .gitignore            # Git 忽略文件
├── README.md             # 项目说明文档
└── public/               # 静态文件目录
    ├── index.html        # 前端页面
    └── uploads/          # 文件上传目录
```

## 🔌 API 接口

### POST /upload
上传 PPT 文件并获取预览配置

**请求**:
- Method: POST
- Content-Type: multipart/form-data
- Body: 包含 "ppt" 字段的文件

**响应**:
```json
{
  "document": {
    "fileType": "pptx",
    "title": "example.pptx",
    "url": "http://172.16.201.146:3000/uploads/filename",
    "key": "unique_key"
  },
  "documentType": "slide",
  "editorConfig": {
    "mode": "view",
    "callbackUrl": "http://172.16.201.146:3000/callback"
  },
  "height": "100%",
  "width": "100%",
  "token": "jwt_token"
}
```

### POST /callback
OnlyOffice Document Server 回调接口

**请求**:
- Method: POST
- Content-Type: application/json
- Body: OnlyOffice 回调数据

**响应**:
```json
{
  "error": 0
}
```

## 🔒 安全说明

1. **JWT 密钥**: 生产环境中应使用环境变量管理 JWT 密钥
2. **CORS 配置**: 当前配置允许所有来源，生产环境应限制具体域名
3. **文件验证**: 建议添加文件类型和大小验证
4. **上传目录**: 确保上传目录具有适当的权限设置

## 🚨 注意事项

1. **IP 地址配置**: 代码中硬编码了 IP 地址 `172.16.201.146`，需要根据实际环境修改
2. **OnlyOffice License**: 生产环境使用请确保获得适当的 OnlyOffice 许可证
3. **文件存储**: 当前文件存储在本地，生产环境建议使用云存储服务

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 ISC 许可证。

## 🔗 相关链接

- [OnlyOffice Document Server](https://github.com/ONLYOFFICE/DocumentServer)
- [OnlyOffice API 文档](https://api.onlyoffice.com/)
- [Express.js 官方文档](https://expressjs.com/)

## 📞 支持与反馈

如有问题或建议，请通过以下方式联系：
- 创建 Issue
- 发送邮件至项目维护者

---

**感谢使用 OnlyOffice PPT 预览 Demo！** 🎉