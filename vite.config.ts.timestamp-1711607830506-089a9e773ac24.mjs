// vite.config.ts
import { defineConfig, loadEnv } from "file:///E:/VSCode_Project/admin-project/node_modules/.pnpm/vite@5.1.6_@types+node@20.11.30_sass@1.72.0/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/VSCode_Project/admin-project/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.6_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/VSCode_Project/admin-project/node_modules/.pnpm/unplugin-auto-import@0.17.5/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/VSCode_Project/admin-project/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/VSCode_Project/admin-project/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import path from "path";
import { createSvgIconsPlugin } from "file:///E:/VSCode_Project/admin-project/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.1.6/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///E:/VSCode_Project/admin-project/node_modules/.pnpm/vite-plugin-mock@3.0.1_esbuild@0.19.12_mockjs@1.1.0_vite@5.1.6/node_modules/vite-plugin-mock/dist/index.mjs";
import ComponentNamedPlugin from "file:///E:/VSCode_Project/admin-project/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@5.1.6/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      // element-plus 自动导入与按需导入
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      // svg 插件
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]"
      }),
      // mockjs 插件
      viteMockServe(),
      // vue 组件命名插件
      ComponentNamedPlugin()
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
        // 相对路径别名配置，使用 @ 代替 src
      }
    },
    // 样式配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "@/styles/variable.scss";'
        }
      }
    },
    // 跨域代理
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_SERVER,
          // 需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxWU0NvZGVfUHJvamVjdFxcXFxhZG1pbi1wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxWU0NvZGVfUHJvamVjdFxcXFxhZG1pbi1wcm9qZWN0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9WU0NvZGVfUHJvamVjdC9hZG1pbi1wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbi8vIHN2ZyBcdTU2RkVcdTY4MDdcdTYzRDJcdTRFRjZcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbi8vIG1vY2tqcyBcdTYzRDJcdTRFRjZcclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXHJcbmltcG9ydCBDb21wb25lbnROYW1lZFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgLy8gZWxlbWVudC1wbHVzIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NEUwRVx1NjMwOVx1OTcwMFx1NUJGQ1x1NTE2NVxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICB9KSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgICAgfSksXHJcbiAgICAgIC8vIHN2ZyBcdTYzRDJcdTRFRjZcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIC8vIFNwZWNpZnkgdGhlIGljb24gZm9sZGVyIHRvIGJlIGNhY2hlZFxyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxyXG4gICAgICAgIC8vIFNwZWNpZnkgc3ltYm9sSWQgZm9ybWF0XHJcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLyBtb2NranMgXHU2M0QyXHU0RUY2XHJcbiAgICAgIHZpdGVNb2NrU2VydmUoKSxcclxuICAgICAgLy8gdnVlIFx1N0VDNFx1NEVGNlx1NTQ3RFx1NTQwRFx1NjNEMlx1NEVGNlxyXG4gICAgICBDb21wb25lbnROYW1lZFBsdWdpbigpLFxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZSgnLi9zcmMnKSwgLy8gXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHU5MTREXHU3RjZFXHVGRjBDXHU0RjdGXHU3NTI4IEAgXHU0RUUzXHU2NkZGIHNyY1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIFx1NjgzN1x1NUYwRlx1OTE0RFx1N0Y2RVxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIkAvc3R5bGVzL3ZhcmlhYmxlLnNjc3NcIjsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gXHU4REU4XHU1N0RGXHU0RUUzXHU3NDA2XHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xyXG4gICAgICAgICAgLy8gXHU4M0I3XHU1M0Q2XHU2NTcwXHU2MzZFXHU3Njg0XHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXHU4QkJFXHU3RjZFXHJcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX1NFUlZFUixcclxuICAgICAgICAgIC8vIFx1OTcwMFx1ODk4MVx1NEVFM1x1NzQwNlx1OERFOFx1NTdERlxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgLy9cdThERUZcdTVGODRcdTkxQ0RcdTUxOTlcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLFNBQVMsY0FBYyxlQUFlO0FBQzNULE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLFVBQVU7QUFFakIsU0FBUyw0QkFBNEI7QUFFckMsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTywwQkFBMEI7QUFHakMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUE7QUFBQSxNQUVKLFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLE1BQ25DLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLE1BQ25DLENBQUM7QUFBQTtBQUFBLE1BRUQscUJBQXFCO0FBQUE7QUFBQSxRQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxRQUUxRCxVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUE7QUFBQSxNQUVELGNBQWM7QUFBQTtBQUFBLE1BRWQscUJBQXFCO0FBQUEsSUFDdkI7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLE9BQU87QUFBQTtBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLENBQUMsSUFBSSxpQkFBaUIsR0FBRztBQUFBO0FBQUEsVUFFdkIsUUFBUSxJQUFJO0FBQUE7QUFBQSxVQUVaLGNBQWM7QUFBQTtBQUFBLFVBRWQsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDOUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
