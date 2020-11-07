import express from "express";
import {settingsController} from "../controller/settingsController.js";
const settingsRouter = express.Router();

settingsRouter.post("/:id/", settingsController.setSettings.bind(settingsController));

export {settingsRouter};