import { mongoDbRouteHandler } from "@/helpers/mongodb-route-handler";
import { getDistinctCategories } from "@/lib/mongodb/helpers";

export default mongoDbRouteHandler({
  GET: async (req, res) => {
    try {
      const categories = await getDistinctCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  },
});
