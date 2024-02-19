import prisma from "../util/prisma";

class Parcel {
    constructor() { }

    async createParcel(weight, cargo, truckId) {
        const data = {
            weight: weight,
            cargo: cargo,
        }
        if (truckId) {
            data.truckId = truckId;
        }
        const parcel = await prisma.parcel.create({
            data: data
        })
        return parcel;
    }

    async getParcels() {
        const parcels = await prisma.parcel.findMany();
        return parcels;
    }

    async getParcelById(id) {
        const parcel = await prisma.parcel.findUnique({
            where: {
                id: id,
            }
        });
        return parcel;
    }

    async getParcelByTruckId(truckId) {
        const parcels = await prisma.parcel.findMany({
            where: {
                truck_id: truckId
            }
        });
        return parcels;
    }

    async loadParcel(parcelId, truckId) {
        const parcel = await prisma.parcel.update({
            where: {
                id: parcelId
            },
            data: {
                truckId: truckId
            }
        });
        return parcel;
    }

    async unloadParcel(parcelId) {
        const parcel = await prisma.parcel.update({
            where: {
                id: parcelId
            },
            data: {
                truckId: null
            }
        });
        return parcel;
    }
}

export default Parcel;