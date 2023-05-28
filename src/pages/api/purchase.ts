import { registerPurchase } from "@/lib/mongodb/helpers/register-purchase";
import { mongoDbRouteHandler } from "@/helpers/mongodb-route-handler";
import { purchaseRequestSchema } from "@/types/purchase";

export default mongoDbRouteHandler({
  POST: async (req, res) => {
    const validationResult = purchaseRequestSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).send({ errors: validationResult.error.issues });
    }

    const purchase = await registerPurchase(validationResult.data);
    return res.status(201).send(purchase);
  },
});
