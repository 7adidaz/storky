import prisma from "../util/prisma";

class EntitiesFactory {

    async createTruck() {
        const truck = await prisma.truck.create({
            data: {
                plate: "plate",
                capacity: 100,
            }
        })
        return truck;
    }

    async createParcel(truckId) {
        const data = {
            weight: 100,
            cargo: "Electronics",
        }
        if (truckId) { data.truck_id = truckId; }
        const parcel = await prisma.parcel.create({
            data: data
        })
        return parcel;
    }
}

export default EntitiesFactory;