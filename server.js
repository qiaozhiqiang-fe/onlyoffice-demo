// server.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.static("public"));

// 为上传的文件添加特殊的静态文件服务和头信息
app.use('/uploads', express.static('public/uploads', {
  setHeaders: (res, path) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
  }
}));

const upload = multer({ dest: "public/uploads/" });

// JWT密钥 (生产环境应使用环境变量)
const JWT_SECRET = "zFEdwSUA4sCHnONB7TeHsXOGc7ClU2fw";

// 生成JWT令牌
function generateJWT(payload) {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    header: header
  });
}

// 上传接口
app.post("/upload", upload.single("ppt"), (req, res) => {
  const file = req.file;
  const mode = req.body.mode || "view"; // 默认为预览模式，可选 "view" 或 "presentation"

  // 使用本机IP地址，让Docker容器能够访问
  const fileUrl = `http://172.16.201.146:3000/uploads/${file.filename}`;

  // 文档配置
  const config = {
    document: {
      fileType: "pptx",
      title: file.originalname,
      url: fileUrl,
      key: `${file.filename}_${Date.now()}`, // 添加唯一key
    },
    documentType: "slide",
    editorConfig: {
      mode: "view", // OnlyOffice只支持view模式
      callbackUrl: "http://172.16.201.146:3000/callback", // 回调URL
      customization: {
        autosave: false,
        forcesave: false,
        showReviewChanges: false,
        compactToolbar: mode === "presentation",
        toolbarNoTabs: mode === "presentation",
        toolbarHideFileName: mode === "presentation",
        hideRightMenu: mode === "presentation",
        hideRulers: mode === "presentation",
        zoom: mode === "presentation" ? 100 : -1,
      }
    },
    height: "100%",
    width: "100%",
    type: "desktop",
  };

  // 为JWT创建payload - OnlyOffice需要特定的结构
  const jwtPayload = {
    document: config.document,
    documentType: config.documentType,
    editorConfig: config.editorConfig,
    type: config.type,
    iss: "onlyoffice", // 发行者
    aud: "onlyoffice"  // 受众
  };

  // 生成JWT令牌
  const token = generateJWT(jwtPayload);
  config.token = token;

  res.json(config);
});

// 回调接口 - OnlyOffice Document Server会调用这个接口
app.post("/callback", express.json(), (req, res) => {
  console.log("Document Server 回调:", req.body);
  res.json({ error: 0 });
});

// 启动服务
app.listen(3000, () => {
  console.log("✅ Node.js 服务运行在 http://localhost:3000");
});
