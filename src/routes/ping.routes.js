/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *         - ip
 *         - sessionid
 *         - querystring
 *         - clienttimestamp
 *       properties:
 *         ip:
 *           type: string
 *           description: The user's IP address
 *         sessionid:
 *           type: number
 *           description: The user's random session id
 *         querystring:
 *           type: string
 *           description: The full query string present in browser's URL
 *         clienttimestamp:
 *           type: string
 *           description: timestamp of ping (client side wall clock time)
 *           format: date-time
 *       example:
 *         ip: 177.228.41.210
 *         sessionid: 2343223342344
 *         querystring: oneParam=2332&twoParam=11
 *         clienttimestamp: 2020-03-10T04:05:06.157Z
 */
/**
 * @swagger
 * /ping:
 *    post:
 *      description: Logs a new entry of user's session into DB (Airtable)
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Session'
 *    responses:
 *      '200':
 *        description: Successfully saved with airTableRecordId
 *      '500':
 *        description: Failed to save
 *      '400':
 *        description: Invalid schema
 */
import express from "express";
import { ping } from "../controllers/ping.js";
import { sessionReader } from "../middlewares/session.js";
const router = express.Router();

router.post("/", sessionReader, ping);

export default router;
