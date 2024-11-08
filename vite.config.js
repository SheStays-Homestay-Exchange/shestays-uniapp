import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
	plugins: [uni()],
	// rollupOptions:{
	//     output:{
	//         assetFileNames(assetInfo) {
	// 			  if (assetInfo.name.endsWith('.css')) {
	// 				return "static/css/[name]-[hash].[ext]"
	// 			  }
	// 			  if (["png", "jpg", "svg", "PNG"].some(ext => assetInfo.name.endsWith(ext))) {
	// 				return "static/img/[name]-[hash].[ext]"
	// 			  }
	// 			  if (["ttf", "woff", "woff2"].some(ext => assetInfo.name.endsWith(ext))) {
	// 				return "static/fonts/[name]-[hash].[ext]"
	// 			  }
	// 			  return "static/css/[name]-[hash].[ext]"
	//         }
	//     }
	// },
	server: {
	    proxy: {
	      '/api': {
	        target: 'https://shestays.life/', // 目标服务器的地址
	        changeOrigin: true, // 是否改变源地址
	        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
	      },
	    },
	},
});

 
