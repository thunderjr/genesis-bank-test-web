import type { NextApiRequest } from "next";

export const getFiltersFromRequest = (request: NextApiRequest) => {
  return {
    query: {
      name: request.query.name?.toString(),
      category: request.query.category?.toString(),
    },
    options: {
      page: Number(request.query.page) || 1,
      limit: Number(request.query.limit) || 10,
    },
  };
};
