import P from '../models/parcel';
const Parcel = new P();

async function getParcels(req, res) {
    const parsels = await Parcel.getParcels();
    res.json(parsels);
}

async function getParcelById(req, res) {
    const id = parseInt(req.params.id);
    const parcel = await Parcel.getParcelById(id);
    res.json(parcel);
}

async function createParcel(req, res) {
    const { weight, cargo, truckId } = req.body;
    const parcel = await Parcel.createParcel(weight, cargo, truckId);
    res.json(parcel);
}

async function loadParcel(req, res) {
    const { parcelId, truckId } = req.body;
    const parcel = await Parcel.loadParcel(parcelId, truckId);
    res.json(parcel);
}

async function unloadParcel(req, res) {
    const parcelId = parseInt(req.params.id);
    const parcel = await Parcel.unloadParcel(parcelId);
    res.json(parcel);
}

export {
    getParcels,
    getParcelById,
    createParcel,
    loadParcel,
    unloadParcel
}