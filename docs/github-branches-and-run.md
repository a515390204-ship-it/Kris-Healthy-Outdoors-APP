# GitHub 分支和本地运行说明

## 一、GitHub 分支怎么用

分支可以理解成：

- `main`：正式版本
- `feature/...`：新功能开发
- `fix/...`：修 bug

推荐你的使用方式：

1. 平时不要直接在 `main` 上改功能
2. 每次做一个新功能，就新建一个分支
3. 功能做完后，再合并回 `main`

建议命名：

- `feature/outdoor-module`
- `feature/kb-admin`
- `fix/mobile-layout`

常用命令：

```bash
git checkout -b feature/outdoor-module
git add .
git commit -m "Add outdoor module"
git push -u origin feature/outdoor-module
```

如果你以后要接 GitHub，先装 Git，然后：

```bash
git init
git branch -M main
git remote add origin <你的仓库地址>
```

## 二、怎么运行这个产品

这个项目分两部分：

- 前台静态站
- 本地知识库 API

已经准备好的启动脚本：

- `start-product.cmd`

双击运行后会启动：

- 前台：`http://127.0.0.1:8080`
- API：`http://127.0.0.1:3047/api/health`

如果你只想看前台页面，也可以直接打开：

- `index.html`

但如果你要使用知识库导入后台、管理列表和本地 JSON 读写，建议用 `start-product.cmd`。
