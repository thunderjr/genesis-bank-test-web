import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { connect, disconnect } from "@/lib/mongodb";

interface MethodHandlers {
  POST?: NextApiHandler;
  GET?: NextApiHandler;
}

export const mongoDbRouteHandler =
  (handlers: MethodHandlers) =>
  async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      await connect();

      if (request.method! in handlers) {
        const data = await handlers[request.method as keyof MethodHandlers]!(
          request,
          response
        );

        return data;
      }

      return response.status(405).json({ message: "Method not allowed" });
    } finally {
      await disconnect();
    }
  };
