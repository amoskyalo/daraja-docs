export type Blog = {
    id: string;
    title: string;
    brief: string;
    url: string;
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
