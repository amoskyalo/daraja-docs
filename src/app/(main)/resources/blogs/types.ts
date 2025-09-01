export type Blog = {
    id: string;
    title: string;
    brief: string;
    coverImage: {
        url: string;
    };
    bannerImage: {
        url: string;
    };
};

export type Response = {
    response: {
        edges: {
            node: Blog;
        }[];
    };
};
