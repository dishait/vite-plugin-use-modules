# vite-plugin-use-modules

自动加载 `modules`

<br />
<br />

## Usage 🦕

### install

1. 安装包

```shell
npm i vite-plugin-use-modules -D
```

2. 注册插件

```ts
// vite.config.js or vite.config.ts
import { defineConfig } from "vite";
import Modules from "vite-plugin-use-modules";

export default defineConfig({
  plugins: [Modules()],
});
```

<br />

### basic

1. 获取所有模块

```ts
import { modules } from "virtual:modules";

console.log(modules); // src/modules 的所有模块都会被获取到
```

<br />

2. 使用 `src/modules` 下的默认导出函数

```ts
// eg: src/modules/router.ts
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  routes: [],
  history: createWebHistory(),
});

export default (app: App) => app.use(router);

// 如果足够兼容，可以直接导出插件
// export default router

// 如果需要选项，则可以导出数组，第二个参数即为选项
// export default [router, options]
```

```ts
import App from "./App.vue";
import { createApp } from "vue";
import { useModules } from "virtual:modules";

const app = createApp(App);

useModules(app); // 这将注册所有的 Vue 插件

app.mount("#app");
```

<br />

### types 🦖

如果你是 `ts` 项目，可以在 `tsconfig.json` 中添加如下配置

```json
{
  "compilerOptions": {
    "types": ["vite-plugin-use-modules/client"]
  }
}
```

<br />

### 配置

1. 修改目标目录

```ts
import { defineConfig } from "vite";
import Modules from "vite-plugin-use-modules";

export default defineConfig({
  plugins: [
    Modules({
      target: "src/plugins", // 这将加载 src/plugins 下的模块，默认为 src/modules
    }),
  ],
});
```

2. 自动模式

```ts
import { defineConfig } from "vite";
import Modules from "vite-plugin-use-modules";

export default defineConfig({
  plugins: [
    Modules({
      auto: true, // 开启自动模式，auto 也支持 vite 插件的所有 transform 类型
    }),
  ],
});
```

开启后，虚拟模块的注册是非必需的

```diff
import App from './App.vue'
import { createApp } from 'vue'

- import { useModules } from 'virtual:modules'

const app = createApp(App)

- useModules(app)

app.mount('#app')
```

3. 规范化

```ts
import { defineConfig } from "vite";
import Modules from "vite-plugin-use-modules";

export default defineConfig({
  plugins: [
    Modules({
      normalize(target) {
        return `'${target}/*.[tj]s'`; // 返回扫描的 glob
      },
    }),
  ],
});
```

4. 顺序

可以通过对文件名添加数字前缀来控制模块的加载顺序，例如 `1.foo.ts` 将比
`2.bar.ts` 优先加载，以此类推。

<br />
<br />

## 组织 🦔

欢迎关注 **帝莎编程**

- [官网](http://dishaxy.dishait.cn/)
- [Gitee](https://gitee.com/dishait)
- [Github](https://github.com/dishait)
- [网易云课堂](https://study.163.com/provider/480000001892585/index.htm?share=2&shareId=480000001892585)

<br />
<br />

## License

Made with markthree

Published under [MIT License](./LICENSE).

<br />
