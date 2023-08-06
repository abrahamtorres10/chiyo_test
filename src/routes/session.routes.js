/**
 * @swagger
 * /session:
 *    get:
 *      description: Fetches session records from DB (Airtable)
 *      parameters:
 *       - in: query
 *         name: maxItems
 *         schema:
 *           type: integer
 *         description: The number of items to fetch
 *      responses:
 *        '200':
 *          description: Success fetching session records
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  data:
 *                    type: array
 *                  message:
 *                    type: string
 *        '500':
 *            description: Failed to fetch sessions
 */
import express from "express";
import { fetchSessions } from "../controllers/session.js";

const router = express.Router();

router.get("/", fetchSessions);

export default router;
