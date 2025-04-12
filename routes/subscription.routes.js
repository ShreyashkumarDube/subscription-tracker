import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send ({
    title: 'GET all subscriptions'
}));


subscriptionRouter.get("/:id", (req, res) => res.send ({
    title: 'GET subscription details'
}));

subscriptionRouter.post("/", (req, res) => res.send ({
    title: 'Create subscription' 
}));

subscriptionRouter.put("/:id", (req, res) => res.send ({
    title: 'UPDATE Subscription'
}));


subscriptionRouter.delete("/:id", (req, res) => res.send ({
    title: 'DELETE Subscription'
}));

subscriptionRouter.get("/user/:id", (req, res) => res.send ({
    title: 'GET all user Subscription'
}));

subscriptionRouter.put("/:id/cancel", (req, res) => res.send ({
    title: 'CANCEL Subscription'
}));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send ({
    title: 'GET upcoming renewals'
}));

export default subscriptionRouter;