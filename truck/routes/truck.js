import { Router } from 'express';
import { createTruck, getTruckById, getTrucks } from '../controllers/truck';
const router = Router();

router.post('/', createTruck);

router.get('/', getTrucks);
router.get('/:id', getTruckById);

export default router;