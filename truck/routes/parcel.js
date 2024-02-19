import { Router } from "express";
import { createParcel, getParcelById, getParcels, loadParcel, unloadParcel } from "../controllers/parcel";

const router = Router();

router.get("/", getParcels);
router.get("/:id", getParcelById);
router.post("/", createParcel);
router.put("/load", loadParcel);
router.put("/unload", unloadParcel);


export default router;
