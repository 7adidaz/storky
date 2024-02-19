import T from '../models/truck';
const Truck = new T();

async function getTrucks(req, res) {
    const trucks = await Truck.getTrucks();
    res.json(trucks);
}

async function getTruckById(req, res) {
    const id = parseInt(req.params.id);
    const truck = await Truck.getTruckById(id);
    res.json(truck);
}

async function createTruck(req, res) {
    const { plate, capacity } = req.body;
    const truck = await Truck.createTruck(plate, capacity);
    res.json(truck);
}

export { getTrucks, getTruckById, createTruck };