import express from "express";
import { testPostController } from "../controllers/testController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/test/test-post:
 *   post:
 *     summary: Test post route
 *     description: A test route that requires authentication and invokes a controller.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testField:
 *                 type: string
 *                 description: A field for testing purposes.
 *     responses:
 *       200:
 *         description: Successful post response
 *       401:
 *         description: Unauthorized (if user is not authenticated)
 *       400:
 *         description: Bad request (if required data is missing)
 */
router.post("/test-post", userAuth, testPostController);

export default router;
