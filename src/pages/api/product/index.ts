import { getFiltersFromRequest } from "@/helpers/get-filters-from-request";
import { createProduct, filterProducts } from "@/lib/mongodb/helpers";
import { mongoDbRouteHandler } from "@/helpers/mongodb-route-handler";
import { productSchema } from "@/types/product";

export default mongoDbRouteHandler({
  POST: async (req, res) => {
    const validationResult = productSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.issues });
    }

    const product = await createProduct(validationResult.data);
    return res.status(201).json(product);
  },

  GET: async (req, res) => {
    const { query, options } = getFiltersFromRequest(req);

    const results = await filterProducts(query, options);

    res.json(results);
  },
});
