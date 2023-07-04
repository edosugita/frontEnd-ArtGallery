import {setMessage} from "@/components/Message/messageSlice";

export function requireAuth(handler) {
    return async (context) => {
        const { req, res } = context;

        if (!req?.session?.user) {
            setMessage({content: 'Please login first', type: 'warning'})
            res.writeHead(302, { Location: '/' });
            res.end();
            return {};
        }

        return await handler(context);
    };
}
