import {createApp} from '@/main';

export default (context: any) => {
    return new Promise((resolve, reject) => {
        const {app, router} = createApp();

        // 设置服务器端router的位置
        router.push(context.url);

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();

            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                reject({
                    code: 404,
                });
                return;
            }

            // Promise 应该 resolve 应用程序实例，以便它可以渲染
            resolve(app);
        }, reject);
    });
};
